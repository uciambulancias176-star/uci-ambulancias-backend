const express = require('express');
const cors = require('cors');
const path = require('path');
const { Resend } = require('resend');

// Configuración desde variables de entorno
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || 'UCI Ambulancias <onboarding@resend.dev>';
const EMAIL_TO = process.env.EMAIL_TO || 'uciambulancias176@gmail.com';
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || 'uciambulancias176@gmail.com';
const PORT = process.env.PORT || 3001;

// Validar configuración crítica al inicio
if (!RESEND_API_KEY) {
    console.error('❌ ERROR CRÍTICO: FALTA RESEND_API_KEY en las variables de entorno');
    console.error('💡 Configura RESEND_API_KEY en las variables de entorno de Render');
    process.exit(1);
}

const app = express();
const resend = new Resend(RESEND_API_KEY);

// Middlewares - CORS configurado para uciambulancias.cl
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

app.use(express.json({ limit: process.env.PDF_MAX_SIZE || '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Mensaje de inicio
console.log('🚀 ============================================');
console.log('🏥 UCI AMBULANCIAS - SISTEMA INICIADO');
console.log('📡 Servidor:', `https://uci-ambulancias-backend.onrender.com`);
console.log('🌍 Dominios permitidos: uciambulancias.cl');
console.log('📧 Correo destino:', EMAIL_TO);
console.log('🔑 API Key:', '✅ CONFIGURADA');
console.log('💡 Estado: LISTO PARA RECIBIR FICHAS DESDE UCIAMBULANCIAS.CL');
console.log('🚀 ============================================');

// Rutas
app.get('/', (req, res) => {
    res.json({
        message: '🚑 UCI Ambulancias - Backend Funcionando',
        version: '1.0.0',
        status: 'operational',
        endpoints: {
            fichaClinica: 'POST /ficha-clinica',
            status: '/status',
            health: '/health'
        },
        allowedOrigins: [
            'https://uciambulancias.cl',
            'http://uciambulancias.cl'
        ]
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        service: 'UCI Ambulancias Backend',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        domain: 'uciambulancias.cl'
    });
});

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

// Ruta principal para enviar fichas clínicas DESDE uciambulancias.cl
app.post('/ficha-clinica', async (req, res) => {
    try {
        console.log('📨 Solicitud recibida desde:', req.get('origin'));
        console.log('📊 Headers:', req.headers);
        
        const { paciente, folio, pdfBase64, tamañoPDF, pdfData, data } = req.body;

        console.log('📊 Datos recibidos:', { 
            paciente, 
            folio, 
            'tamañoPDF': tamañoPDF,
            'tienePdfBase64': !!pdfBase64,
            'tienePdfData': !!pdfData,
            'tieneData': !!data
        });

        // Validaciones flexibles para diferentes formatos
        let pdfBuffer;
        let pdfContent = pdfBase64 || pdfData || data;

        if (!paciente || !folio || !pdfContent) {
            return res.status(400).json({
                error: 'Datos incompletos',
                requeridos: ['paciente', 'folio', 'pdfBase64 o pdfData o data'],
                recibido: req.body
            });
        }

        // Convertir base64 a buffer
        console.log('🔄 Convirtiendo PDF a buffer...');
        
        // Limpiar el base64 si viene con prefijo data:application/pdf;base64,
        const cleanBase64 = pdfContent.replace(/^data:application\/pdf;base64,/, '');
        
        pdfBuffer = Buffer.from(cleanBase64, 'base64');
        console.log('✅ PDF convertido:', pdfBuffer.length, 'bytes');

        // Validar que sea un PDF válido
        if (pdfBuffer.length < 100) {
            return res.status(400).json({
                error: 'PDF inválido o vacío',
                tamaño: pdfBuffer.length + ' bytes'
            });
        }

        // Enviar correo
        console.log('📤 Enviando correo a través de Resend...');
        
        const { data: emailData, error } = await resend.emails.send({
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
                    <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
                    <p><strong>Tamaño PDF:</strong> ${tamañoPDF || Math.round(pdfBuffer.length / 1024) + ' KB'}</p>
                    <p><strong>Origen:</strong> ${req.get('origin') || 'Directo'}</p>
                    <hr>
                    <p><em>Este es un envío automático del sistema de UCI Ambulancias.</em></p>
                </div>
            `,
            attachments: [
                {
                    filename: `ficha-clinica-${paciente}-${folio}.pdf`,
                    content: pdfBuffer
                }
            ]
        });

        if (error) {
            console.error('❌ Error al enviar correo:', error);
            return res.status(500).json({
                error: 'Error al enviar correo',
                detalles: error.message
            });
        }

        console.log('✅ CORREO ENVIADO EXITOSAMENTE!');
        console.log('📧 ID del correo:', emailData.id);
        console.log('👤 Paciente:', paciente);
        console.log('📄 Folio:', folio);
        console.log('🌍 Origen:', req.get('origin'));

        res.json({
            success: true,
            message: 'Ficha clínica enviada exitosamente',
            emailId: emailData.id,
            paciente: paciente,
            folio: folio,
            origen: req.get('origin'),
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('💥 Error en el servidor:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            detalles: error.message,
            bodyRecibido: req.body
        });
    }
});

// Redirigir a la página real de uciambulancias.cl
app.get('/ficha-clinica', (req, res) => {
    res.redirect('https://uciambulancias.cl/ficha-clinica.html');
});

// Ruta de prueba para formularios HTML
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

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('💥 Error no manejado:', err);
    res.status(500).json({
        error: 'Error interno del servidor',
        message: err.message
    });
});

// Ruta no encontrada
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: `La ruta ${req.originalUrl} no existe`,
        availableEndpoints: {
            home: '/',
            health: '/health',
            status: '/status',
            fichaClinica: 'POST /ficha-clinica',
            test: '/test-form'
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`\n🔗 URLs disponibles:`);
    console.log(`   🏠 https://uci-ambulancias-backend.onrender.com`);
    console.log(`   📋 https://uci-ambulancias-backend.onrender.com/ficha-clinica`);
    console.log(`   ✅ https://uci-ambulancias-backend.onrender.com/status`);
    console.log(`   ❤️  https://uci-ambulancias-backend.onrender.com/health`);
    console.log(`   🧪 https://uci-ambulancias-backend.onrender.com/test-form`);
    console.log(`\n🌍 Aceptando solicitudes desde: uciambulancias.cl`);
    console.log(`🚑 Servidor UCI Ambulancias ejecutándose en puerto ${PORT}\n`);
});

module.exports = app;


