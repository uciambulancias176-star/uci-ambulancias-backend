const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

// Configuración
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || 'UCI Ambulancias <onboarding@resend.dev>';
const EMAIL_TO = process.env.EMAIL_TO || 'uciambulancias176@gmail.com';
const PORT = process.env.PORT || 10000;

// Validar API Key
if (!RESEND_API_KEY) {
    console.error('❌ ERROR: FALTA RESEND_API_KEY');
    process.exit(1);
}

const app = express();
const resend = new Resend(RESEND_API_KEY);

// Middlewares
app.use(cors({
    origin: ['https://uciambulancias.cl', 'https://www.uciambulancias.cl', 'http://localhost:3000'],
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Log de inicio
console.log('🚀 ============================================');
console.log('🏥 UCI AMBULANCIAS - SERVIDOR INICIADO');
console.log('📧 Correo destino:', EMAIL_TO);
console.log('🔑 API Key:', '✅ CONFIGURADA');
console.log('🚀 ============================================');

// Rutas
app.get('/', (req, res) => {
    res.json({
        message: '🚑 UCI Ambulancias - Backend Funcionando',
        status: 'operational',
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'UCI Ambulancias Backend',
        timestamp: new Date().toISOString()
    });
});

app.get('/status', (req, res) => {
    res.json({
        status: 'operational',
        service: 'UCI Ambulancias PDF Service',
        resend: 'configured',
        email: EMAIL_TO,
        timestamp: new Date().toISOString()
    });
});

// Ruta principal - ENVÍO DE FICHAS
app.post('/ficha-clinica', async (req, res) => {
    console.log('📨 ============================================');
    console.log('📧 SOLICITUD DE FICHA CLÍNICA RECIBIDA');
    console.log('📨 ============================================');
    
    try {
        const { paciente, folio, pdfBase64, tamañoPDF } = req.body;

        console.log('👤 Paciente:', paciente);
        console.log('📄 Folio:', folio);
        console.log('📊 Tamaño PDF:', tamañoPDF);
        console.log('🌍 Origen:', req.get('origin'));

        // Validaciones básicas
        if (!paciente || !folio || !pdfBase64) {
            console.error('❌ Datos incompletos');
            return res.status(400).json({
                success: false,
                error: 'Datos incompletos: paciente, folio y pdfBase64 son requeridos'
            });
        }

        // Convertir PDF
        console.log('🔄 Convirtiendo PDF...');
        const cleanBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, '');
        const pdfBuffer = Buffer.from(cleanBase64, 'base64');
        
        console.log('✅ PDF convertido:', pdfBuffer.length, 'bytes');

        if (pdfBuffer.length < 100) {
            console.error('❌ PDF inválido');
            return res.status(400).json({
                success: false,
                error: 'PDF inválido o vacío'
            });
        }

        // Enviar correo
        console.log('📤 Enviando correo...');
        
        const { data: emailData, error } = await resend.emails.send({
            from: EMAIL_FROM,
            to: EMAIL_TO,
            reply_to: EMAIL_TO,
            subject: `Ficha Clínica - ${paciente} - ${folio}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
                    <div style="background: white; padding: 20px; border-radius: 10px; border-left: 5px solid #0066ff;">
                        <h2 style="color: #0066ff; margin: 0;">🏥 UCI AMBULANCIAS</h2>
                        <h3 style="color: #333;">Nueva Ficha Clínica Recibida</h3>
                        
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                            <p><strong>👤 Paciente:</strong> ${paciente}</p>
                            <p><strong>📄 Folio:</strong> ${folio}</p>
                            <p><strong>📅 Fecha:</strong> ${new Date().toLocaleString('es-CL')}</p>
                            <p><strong>📊 Tamaño PDF:</strong> ${tamañoPDF || Math.round(pdfBuffer.length / 1024) + ' KB'}</p>
                        </div>
                        
                        <p style="color: #666; font-size: 12px;">
                            Este es un envío automático del sistema de UCI Ambulancias.
                        </p>
                    </div>
                </div>
            `,
            attachments: [
                {
                    filename: `ficha-clinica-${paciente}-${folio}.pdf`.replace(/[^a-zA-Z0-9.-]/g, '_'),
                    content: pdfBuffer
                }
            ]
        });

        if (error) {
            console.error('❌ Error al enviar correo:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al enviar correo: ' + error.message
            });
        }

        console.log('✅ CORREO ENVIADO EXITOSAMENTE!');
        console.log('📧 ID del correo:', emailData.id);
        console.log('🎯 Correo destino:', EMAIL_TO);

        res.json({
            success: true,
            message: 'Ficha clínica enviada exitosamente',
            emailId: emailData.id,
            paciente: paciente,
            folio: folio,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('💥 Error en el servidor:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor: ' + error.message
        });
    }
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('💥 Error no manejado:', err);
    res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
    });
});

// ============================================
// SISTEMA ANTI-SLEEP PARA INSTANCIA GRATUITA
// ============================================
const keepInstanceAlive = () => {
    setInterval(() => {
        const now = new Date().toLocaleString('es-CL');
        console.log(`🔄 [${now}] Manteniendo instancia activa...`);
    }, 840000); // 14 minutos (menos de 15 min timeout)
};

// ============================================
// PING AUTOMÁTICO INTERNO
// ============================================
const autoPing = () => {
    setInterval(async () => {
        try {
            const response = await fetch(`https://uci-ambulancias-backend.onrender.com/health`);
            const data = await response.json();
            console.log(`❤️ Health check: ${data.status} - ${new Date().toLocaleTimeString()}`);
        } catch (error) {
            console.log('⚠️ Health check falló, pero servidor sigue activo');
        }
    }, 600000); // 10 minutos
};

// ============================================
// INICIAR SERVIDOR (MODIFICAR ESTO)
// ============================================
app.listen(PORT, () => {
    console.log(`🚑 Servidor UCI Ambulancias ejecutándose en puerto ${PORT}`);
    console.log(`🌍 URL: https://uci-ambulancias-backend.onrender.com`); // ✅ URL CORRECTA
    console.log('💡 Listo para recibir fichas clínicas...');
    
    // Iniciar sistemas anti-sleep
    keepInstanceAlive();
    autoPing();
});
// 



