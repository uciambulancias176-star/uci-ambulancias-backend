const express = require('express');
const cors = require('cors');
const path = require('path');
const { Resend } = require('resend');

// =============================================
// CONFIGURACIÓN DESDE VARIABLES DE ENTORNO
// =============================================
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || 'UCI Ambulancias <onboarding@resend.dev>';
const EMAIL_TO = process.env.EMAIL_TO || 'uciambulancias176@gmail.com';
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || 'uciambulancias176@gmail.com';
const PORT = process.env.PORT || 3001;

// =============================================
// VALIDACIÓN CRÍTICA AL INICIO
// =============================================
console.log('🔧 INICIANDO CONFIGURACIÓN...');
console.log('   - RESEND_API_KEY:', RESEND_API_KEY ? '✅ CONFIGURADA' : '❌ FALTANTE');
console.log('   - EMAIL_FROM:', EMAIL_FROM);
console.log('   - EMAIL_TO:', EMAIL_TO);
console.log('   - EMAIL_REPLY_TO:', EMAIL_REPLY_TO);

if (!RESEND_API_KEY) {
    console.error('❌ ERROR CRÍTICO: FALTA RESEND_API_KEY en las variables de entorno');
    console.error('💡 Configura RESEND_API_KEY en las variables de entorno de Render');
    process.exit(1);
}

// =============================================
// INICIALIZACIÓN DE EXPRESS Y RESEND
// =============================================
const app = express();
const resend = new Resend(RESEND_API_KEY);

console.log('✅ Resend inicializado correctamente');

// =============================================
// MIDDLEWARES
// =============================================
app.use(cors({
  origin: [
    'https://uciambulancias.cl',
    'http://uciambulancias.cl',
    'https://www.uciambulancias.cl',
    'http://www.uciambulancias.cl',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'file://'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// =============================================
// MENSAJE DE INICIO
// =============================================
console.log('🚀 ============================================');
console.log('🏥 UCI AMBULANCIAS - SISTEMA INICIADO');
console.log('📡 Servidor:', `https://uci-ambulancias-backend.onrender.com`);
console.log('🌍 Dominios permitidos: uciambulancias.cl');
console.log('📧 Correo destino:', EMAIL_TO);
console.log('🔑 API Key:', '✅ CONFIGURADA');
console.log('💡 Estado: LISTO PARA RECIBIR FICHAS DESDE UCIAMBULANCIAS.CL');
console.log('🚀 ============================================');

// =============================================
// RUTAS BÁSICAS
// =============================================

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: '🚑 UCI Ambulancias - Backend Funcionando',
        version: '1.0.0',
        status: 'operational',
        endpoints: {
            fichaClinica: 'POST /ficha-clinica',
            status: 'GET /status',
            health: 'GET /health'
        },
        allowedOrigins: [
            'https://uciambulancias.cl',
            'http://uciambulancias.cl'
        ]
    });
});

// Health check - CORREGIDO
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        service: 'UCI Ambulancias Backend',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        domain: 'uciambulancias.cl'
    });
});

// Status del servicio
app.get('/status', (req, res) => {
    res.json({
        status: 'operational',
        service: 'UCI Ambulancias PDF Service',
        resend: 'configured',
        email: EMAIL_TO,
        domain: 'uciambulancias.cl',
        timestamp: new Date().toISOString()
    });
});

// =============================================
// RUTA PRINCIPAL - ENVÍO DE FICHAS CLÍNICAS
// =============================================
app.post('/ficha-clinica', async (req, res) => {
    console.log('📨 SOLICITUD RECIBIDA - FICHA CLÍNICA');
    console.log('   - Origen:', req.get('origin'));
    console.log('   - Hora:', new Date().toISOString());
    
    try {
        const { paciente, folio, pdfBase64, tamañoPDF, ambulancia } = req.body;

        // LOG DETALLADO
        console.log('📊 DATOS RECIBIDOS:');
        console.log('   - Paciente:', paciente);
        console.log('   - Folio:', folio);
        console.log('   - Tamaño PDF:', tamañoPDF);
        console.log('   - Ambulancia:', ambulancia);
        console.log('   - Longitud Base64:', pdfBase64 ? pdfBase64.length : 0);

        // VALIDACIONES BÁSICAS
        if (!paciente) {
            console.error('❌ FALTA NOMBRE DEL PACIENTE');
            return res.status(400).json({
                success: false,
                error: 'Falta el nombre del paciente',
                campo: 'paciente'
            });
        }

        if (!folio) {
            console.error('❌ FALTA FOLIO');
            return res.status(400).json({
                success: false,
                error: 'Falta el folio',
                campo: 'folio'
            });
        }

        if (!pdfBase64) {
            console.error('❌ FALTA PDF');
            return res.status(400).json({
                success: false,
                error: 'Falta el PDF en base64',
                campo: 'pdfBase64'
            });
        }

        // CONVERTIR PDF
        console.log('🔄 CONVIRTIENDO PDF...');
        let pdfBuffer;
        try {
            const cleanBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, '');
            pdfBuffer = Buffer.from(cleanBase64, 'base64');
            console.log('✅ PDF CONVERTIDO:', pdfBuffer.length + ' bytes');
        } catch (error) {
            console.error('❌ ERROR CONVIRTIENDO PDF:', error.message);
            return res.status(400).json({
                success: false,
                error: 'Error convirtiendo PDF',
                detalles: error.message
            });
        }

        // VALIDAR PDF
        if (pdfBuffer.length < 100) {
            console.error('❌ PDF DEMASIADO PEQUEÑO:', pdfBuffer.length + ' bytes');
            return res.status(400).json({
                success: false,
                error: 'PDF inválido o vacío',
                tamaño: pdfBuffer.length + ' bytes'
            });
        }

        // PREPARAR CORREO
        const attachments = [{
            filename: `FICHA_${folio}_${paciente.replace(/\s+/g, '_')}.pdf`,
            content: pdfBuffer
        }];

        console.log('📧 PREPARANDO CORREO...');
        console.log('   - Desde:', EMAIL_FROM);
        console.log('   - Hacia:', EMAIL_TO);
        console.log('   - Asunto:', `Ficha Clínica - ${paciente} - ${folio}`);

        // ENVIAR CORREO CON RESEND
        console.log('🚀 ENVIANDO CORREO...');
        
        let emailData;
        let emailError;
        
        try {
            const result = await resend.emails.send({
                from: EMAIL_FROM,
                to: EMAIL_TO,
                reply_to: EMAIL_REPLY_TO,
                subject: `Ficha Clínica - ${paciente} - ${folio}`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2 style="color: #2563eb;">🏥 UCI Ambulancias</h2>
                        <h3>Nueva Ficha Clínica Recibida</h3>
                        <p><strong>Paciente:</strong> ${paciente}</p>
                        <p><strong>Folio:</strong> ${folio}</p>
                        <p><strong>Ambulancia:</strong> ${ambulancia || 'No especificada'}</p>
                        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-CL')}</p>
                        <p><strong>Tamaño PDF:</strong> ${tamañoPDF || Math.round(pdfBuffer.length / 1024) + ' KB'}</p>
                        <p><strong>Origen:</strong> ${req.get('origin') || 'Directo'}</p>
                        <hr>
                        <p><em>Sistema Automático UCI Ambulancias</em></p>
                    </div>
                `,
                attachments: attachments
            });

            emailData = result.data;
            emailError = result.error;
            
        } catch (sendError) {
            console.error('❌ ERROR ENVIANDO CORREO:', sendError);
            emailError = sendError;
        }

        if (emailError) {
            console.error('❌ ERROR RESEND:', emailError);
            return res.status(500).json({
                success: false,
                error: 'Error al enviar correo',
                detalles: emailError.message,
                tipo: 'RESEND_ERROR'
            });
        }

        // ÉXITO
        console.log('🎉 CORREO ENVIADO EXITOSAMENTE!');
        console.log('   - Email ID:', emailData?.id);
        console.log('   - Paciente:', paciente);
        console.log('   - Folio:', folio);
        console.log('   - Hora:', new Date().toISOString());

        res.json({
            success: true,
            message: 'Ficha clínica enviada exitosamente',
            emailId: emailData?.id,
            paciente: paciente,
            folio: folio,
            ambulancia: ambulancia,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('💥 ERROR GENERAL EN FICHA-CLINICA:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor',
            detalles: error.message,
            endpoint: '/ficha-clinica'
        });
    }
});

// =============================================
// RUTAS ADICIONALES
// =============================================

// Redirigir a la página real
app.get('/ficha-clinica', (req, res) => {
    res.redirect('https://uciambulancias.cl/ficha-clinica.html');
});

// Ruta de prueba
app.get('/test-form', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Test Form - UCI Ambulancias</title>
        </head>
        <body>
            <h1>🏥 Test Form - UCI Ambulancias</h1>
            <p>Backend funcionando correctamente para uciambulancias.cl</p>
            <p>Puedes enviar fichas desde: https://uciambulancias.cl/ficha-clinica.html</p>
        </body>
        </html>
    `);
});

// =============================================
// MANEJO DE ERRORES
// =============================================

// Ruta no encontrada
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Ruta no encontrada',
        message: `La ruta ${req.originalUrl} no existe`,
        availableEndpoints: {
            home: 'GET /',
            health: 'GET /health',
            status: 'GET /status',
            fichaClinica: 'POST /ficha-clinica',
            test: 'GET /test-form'
        }
    });
});

// Manejo de errores general
app.use((err, req, res, next) => {
    console.error('💥 ERROR NO MANEJADO:', err);
    res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: err.message
    });
});

// =============================================
// INICIAR SERVIDOR
// =============================================
app.listen(PORT, () => {
    console.log(`\n🔗 URLs disponibles:`);
    console.log(`   🏠 https://uci-ambulancias-backend.onrender.com`);
    console.log(`   📋 https://uci-ambulancias-backend.onrender.com/ficha-clinica`);
    console.log(`   ✅ https://uci-ambulancias-backend.onrender.com/status`);
    console.log(`   ❤️  https://uci-ambulancias-backend.onrender.com/health`);
    console.log(`   🧪 https://uci-ambulancias-backend.onrender.com/test-form`);
    console.log(`\n🌍 Aceptando solicitudes desde: uciambulancias.cl`);
    console.log(`🚑 Servidor UCI Ambulancias ejecutándose en puerto ${PORT}`);
    console.log(`⏰ Iniciado a las: ${new Date().toISOString()}\n`);
});

module.exports = app;

