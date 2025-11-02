require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 3001;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// ==========================================
// CONFIGURACIÓN
// ==========================================

// Validar API Key
if (!RESEND_API_KEY) {
    console.error('❌ ERROR CRÍTICO: FALTA RESEND_API_KEY en .env');
    console.log('💡 Verifica tu archivo .env tiene: RESEND_API_KEY=tu_api_key');
    process.exit(1);
}

// CONFIGURACIÓN CORS - PRODUCCIÓN (PEGAR)
app.use(cors({
    origin: [
        'https://uciambulancias.cl',
        'https://www.uciambulancias.cl'
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: false
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// ==========================================
// RUTAS PRINCIPALES
// ==========================================

// RUTA RAIZ - Ficha clínica
app.get('/', (req, res) => {
    console.log('📄 Sirviendo ficha clínica principal...');
    res.sendFile(path.join(__dirname, 'ficha-clinica.html'));
});

app.get('/ficha-clinica', (req, res) => {
    console.log('🏥 Sirviendo formulario ficha clínica...');
    res.sendFile(path.join(__dirname, 'ficha-clinica.html'));
});

// ==========================================
// RUTA DE ENVÍO DE PDF - FUNCIONAL
// ==========================================

app.post('/enviar-correo', async (req, res) => {
    console.log('🚑 [ENVIO] Iniciando envío de ficha clínica...');
    
    try {
        const { pdf, paciente, folio, fecha, ambulancia, motivo } = req.body;

        console.log('📊 Datos recibidos:', {
            paciente: paciente || 'No especificado',
            folio: folio || 'No especificado',
            tamañoPDF: pdf ? Math.round(pdf.length / 1024) + ' KB' : 'NO HAY PDF'
        });

        // VALIDACIONES CRÍTICAS
        if (!pdf) {
            console.log('❌ ERROR: No se recibió el PDF');
            return res.json({ 
                success: false, 
                error: 'ERROR: No se generó el PDF correctamente' 
            });
        }

        if (!paciente || paciente.trim() === '') {
            console.log('❌ ERROR: Falta nombre del paciente');
            return res.json({ 
                success: false, 
                error: 'ERROR: INGRESE NOMBRE DEL PACIENTE' 
            });
        }

        // CONFIGURACIÓN RESEND
        const resend = new Resend(RESEND_API_KEY);

        // CONVERTIR PDF
        console.log('🔄 Convirtiendo PDF a buffer...');
        const pdfBuffer = Buffer.from(pdf, 'base64');
        
        if (pdfBuffer.length === 0) {
            throw new Error('PDF vacío o corrupto');
        }

        console.log(`✅ PDF convertido: ${pdfBuffer.length} bytes`);

        // CONFIGURACIÓN CORREO
        const emailConfig = {
            from: process.env.EMAIL_FROM || 'UCI Ambulancias <onboarding@resend.dev>',
            to: [process.env.EMAIL_TO || 'uciambulancias176@gmail.com'],
            replyTo: process.env.EMAIL_REPLY_TO || 'uciambulancias176@gmail.com',
            subject: `FICHA CLÍNICA ${folio} - ${paciente}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
                    <h2 style="color: #0074d9; border-bottom: 2px solid #0074d9; padding-bottom: 10px;">
                        🏥 UCI AMBULANCIAS - Ficha Clínica
                    </h2>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0;">
                        <h3 style="color: #333; margin-top: 0;">📋 Datos del Traslado</h3>
                        <p><strong>📄 Folio:</strong> ${folio || 'No especificado'}</p>
                        <p><strong>👤 Paciente:</strong> ${paciente}</p>
                        <p><strong>📅 Fecha:</strong> ${fecha || 'No especificada'}</p>
                        <p><strong>🚑 Ambulancia:</strong> ${ambulancia || 'No especificada'}</p>
                        <p><strong>🎯 Motivo:</strong> ${motivo || 'No especificado'}</p>
                    </div>
                    
                    <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745;">
                        <p style="margin: 0; color: #2d5016;">
                            <strong>📎 ADJUNTO:</strong> Ficha clínica completa en formato PDF
                        </p>
                        <p style="margin: 5px 0 0 0; font-size: 14px;">
                            Incluye: Signos vitales, antecedentes, tratamientos, escalas médicas y firmas
                        </p>
                    </div>
                    
                    <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 5px;">
                        <p style="margin: 0; color: #856404;">
                            <strong>⚡ Generado automáticamente</strong><br>
                            Sistema UCI Ambulancias - ${new Date().toLocaleDateString('es-CL')}
                        </p>
                    </div>
                </div>
            `,
            attachments: [{
                filename: `Ficha_Clinica_${folio || 'SN'}_${paciente.replace(/\s+/g, '_')}.pdf`,
                content: pdfBuffer,
                contentType: 'application/pdf'
            }]
        };

        // ENVÍO DE CORREO
        console.log('📤 Enviando correo a través de Resend...');
        const { data, error } = await resend.emails.send(emailConfig);

        if (error) {
            console.error('❌ ERROR RESEND:', error);
            throw new Error(`Error Resend: ${error.message}`);
        }

        console.log('✅ CORREO ENVIADO EXITOSAMENTE!');
        console.log('📧 ID del correo:', data.id);
        console.log('👤 Paciente:', paciente);
        console.log('📄 Folio:', folio);

        // RESPUESTA DE ÉXITO
        res.json({ 
            success: true, 
            message: '✅ FICHA CLÍNICA ENVIADA CORRECTAMENTE A uciambulancias176@gmail.com',
            emailId: data.id,
            folio: folio,
            paciente: paciente,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('💥 ERROR CRÍTICO EN ENVÍO:', error);
        
        res.json({ 
            success: false, 
            error: `ERROR: ${error.message}`,
            timestamp: new Date().toISOString()
        });
    }
});

// ==========================================
// RUTAS DE DIAGNÓSTICO
// ==========================================

app.get('/status', (req, res) => {
    res.json({ 
        status: '✅ SERVIDOR FUNCIONANDO',
        servicio: 'UCI Ambulancias - Sistema de Fichas Clínicas',
        timestamp: new Date().toLocaleString('es-CL'),
        version: '1.0.0',
        configuracion: {
            puerto: PORT,
            apiKey: RESEND_API_KEY ? '✅ CONFIGURADA' : '❌ FALTANTE',
            emailFrom: process.env.EMAIL_FROM,
            emailTo: process.env.EMAIL_TO
        }
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: '🚑 Servidor UCI Ambulancias operativo',
        timestamp: new Date().toISOString()
    });
});

// ==========================================
// INICIALIZACIÓN
// ==========================================

app.listen(PORT, () => {
    console.log('🚀 ============================================');
    console.log('🏥 UCI AMBULANCIAS - SISTEMA INICIADO');
    console.log(`📡 Servidor: http://localhost:${PORT}`);
    console.log(`📧 Correo destino: ${process.env.EMAIL_TO}`);
    console.log(`🔑 API Key: ${RESEND_API_KEY ? '✅ CONFIGURADA' : '❌ FALTANTE'}`);
    console.log('💡 Estado: LISTO PARA ENVIAR FICHAS PDF');
    console.log('🚀 ============================================');
    console.log('\n🔗 URLs disponibles:');
    console.log('   📋 http://localhost:3001/ficha-clinica');
    console.log('   ✅ http://localhost:3001/status');
    console.log('   ❤️  http://localhost:3001/health');
});