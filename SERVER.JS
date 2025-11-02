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

// Middlewares
app.use(cors());
app.use(express.json({ limit: process.env.PDF_MAX_SIZE || '50mb' }));
app.use(express.static('public'));

// Mensaje de inicio
console.log('🚀 ============================================');
console.log('🏥 UCI AMBULANCIAS - SISTEMA INICIADO');
console.log('📡 Servidor:', `http://localhost:${PORT}`);
console.log('📧 Correo destino:', EMAIL_TO);
console.log('🔑 API Key:', '✅ CONFIGURADA');
console.log('💡 Estado: LISTO PARA ENVIAR FICHAS PDF');
console.log('🚀 ============================================');

// Rutas
app.get('/', (req, res) => {
    res.json({
        message: '🚑 UCI Ambulancias - Backend Funcionando',
        version: '1.0.0',
        status: 'operational',
        endpoints: {
            fichaClinica: '/ficha-clinica',
            status: '/status',
            health: '/health'
        }
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        service: 'UCI Ambulancias Backend',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
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

// Ruta principal para enviar fichas clínicas
app.post('/ficha-clinica', async (req, res) => {
    try {
        const { paciente, folio, pdfBase64, tamañoPDF } = req.body;

        console.log('📊 Datos recibidos:', { paciente, folio, 'tamañoPDF': tamañoPDF });

        // Validaciones
        if (!paciente || !folio || !pdfBase64) {
            return res.status(400).json({
                error: 'Datos incompletos',
                requeridos: ['paciente', 'folio', 'pdfBase64']
            });
        }

        // Convertir base64 a buffer
        console.log('🔄 Convirtiendo PDF a buffer...');
        const pdfBuffer = Buffer.from(pdfBase64, 'base64');
        console.log('✅ PDF convertido:', pdfBuffer.length, 'bytes');

        // Enviar correo
        console.log('📤 Enviando correo a través de Resend...');
        
        const { data, error } = await resend.emails.send({
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
        console.log('📧 ID del correo:', data.id);
        console.log('👤 Paciente:', paciente);
        console.log('📄 Folio:', folio);

        res.json({
            success: true,
            message: 'Ficha clínica enviada exitosamente',
            emailId: data.id,
            paciente: paciente,
            folio: folio,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('💥 Error en el servidor:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            detalles: error.message
        });
    }
});

// Ruta para servir el formulario HTML
app.get('/ficha-clinica', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>UCI Ambulancias - Ficha Clínica</title>
        </head>
        <body>
            <h1>🏥 UCI Ambulancias - Sistema de Fichas Clínicas</h1>
            <p>Backend funcionando correctamente</p>
            <p>Usa POST /ficha-clinica para enviar fichas PDF</p>
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
        message: `La ruta ${req.originalUrl} no existe`
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`\n🔗 URLs disponibles:`);
    console.log(`   📋 http://localhost:${PORT}/ficha-clinica`);
    console.log(`   ✅ http://localhost:${PORT}/status`);
    console.log(`   ❤️  http://localhost:${PORT}/health`);
    console.log(`\n🚑 Servidor UCI Ambulancias ejecutándose en puerto ${PORT}\n`);
});

module.exports = app;
