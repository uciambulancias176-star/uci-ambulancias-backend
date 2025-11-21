<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ficha Clínica - UCI Ambulancias</title>
    
    <!-- Librerías CDN -->
    <script src="https://cdn.jsdelivr.net/npm/signature_pad@4.1.7/dist/signature_pad.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>
    
    <style>
        :root {
            --primary: #0066ff;
            --secondary: #6c757d;
            --success: #00cc88;
            --danger: #ff4444;
            --warning: #ffaa00;
            --info: #00a8ff;
            --light: #f8f9fa;
            --dark: #1a1a2e;
            --future-blue: #00d4ff;
            --future-purple: #9d4edd;
            --future-green: #00ff95;
            --future-orange: #ff6b35;
            --future-red: #ff2e63;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            padding: 15px;
            color: #e2e2e2;
            line-height: 1.6;
            min-height: 100vh;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding: 15px;
            background: rgba(255,255,255,0.1);
            border-radius: 12px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            flex-wrap: wrap;
        }
        
        .logo {
            max-width: 150px;
            height: auto;
            filter: drop-shadow(0 0 10px var(--future-blue));
        }
        
        .folio {
            text-align: right;
            font-weight: bold;
            color: var(--future-blue);
            text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
            font-size: 0.9rem;
        }
        
        .container {
            max-width: 1600px;
            margin: 0 auto;
            background: rgba(255,255,255,0.05);
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.5);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        h2 {
            color: var(--future-blue);
            border-bottom: 2px solid var(--future-blue);
            padding-bottom: 10px;
            margin-bottom: 20px;
            text-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
            font-size: 1.5rem;
        }
        
        h3 {
            color: var(--future-green);
            margin: 20px 0 15px;
            padding-bottom: 6px;
            border-bottom: 1px solid rgba(0, 255, 149, 0.3);
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .form-section {
            margin-bottom: 25px;
            padding: 15px;
            border-radius: 10px;
            border-left: 6px solid var(--primary);
            background: rgba(255,255,255,0.08);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .form-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--future-blue), var(--future-purple));
        }
        
        .form-section:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.4);
            background: rgba(255,255,255,0.1);
        }
        
        .form-row {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .form-group {
            flex: 1 0 300px;
            position: relative;
        }
        
        label {
            display: block;
            margin-bottom: 6px;
            font-weight: 600;
            color: var(--future-blue);
            font-size: 0.9rem;
        }
        
        input, select, textarea {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 6px;
            font-size: 14px;
            background: rgba(0, 0, 0, 0.3);
            color: white;
            transition: all 0.3s ease;
        }
        
        select option {
            background: #1a1a2e;
            color: white;
        }
        
        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: var(--future-blue);
            box-shadow: 0 0 12px rgba(0, 212, 255, 0.3);
            background: rgba(0, 0, 0, 0.4);
        }

        .field-with-mic {
            position: relative;
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            width: 100%;
        }
        
        .field-with-mic input,
        .field-with-mic select,
        .field-with-mic textarea {
            flex: 1;
            padding-right: 45px !important;
            width: 100%;
        }
        
        .mic-button {
            position: absolute;
            right: 5px;
            background: var(--future-purple);
            color: white;
            border: none;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: all 0.3s;
            z-index: 10;
            box-shadow: 0 4px 12px rgba(157, 78, 221, 0.3);
        }
        
        .mic-button:hover {
            background: var(--future-blue);
            transform: scale(1.1);
            box-shadow: 0 6px 18px rgba(0, 212, 255, 0.4);
        }
        
        .mic-button.recording {
            background: var(--future-red);
            animation: pulse 0.5s infinite;
            box-shadow: 0 6px 18px rgba(255, 46, 99, 0.4);
        }
        
        .field-with-mic textarea {
            resize: vertical;
            min-height: 80px;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .btn {
            padding: 10px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            margin-right: 10px;
            margin-bottom: 10px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.3s;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        .btn-primary { background: linear-gradient(135deg, var(--future-blue), #0099ff); color: white; }
        .btn-success { background: linear-gradient(135deg, var(--future-green), #00cc88); color: white; }
        .btn-secondary { background: linear-gradient(135deg, #6c757d, #5a6268); color: white; }
        .btn-danger { background: linear-gradient(135deg, var(--future-red), #ff1744); color: white; }
        .btn-warning { background: linear-gradient(135deg, var(--future-orange), #ff8c00); color: white; }
        .btn-info { background: linear-gradient(135deg, var(--future-purple), #7b2cbf); color: white; }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
        }
        
        .signature-pad {
            border: 2px solid rgba(255,255,255,0.2);
            border-radius: 10px;
            margin-bottom: 15px;
            background: rgba(0, 0, 0, 0.3);
            min-height: 150px;
            position: relative;
            width: 100%;
            touch-action: none;
            box-shadow: inset 0 2px 8px rgba(0,0,0,0.1);
        }

        .signature-pad canvas {
            width: 100% !important;
            height: 150px !important;
            cursor: crosshair;
            background: transparent;
            border-radius: 8px;
            display: block;
        }

        .signature-actions {
            margin-top: 12px;
            display: flex;
            gap: 10px;
        }

        /* ESTILOS MODERNOS PARA SIGNOS VITALES */
        .vital-signs-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 15px;
            margin: 15px 0;
        }
        
        .vital-card {
            background: rgba(255,255,255,0.08);
            border-radius: 10px;
            padding: 15px;
            border: 1px solid rgba(255,255,255,0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .vital-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--future-blue), var(--future-green));
        }
        
        .vital-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
            background: rgba(255,255,255,0.12);
        }
        
        .vital-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }
        
        .vital-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--future-blue);
        }
        
        .vital-value {
            font-size: 1.6rem;
            font-weight: 700;
            text-align: center;
            margin: 12px 0;
            padding: 8px;
            border-radius: 6px;
            background: rgba(255,255,255,0.05);
            transition: all 0.3s ease;
        }
        
        .vital-normal {
            color: var(--future-green);
            border: 2px solid var(--future-green);
            box-shadow: 0 0 15px rgba(0, 255, 149, 0.2);
        }
        
        .vital-warning {
            color: var(--future-orange);
            border: 2px solid var(--future-orange);
            box-shadow: 0 0 15px rgba(255, 107, 53, 0.3);
            animation: alert-pulse 2s infinite;
        }
        
        .vital-danger {
            color: var(--future-red);
            border: 2px solid var(--future-red);
            box-shadow: 0 0 15px rgba(255, 46, 99, 0.4);
            animation: alert-pulse 1s infinite;
        }
        
        @keyframes alert-pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
        }
        
        .vital-range {
            font-size: 0.8rem;
            color: rgba(255,255,255,0.7);
            text-align: center;
        }
        
        .vital-input {
            width: 100%;
            padding: 10px;
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 6px;
            background: rgba(0, 0, 0, 0.3);
            color: white;
            font-size: 1rem;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .vital-input:focus {
            outline: none;
            border-color: var(--future-blue);
            box-shadow: 0 0 12px rgba(0, 212, 255, 0.3);
        }
        
        .hora-automatica {
            background: rgba(0, 255, 149, 0.1);
            font-weight: bold;
            color: var(--future-green);
            padding: 8px;
            border-radius: 6px;
            text-align: center;
            border: 1px solid rgba(0, 255, 149, 0.3);
            font-size: 0.8rem;
        }

        .notification {
            position: fixed;
            top: 15px;
            right: 15px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            box-shadow: 0 8px 25px rgba(0,0,0,0.4);
            animation: slideIn 0.4s ease-out;
            font-weight: bold;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            max-width: 350px;
            font-size: 0.9rem;
        }

        .notification.success {
            background: linear-gradient(135deg, var(--future-green), #00cc88);
            border-left: 4px solid #00b377;
        }

        .notification.error {
            background: linear-gradient(135deg, var(--future-red), #ff1744);
            border-left: 4px solid #e0002e;
        }

        .notification.warning {
            background: linear-gradient(135deg, var(--future-orange), #ff8c00);
            color: #000;
            border-left: 4px solid #e55a00;
        }

        .notification.info {
            background: linear-gradient(135deg, var(--future-blue), #0099ff);
            border-left: 4px solid #0088e6;
        }

        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        /* ESTILOS PARA FOTOS Y FIRMAS */
        .photo-section {
            margin-top: 15px;
            padding: 15px;
            background: rgba(255,255,255,0.08);
            border-radius: 10px;
            border: 2px dashed rgba(255,255,255,0.2);
            text-align: center;
        }
        
        .photo-preview {
            max-width: 100%;
            max-height: 250px;
            margin: 12px auto;
            border-radius: 8px;
            display: none;
            box-shadow: 0 8px 25px rgba(0,0,0,0.4);
            border: 2px solid rgba(255,255,255,0.2);
        }
        
        .photo-actions {
            margin-top: 12px;
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .section-photo-btn {
            background: linear-gradient(135deg, var(--future-purple), var(--future-blue));
            color: white;
            border: none;
            border-radius: 6px;
            padding: 10px 16px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
            font-weight: 600;
        }
        
        .section-photo-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        /* ESTILOS PARA PCR */
        .pcr-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .pcr-card {
            background: rgba(255,255,255,0.08);
            border-radius: 10px;
            padding: 15px;
            border: 1px solid rgba(255,255,255,0.1);
            transition: all 0.3s ease;
        }
        
        .pcr-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
            background: rgba(255,255,255,0.12);
        }
        
        .pcr-alert {
            background: rgba(255, 46, 99, 0.3);
            border: 3px solid var(--future-red);
            border-radius: 10px;
            padding: 20px;
            margin: 15px 0;
            text-align: center;
            animation: alert-pulse 1s infinite;
            box-shadow: 0 0 30px rgba(255, 46, 99, 0.5);
        }
        
        .pcr-alert h4 {
            color: white;
            margin-bottom: 10px;
            font-size: 1.3rem;
            text-shadow: 0 0 10px rgba(255, 46, 99, 0.8);
        }
        
        .time-display {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--future-green);
            text-align: center;
            margin: 12px 0;
            padding: 12px;
            background: rgba(0, 255, 149, 0.1);
            border-radius: 8px;
            border: 2px solid var(--future-green);
        }
        
        .compression-feedback {
            display: flex;
            justify-content: space-around;
            margin: 15px 0;
            flex-wrap: wrap;
            gap: 12px;
        }
        
        .feedback-item {
            text-align: center;
            padding: 12px;
            border-radius: 8px;
            background: rgba(255,255,255,0.08);
            flex: 1;
            min-width: 100px;
            transition: all 0.3s ease;
        }
        
        .feedback-good {
            border: 2px solid var(--future-green);
            box-shadow: 0 0 15px rgba(0, 255, 149, 0.2);
        }
        
        .feedback-bad {
            border: 2px solid var(--future-red);
            box-shadow: 0 0 15px rgba(255, 46, 99, 0.3);
        }

        /* ESTILOS PARA OPCIONES Y CHECKBOXES - CORREGIDOS */
        .option-label {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 10px;
            margin: 4px 0;
            border-radius: 6px;
            background: rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transition: all 0.2s ease;
            color: #e2e2e2 !important;
            font-weight: 500;
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .option-label:hover {
            background: rgba(255,255,255,0.1);
            border-color: var(--future-blue);
        }
        
        .option-label input[type="checkbox"],
        .option-label input[type="radio"] {
            margin: 0;
            width: auto;
            transform: scale(1.1);
        }
        
        .radio-group {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 8px;
        }
        
        .checkbox-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-top: 8px;
        }

        /* NUEVOS ESTILOS PARA SECCIONES AGREGADAS */
        .horarios-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin: 15px 0;
        }
        
        .horario-card {
            background: rgba(255,255,255,0.08);
            border-radius: 10px;
            padding: 15px;
            border: 1px solid rgba(255,255,255,0.1);
            text-align: center;
        }
        
        .horario-card h4 {
            color: var(--future-blue);
            margin-bottom: 12px;
            font-size: 1rem;
        }
        
        .protocolo-rcp {
            background: rgba(255, 46, 99, 0.15);
            border-radius: 10px;
            padding: 15px;
            margin: 15px 0;
            border: 2px solid var(--future-red);
        }
        
        .paso-rcp {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 12px 0;
            padding: 12px;
            background: rgba(255,255,255,0.05);
            border-radius: 6px;
            border-left: 4px solid var(--future-red);
        }
        
        .numero-paso {
            background: var(--future-red);
            color: white;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1rem;
            flex-shrink: 0;
        }
        
        .entrega-paciente {
            background: rgba(0, 255, 149, 0.1);
            border-radius: 10px;
            padding: 20px;
            margin: 15px 0;
            border: 2px solid var(--future-green);
        }
        
        .datos-entrega {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 12px;
            margin: 15px 0;
        }
        
        .dato-item {
            background: rgba(255,255,255,0.05);
            padding: 12px;
            border-radius: 6px;
            border-left: 4px solid var(--future-blue);
        }
        
        .dato-label {
            font-weight: bold;
            color: var(--future-blue);
            margin-bottom: 4px;
            font-size: 0.9rem;
        }
        
        .dato-valor {
            color: white;
            font-size: 1rem;
        }
        
        .autorizaciones-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 15px;
            margin: 15px 0;
        }
        
        .autorizacion-card {
            background: rgba(255,255,255,0.08);
            border-radius: 10px;
            padding: 15px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .firma-container {
            margin-top: 15px;
            padding: 15px;
            background: rgba(255,255,255,0.05);
            border-radius: 8px;
            border: 2px dashed rgba(255,255,255,0.2);
        }
        
        .comunas-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 8px;
            margin: 10px 0;
            max-height: 200px;
            overflow-y: auto;
            padding: 10px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 6px;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .escala-evaluacion {
            background: rgba(255,255,255,0.08);
            border-radius: 10px;
            padding: 15px;
            margin: 15px 0;
            border: 2px solid var(--future-purple);
        }

        .escala-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            margin: 8px 0;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 6px;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .escala-puntaje {
            background: var(--future-purple);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-weight: bold;
            min-width: 60px;
            text-align: center;
        }

        /* ESTILOS PARA SECCIONES ESPECIALES */
        .complejidad-section {
            background: rgba(0, 255, 149, 0.1) !important;
            border-left-color: var(--future-green) !important;
        }
        
        .trauma-section {
            background: rgba(255, 46, 99, 0.1) !important;
            border-left-color: var(--future-red) !important;
        }
        
        .ventilacion-section {
            background: rgba(0, 212, 255, 0.1) !important;
            border-left-color: var(--future-blue) !important;
        }
        
        .alergias-section {
            background: rgba(157, 78, 221, 0.1) !important;
            border-left-color: var(--future-purple) !important;
        }
        
        .conciencia-section {
            background: rgba(255, 170, 0, 0.1) !important;
            border-left-color: var(--warning) !important;
        }
        
        .pcr-section {
            background: rgba(255, 46, 99, 0.15) !important;
            border-left-color: var(--future-red) !important;
        }
        
        .postrado-section {
            background: rgba(157, 78, 221, 0.1) !important;
            border-left-color: var(--future-purple) !important;
        }
        
        .alergias-grid, .coronarios-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
            margin-top: 10px;
        }
        
        .ventilacion-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
            margin-top: 12px;
        }
        
        .trauma-options {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
            margin-top: 12px;
        }

        .postrado-options {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 10px;
            margin-top: 12px;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
            body {
                padding: 8px;
            }
            
            .container {
                padding: 12px;
                margin: 0;
                border-radius: 12px;
            }
            
            .form-group {
                flex: 1 0 100%;
            }
            
            .btn {
                width: 100%;
                justify-content: center;
            }
            
            .header {
                flex-direction: column;
                text-align: center;
            }
            
            .folio {
                text-align: center;
                margin-top: 12px;
            }
            
            .vital-signs-container {
                grid-template-columns: 1fr;
            }
            
            .photo-actions {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container" id="mainForm">
        <div class="header">
            <img src="https://uciambulancias.cl/wp-content/uploads/2024/12/LOGO-EMS-2.png" alt="UCI Ambulancias" class="logo">
            <div class="folio">
                <div style="font-size: 1.1rem; margin-bottom: 4px;">FICHA CLÍNICA ELECTRÓNICA</div>
                <div>Folio: <span id="folioNumber" style="font-size: 1rem;">FC-001</span></div>
                <div id="currentDate" style="margin: 4px 0; font-size: 0.8rem;"></div>
                <div>Ambulancia: <input type="text" id="numero_ambulancia" style="width: 80px; padding: 6px; font-size: 14px; background: rgba(0,0,0,0.3); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px;" placeholder="N°"></div>
            </div>
        </div>

        <!-- NUEVA SECCIÓN: HORARIOS DEL SERVICIO -->
        <div class="form-section">
            <h3>⏰ HORARIOS DEL SERVICIO</h3>
            
            <div class="horarios-grid">
                <div class="horario-card">
                    <h4>🚑 HORA DE SALIDA</h4>
                    <input type="datetime-local" id="hora_salida" name="hora_salida" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.3); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px;">
                    <button type="button" class="btn btn-info" style="width: 100%; margin-top: 8px;" onclick="document.getElementById('hora_salida').value = new Date().toISOString().slice(0,16)">🕐 HORA ACTUAL</button>
                </div>
                
                <div class="horario-card">
                    <h4>📍 HORA LLEGADA ESCENA</h4>
                    <input type="datetime-local" id="hora_llegada_escena" name="hora_llegada_escena" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.3); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px;">
                    <button type="button" class="btn btn-info" style="width: 100%; margin-top: 8px;" onclick="document.getElementById('hora_llegada_escena').value = new Date().toISOString().slice(0,16)">🕐 HORA ACTUAL</button>
                </div>
                
                <div class="horario-card">
                    <h4>🏥 HORA SALIDA AL HOSPITAL</h4>
                    <input type="datetime-local" id="hora_salida_hospital" name="hora_salida_hospital" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.3); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px;">
                    <button type="button" class="btn btn-info" style="width: 100%; margin-top: 8px;" onclick="document.getElementById('hora_salida_hospital').value = new Date().toISOString().slice(0,16)">🕐 HORA ACTUAL</button>
                </div>
                
                <div class="horario-card">
                    <h4>⏹️ HORA TERMINO SERVICIO</h4>
                    <input type="datetime-local" id="hora_termino_servicio" name="hora_termino_servicio" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.3); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px;">
                    <button type="button" class="btn btn-info" style="width: 100%; margin-top: 8px;" onclick="document.getElementById('hora_termino_servicio').value = new Date().toISOString().slice(0,16)">🕐 HORA ACTUAL</button>
                </div>
            </div>

            <!-- FOTO PARA HORARIOS -->
            <div class="photo-section">
                <label>📷 FOTO REGISTRO HORARIOS</label>
                <div class="photo-actions">
                    <input type="file" id="foto_horarios" accept="image/*" style="display: none;" onchange="previewPhoto(this, 'previewFotoHorarios')">
                    <button type="button" class="section-photo-btn" onclick="document.getElementById('foto_horarios').click()">📁 Seleccionar Foto</button>
                    <button type="button" class="section-photo-btn" onclick="tomarFoto('foto_horarios', 'previewFotoHorarios')">📸 Tomar Foto</button>
                </div>
                <img id="previewFotoHorarios" class="photo-preview" alt="Vista previa de la foto de horarios">
            </div>
        </div>

        <!-- SECCIÓN 1: DATOS DEL PACIENTE -->
        <div class="form-section">
            <h3>📋 DATOS DEL PACIENTE</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="nombre_paciente">Nombre Completo *</label>
                    <div class="field-with-mic">
                        <input type="text" id="nombre_paciente" name="nombre_paciente" required>
                        <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'nombre_paciente')">🎤</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="rut_paciente">RUT</label>
                    <div class="field-with-mic">
                        <input type="text" id="rut_paciente" name="rut_paciente" placeholder="12.345.678-9">
                        <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'rut_paciente')">🎤</button>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="fecha_nacimiento">Fecha de Nacimiento</label>
                    <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" onchange="calcularEdad()">
                </div>
                <div class="form-group">
                    <label for="edad_paciente">Edad</label>
                    <div class="field-with-mic">
                        <input type="number" id="edad_paciente" name="edad_paciente" min="0" max="120">
                        <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'edad_paciente')">🎤</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="sexo_paciente">Sexo</label>
                    <div class="field-with-mic">
                        <select id="sexo_paciente" name="sexo_paciente">
                            <option value="">Seleccionar</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="otro">Otro</option>
                        </select>
                        <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'sexo_paciente')">🎤</button>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="comuna_paciente">Comuna *</label>
                    <select id="comuna_paciente" name="comuna_paciente" required>
                        <option value="">Seleccionar Comuna</option>
                        <option value="santiago">Santiago</option>
                        <option value="providencia">Providencia</option>
                        <option value="las-condes">Las Condes</option>
                        <option value="nunoa">Ñuñoa</option>
                        <option value="maipu">Maipú</option>
                        <option value="puente-alto">Puente Alto</option>
                        <option value="la-florida">La Florida</option>
                        <option value="san-bernardo">San Bernardo</option>
                        <option value="penalolen">Peñalolén</option>
                        <option value="la-reina">La Reina</option>
                        <option value="macul">Macul</option>
                        <option value="la-cisterna">La Cisterna</option>
                        <option value="el-bosque">El Bosque</option>
                        <option value="san-miguel">San Miguel</option>
                        <option value="la-granja">La Granja</option>
                        <option value="la-pintana">La Pintana</option>
                        <option value="san-joaquin">San Joaquín</option>
                        <option value="recoleta">Recoleta</option>
                        <option value="independencia">Independencia</option>
                        <option value="huechuraba">Huechuraba</option>
                        <option value="quilicura">Quilicura</option>
                        <option value="conchali">Conchalí</option>
                        <option value="renca">Renca</option>
                        <option value="cerro-navia">Cerro Navia</option>
                        <option value="lo-prado">Lo Prado</option>
                        <option value="quinta-normal">Quinta Normal</option>
                        <option value="lo-espejo">Lo Espejo</option>
                        <option value="pedro-aguirre-cerda">Pedro Aguirre Cerda</option>
                        <option value="san-ramon">San Ramón</option>
                        <option value="vitacura">Vitacura</option>
                        <option value="lo-barnechea">Lo Barnechea</option>
                        <option value="colina">Colina</option>
                        <option value="lampa">Lampa</option>
                        <option value="til-til">Til Til</option>
                        <option value="san-jose-de-maipo">San José de Maipo</option>
                        <option value="puente-alto">Puente Alto</option>
                        <option value="san-bernardo">San Bernardo</option>
                        <option value="buin">Buin</option>
                        <option value=" Paine">Paine</option>
                        <option value="calera-de-tango">Calera de Tango</option>
                        <option value="pirque">Pirque</option>
                        <option value="san-bernardo">San Bernardo</option>
                        <option value="melipilla">Melipilla</option>
                        <option value="maria-pinto">María Pinto</option>
                        <option value="curacavi">Curacaví</option>
                        <option value="alhue">Alhué</option>
                        <option value="talagante">Talagante</option>
                        <option value="el-monte">El Monte</option>
                        <option value="isla-de-maipo">Isla de Maipo</option>
                        <option value="padre-hurtado">Padre Hurtado</option>
                        <option value="penaflor">Peñaflor</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="direccion_paciente">Dirección</label>
                    <div class="field-with-mic">
                        <input type="text" id="direccion_paciente" name="direccion_paciente">
                        <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'direccion_paciente')">🎤</button>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="telefono_paciente">Teléfono</label>
                    <div class="field-with-mic">
                        <input type="tel" id="telefono_paciente" name="telefono_paciente">
                        <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'telefono_paciente')">🎤</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="prevision_paciente">Previsión de Salud</label>
                    <div class="field-with-mic">
                        <select id="prevision_paciente" name="prevision_paciente">
                            <option value="">Seleccionar</option>
                            <option value="fonasa">FONASA</option>
                            <option value="isapre">ISAPRE</option>
                            <option value="particular">Particular</option>
                            <option value="otro">Otro</option>
                        </select>
                        <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'prevision_paciente')">🎤</button>
                    </div>
                </div>
            </div>

            <!-- MOTIVO DEL TRASLADO -->
            <div class="form-row">
                <div class="form-group" style="flex: 1 0 100%;">
                    <label for="motivo_traslado">Motivo del Traslado *</label>
                    <div class="field-with-mic">
                        <textarea id="motivo_traslado" name="motivo_traslado" rows="3" required placeholder="Ej: Paciente se traslada por posible infarto agudo al miocardio con dolor torácico de 2 horas de evolución..."></textarea>
                        <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'motivo_traslado')">🎤</button>
                    </div>
                </div>
            </div>
            
            <!-- FOTO PARA DATOS DEL PACIENTE -->
            <div class="photo-section">
                <label>📷 FOTO DEL PACIENTE</label>
                <div class="photo-actions">
                    <input type="file" id="foto_paciente" accept="image/*" style="display: none;" onchange="previewPhoto(this, 'previewFotoPaciente')">
                    <button type="button" class="section-photo-btn" onclick="document.getElementById('foto_paciente').click()">📁 Seleccionar Foto</button>
                    <button type="button" class="section-photo-btn" onclick="tomarFoto('foto_paciente', 'previewFotoPaciente')">📸 Tomar Foto</button>
                </div>
                <img id="previewFotoPaciente" class="photo-preview" alt="Vista previa de la foto del paciente">
            </div>
        </div>

        <!-- SECCIÓN 2: ESTADO DE CONCIENCIA - CORREGIDA -->
        <div class="form-section conciencia-section">
            <h3>🧠 ESTADO DE CONCIENCIA</h3>
            
            <div class="form-row">
                <div class="form-group">
                    <label><b>Estado de Conciencia</b></label>
                    <div class="radio-group">
                        <label class="option-label">
                            <input type="radio" name="estado_conciencia" value="consciente" checked onchange="toggleEstadoConciencia(true)">
                            Consciente
                        </label>
                        <label class="option-label">
                            <input type="radio" name="estado_conciencia" value="inconsciente" onchange="toggleEstadoConciencia(false)">
                            Inconsciente
                        </label>
                    </div>
                </div>
            </div>

            <div id="detalles_conciencia" style="margin-top:12px;">
                <div class="form-row">
                    <div class="form-group">
                        <label for="nivel_respuesta">Nivel de Respuesta</label>
                        <select id="nivel_respuesta" name="nivel_respuesta">
                            <option value="">Seleccionar</option>
                            <option value="alerta">Alerta y orientado</option>
                            <option value="verbales">Responde a órdenes verbales</option>
                            <option value="dolor">Responde al dolor</option>
                            <option value="ninguna">Sin respuesta</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="tiempo_inconsciencia">Tiempo de Inconsciencia (si aplica)</label>
                        <input type="text" id="tiempo_inconsciencia" name="tiempo_inconsciencia" placeholder="Ej: 5 minutos">
                    </div>
                </div>

                <!-- ESCALA DE GLASGOW -->
                <div class="escala-evaluacion">
                    <h4>📊 ESCALA DE GLASGOW</h4>
                    <div class="escala-item">
                        <span>Apertura Ocular</span>
                        <select class="escala-puntaje">
                            <option value="4">4 - Espontánea</option>
                            <option value="3">3 - Al estímulo verbal</option>
                            <option value="2">2 - Al dolor</option>
                            <option value="1">1 - No abre</option>
                        </select>
                    </div>
                    <div class="escala-item">
                        <span>Respuesta Motora</span>
                        <select class="escala-puntaje">
                            <option value="6">6 - Obedece órdenes</option>
                            <option value="5">5 - Localiza dolor</option>
                            <option value="4">4 - Retira al dolor</option>
                            <option value="3">3 - Flexión anormal</option>
                            <option value="2">2 - Extensión anormal</option>
                            <option value="1">1 - Sin respuesta</option>
                        </select>
                    </div>
                    <div class="escala-item">
                        <span>Respuesta Verbal</span>
                        <select class="escala-puntaje">
                            <option value="5">5 - Orientado</option>
                            <option value="4">4 - Conversación confusa</option>
                            <option value="3">3 - Palabras inapropiadas</option>
                            <option value="2">2 - Sonidos incomprensibles</option>
                            <option value="1">1 - Sin respuesta</option>
                        </select>
                    </div>
                    <div class="escala-item" style="background: rgba(0, 212, 255, 0.2);">
                        <span><strong>TOTAL GLASGOW</strong></span>
                        <span class="escala-puntaje" id="total-glasgow">15</span>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group" style="flex: 1 0 100%;">
                        <label for="observaciones_conciencia">Observaciones sobre el estado de conciencia:</label>
                        <div class="field-with-mic">
                            <textarea id="observaciones_conciencia" name="observaciones_conciencia" rows="2" placeholder="Describa el estado de conciencia del paciente..."></textarea>
                            <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'observaciones_conciencia')">🎤</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- FOTO PARA ESTADO DE CONCIENCIA -->
            <div class="photo-section">
                <label>📷 FOTO DEL ESTADO DE CONCIENCIA</label>
                <div class="photo-actions">
                    <input type="file" id="foto_conciencia" accept="image/*" style="display: none;" onchange="previewPhoto(this, 'previewFotoConciencia')">
                    <button type="button" class="section-photo-btn" onclick="document.getElementById('foto_conciencia').click()">📁 Seleccionar Foto</button>
                    <button type="button" class="section-photo-btn" onclick="tomarFoto('foto_conciencia', 'previewFotoConciencia')">📸 Tomar Foto</button>
                </div>
                <img id="previewFotoConciencia" class="photo-preview" alt="Vista previa de la foto del estado de conciencia">
            </div>
        </div>

        <!-- NUEVA SECCIÓN: PACIENTE POSTRADO -->
        <div class="form-section postrado-section">
            <h3>🛌 PACIENTE POSTRADO</h3>
            
            <div class="form-row">
                <div class="form-group">
                    <label><b>¿Paciente postrado?</b></label>
                    <div class="radio-group">
                        <label class="option-label">
                            <input type="radio" name="paciente_postrado" value="No" checked onchange="togglePostrado(false)">
                            No
                        </label>
                        <label class="option-label">
                            <input type="radio" name="paciente_postrado" value="Sí" onchange="togglePostrado(true)">
                            Sí
                        </label>
                    </div>
                </div>
            </div>

            <div id="detalles_postrado" style="display:none; margin-top:12px;">
                <h4>Condiciones de Postración:</h4>
                <div class="postrado-options">
                    <label class="option-label">
                        <input type="checkbox" name="condicion_postrado" value="ulcera_sacra">
                        🩹 Úlcera sacra
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="condicion_postrado" value="ulcera_decubito">
                        🩹 Úlcera por decúbito
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="condicion_postrado" value="contracturas">
                        🦵 Contracturas
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="condicion_postrado" value="escaras">
                        🩹 Escaras
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="condicion_postrado" value="infeccion_piel">
                        🦠 Infección piel
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="condicion_postrado" value="desnutricion">
                        🍽️ Desnutrición
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="condicion_postrado" value="sonda_vesical">
                        💧 Sonda vesical
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="condicion_postrado" value="sonda_nasogastrica">
                        🫁 Sonda nasogástrica
                    </label>
                </div>

                <div class="form-row" style="margin-top: 12px;">
                    <div class="form-group" style="flex: 1 0 100%;">
                        <label for="observaciones_postrado">Observaciones del estado postrado:</label>
                        <div class="field-with-mic">
                            <textarea id="observaciones_postrado" name="observaciones_postrado" rows="3" placeholder="Describa el estado general, cuidados requeridos, etc..."></textarea>
                            <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'observaciones_postrado')">🎤</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- FOTO PARA PACIENTE POSTRADO -->
            <div class="photo-section">
                <label>📷 FOTO DEL ESTADO POSTRADO</label>
                <div class="photo-actions">
                    <input type="file" id="foto_postrado" accept="image/*" style="display: none;" onchange="previewPhoto(this, 'previewFotoPostrado')">
                    <button type="button" class="section-photo-btn" onclick="document.getElementById('foto_postrado').click()">📁 Seleccionar Foto</button>
                    <button type="button" class="section-photo-btn" onclick="tomarFoto('foto_postrado', 'previewFotoPostrado')">📸 Tomar Foto</button>
                </div>
                <img id="previewFotoPostrado" class="photo-preview" alt="Vista previa de la foto del estado postrado">
            </div>
        </div>

        <!-- SECCIÓN 3: PCR - PARO CARDIORRESPIRATORIO - MEJORADA -->
        <div class="form-section pcr-section">
            <h3>💔 PCR - PARO CARDIORRESPIRATORIO</h3>
            
            <div class="form-row">
                <div class="form-group">
                    <label><b>¿Presenta PCR?</b></label>
                    <div class="radio-group">
                        <label class="option-label">
                            <input type="radio" name="pcr_presente" value="No" checked onchange="togglePCR(false)">
                            No
                        </label>
                        <label class="option-label">
                            <input type="radio" name="pcr_presente" value="Sí" onchange="togglePCR(true)">
                            Sí
                        </label>
                    </div>
                </div>
            </div>

            <div id="detalles_pcr" style="display:none; margin-top:15px;">
                <div class="pcr-alert">
                    <h4>🚨 ALERTA - PARO CARDIORRESPIRATORIO DETECTADO</h4>
                    <p>INICIAR PROTOCOLO DE RCP INMEDIATAMENTE</p>
                </div>

                <!-- PROTOCOLO DE RCP MEJORADO -->
                <div class="protocolo-rcp">
                    <h4>📋 PROTOCOLO DE RCP - ALGORITMO AVANZADO</h4>
                    
                    <div class="paso-rcp">
                        <div class="numero-paso">1</div>
                        <div>
                            <strong>VERIFICAR SEGURIDAD Y RESPUESTA</strong>
                            <p>Evaluar escena segura. Verificar respuesta del paciente.</p>
                        </div>
                    </div>
                    
                    <div class="paso-rcp">
                        <div class="numero-paso">2</div>
                        <div>
                            <strong>LLAMAR AYUDA Y TRAER DEA</strong>
                            <p>Activar sistema de emergencia. Solicitar desfibrilador.</p>
                        </div>
                    </div>
                    
                    <div class="paso-rcp">
                        <div class="numero-paso">3</div>
                        <div>
                            <strong>EVALUAR RESPIRACIÓN</strong>
                            <p>Verificar si respira normalmente. Máximo 10 segundos.</p>
                        </div>
                    </div>
                    
                    <div class="paso-rcp">
                        <div class="numero-paso">4</div>
                        <div>
                            <strong>INICIAR COMPRESIONES TORÁCICAS</strong>
                            <p>30 compresiones : 2 ventilaciones. Frecuencia 100-120/min. Profundidad 5-6 cm.</p>
                        </div>
                    </div>
                    
                    <div class="paso-rcp">
                        <div class="numero-paso">5</div>
                        <div>
                            <strong>ANALIZAR RITMO CON DEA</strong>
                            <p>Colocar parches. Analizar ritmo. No interrumpir RCP más de 10 segundos.</p>
                        </div>
                    </div>
                    
                    <div class="paso-rcp">
                        <div class="numero-paso">6</div>
                        <div>
                            <strong>DESFIBRILAR SI INDICA</strong>
                            <p>Aplicar descarga si ritmo desfibrilable. Reanudar RCP inmediatamente por 2 minutos.</p>
                        </div>
                    </div>

                    <div class="paso-rcp">
                        <div class="numero-paso">7</div>
                        <div>
                            <strong>ACCESO VENOSO Y MEDICAMENTOS</strong>
                            <p>Establecer acceso venoso. Administrar adrenalina cada 3-5 minutos.</p>
                        </div>
                    </div>

                    <div class="paso-rcp">
                        <div class="numero-paso">8</div>
                        <div>
                            <strong>RE-EVALUAR CADA 2 MINUTOS</strong>
                            <p>Verificar ritmo. Rotar reanimadores cada 2 minutos.</p>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="hora_inicio_pcr">Hora de Inicio del PCR</label>
                        <input type="datetime-local" id="hora_inicio_pcr" name="hora_inicio_pcr">
                    </div>
                    <div class="form-group">
                        <label for="ritmo_inicial">Ritmo Inicial</label>
                        <select id="ritmo_inicial" name="ritmo_inicial">
                            <option value="">Seleccionar</option>
                            <option value="fibrilacion">Fibrilación Ventricular</option>
                            <option value="taquicardia">Taquicardia Ventricular sin Pulso</option>
                            <option value="asistolia">Asistolia</option>
                            <option value="actividad_electrica">Actividad Eléctrica sin Pulso</option>
                        </select>
                    </div>
                </div>

                <!-- TEMPORIZADOR DE RCP -->
                <div class="time-display" id="tiempo_rcp">00:00</div>
                <div class="form-row">
                    <button type="button" class="btn btn-danger" onclick="iniciarRCP()">⏱️ Iniciar RCP</button>
                    <button type="button" class="btn btn-warning" onclick="pausarRCP()">⏸️ Pausar RCP</button>
                    <button type="button" class="btn btn-success" onclick="detenerRCP()">⏹️ Finalizar RCP</button>
                </div>

                <!-- FEEDBACK DE COMPRESIONES -->
                <div class="compression-feedback">
                    <div class="feedback-item feedback-good">
                        <div style="font-size: 1.3rem; font-weight: bold;">100-120</div>
                        <div>Compresiones/min</div>
                    </div>
                    <div class="feedback-item feedback-good">
                        <div style="font-size: 1.3rem; font-weight: bold;">5-6 cm</div>
                        <div>Profundidad</div>
                    </div>
                    <div class="feedback-item feedback-bad">
                        <div style="font-size: 1.3rem; font-weight: bold;">&lt;10s</div>
                        <div>Interrupciones</div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="desfibrilaciones">Número de Desfibrilaciones</label>
                        <input type="number" id="desfibrilaciones" name="desfibrilaciones" min="0" value="0">
                    </div>
                    <div class="form-group">
                        <label for="dosis_adrenalina">Dosis de Adrenalina (mg)</label>
                        <input type="number" id="dosis_adrenalina" name="dosis_adrenalina" min="0" step="0.1" value="0">
                    </div>
                    <div class="form-group">
                        <label for="acceso_venoso">Acceso Venoso</label>
                        <select id="acceso_venoso" name="acceso_venoso">
                            <option value="">Seleccionar</option>
                            <option value="periferico">Periférico</option>
                            <option value="central">Central</option>
                            <option value="intraoseo">Intraóseo</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group" style="flex: 1 0 100%;">
                        <label for="observaciones_pcr">Observaciones del PCR:</label>
                        <div class="field-with-mic">
                            <textarea id="observaciones_pcr" name="observaciones_pcr" rows="3" placeholder="Describa la evolución del PCR, intervenciones realizadas, respuesta del paciente..."></textarea>
                            <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'observaciones_pcr')">🎤</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- FOTO PARA PCR -->
            <div class="photo-section">
                <label>📷 FOTO DEL PCR / TRAZADO MONITOR</label>
                <div class="photo-actions">
                    <input type="file" id="foto_pcr" accept="image/*" style="display: none;" onchange="previewPhoto(this, 'previewFotoPCR')">
                    <button type="button" class="section-photo-btn" onclick="document.getElementById('foto_pcr').click()">📁 Seleccionar Foto</button>
                    <button type="button" class="section-photo-btn" onclick="tomarFoto('foto_pcr', 'previewFotoPCR')">📸 Tomar Foto</button>
                </div>
                <img id="previewFotoPCR" class="photo-preview" alt="Vista previa de la foto del PCR">
            </div>
        </div>

        <!-- SECCIÓN 4: SIGNOS VITALES MODERNOS -->
        <div class="form-section">
            <h3>📊 SIGNOS VITALES - MONITOREO EN TIEMPO REAL</h3>
            
            <div class="vital-signs-container">
                <!-- PRESIÓN ARTERIAL -->
                <div class="vital-card">
                    <div class="vital-header">
                        <div class="vital-title">🩸 Presión Arterial</div>
                        <div class="hora-automatica" id="horaPA">--:--</div>
                    </div>
                    <div class="vital-value" id="valorPA">--/--</div>
                    <div class="vital-range">Normal: 120/80 mmHg</div>
                    <input type="text" class="vital-input" id="presion_arterial" placeholder="120/80" onchange="actualizarSignoVital('PA', this.value)">
                    <button type="button" class="btn btn-info" style="width:100%; margin-top:8px;" onclick="actualizarHora('PA')">🕐 Actualizar Hora</button>
                </div>

                <!-- FRECUENCIA CARDÍACA -->
                <div class="vital-card">
                    <div class="vital-header">
                        <div class="vital-title">💓 Frecuencia Cardíaca</div>
                        <div class="hora-automatica" id="horaFC">--:--</div>
                    </div>
                    <div class="vital-value" id="valorFC">--</div>
                    <div class="vital-range">Normal: 60-100 lpm</div>
                    <input type="number" class="vital-input" id="frecuencia_cardiaca" placeholder="80" onchange="actualizarSignoVital('FC', this.value)">
                    <button type="button" class="btn btn-info" style="width:100%; margin-top:8px;" onclick="actualizarHora('FC')">🕐 Actualizar Hora</button>
                </div>

                <!-- SATURACIÓN DE OXÍGENO -->
                <div class="vital-card">
                    <div class="vital-header">
                        <div class="vital-title">💨 Saturación O₂</div>
                        <div class="hora-automatica" id="horaSpO2">--:--</div>
                    </div>
                    <div class="vital-value" id="valorSpO2">--%</div>
                    <div class="vital-range">Normal: 95-100%</div>
                    <input type="number" class="vital-input" id="saturacion_oxigeno" placeholder="98" min="0" max="100" onchange="actualizarSignoVital('SpO2', this.value)">
                    <button type="button" class="btn btn-info" style="width:100%; margin-top:8px;" onclick="actualizarHora('SpO2')">🕐 Actualizar Hora</button>
                </div>

                <!-- FRECUENCIA RESPIRATORIA -->
                <div class="vital-card">
                    <div class="vital-header">
                        <div class="vital-title">🌬️ Frecuencia Respiratoria</div>
                        <div class="hora-automatica" id="horaFR">--:--</div>
                    </div>
                    <div class="vital-value" id="valorFR">--</div>
                    <div class="vital-range">Normal: 12-20 rpm</div>
                    <input type="number" class="vital-input" id="frecuencia_respiratoria" placeholder="16" onchange="actualizarSignoVital('FR', this.value)">
                    <button type="button" class="btn btn-info" style="width:100%; margin-top:8px;" onclick="actualizarHora('FR')">🕐 Actualizar Hora</button>
                </div>

                <!-- TEMPERATURA -->
                <div class="vital-card">
                    <div class="vital-header">
                        <div class="vital-title">🌡️ Temperatura</div>
                        <div class="hora-automatica" id="horaTemp">--:--</div>
                    </div>
                    <div class="vital-value" id="valorTemp">--°C</div>
                    <div class="vital-range">Normal: 36.5-37.5°C</div>
                    <input type="number" class="vital-input" id="temperatura" placeholder="36.5" step="0.1" onchange="actualizarSignoVital('Temp', this.value)">
                    <button type="button" class="btn btn-info" style="width:100%; margin-top:8px;" onclick="actualizarHora('Temp')">🕐 Actualizar Hora</button>
                </div>

                <!-- GLICEMIA -->
                <div class="vital-card">
                    <div class="vital-header">
                        <div class="vital-title">🩸 Glicemia</div>
                        <div class="hora-automatica" id="horaGlic">--:--</div>
                    </div>
                    <div class="vital-value" id="valorGlic">-- mg/dL</div>
                    <div class="vital-range">Normal: 70-110 mg/dL</div>
                    <input type="number" class="vital-input" id="glicemia" placeholder="100" onchange="actualizarSignoVital('Glic', this.value)">
                    <button type="button" class="btn btn-info" style="width:100%; margin-top:8px;" onclick="actualizarHora('Glic')">🕐 Actualizar Hora</button>
                </div>
            </div>
            
            <!-- FOTO PARA SIGNOS VITALES -->
            <div class="photo-section">
                <label>📷 FOTO DE MONITOREO / SIGNOS VITALES</label>
                <div class="photo-actions">
                    <input type="file" id="foto_signos_vitales" accept="image/*" style="display: none;" onchange="previewPhoto(this, 'previewFotoSignosVitales')">
                    <button type="button" class="section-photo-btn" onclick="document.getElementById('foto_signos_vitales').click()">📁 Seleccionar Foto</button>
                    <button type="button" class="section-photo-btn" onclick="tomarFoto('foto_signos_vitales', 'previewFotoSignosVitales')">📸 Tomar Foto</button>
                </div>
                <img id="previewFotoSignosVitales" class="photo-preview" alt="Vista previa de la foto de signos vitales">
            </div>
        </div>

        <!-- SECCIÓN 5: ANTECEDENTES MÓRBIDOS - MEJORADA -->
        <div class="form-section">
            <h3>🫀 ANTECEDENTES MÓRBIDOS</h3>
            
            <div class="form-row">
                <div class="form-group">
                    <label><b>¿Presenta antecedentes mórbidos?</b></label>
                    <div class="radio-group">
                        <label class="option-label">
                            <input type="radio" name="antecedentes_morbidos" value="No" checked onchange="toggleAntecedentesMorbidos(false)">
                            No
                        </label>
                        <label class="option-label">
                            <input type="radio" name="antecedentes_morbidos" value="Sí" onchange="toggleAntecedentesMorbidos(true)">
                            Sí
                        </label>
                    </div>
                </div>
            </div>

            <div id="detalles_antecedentes" style="display:none; margin-top:12px;">
                <h4>Antecedentes Coronarios y Cardiológicos:</h4>
                <div class="coronarios-grid">
                    <label class="option-label">
                        <input type="checkbox" name="antecedente_coronario" value="insuficiencia">
                        ❤️ Insuficiencia Cardíaca
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="antecedente_coronario" value="infarto">
                        💔 Infarto Agudo al Miocardio
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="antecedente_coronario" value="arritmia">
                        📊 Arritmias
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="antecedente_coronario" value="valvular">
                        🫀 Enfermedad Valvular
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="antecedente_coronario" value="hipertension">
                        🩸 Hipertensión Arterial
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="antecedente_coronario" value="diabetes">
                        🍬 Diabetes Mellitus
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="antecedente_coronario" value="dislipidemia">
                        🧪 Dislipidemia
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="antecedente_coronario" value="tabaquismo">
                        🚬 Tabaquismo
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="antecedente_coronario" value="epoc">
                        🫁 EPOC
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="antecedente_coronario" value="asma">
                        🌬️ Asma
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="antecedente_coronario" value="irc">
                        🫁 IRC
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="antecedente_coronario" value="acv">
                        🧠 ACV Previo
                    </label>
                </div>

                <div class="form-row" style="margin-top: 12px;">
                    <div class="form-group" style="flex: 1 0 100%;">
                        <label for="otros_antecedentes">Otros Antecedentes Mórbidos:</label>
                        <div class="field-with-mic">
                            <textarea id="otros_antecedentes" name="otros_antecedentes" rows="3" placeholder="Describa otros antecedentes relevantes..."></textarea>
                            <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'otros_antecedentes')">🎤</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- FOTO PARA ANTECEDENTES MÓRBIDOS -->
            <div class="photo-section">
                <label>📷 FOTO RELACIONADA CON ANTECEDENTES</label>
                <div class="photo-actions">
                    <input type="file" id="foto_antecedentes" accept="image/*" style="display: none;" onchange="previewPhoto(this, 'previewFotoAntecedentes')">
                    <button type="button" class="section-photo-btn" onclick="document.getElementById('foto_antecedentes').click()">📁 Seleccionar Foto</button>
                    <button type="button" class="section-photo-btn" onclick="tomarFoto('foto_antecedentes', 'previewFotoAntecedentes')">📸 Tomar Foto</button>
                </div>
                <img id="previewFotoAntecedentes" class="photo-preview" alt="Vista previa de la foto de antecedentes">
            </div>
        </div>

        <!-- SECCIÓN 6: ALERGIAS A MEDICAMENTOS - CORREGIDA -->
        <div class="form-section alergias-section">
            <h3>⚠️ ALERGIAS A MEDICAMENTOS</h3>
            
            <div class="form-row">
                <div class="form-group">
                    <label><b>¿Presenta alergias a medicamentos?</b></label>
                    <div class="radio-group">
                        <label class="option-label">
                            <input type="radio" name="alergias_medicamentos" value="No" checked onchange="toggleAlergias(false)">
                            No
                        </label>
                        <label class="option-label">
                            <input type="radio" name="alergias_medicamentos" value="Sí" onchange="toggleAlergias(true)">
                            Sí
                        </label>
                    </div>
                </div>
            </div>

            <div id="detalles_alergias" style="display:none; margin-top:12px;">
                <h4>Medicamentos a los que es alérgico:</h4>
                <div class="alergias-grid">
                    <label class="option-label">
                        <input type="checkbox" name="alergia_medicamento" value="penicilina">
                        💊 Penicilina
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="alergia_medicamento" value="aspirina">
                        💊 Aspirina (AAS)
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="alergia_medicamento" value="ibuprofeno">
                        💊 Ibuprofeno
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="alergia_medicamento" value="morfina">
                        💉 Morfina
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="alergia_medicamento" value="codeina">
                        💊 Codeína
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="alergia_medicamento" value="sulfas">
                        💊 Sulfas
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="alergia_medicamento" value="contraste">
                        🧪 Medio de contraste
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="alergia_medicamento" value="otro">
                        ❓ Otro
                    </label>
                </div>
                
                <div class="form-row" style="margin-top: 12px;">
                    <div class="form-group" style="flex: 1 0 100%;">
                        <label for="otras_alergias">Otras alergias (especificar):</label>
                        <div class="field-with-mic">
                            <textarea id="otras_alergias" name="otras_alergias" rows="2" placeholder="Describa otras alergias conocidas..."></textarea>
                            <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'otras_alergias')">🎤</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- FOTO PARA ALERGIAS -->
            <div class="photo-section">
                <label>📷 FOTO RELACIONADA CON ALERGIAS</label>
                <div class="photo-actions">
                    <input type="file" id="foto_alergias" accept="image/*" style="display: none;" onchange="previewPhoto(this, 'previewFotoAlergias')">
                    <button type="button" class="section-photo-btn" onclick="document.getElementById('foto_alergias').click()">📁 Seleccionar Foto</button>
                    <button type="button" class="section-photo-btn" onclick="tomarFoto('foto_alergias', 'previewFotoAlergias')">📸 Tomar Foto</button>
                </div>
                <img id="previewFotoAlergias" class="photo-preview" alt="Vista previa de la foto de alergias">
            </div>
        </div>

        <!-- SECCIÓN 7: COMPLEJIDAD DEL PACIENTE - MEJORADA -->
        <div class="form-section complejidad-section">
            <h3>🚨 COMPLEJIDAD DEL PACIENTE</h3>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="nivel_criticidad">Nivel de Criticidad</label>
                    <select id="nivel_criticidad" name="nivel_criticidad">
                        <option value="">Seleccionar</option>
                        <option value="estable">🟢 Estable</option>
                        <option value="inestable">🟡 Inestable</option>
                        <option value="critico">🔴 Crítico</option>
                        <option value="inminente">⚫ Riesgo Vital Inminente</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="nivel_dependencia">Nivel de Dependencia</label>
                    <select id="nivel_dependencia" name="nivel_dependencia">
                        <option value="">Seleccionar</option>
                        <option value="autonomo">🟢 Autónomo</option>
                        <option value="asistido">🟡 Asistido</option>
                        <option value="dependiente">🔴 Dependiente</option>
                        <option value="dependiente_total">⚫ Dependiente Total</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="riesgo_vital">Riesgo Vital</label>
                    <select id="riesgo_vital" name="riesgo_vital">
                        <option value="">Seleccionar</option>
                        <option value="bajo">🟢 Bajo</option>
                        <option value="medio">🟡 Medio</option>
                        <option value="alto">🔴 Alto</option>
                        <option value="inminente">⚫ Inminente</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="escala_emerger">Escala EMERGEr</label>
                    <select id="escala_emerger" name="escala_emerger">
                        <option value="">Seleccionar</option>
                        <option value="1">1 - Mínima</option>
                        <option value="2">2 - Baja</option>
                        <option value="3">3 - Moderada</option>
                        <option value="4">4 - Alta</option>
                        <option value="5">5 - Máxima</option>
                    </select>
                </div>
            </div>
            
            <!-- FOTO PARA COMPLEJIDAD -->
            <div class="photo-section">
                <label>📷 FOTO RELACIONADA CON COMPLEJIDAD</label>
                <div class="photo-actions">
                    <input type="file" id="foto_complejidad" accept="image/*" style="display: none;" onchange="previewPhoto(this, 'previewFotoComplejidad')">
                    <button type="button" class="section-photo-btn" onclick="document.getElementById('foto_complejidad').click()">📁 Seleccionar Foto</button>
                    <button type="button" class="section-photo-btn" onclick="tomarFoto('foto_complejidad', 'previewFotoComplejidad')">📸 Tomar Foto</button>
                </div>
                <img id="previewFotoComplejidad" class="photo-preview" alt="Vista previa de la foto de complejidad">
            </div>
        </div>

        <!-- SECCIÓN 8: VENTILACIÓN MECÁNICA - MEJORADA -->
        <div class="form-section ventilacion-section">
            <h3>💨 VENTILACIÓN MECÁNICA</h3>
            
            <div class="form-row">
                <div class="form-group">
                    <label><b>¿Requiere ventilación mecánica?</b></label>
                    <div class="radio-group">
                        <label class="option-label">
                            <input type="radio" name="ventilacion_mecanica" value="No" checked onchange="toggleVentilacion(false)">
                            No
                        </label>
                        <label class="option-label">
                            <input type="radio" name="ventilacion_mecanica" value="Sí" onchange="toggleVentilacion(true)">
                            Sí
                        </label>
                    </div>
                </div>
            </div>

            <div id="detalles_ventilacion" style="display:none; margin-top:12px;">
                <h4>Parámetros de Ventilación Mecánica:</h4>
                <div class="ventilacion-grid">
                    <div class="form-group">
                        <label for="modalidad_ventilacion">Modalidad</label>
                        <select id="modalidad_ventilacion" name="modalidad_ventilacion">
                            <option value="">Seleccionar</option>
                            <option value="vcv">VCV (Volumen Controlado)</option>
                            <option value="pcv">PCV (Presión Controlada)</option>
                            <option value="simv">SIMV</option>
                            <option value="psv">PSV (Presión de Soporte)</option>
                            <option value="cpap">CPAP</option>
                            <option value="bipap">BiPAP</option>
                            <option value="aprv">APRV</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="volumen_tidal">Volumen Tidal (mL)</label>
                        <input type="number" id="volumen_tidal" name="volumen_tidal" placeholder="Ej: 450">
                    </div>
                    <div class="form-group">
                        <label for="frecuencia_respiratoria_vm">Frecuencia Resp. (rpm)</label>
                        <input type="number" id="frecuencia_respiratoria_vm" name="frecuencia_respiratoria_vm" placeholder="Ej: 14">
                    </div>
                    <div class="form-group">
                        <label for="fio2_vm">FiO₂ (%)</label>
                        <input type="number" id="fio2_vm" name="fio2_vm" min="21" max="100" placeholder="Ej: 40">
                    </div>
                    <div class="form-group">
                        <label for="peep">PEEP (cmH₂O)</label>
                        <input type="number" id="peep" name="peep" placeholder="Ej: 5">
                    </div>
                    <div class="form-group">
                        <label for="presion_pico">Presión Pico (cmH₂O)</label>
                        <input type="number" id="presion_pico" name="presion_pico" placeholder="Ej: 25">
                    </div>
                    <div class="form-group">
                        <label for="presion_meseta">Presión Meseta (cmH₂O)</label>
                        <input type="number" id="presion_meseta" name="presion_meseta" placeholder="Ej: 20">
                    </div>
                    <div class="form-group">
                        <label for="complianza">Complianza (mL/cmH₂O)</label>
                        <input type="number" id="complianza" name="complianza" placeholder="Ej: 50">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group" style="flex: 1 0 100%;">
                        <label for="observaciones_ventilacion">Observaciones de Ventilación:</label>
                        <div class="field-with-mic">
                            <textarea id="observaciones_ventilacion" name="observaciones_ventilacion" rows="3" placeholder="Describa respuesta del paciente, ajustes realizados, etc..."></textarea>
                            <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'observaciones_ventilacion')">🎤</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- FOTO PARA VENTILACIÓN -->
            <div class="photo-section">
                <label>📷 FOTO DE VENTILACIÓN MECÁNICA</label>
                <div class="photo-actions">
                    <input type="file" id="foto_ventilacion" accept="image/*" style="display: none;" onchange="previewPhoto(this, 'previewFotoVentilacion')">
                    <button type="button" class="section-photo-btn" onclick="document.getElementById('foto_ventilacion').click()">📁 Seleccionar Foto</button>
                    <button type="button" class="section-photo-btn" onclick="tomarFoto('foto_ventilacion', 'previewFotoVentilacion')">📸 Tomar Foto</button>
                </div>
                <img id="previewFotoVentilacion" class="photo-preview" alt="Vista previa de la foto de ventilación">
            </div>
        </div>

        <!-- SECCIÓN 9: TRAUMA Y LESIONES - MEJORADA -->
        <div class="form-section trauma-section">
            <h3>🩹 TRAUMA Y LESIONES</h3>
            
            <div class="form-row">
                <div class="form-group">
                    <label><b>¿Presenta lesiones traumáticas?</b></label>
                    <div class="radio-group">
                        <label class="option-label">
                            <input type="radio" name="lesiones_traumaticas" value="No" checked onchange="toggleTrauma(false)">
                            No
                        </label>
                        <label class="option-label">
                            <input type="radio" name="lesiones_traumaticas" value="Sí" onchange="toggleTrauma(true)">
                            Sí
                        </label>
                    </div>
                </div>
            </div>

            <div id="detalles_trauma" style="display:none; margin-top:12px;">
                <h4>Localización de las Lesiones:</h4>
                <div class="trauma-options">
                    <label class="option-label">
                        <input type="checkbox" name="trauma_localizacion" value="craneo">
                        🧠 Cráneo/Cabeza
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="trauma_localizacion" value="cara">
                        😷 Cara
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="trauma_localizacion" value="cuello">
                        👔 Cuello
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="trauma_localizacion" value="torax">
                        🫁 Tórax
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="trauma_localizacion" value="abdomen">
                        🩺 Abdomen
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="trauma_localizacion" value="pelvis">
                        🦴 Pelvis
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="trauma_localizacion" value="extremidad_superior">
                        💪 Extremidad Superior
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="trauma_localizacion" value="extremidad_inferior">
                        🦵 Extremidad Inferior
                    </label>
                    <label class="option-label">
                        <input type="checkbox" name="trauma_localizacion" value="columna">
                        🦴 Columna Vertebral
                    </label>
                </div>

                <!-- ESCALA DE TRAUMA -->
                <div class="escala-evaluacion">
                    <h4>📊 ESCALA DE GRAVEDAD DE TRAUMA</h4>
                    <div class="escala-item">
                        <span>Escala de Coma de Glasgow</span>
                        <span class="escala-puntaje" id="trauma-glasgow">15</span>
                    </div>
                    <div class="escala-item">
                        <span>Presión Arterial Sistólica</span>
                        <input type="number" class="vital-input" style="width: 80px; text-align: center;" placeholder="120">
                    </div>
                    <div class="escala-item">
                        <span>Frecuencia Respiratoria</span>
                        <input type="number" class="vital-input" style="width: 80px; text-align: center;" placeholder="16">
                    </div>
                </div>
                
                <div class="form-row" style="margin-top: 12px;">
                    <div class="form-group" style="flex: 1 0 100%;">
                        <label for="descripcion_trauma">Descripción detallada de las lesiones:</label>
                        <div class="field-with-mic">
                            <textarea id="descripcion_trauma" name="descripcion_trauma" rows="3" placeholder="Describa el mecanismo de lesión, tipo de heridas, fracturas, etc..."></textarea>
                            <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'descripcion_trauma')">🎤</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- FOTO PARA TRAUMA -->
            <div class="photo-section">
                <label>📷 FOTO DE LESIONES/TRAUMA</label>
                <div class="photo-actions">
                    <input type="file" id="foto_trauma" accept="image/*" style="display: none;" onchange="previewPhoto(this, 'previewFotoTrauma')">
                    <button type="button" class="section-photo-btn" onclick="document.getElementById('foto_trauma').click()">📁 Seleccionar Foto</button>
                    <button type="button" class="section-photo-btn" onclick="tomarFoto('foto_trauma', 'previewFotoTrauma')">📸 Tomar Foto</button>
                </div>
                <img id="previewFotoTrauma" class="photo-preview" alt="Vista previa de la foto de trauma">
            </div>
        </div>

        <!-- NUEVA SECCIÓN: ENTREGA DE PACIENTE - MEJORADA -->
        <div class="form-section entrega-paciente">
            <h3>🏥 ENTREGA DE PACIENTE</h3>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="hospital_destino">Hospital de Destino *</label>
                    <input type="text" id="hospital_destino" name="hospital_destino" placeholder="Nombre del hospital" required>
                </div>
                <div class="form-group">
                    <label for="medico_receptor">Médico Receptor *</label>
                    <input type="text" id="medico_receptor" name="medico_receptor" placeholder="Nombre del médico receptor" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="especialidad_receptor">Especialidad Receptor</label>
                    <select id="especialidad_receptor" name="especialidad_receptor">
                        <option value="">Seleccionar</option>
                        <option value="medicina_emergencia">Medicina de Emergencia</option>
                        <option value="cardiologia">Cardiología</option>
                        <option value="neumologia">Neumología</option>
                        <option value="neurologia">Neurología</option>
                        <option value="traumatologia">Traumatología</option>
                        <option value="cirugia">Cirugía</option>
                        <option value="uci">UCI</option>
                        <option value="pediatria">Pediatría</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="hora_entrega">Hora de Entrega</label>
                    <input type="datetime-local" id="hora_entrega" name="hora_entrega">
                </div>
            </div>

            <h4>📋 RESUMEN DE ENTREGA (Auto-completado)</h4>
            <div class="datos-entrega">
                <div class="dato-item">
                    <div class="dato-label">Nombre del Paciente</div>
                    <div class="dato-valor" id="resumen_nombre">--</div>
                </div>
                <div class="dato-item">
                    <div class="dato-label">Edad / Sexo</div>
                    <div class="dato-valor" id="resumen_edad_sexo">--</div>
                </div>
                <div class="dato-item">
                    <div class="dato-label">Antecedentes Mórbidos</div>
                    <div class="dato-valor" id="resumen_antecedentes">--</div>
                </div>
                <div class="dato-item">
                    <div class="dato-label">Alergias</div>
                    <div class="dato-valor" id="resumen_alergias">--</div>
                </div>
                <div class="dato-item">
                    <div class="dato-label">Signos Vitales</div>
                    <div class="dato-valor" id="resumen_signos_vitales">--</div>
                </div>
                <div class="dato-item">
                    <div class="dato-label">Motivo Traslado</div>
                    <div class="dato-valor" id="resumen_motivo">--</div>
                </div>
                <div class="dato-item">
                    <div class="dato-label">Intervenciones Realizadas</div>
                    <div class="dato-valor" id="resumen_intervenciones">--</div>
                </div>
                <div class="dato-item">
                    <div class="dato-label">Medicamentos Administrados</div>
                    <div class="dato-valor" id="resumen_medicamentos">--</div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group" style="flex: 1 0 100%;">
                    <label for="observaciones_entrega">Observaciones de Entrega:</label>
                    <div class="field-with-mic">
                        <textarea id="observaciones_entrega" name="observaciones_entrega" rows="3" placeholder="Observaciones adicionales para la entrega..."></textarea>
                        <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'observaciones_entrega')">🎤</button>
                    </div>
                </div>
            </div>

            <button type="button" class="btn btn-success" onclick="actualizarResumenEntrega()">🔄 Actualizar Resumen</button>
        </div>

        <!-- NUEVA SECCIÓN: AUTORIZACIONES Y CONSENTIMIENTOS -->
        <div class="form-section">
            <h3>📝 AUTORIZACIONES Y CONSENTIMIENTOS</h3>
            
            <div class="autorizaciones-grid">
                <div class="autorizacion-card">
                    <h4>✅ CONSENTIMIENTO PARA TRASLADO</h4>
                    <div class="form-group">
                        <label for="nombre_familiar">Nombre del Familiar/Acompañante</label>
                        <input type="text" id="nombre_familiar" name="nombre_familiar" placeholder="Nombre completo">
                    </div>
                    <div class="form-group">
                        <label for="rut_familiar">RUT del Familiar</label>
                        <input type="text" id="rut_familiar" name="rut_familiar" placeholder="12.345.678-9">
                    </div>
                    <div class="form-group">
                        <label for="parentesco">Parentesco</label>
                        <input type="text" id="parentesco" name="parentesco" placeholder="Ej: Esposo/a, Hijo/a, etc.">
                    </div>
                    
                    <div class="firma-container">
                        <label>Firma del Familiar/Acompañante</label>
                        <div class="signature-pad">
                            <canvas id="canvasFamiliar"></canvas>
                        </div>
                        <div class="signature-actions">
                            <button type="button" class="btn btn-secondary" onclick="clearSignature('canvasFamiliar')">🗑️ Limpiar</button>
                        </div>
                    </div>
                </div>

                <div class="autorizacion-card">
                    <h4>⚠️ CONSENTIMIENTO PROCEDIMIENTOS INVASIVOS</h4>
                    <div class="checkbox-group">
                        <label class="option-label">
                            <input type="checkbox" name="consentimiento_intubacion" value="si">
                            ✅ Intubación Orotraqueal
                        </label>
                        <label class="option-label">
                            <input type="checkbox" name="consentimiento_acceso_venoso" value="si">
                            ✅ Acceso Venoso Central
                        </label>
                        <label class="option-label">
                            <input type="checkbox" name="consentimiento_toracocentesis" value="si">
                            ✅ Toracocentesis
                        </label>
                        <label class="option-label">
                            <input type="checkbox" name="consentimiento_otro" value="si">
                            ✅ Otros Procedimientos
                        </label>
                    </div>
                    
                    <div class="form-group" style="margin-top: 12px;">
                        <label for="observaciones_consentimiento">Observaciones del Consentimiento:</label>
                        <textarea id="observaciones_consentimiento" name="observaciones_consentimiento" rows="3" placeholder="Especificar procedimientos realizados..."></textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- NUEVA SECCIÓN: RECHAZO DE TRASLADO - CORREGIDA -->
        <div class="form-section" style="background: rgba(255, 170, 0, 0.1); border-left-color: var(--warning);">
            <h3>🚫 RECHAZO DE TRASLADO</h3>
            
            <div class="form-row">
                <div class="form-group">
                    <label><b>¿Paciente/familiar rechaza traslado?</b></label>
                    <div class="radio-group">
                        <label class="option-label">
                            <input type="radio" name="rechazo_traslado" value="No" checked onchange="toggleRechazo(false)">
                            No
                        </label>
                        <label class="option-label">
                            <input type="radio" name="rechazo_traslado" value="Sí" onchange="toggleRechazo(true)">
                            Sí
                        </label>
                    </div>
                </div>
            </div>

            <div id="detalles_rechazo" style="display:none; margin-top:12px;">
                <div class="form-row">
                    <div class="form-group">
                        <label for="motivo_rechazo">Motivo del Rechazo</label>
                        <select id="motivo_rechazo" name="motivo_rechazo">
                            <option value="">Seleccionar</option>
                            <option value="mejoria">Paciente se siente mejor</option>
                            <option value="personal">Razones personales</option>
                            <option value="economico">Razones económicas</option>
                            <option value="religioso">Razones religiosas</option>
                            <option value="desconfianza">Desconfianza en el sistema</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="fecha_rechazo">Fecha y Hora del Rechazo</label>
                        <input type="datetime-local" id="fecha_rechazo" name="fecha_rechazo">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group" style="flex: 1 0 100%;">
                        <label for="observaciones_rechazo">Observaciones del Rechazo:</label>
                        <div class="field-with-mic">
                            <textarea id="observaciones_rechazo" name="observaciones_rechazo" rows="3" placeholder="Describa las circunstancias del rechazo, explicaciones dadas, etc..."></textarea>
                            <button type="button" class="mic-button" onclick="toggleFieldMicrophone(this, 'observaciones_rechazo')">🎤</button>
                        </div>
                    </div>
                </div>

                <div class="firma-container">
                    <label>Firma del Paciente/Familiar por Rechazo</label>
                    <div class="signature-pad">
                        <canvas id="canvasRechazo"></canvas>
                    </div>
                    <div class="signature-actions">
                        <button type="button" class="btn btn-secondary" onclick="clearSignature('canvasRechazo')">🗑️ Limpiar</button>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group" style="flex: 1 0 100%;">
                        <label for="testigos_rechazo">Testigos del Rechazo (nombres y RUTs):</label>
                        <textarea id="testigos_rechazo" name="testigos_rechazo" rows="2" placeholder="Nombres y RUTs del personal como testigos..."></textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECCIÓN 10: FIRMAS DIGITALES - MEJORADA -->
        <div class="form-section">
            <h3>✍️ FIRMAS DIGITALES</h3>
            
            <!-- FIRMA DEL PROFESIONAL -->
            <div class="form-row">
                <div class="form-group" style="flex: 1 0 100%;">
                    <label for="nombre_profesional">Nombre del Profesional *</label>
                    <input type="text" id="nombre_profesional" name="nombre_profesional" placeholder="Nombre y apellido del profesional" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group" style="flex: 1 0 100%;">
                    <label>Firma del Profesional *</label>
                    <div class="signature-pad">
                        <canvas id="canvasProfesional"></canvas>
                    </div>
                    <div class="signature-actions">
                        <button type="button" class="btn btn-secondary" onclick="clearSignature('canvasProfesional')">🗑️ Limpiar</button>
                    </div>
                </div>
            </div>
            
            <!-- FIRMA DEL RECEPTOR -->
            <div class="form-row">
                <div class="form-group" style="flex: 1 0 100%;">
                    <label for="nombre_receptor">Nombre del Receptor *</label>
                    <input type="text" id="nombre_receptor" name="nombre_receptor" placeholder="Nombre y apellido del receptor en destino" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group" style="flex: 1 0 100%;">
                    <label>Firma del Receptor *</label>
                    <div class="signature-pad">
                        <canvas id="canvasReceptor"></canvas>
                    </div>
                    <div class="signature-actions">
                        <button type="button" class="btn btn-secondary" onclick="clearSignature('canvasReceptor')">🗑️ Limpiar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- BOTONES DE ACCIÓN -->
        <div class="form-section" style="text-align: center; margin-top: 30px;">
            <button type="button" class="btn btn-primary" onclick="avanzarFolio()">📄 Nuevo Folio</button>
            <button type="button" class="btn btn-success" onclick="guardarFicha()">💾 Guardar Ficha</button>
            <button type="button" class="btn btn-warning" onclick="generarPDF()">📄 Generar PDF</button>
            <button type="button" class="btn btn-info" onclick="enviarPorCorreo()">📧 Enviar por Correo</button>
            <button type="button" class="btn btn-danger" onclick="limpiarFormulario()">🗑️ Limpiar Todo</button>
        </div>
    </div>

    <!-- MODAL PARA IMÁGENES -->
    <div id="imageModal" class="image-modal">
        <span class="close-modal" onclick="cerrarImagen()">&times;</span>
        <img id="modalImage" src="" alt="Imagen de ayuda">
    </div>

    <script>
        // CONFIGURACIÓN
        const CORREO_DESTINO = 'uciambulancias176@gmail.com';
        const RESEND_API_KEY = 're_bA6bPwtN_FnmrMo7Nru5w6VamikUPtJDk';

        // VARIABLES GLOBALES
        let signaturePadProfesional, signaturePadReceptor, signaturePadFamiliar, signaturePadRechazo;
        let recognition = null;
        let tiempoRCP = null;
        let segundosRCP = 0;
        let intervaloRCP = null;

        // INICIALIZACIÓN
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🚑 Inicializando Ficha Clínica UCI Ambulancias...');
            actualizarFecha();
            inicializarFolio();
            inicializarFirmas();
            inicializarReconocimientoVoz();
            inicializarSignosVitales();
            actualizarResumenEntrega();
            inicializarEscalaGlasgow();
        });

        // =============================================
        // FUNCIONES DE TOGGLE CORREGIDAS
        // =============================================
        function toggleAntecedentesMorbidos(mostrar) {
            const detalles = document.getElementById('detalles_antecedentes');
            if (detalles) {
                detalles.style.display = mostrar ? 'block' : 'none';
            }
        }

        function toggleAlergias(mostrar) {
            const detalles = document.getElementById('detalles_alergias');
            if (detalles) {
                detalles.style.display = mostrar ? 'block' : 'none';
            }
        }

        function toggleVentilacion(mostrar) {
            const detalles = document.getElementById('detalles_ventilacion');
            if (detalles) {
                detalles.style.display = mostrar ? 'block' : 'none';
            }
        }

        function toggleTrauma(mostrar) {
            const detalles = document.getElementById('detalles_trauma');
            if (detalles) {
                detalles.style.display = mostrar ? 'block' : 'none';
            }
        }

        function togglePCR(mostrar) {
            const detalles = document.getElementById('detalles_pcr');
            if (detalles) {
                detalles.style.display = mostrar ? 'block' : 'none';
                if (mostrar) {
                    showNotification('🚨 PROTOCOLO PCR ACTIVADO - Iniciar RCP inmediatamente', 'error');
                    setTimeout(() => {
                        iniciarRCP();
                    }, 1000);
                } else {
                    if (intervaloRCP) {
                        clearInterval(intervaloRCP);
                    }
                }
            }
        }

        function toggleEstadoConciencia(consciente) {
            if (!consciente) {
                showNotification('⚠️ Paciente inconsciente - Evaluar prioridad de atención', 'warning');
            }
        }

        function toggleRechazo(mostrar) {
            const detalles = document.getElementById('detalles_rechazo');
            if (detalles) {
                detalles.style.display = mostrar ? 'block' : 'none';
                if (mostrar) {
                    showNotification('⚠️ REGISTRO DE RECHAZO ACTIVADO - Documentar cuidadosamente', 'warning');
                    document.getElementById('fecha_rechazo').value = new Date().toISOString().slice(0,16);
                }
            }
        }

        function togglePostrado(mostrar) {
            const detalles = document.getElementById('detalles_postrado');
            if (detalles) {
                detalles.style.display = mostrar ? 'block' : 'none';
            }
        }

        // =============================================
        // FUNCIONES DE FIRMAS TÁCTILES - MEJORADAS
        // =============================================
        function inicializarFirmas() {
            console.log('🖊️ Inicializando firmas...');
            
            const config = {
                minWidth: 1,
                maxWidth: 3,
                penColor: "rgb(255, 255, 255)",
                backgroundColor: "rgba(0,0,0,0)",
                throttle: 16,
                velocityFilterWeight: 0.7
            };
            
            // Inicializar todas las firmas
            const firmas = [
                { id: 'canvasProfesional', pad: 'signaturePadProfesional' },
                { id: 'canvasReceptor', pad: 'signaturePadReceptor' },
                { id: 'canvasFamiliar', pad: 'signaturePadFamiliar' },
                { id: 'canvasRechazo', pad: 'signaturePadRechazo' }
            ];
            
            firmas.forEach(firma => {
                const canvas = document.getElementById(firma.id);
                if (canvas) {
                    window[firma.pad] = new SignaturePad(canvas, config);
                    ajustarCanvasParaTouch(canvas, window[firma.pad]);
                }
            });
            
            console.log('✅ Todas las firmas inicializadas correctamente');
        }

        function ajustarCanvasParaTouch(canvas, signaturePad) {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
            
            signaturePad.clear();
            
            window.addEventListener('resize', function() {
                const ratio = Math.max(window.devicePixelRatio || 1, 1);
                canvas.width = canvas.offsetWidth * ratio;
                canvas.height = canvas.offsetHeight * ratio;
                canvas.getContext("2d").scale(ratio, ratio);
                signaturePad.clear();
            });
        }

        function clearSignature(canvasId) {
            let pad;
            switch(canvasId) {
                case 'canvasProfesional': pad = signaturePadProfesional; break;
                case 'canvasReceptor': pad = signaturePadReceptor; break;
                case 'canvasFamiliar': pad = signaturePadFamiliar; break;
                case 'canvasRechazo': pad = signaturePadRechazo; break;
            }
            
            if (pad) {
                pad.clear();
                showNotification('Firma limpiada correctamente', 'success');
            }
        }

        // =============================================
        // FUNCIONES BÁSICAS DEL FORMULARIO
        // =============================================
        function actualizarFecha() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            document.getElementById('currentDate').textContent = 
                now.toLocaleDateString('es-CL', options);
        }

        function inicializarFolio() {
            const saved = localStorage.getItem('uci_ficha_folio');
            if (saved) {
                document.getElementById('folioNumber').textContent = saved;
            } else {
                localStorage.setItem('uci_ficha_folio', 'FC-001');
            }
        }

        function avanzarFolio() {
            const folioActual = document.getElementById('folioNumber').textContent;
            const numero = parseInt(folioActual.split('-')[1]);
            const nuevoFolio = 'FC-' + (numero + 1).toString().padStart(3, '0');
            document.getElementById('folioNumber').textContent = nuevoFolio;
            localStorage.setItem('uci_ficha_folio', nuevoFolio);
            showNotification(`Folio actualizado: ${nuevoFolio}`, 'info');
        }

        // =============================================
        // SISTEMA DE SIGNOS VITALES MODERNO
        // =============================================
        function inicializarSignosVitales() {
            // Inicializar horas automáticamente
            actualizarHora('PA');
            actualizarHora('FC');
            actualizarHora('SpO2');
            actualizarHora('FR');
            actualizarHora('Temp');
            actualizarHora('Glic');
        }

        function actualizarHora(tipo) {
            const now = new Date();
            const hora = now.getHours().toString().padStart(2, '0');
            const minutos = now.getMinutes().toString().padStart(2, '0');
            document.getElementById(`hora${tipo}`).textContent = `${hora}:${minutos}`;
        }

        function actualizarSignoVital(tipo, valor) {
            const elementoValor = document.getElementById(`valor${tipo}`);
            elementoValor.textContent = valor + (tipo === 'SpO2' ? '%' : tipo === 'Temp' ? '°C' : tipo === 'Glic' ? ' mg/dL' : '');
            
            // Validar rangos y aplicar estilos
            validarRangoSignoVital(tipo, valor, elementoValor);
        }

        function validarRangoSignoVital(tipo, valor, elemento) {
            // Remover clases anteriores
            elemento.classList.remove('vital-normal', 'vital-warning', 'vital-danger');
            
            let esNormal = true;
            let mensaje = '';
            
            switch(tipo) {
                case 'PA':
                    const [sistolica, diastolica] = valor.split('/').map(Number);
                    if (sistolica > 140 || diastolica > 90) {
                        elemento.classList.add('vital-warning');
                        esNormal = false;
                        mensaje = 'Presión arterial elevada';
                    } else if (sistolica < 90 || diastolica < 60) {
                        elemento.classList.add('vital-danger');
                        esNormal = false;
                        mensaje = 'Presión arterial baja - HIPOTENSIÓN';
                    } else {
                        elemento.classList.add('vital-normal');
                    }
                    break;
                    
                case 'FC':
                    const fc = parseInt(valor);
                    if (fc > 100) {
                        elemento.classList.add('vital-warning');
                        esNormal = false;
                        mensaje = 'Taquicardia';
                    } else if (fc < 60) {
                        elemento.classList.add('vital-warning');
                        esNormal = false;
                        mensaje = 'Bradicardia';
                    } else if (fc < 40) {
                        elemento.classList.add('vital-danger');
                        esNormal = false;
                        mensaje = 'BRADICARDIA GRAVE';
                    } else {
                        elemento.classList.add('vital-normal');
                    }
                    break;
                    
                case 'SpO2':
                    const spo2 = parseInt(valor);
                    if (spo2 < 95) {
                        elemento.classList.add('vital-warning');
                        esNormal = false;
                        mensaje = 'Hipoxemia leve';
                    } else if (spo2 < 90) {
                        elemento.classList.add('vital-danger');
                        esNormal = false;
                        mensaje = 'HIPOXEMIA GRAVE';
                    } else {
                        elemento.classList.add('vital-normal');
                    }
                    break;
                    
                case 'FR':
                    const fr = parseInt(valor);
                    if (fr > 20) {
                        elemento.classList.add('vital-warning');
                        esNormal = false;
                        mensaje = 'Taquipnea';
                    } else if (fr < 12) {
                        elemento.classList.add('vital-warning');
                        esNormal = false;
                        mensaje = 'Bradipnea';
                    } else if (fr < 8) {
                        elemento.classList.add('vital-danger');
                        esNormal = false;
                        mensaje = 'BRADIPNEA GRAVE';
                    } else {
                        elemento.classList.add('vital-normal');
                    }
                    break;
                    
                case 'Temp':
                    const temp = parseFloat(valor);
                    if (temp > 37.5) {
                        elemento.classList.add('vital-warning');
                        esNormal = false;
                        mensaje = 'Fiebre';
                    } else if (temp < 36.0) {
                        elemento.classList.add('vital-warning');
                        esNormal = false;
                        mensaje = 'Hipotermia';
                    } else if (temp < 35.0) {
                        elemento.classList.add('vital-danger');
                        esNormal = false;
                        mensaje = 'HIPOTERMIA GRAVE';
                    } else {
                        elemento.classList.add('vital-normal');
                    }
                    break;
                    
                case 'Glic':
                    const glic = parseInt(valor);
                    if (glic > 110) {
                        elemento.classList.add('vital-warning');
                        esNormal = false;
                        mensaje = 'Hiperglucemia';
                    } else if (glic < 70) {
                        elemento.classList.add('vital-warning');
                        esNormal = false;
                        mensaje = 'Hipoglucemia';
                    } else if (glic < 50) {
                        elemento.classList.add('vital-danger');
                        esNormal = false;
                        mensaje = 'HIPOGLUCEMIA GRAVE';
                    } else {
                        elemento.classList.add('vital-normal');
                    }
                    break;
            }
            
            if (!esNormal && mensaje) {
                showNotification(`⚠️ ${mensaje} - ${tipo}: ${valor}`, 'warning');
            }
        }

        // =============================================
        // ESCALA DE GLASGOW
        // =============================================
        function inicializarEscalaGlasgow() {
            const selects = document.querySelectorAll('.escala-puntaje');
            selects.forEach(select => {
                select.addEventListener('change', calcularGlasgow);
            });
        }

        function calcularGlasgow() {
            const selects = document.querySelectorAll('.escala-puntaje');
            let total = 0;
            
            selects.forEach(select => {
                if (select.value) {
                    total += parseInt(select.value);
                }
            });
            
            document.getElementById('total-glasgow').textContent = total;
            document.getElementById('trauma-glasgow').textContent = total;
            
            // Clasificar según puntaje
            let clasificacion = '';
            if (total >= 13) clasificacion = 'Leve';
            else if (total >= 9) clasificacion = 'Moderado';
            else clasificacion = 'Grave';
            
            showNotification(`Escala de Glasgow: ${total} (${clasificacion})`, 'info');
        }

        // =============================================
        // SISTEMA DE PCR Y RCP
        // =============================================
        function iniciarRCP() {
            if (intervaloRCP) {
                clearInterval(intervaloRCP);
            }
            
            tiempoRCP = new Date();
            segundosRCP = 0;
            intervaloRCP = setInterval(() => {
                segundosRCP++;
                const minutos = Math.floor(segundosRCP / 60);
                const segundos = segundosRCP % 60;
                document.getElementById('tiempo_rcp').textContent = 
                    `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
                
                // Feedback cada 2 minutos
                if (segundosRCP % 120 === 0) {
                    showNotification('⏰ Revaluar ritmo y considerar desfibrilación', 'warning');
                }
            }, 1000);
            
            showNotification('⏱️ RCP INICIADO - Temporizador activado', 'success');
        }

        function pausarRCP() {
            if (intervaloRCP) {
                clearInterval(intervaloRCP);
                showNotification('⏸️ RCP PAUSADO', 'warning');
            }
        }

        function detenerRCP() {
            if (intervaloRCP) {
                clearInterval(intervaloRCP);
                showNotification('⏹️ RCP FINALIZADO', 'info');
            }
        }

        // =============================================
        // SISTEMA DE ENTREGA DE PACIENTE
        // =============================================
        function actualizarResumenEntrega() {
            // Actualizar nombre
            const nombre = document.getElementById('nombre_paciente').value || 'No especificado';
            document.getElementById('resumen_nombre').textContent = nombre;
            
            // Actualizar edad y sexo
            const edad = document.getElementById('edad_paciente').value || 'No especificada';
            const sexo = document.getElementById('sexo_paciente').value || 'No especificado';
            document.getElementById('resumen_edad_sexo').textContent = `${edad} años / ${sexo}`;
            
            // Actualizar antecedentes
            const antecedentes = obtenerAntecedentesSeleccionados();
            document.getElementById('resumen_antecedentes').textContent = antecedentes || 'No registrados';
            
            // Actualizar alergias
            const alergias = obtenerAlergiasSeleccionadas();
            document.getElementById('resumen_alergias').textContent = alergias || 'No registradas';
            
            // Actualizar signos vitales
            const signosVitales = obtenerSignosVitalesResumen();
            document.getElementById('resumen_signos_vitales').textContent = signosVitales;
            
            // Actualizar motivo
            const motivo = document.getElementById('motivo_traslado').value || 'No especificado';
            document.getElementById('resumen_motivo').textContent = motivo;
            
            // Actualizar intervenciones
            const intervenciones = obtenerIntervencionesRealizadas();
            document.getElementById('resumen_intervenciones').textContent = intervenciones || 'No realizadas';
            
            // Actualizar medicamentos
            const medicamentos = obtenerMedicamentosAdministrados();
            document.getElementById('resumen_medicamentos').textContent = medicamentos || 'No administrados';
            
            showNotification('✅ Resumen de entrega actualizado', 'success');
        }

        function obtenerAntecedentesSeleccionados() {
            const checkboxes = document.querySelectorAll('input[name="antecedente_coronario"]:checked');
            return Array.from(checkboxes).map(cb => {
                const label = cb.parentElement.textContent.trim();
                return label.replace('❤️', '').replace('💔', '').replace('📊', '').replace('🫀', '').replace('🩸', '').replace('🍬', '').replace('🧪', '').replace('🚬', '').replace('🫁', '').replace('🌬️', '').replace('🧠', '').trim();
            }).join(', ');
        }

        function obtenerAlergiasSeleccionadas() {
            const checkboxes = document.querySelectorAll('input[name="alergia_medicamento"]:checked');
            return Array.from(checkboxes).map(cb => {
                const label = cb.parentElement.textContent.trim();
                return label.replace('💊', '').replace('💉', '').replace('🧪', '').replace('❓', '').trim();
            }).join(', ');
        }

        function obtenerSignosVitalesResumen() {
            const pa = document.getElementById('presion_arterial').value || '--/--';
            const fc = document.getElementById('frecuencia_cardiaca').value || '--';
            const spo2 = document.getElementById('saturacion_oxigeno').value || '--';
            const fr = document.getElementById('frecuencia_respiratoria').value || '--';
            const temp = document.getElementById('temperatura').value || '--';
            const glic = document.getElementById('glicemia').value || '--';
            
            return `PA: ${pa} | FC: ${fc} | SpO2: ${spo2}% | FR: ${fr} | Temp: ${temp}°C | Glic: ${glic}`;
        }

        function obtenerIntervencionesRealizadas() {
            const intervenciones = [];
            
            // Verificar PCR
            if (document.querySelector('input[name="pcr_presente"]:checked')?.value === 'Sí') {
                intervenciones.push('RCP');
            }
            
            // Verificar ventilación
            if (document.querySelector('input[name="ventilacion_mecanica"]:checked')?.value === 'Sí') {
                intervenciones.push('Ventilación Mecánica');
            }
            
            // Verificar acceso venoso en PCR
            const accesoVenoso = document.getElementById('acceso_venoso')?.value;
            if (accesoVenoso) {
                intervenciones.push(`Acceso Venoso (${accesoVenoso})`);
            }
            
            return intervenciones.join(', ');
        }

        function obtenerMedicamentosAdministrados() {
            const medicamentos = [];
            
            // Adrenalina en PCR
            const adrenalina = document.getElementById('dosis_adrenalina')?.value;
            if (adrenalina && parseFloat(adrenalina) > 0) {
                medicamentos.push(`Adrenalina ${adrenalina}mg`);
            }
            
            return medicamentos.join(', ');
        }

        // =============================================
        // SISTEMA DE FOTOS DESDE DISPOSITIVO MÓVIL
        // =============================================
        function previewPhoto(input, previewId) {
            const preview = document.getElementById(previewId);
            const file = input.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                    showNotification('✅ Foto cargada correctamente', 'success');
                }
                
                reader.readAsDataURL(file);
            }
        }

        function tomarFoto(inputId, previewId) {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                showNotification('❌ La cámara no está disponible en este navegador', 'error');
                return;
            }
            
            const video = document.createElement('video');
            video.style.position = 'fixed';
            video.style.top = '0';
            video.style.left = '0';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.zIndex = '10000';
            video.style.backgroundColor = 'black';
            document.body.appendChild(video);
            
            const captureBtn = document.createElement('button');
            captureBtn.textContent = '📸 CAPTURAR FOTO';
            captureBtn.style.position = 'fixed';
            captureBtn.style.bottom = '20px';
            captureBtn.style.left = '50%';
            captureBtn.style.transform = 'translateX(-50%)';
            captureBtn.style.zIndex = '10001';
            captureBtn.style.padding = '12px 20px';
            captureBtn.style.background = 'linear-gradient(135deg, var(--future-green), #00cc88)';
            captureBtn.style.color = 'white';
            captureBtn.style.border = 'none';
            captureBtn.style.borderRadius = '8px';
            captureBtn.style.cursor = 'pointer';
            captureBtn.style.fontWeight = 'bold';
            captureBtn.style.fontSize = '14px';
            document.body.appendChild(captureBtn);
            
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = '❌ CANCELAR';
            cancelBtn.style.position = 'fixed';
            cancelBtn.style.bottom = '70px';
            cancelBtn.style.left = '50%';
            cancelBtn.style.transform = 'translateX(-50%)';
            cancelBtn.style.zIndex = '10001';
            cancelBtn.style.padding = '10px 16px';
            cancelBtn.style.background = 'linear-gradient(135deg, var(--future-red), #ff1744)';
            cancelBtn.style.color = 'white';
            cancelBtn.style.border = 'none';
            cancelBtn.style.borderRadius = '8px';
            cancelBtn.style.cursor = 'pointer';
            cancelBtn.style.fontWeight = 'bold';
            document.body.appendChild(cancelBtn);
            
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then(function(stream) {
                    video.srcObject = stream;
                    video.play();
                    
                    captureBtn.onclick = function() {
                        const canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        
                        canvas.toBlob(function(blob) {
                            const file = new File([blob], `foto-${new Date().getTime()}.jpg`, { type: 'image/jpeg' });
                            const dataTransfer = new DataTransfer();
                            dataTransfer.items.add(file);
                            document.getElementById(inputId).files = dataTransfer.files;
                            
                            const preview = document.getElementById(previewId);
                            preview.src = canvas.toDataURL();
                            preview.style.display = 'block';
                            
                            stream.getTracks().forEach(track => track.stop());
                            document.body.removeChild(video);
                            document.body.removeChild(captureBtn);
                            document.body.removeChild(cancelBtn);
                            
                            showNotification('✅ Foto capturada correctamente', 'success');
                        }, 'image/jpeg', 0.9);
                    };
                    
                    cancelBtn.onclick = function() {
                        stream.getTracks().forEach(track => track.stop());
                        document.body.removeChild(video);
                        document.body.removeChild(captureBtn);
                        document.body.removeChild(cancelBtn);
                    };
                })
                .catch(function(error) {
                    console.error('Error al acceder a la cámara:', error);
                    showNotification('❌ Error al acceder a la cámara: ' + error.message, 'error');
                    document.body.removeChild(video);
                    document.body.removeChild(captureBtn);
                    document.body.removeChild(cancelBtn);
                });
        }

        // =============================================
        // FUNCIONES DE CÁLCULO
        // =============================================
        function calcularEdad() {
            const fecha = document.getElementById('fecha_nacimiento').value;
            if (fecha) {
                const nacimiento = new Date(fecha);
                const hoy = new Date();
                let edad = hoy.getFullYear() - nacimiento.getFullYear();
                const mes = hoy.getMonth() - nacimiento.getMonth();
                
                if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
                    edad--;
                }
                
                document.getElementById('edad_paciente').value = edad;
            }
        }

        // =============================================
        // FUNCIONES DE RECONOCIMIENTO DE VOZ
        // =============================================
        function inicializarReconocimientoVoz() {
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'es-CL';
                
                recognition.onresult = function(event) {
                    const transcript = event.results[0][0].transcript;
                    const activeField = document.getElementById(window.activeVoiceField);
                    if (activeField) {
                        if (activeField.tagName === 'SELECT') {
                            const options = Array.from(activeField.options);
                            const matchingOption = options.find(opt => 
                                opt.text.toLowerCase().includes(transcript.toLowerCase())
                            );
                            if (matchingOption) {
                                activeField.value = matchingOption.value;
                            }
                        } else {
                            activeField.value = transcript;
                        }
                    }
                };
                
                recognition.onerror = function(event) {
                    console.error('Error en reconocimiento de voz:', event.error);
                    showNotification('Error en reconocimiento de voz', 'error');
                };
            } else {
                console.warn('Reconocimiento de voz no soportado');
            }
        }

        function toggleFieldMicrophone(button, fieldId) {
            if (!recognition) {
                showNotification('Reconocimiento de voz no disponible', 'error');
                return;
            }
            
            window.activeVoiceField = fieldId;
            
            if (button.classList.contains('recording')) {
                recognition.stop();
                button.classList.remove('recording');
                showNotification('Grabación detenida', 'info');
            } else {
                try {
                    recognition.start();
                    button.classList.add('recording');
                    showNotification('Escuchando... Habla ahora', 'info');
                } catch (error) {
                    console.error('Error al iniciar grabación:', error);
                    showNotification('Error al iniciar grabación', 'error');
                }
            }
        }

        // =============================================
        // FUNCIONES ADICIONALES
        // =============================================
        function showNotification(message, type = 'info') {
            document.querySelectorAll('.notification').forEach(notif => notif.remove());
            
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 5000);
        }

        function guardarFicha() {
            // Validar firmas requeridas
            if (!signaturePadProfesional.isEmpty()) {
                showNotification('💾 Ficha guardada correctamente', 'success');
                
                // Guardar en localStorage
                const fichaData = {
                    folio: document.getElementById('folioNumber').textContent,
                    paciente: document.getElementById('nombre_paciente').value,
                    fecha: new Date().toISOString(),
                    datos: obtenerDatosFormulario()
                };
                
                localStorage.setItem(`ficha_${fichaData.folio}`, JSON.stringify(fichaData));
            } else {
                showNotification('❌ Debe firmar como profesional antes de guardar', 'error');
            }
        }
async function enviarPorCorreo() {
    showNotification('📧 Enviando ficha clínica por correo...', 'info');
    
    // Validar firmas requeridas
    if (signaturePadProfesional.isEmpty()) {
        showNotification('❌ Debe firmar como profesional antes de enviar', 'error');
        return;
    }
    
    try {
        // 1. Generar el PDF con todas las fotos
        const pdfDoc = generarPDF();
        if (!pdfDoc) {
            throw new Error('No se pudo generar el PDF');
        }
        
        // 2. Convertir PDF a base64
        const pdfBase64 = pdfDoc.output('datauristring');
        
        // 3. Preparar datos para enviar al backend
        const fichaData = {
            paciente: document.getElementById('nombre_paciente').value || 'Paciente no identificado',
            folio: document.getElementById('folioNumber').textContent,
            pdfBase64: pdfBase64,
            tamañoPDF: `${Math.round(pdfDoc.getNumberOfPages())} páginas`,
            data: obtenerDatosFormulario()
        };
        
        showNotification('📤 Enviando al servidor...', 'info');
        
        // 4. Enviar al backend de UCI Ambulancias
        const response = await fetch('https://servelprototipo2.onrender.com/ficha-clinica', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fichaData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('✅ Ficha enviada correctamente por correo', 'success');
            console.log('📧 Email ID:', result.emailId);
            console.log('👤 Paciente:', result.paciente);
            console.log('📄 Folio:', result.folio);
        } else {
            throw new Error(result.error || 'Error del servidor');
        }
        
    } catch (error) {
        console.error('❌ Error al enviar ficha:', error);
        showNotification('❌ Error al enviar: ' + error.message, 'error');
    }
}
        function obtenerDatosFormulario() {
            const datos = {};
            const elementos = document.querySelectorAll('input, select, textarea');
            elementos.forEach(elemento => {
                if (elemento.name && elemento.value) {
                    datos[elemento.name] = elemento.value;
                }
            });
            return datos;
        }
// ✅ ESTA ES LA NUEVA - CON TODAS LAS FOTOS
function generarPDF() {
    showNotification('📄 Generando PDF COMPLETO de toda la ficha...', 'info');
    
    if (signaturePadProfesional.isEmpty()) {
        showNotification('❌ Debe firmar como profesional antes de generar PDF', 'error');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let yPosition = 40;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    
    // Colores azules modernos
    const colorPrimario = [0, 102, 255];
    const colorSecundario = [0, 212, 255];
    const colorTerciario = [0, 150, 255];

    // ==================== CABECERA CON LOGO ====================
    doc.setFillColor(...colorPrimario);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text('🏥 UCI AMBULANCIAS', margin, 22);
    
    doc.setFontSize(10);
    doc.text('FICHA CLÍNICA ELECTRÓNICA', pageWidth - margin, 15, { align: 'right' });
    doc.text(`Folio: ${document.getElementById('folioNumber').textContent}`, pageWidth - margin, 22, { align: 'right' });
    doc.text(`Ambulancia: ${document.getElementById('numero_ambulancia').value || 'N/A'}`, pageWidth - margin, 29, { align: 'right' });

    // ==================== 1. HORARIOS DEL SERVICIO ====================
    yPosition = 45;
    doc.setFillColor(...colorSecundario);
    doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 80, 3, 3, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(...colorPrimario);
    doc.text('⏰ HORARIOS DEL SERVICIO', margin + 10, yPosition + 12);
    
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    
    const horarios = [
        { label: '🚑 HORA DE SALIDA', value: document.getElementById('hora_salida').value || 'No registrada', x: margin + 15 },
        { label: '📍 HORA LLEGADA ESCENA', value: document.getElementById('hora_llegada_escena').value || 'No registrada', x: pageWidth/2 + 10 },
        { label: '🏥 HORA SALIDA AL HOSPITAL', value: document.getElementById('hora_salida_hospital').value || 'No registrada', x: margin + 15, yOffset: 25 },
        { label: '⏹️ HORA TERMINO SERVICIO', value: document.getElementById('hora_termino_servicio').value || 'No registrada', x: pageWidth/2 + 10, yOffset: 25 }
    ];
    
    horarios.forEach(horario => {
        const y = yPosition + 25 + (horario.yOffset || 0);
        doc.text(horario.label, horario.x, y);
        doc.setFontSize(10);
        doc.setTextColor(...colorPrimario);
        doc.text(horario.value, horario.x, y + 7);
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
    });
    
    yPosition += 90;

    // ==================== 2. DATOS DEL PACIENTE ====================
    if (yPosition > 180) { doc.addPage(); yPosition = 40; }
    doc.setFillColor(...colorTerciario);
    doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 120, 3, 3, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(...colorPrimario);
    doc.text('📋 DATOS DEL PACIENTE', margin + 10, yPosition + 12);

    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    
    // Primera columna
    const datosCol1 = [
        `Nombre Completo: ${document.getElementById('nombre_paciente').value || 'No especificado'}`,
        `RUT: ${document.getElementById('rut_paciente').value || 'No especificado'}`,
        `Fecha Nacimiento: ${document.getElementById('fecha_nacimiento').value || 'No especificada'}`,
        `Edad: ${document.getElementById('edad_paciente').value || 'No especificada'}`,
        `Sexo: ${document.getElementById('sexo_paciente').value || 'No especificado'}`
    ];
    
    datosCol1.forEach((dato, index) => {
        doc.text(dato, margin + 15, yPosition + 25 + (index * 8));
    });

    // Segunda columna
    const datosCol2 = [
        `Comuna: ${document.getElementById('comuna_paciente').value || 'No especificada'}`,
        `Dirección: ${document.getElementById('direccion_paciente').value || 'No especificada'}`,
        `Teléfono: ${document.getElementById('telefono_paciente').value || 'No especificado'}`,
        `Previsión Salud: ${document.getElementById('prevision_paciente').value || 'No especificada'}`
    ];
    
    datosCol2.forEach((dato, index) => {
        doc.text(dato, pageWidth/2 + 10, yPosition + 25 + (index * 8));
    });

    // Motivo del traslado (ocupa todo el ancho)
    const motivo = document.getElementById('motivo_traslado').value;
    if (motivo) {
        doc.text('Motivo del Traslado:', margin + 15, yPosition + 70);
        const lineasMotivo = doc.splitTextToSize(motivo, pageWidth - margin * 2 - 30);
        doc.text(lineasMotivo, margin + 15, yPosition + 78);
        yPosition += 90 + (lineasMotivo.length * 4);
    } else {
        yPosition += 85;
    }

    // ==================== 3. ESTADO DE CONCIENCIA ====================
    if (yPosition > 150) { doc.addPage(); yPosition = 40; }
    doc.setFillColor(...colorSecundario);
    doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 100, 3, 3, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(...colorPrimario);
    doc.text('🧠 ESTADO DE CONCIENCIA', margin + 10, yPosition + 12);

    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    
    const estadoConciencia = document.querySelector('input[name="estado_conciencia"]:checked')?.value;
    doc.text(`Estado de Conciencia: ${estadoConciencia || 'No especificado'}`, margin + 15, yPosition + 25);
    
    const nivelRespuesta = document.getElementById('nivel_respuesta').value;
    if (nivelRespuesta) {
        doc.text(`Nivel de Respuesta: ${nivelRespuesta}`, margin + 15, yPosition + 35);
    }
    
    const tiempoInconsciencia = document.getElementById('tiempo_inconsciencia').value;
    if (tiempoInconsciencia) {
        doc.text(`Tiempo de Inconsciencia: ${tiempoInconsciencia}`, margin + 15, yPosition + 45);
    }

    // Escala de Glasgow
    const glasgowTotal = document.getElementById('total-glasgow').textContent;
    doc.text(`Escala de Glasgow Total: ${glasgowTotal}`, margin + 15, yPosition + 58);
    
    // Detalles de Glasgow
    const selectsGlasgow = document.querySelectorAll('.escala-puntaje');
    selectsGlasgow.forEach((select, index) => {
        const labels = ['Apertura Ocular', 'Respuesta Motora', 'Respuesta Verbal'];
        if (labels[index]) {
            const optionText = select.options[select.selectedIndex].text;
            doc.text(`${labels[index]}: ${optionText}`, margin + 25, yPosition + 68 + (index * 6));
        }
    });

    const obsConciencia = document.getElementById('observaciones_conciencia').value;
    if (obsConciencia) {
        doc.text('Observaciones:', margin + 15, yPosition + 88);
        const lineasObs = doc.splitTextToSize(obsConciencia, pageWidth - margin * 2 - 30);
        doc.text(lineasObs, margin + 15, yPosition + 96);
        yPosition += 110 + (lineasObs.length * 4);
    } else {
        yPosition += 105;
    }

    // ==================== 4. PACIENTE POSTRADO ====================
    const postrado = document.querySelector('input[name="paciente_postrado"]:checked')?.value;
    if (postrado === 'Sí') {
        if (yPosition > 150) { doc.addPage(); yPosition = 40; }
        
        doc.setFillColor(...colorTerciario);
        doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 80, 3, 3, 'F');
        
        doc.setFontSize(14);
        doc.setTextColor(...colorPrimario);
        doc.text('🛌 PACIENTE POSTRADO', margin + 10, yPosition + 12);

        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text(`¿Paciente postrado?: ${postrado}`, margin + 15, yPosition + 25);

        // Condiciones de postración
        const condiciones = Array.from(document.querySelectorAll('input[name="condicion_postrado"]:checked'))
            .map(cb => cb.parentElement.textContent.trim());
        
        if (condiciones.length > 0) {
            doc.text('Condiciones de Postración:', margin + 15, yPosition + 37);
            condiciones.forEach((condicion, index) => {
                doc.text(`• ${condicion}`, margin + 25, yPosition + 47 + (index * 6));
            });
        }

        const obsPostrado = document.getElementById('observaciones_postrado').value;
        if (obsPostrado) {
            const startY = condiciones.length > 0 ? yPosition + 47 + (condiciones.length * 6) : yPosition + 37;
            doc.text('Observaciones:', margin + 15, startY + 5);
            const lineasObs = doc.splitTextToSize(obsPostrado, pageWidth - margin * 2 - 30);
            doc.text(lineasObs, margin + 15, startY + 13);
            yPosition += startY + 20 + (lineasObs.length * 4);
        } else {
            yPosition += condiciones.length > 0 ? 85 : 65;
        }
    }

    // ==================== 5. PCR - PARO CARDIORRESPIRATORIO ====================
    const pcrPresente = document.querySelector('input[name="pcr_presente"]:checked')?.value;
    if (pcrPresente === 'Sí') {
        if (yPosition > 120) { doc.addPage(); yPosition = 40; }
        
        doc.setFillColor(255, 46, 99, 0.2);
        doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 120, 3, 3, 'F');
        doc.setDrawColor(255, 46, 99);
        doc.setLineWidth(1);
        doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 120, 3, 3);
        
        doc.setFontSize(14);
        doc.setTextColor(255, 46, 99);
        doc.text('💔 PCR - PARO CARDIORRESPIRATORIO', margin + 10, yPosition + 12);

        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        
        const datosPCR = [
            `¿Presenta PCR?: ${pcrPresente}`,
            `Hora de Inicio del PCR: ${document.getElementById('hora_inicio_pcr').value || 'No registrada'}`,
            `Ritmo Inicial: ${document.getElementById('ritmo_inicial').value || 'No especificado'}`,
            `Número de Desfibrilaciones: ${document.getElementById('desfibrilaciones').value || '0'}`,
            `Dosis de Adrenalina: ${document.getElementById('dosis_adrenalina').value || '0'} mg`,
            `Acceso Venoso: ${document.getElementById('acceso_venoso').value || 'No establecido'}`,
            `Tiempo de RCP: ${document.getElementById('tiempo_rcp').textContent}`
        ];
        
        datosPCR.forEach((dato, index) => {
            doc.text(dato, margin + 15, yPosition + 25 + (index * 7));
        });

        const obsPCR = document.getElementById('observaciones_pcr').value;
        if (obsPCR) {
            doc.text('Observaciones del PCR:', margin + 15, yPosition + 70);
            const lineasObs = doc.splitTextToSize(obsPCR, pageWidth - margin * 2 - 30);
            doc.text(lineasObs, margin + 15, yPosition + 78);
            yPosition += 95 + (lineasObs.length * 4);
        } else {
            yPosition += 90;
        }
    }

    // ==================== 6. SIGNOS VITALES ====================
    if (yPosition > 150) { doc.addPage(); yPosition = 40; }
    doc.setFillColor(...colorSecundario);
    doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 80, 3, 3, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(...colorPrimario);
    doc.text('📊 SIGNOS VITALES - MONITOREO EN TIEMPO REAL', margin + 10, yPosition + 12);

    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    
    // Primera fila
    const signos1 = [
        { 
            label: '🩸 Presión Arterial', 
            value: document.getElementById('presion_arterial').value || '--/--',
            hora: document.getElementById('horaPA').textContent,
            x: margin + 15
        },
        { 
            label: '💓 Frecuencia Cardíaca', 
            value: document.getElementById('frecuencia_cardiaca').value || '--',
            hora: document.getElementById('horaFC').textContent,
            x: pageWidth/2 + 10
        }
    ];

    signos1.forEach(signo => {
        doc.text(signo.label, signo.x, yPosition + 25);
        doc.setFontSize(10);
        doc.setTextColor(...colorPrimario);
        doc.text(signo.value, signo.x, yPosition + 32);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Hora: ${signo.hora}`, signo.x, yPosition + 38);
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
    });

    // Segunda fila
    const signos2 = [
        { 
            label: '💨 Saturación O₂', 
            value: `${document.getElementById('saturacion_oxigeno').value || '--'}%`,
            hora: document.getElementById('horaSpO2').textContent,
            x: margin + 15,
            yOffset: 45
        },
        { 
            label: '🌬️ Frecuencia Respiratoria', 
            value: `${document.getElementById('frecuencia_respiratoria').value || '--'}`,
            hora: document.getElementById('horaFR').textContent,
            x: pageWidth/2 + 10,
            yOffset: 45
        }
    ];

    signos2.forEach(signo => {
        const y = yPosition + signo.yOffset;
        doc.text(signo.label, signo.x, y);
        doc.setFontSize(10);
        doc.setTextColor(...colorPrimario);
        doc.text(signo.value, signo.x, y + 7);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Hora: ${signo.hora}`, signo.x, y + 13);
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
    });

    // Tercera fila
    const signos3 = [
        { 
            label: '🌡️ Temperatura', 
            value: `${document.getElementById('temperatura').value || '--'}°C`,
            hora: document.getElementById('horaTemp').textContent,
            x: margin + 15,
            yOffset: 70
        },
        { 
            label: '🩸 Glicemia', 
            value: `${document.getElementById('glicemia').value || '--'} mg/dL`,
            hora: document.getElementById('horaGlic').textContent,
            x: pageWidth/2 + 10,
            yOffset: 70
        }
    ];

    signos3.forEach(signo => {
        const y = yPosition + signo.yOffset;
        doc.text(signo.label, signo.x, y);
        doc.setFontSize(10);
        doc.setTextColor(...colorPrimario);
        doc.text(signo.value, signo.x, y + 7);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Hora: ${signo.hora}`, signo.x, y + 13);
    });

    yPosition += 95;
    // ==================== 7. ANTECEDENTES MÓRBIDOS ====================
    const antecedentesPresente = document.querySelector('input[name="antecedentes_morbidos"]:checked')?.value;
    if (antecedentesPresente === 'Sí') {
        if (yPosition > 150) { doc.addPage(); yPosition = 40; }
        
        doc.setFillColor(...colorTerciario);
        doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 100, 3, 3, 'F');
        
        doc.setFontSize(14);
        doc.setTextColor(...colorPrimario);
        doc.text('🫀 ANTECEDENTES MÓRBIDOS', margin + 10, yPosition + 12);

        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text(`¿Presenta antecedentes mórbidos?: ${antecedentesPresente}`, margin + 15, yPosition + 25);

        // Antecedentes coronarios seleccionados
        const antecedentesCoronarios = Array.from(document.querySelectorAll('input[name="antecedente_coronario"]:checked'))
            .map(cb => cb.parentElement.textContent.trim());
        
        if (antecedentesCoronarios.length > 0) {
            doc.text('Antecedentes Coronarios y Cardiológicos:', margin + 15, yPosition + 37);
            antecedentesCoronarios.forEach((antecedente, index) => {
                doc.text(`• ${antecedente}`, margin + 25, yPosition + 47 + (index * 6));
            });
        }

        const otrosAntecedentes = document.getElementById('otros_antecedentes').value;
        if (otrosAntecedentes) {
            const startY = antecedentesCoronarios.length > 0 ? 
                yPosition + 47 + (antecedentesCoronarios.length * 6) : yPosition + 37;
            doc.text('Otros Antecedentes Mórbidos:', margin + 15, startY + 5);
            const lineasOtros = doc.splitTextToSize(otrosAntecedentes, pageWidth - margin * 2 - 30);
            doc.text(lineasOtros, margin + 15, startY + 13);
            yPosition += startY + 20 + (lineasOtros.length * 4);
        } else {
            yPosition += antecedentesCoronarios.length > 0 ? 75 : 55;
        }
    }

    // ==================== 8. ALERGIAS A MEDICAMENTOS ====================
    const alergiasPresente = document.querySelector('input[name="alergias_medicamentos"]:checked')?.value;
    if (alergiasPresente === 'Sí') {
        if (yPosition > 150) { doc.addPage(); yPosition = 40; }
        
        doc.setFillColor(255, 170, 0, 0.2);
        doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 80, 3, 3, 'F');
        doc.setDrawColor(255, 170, 0);
        doc.setLineWidth(1);
        doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 80, 3, 3);
        
        doc.setFontSize(14);
        doc.setTextColor(255, 170, 0);
        doc.text('⚠️ ALERGIAS A MEDICAMENTOS', margin + 10, yPosition + 12);

        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text(`¿Presenta alergias a medicamentos?: ${alergiasPresente}`, margin + 15, yPosition + 25);

        // Medicamentos alergicos seleccionados
        const alergiasMedicamentos = Array.from(document.querySelectorAll('input[name="alergia_medicamento"]:checked'))
            .map(cb => cb.parentElement.textContent.trim());
        
        if (alergiasMedicamentos.length > 0) {
            doc.text('Medicamentos a los que es alérgico:', margin + 15, yPosition + 37);
            alergiasMedicamentos.forEach((alergia, index) => {
                doc.text(`• ${alergia}`, margin + 25, yPosition + 47 + (index * 6));
            });
        }

        const otrasAlergias = document.getElementById('otras_alergias').value;
        if (otrasAlergias) {
            const startY = alergiasMedicamentos.length > 0 ? 
                yPosition + 47 + (alergiasMedicamentos.length * 6) : yPosition + 37;
            doc.text('Otras alergias (especificar):', margin + 15, startY + 5);
            const lineasOtras = doc.splitTextToSize(otrasAlergias, pageWidth - margin * 2 - 30);
            doc.text(lineasOtras, margin + 15, startY + 13);
            yPosition += startY + 20 + (lineasOtras.length * 4);
        } else {
            yPosition += alergiasMedicamentos.length > 0 ? 75 : 55;
        }
    }

    // ==================== 9. COMPLEJIDAD DEL PACIENTE ====================
    if (yPosition > 150) { doc.addPage(); yPosition = 40; }
    doc.setFillColor(...colorSecundario);
    doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 70, 3, 3, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(...colorPrimario);
    doc.text('🚨 COMPLEJIDAD DEL PACIENTE', margin + 10, yPosition + 12);

    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    
    const datosComplejidad = [
        { label: 'Nivel de Criticidad', value: document.getElementById('nivel_criticidad').value, x: margin + 15 },
        { label: 'Nivel de Dependencia', value: document.getElementById('nivel_dependencia').value, x: pageWidth/2 + 10 },
        { label: 'Riesgo Vital', value: document.getElementById('riesgo_vital').value, x: margin + 15, yOffset: 20 },
        { label: 'Escala EMERGEr', value: document.getElementById('escala_emerger').value, x: pageWidth/2 + 10, yOffset: 20 }
    ];
    
    datosComplejidad.forEach(dato => {
        const y = yPosition + 25 + (dato.yOffset || 0);
        if (dato.value) {
            doc.text(`${dato.label}:`, dato.x, y);
            doc.setFontSize(10);
            doc.setTextColor(...colorPrimario);
            doc.text(dato.value, dato.x + 40, y);
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
        }
    });
    
    yPosition += 80;

    // ==================== 10. VENTILACIÓN MECÁNICA ====================
    const ventilacionPresente = document.querySelector('input[name="ventilacion_mecanica"]:checked')?.value;
    if (ventilacionPresente === 'Sí') {
        if (yPosition > 120) { doc.addPage(); yPosition = 40; }
        
        doc.setFillColor(...colorTerciario);
        doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 120, 3, 3, 'F');
        
        doc.setFontSize(14);
        doc.setTextColor(...colorPrimario);
        doc.text('💨 VENTILACIÓN MECÁNICA', margin + 10, yPosition + 12);

        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text(`¿Requiere ventilación mecánica?: ${ventilacionPresente}`, margin + 15, yPosition + 25);

        // Parámetros de ventilación
        const parametrosVentilacion = [
            `Modalidad: ${document.getElementById('modalidad_ventilacion').value || 'No especificada'}`,
            `Volumen Tidal: ${document.getElementById('volumen_tidal').value || '--'} mL`,
            `Frecuencia Resp.: ${document.getElementById('frecuencia_respiratoria_vm').value || '--'} rpm`,
            `FiO₂: ${document.getElementById('fio2_vm').value || '--'}%`,
            `PEEP: ${document.getElementById('peep').value || '--'} cmH₂O`,
            `Presión Pico: ${document.getElementById('presion_pico').value || '--'} cmH₂O`,
            `Presión Meseta: ${document.getElementById('presion_meseta').value || '--'} cmH₂O`,
            `Complianza: ${document.getElementById('complianza').value || '--'} mL/cmH₂O`
        ];
        
        // Organizar en 2 columnas
        const col1 = parametrosVentilacion.slice(0, 4);
        const col2 = parametrosVentilacion.slice(4);
        
        col1.forEach((param, index) => {
            doc.text(param, margin + 15, yPosition + 40 + (index * 7));
        });
        
        col2.forEach((param, index) => {
            doc.text(param, pageWidth/2 + 10, yPosition + 40 + (index * 7));
        });

        const obsVentilacion = document.getElementById('observaciones_ventilacion').value;
        if (obsVentilacion) {
            doc.text('Observaciones de Ventilación:', margin + 15, yPosition + 75);
            const lineasObs = doc.splitTextToSize(obsVentilacion, pageWidth - margin * 2 - 30);
            doc.text(lineasObs, margin + 15, yPosition + 83);
            yPosition += 100 + (lineasObs.length * 4);
        } else {
            yPosition += 95;
        }
    }

    // ==================== 11. TRAUMA Y LESIONES ====================
    const traumaPresente = document.querySelector('input[name="lesiones_traumaticas"]:checked')?.value;
    if (traumaPresente === 'Sí') {
        if (yPosition > 120) { doc.addPage(); yPosition = 40; }
        
        doc.setFillColor(255, 46, 99, 0.2);
        doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 100, 3, 3, 'F');
        doc.setDrawColor(255, 46, 99);
        doc.setLineWidth(1);
        doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 100, 3, 3);
        
        doc.setFontSize(14);
        doc.setTextColor(255, 46, 99);
        doc.text('🩹 TRAUMA Y LESIONES', margin + 10, yPosition + 12);

        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text(`¿Presenta lesiones traumáticas?: ${traumaPresente}`, margin + 15, yPosition + 25);

        // Localizaciones de trauma
        const localizacionesTrauma = Array.from(document.querySelectorAll('input[name="trauma_localizacion"]:checked'))
            .map(cb => cb.parentElement.textContent.trim());
        
        if (localizacionesTrauma.length > 0) {
            doc.text('Localización de las Lesiones:', margin + 15, yPosition + 37);
            localizacionesTrauma.forEach((localizacion, index) => {
                doc.text(`• ${localizacion}`, margin + 25, yPosition + 47 + (index * 6));
            });
        }

        // Escala de trauma
        const traumaGlasgow = document.getElementById('trauma-glasgow').textContent;
        doc.text(`Escala de Glasgow (Trauma): ${traumaGlasgow}`, margin + 15, yPosition + 65);

        const descripcionTrauma = document.getElementById('descripcion_trauma').value;
        if (descripcionTrauma) {
            doc.text('Descripción detallada de las lesiones:', margin + 15, yPosition + 75);
            const lineasDesc = doc.splitTextToSize(descripcionTrauma, pageWidth - margin * 2 - 30);
            doc.text(lineasDesc, margin + 15, yPosition + 83);
            yPosition += 100 + (lineasDesc.length * 4);
        } else {
            yPosition += 90;
        }
    }

    // ==================== 12. ENTREGA DE PACIENTE ====================
    if (yPosition > 120) { doc.addPage(); yPosition = 40; }
    doc.setFillColor(0, 255, 149, 0.2);
    doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 120, 3, 3, 'F');
    doc.setDrawColor(0, 255, 149);
    doc.setLineWidth(1);
    doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 120, 3, 3);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 150, 0);
    doc.text('🏥 ENTREGA DE PACIENTE', margin + 10, yPosition + 12);

    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    
    const datosEntrega = [
        `Hospital de Destino: ${document.getElementById('hospital_destino').value || 'No especificado'}`,
        `Médico Receptor: ${document.getElementById('medico_receptor').value || 'No especificado'}`,
        `Especialidad Receptor: ${document.getElementById('especialidad_receptor').value || 'No especificada'}`,
        `Hora de Entrega: ${document.getElementById('hora_entrega').value || 'No registrada'}`
    ];
    
    datosEntrega.forEach((dato, index) => {
        doc.text(dato, margin + 15, yPosition + 25 + (index * 7));
    });

    // Resumen de entrega
    doc.text('📋 RESUMEN DE ENTREGA:', margin + 15, yPosition + 55);
    
    const resumenEntrega = [
        `Paciente: ${document.getElementById('resumen_nombre').textContent}`,
        `Edad/Sexo: ${document.getElementById('resumen_edad_sexo').textContent}`,
        `Antecedentes: ${document.getElementById('resumen_antecedentes').textContent}`,
        `Alergias: ${document.getElementById('resumen_alergias').textContent}`,
        `Signos Vitales: ${document.getElementById('resumen_signos_vitales').textContent}`,
        `Intervenciones: ${document.getElementById('resumen_intervenciones').textContent}`,
        `Medicamentos: ${document.getElementById('resumen_medicamentos').textContent}`
    ];
    
    resumenEntrega.forEach((resumen, index) => {
        doc.text(resumen, margin + 25, yPosition + 65 + (index * 6));
    });

    const obsEntrega = document.getElementById('observaciones_entrega').value;
    if (obsEntrega) {
        doc.text('Observaciones de Entrega:', margin + 15, yPosition + 110);
        const lineasObs = doc.splitTextToSize(obsEntrega, pageWidth - margin * 2 - 30);
        doc.text(lineasObs, margin + 15, yPosition + 118);
        yPosition += 135 + (lineasObs.length * 4);
    } else {
        yPosition += 130;
    }

    // ==================== 13. AUTORIZACIONES Y CONSENTIMIENTOS ====================
    const nombreFamiliar = document.getElementById('nombre_familiar').value;
    const consentimientos = Array.from(document.querySelectorAll('input[name^="consentimiento_"]:checked'));
    
    if (nombreFamiliar || consentimientos.length > 0) {
        if (yPosition > 120) { doc.addPage(); yPosition = 40; }
        
        doc.setFillColor(...colorTerciario);
        doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 100, 3, 3, 'F');
        
        doc.setFontSize(14);
        doc.setTextColor(...colorPrimario);
        doc.text('📝 AUTORIZACIONES Y CONSENTIMIENTOS', margin + 10, yPosition + 12);

        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);

        // Consentimiento para traslado
        if (nombreFamiliar) {
            doc.text('✅ CONSENTIMIENTO PARA TRASLADO:', margin + 15, yPosition + 25);
            doc.text(`Familiar/Acompañante: ${nombreFamiliar}`, margin + 25, yPosition + 33);
            doc.text(`RUT: ${document.getElementById('rut_familiar').value || 'No especificado'}`, margin + 25, yPosition + 39);
            doc.text(`Parentesco: ${document.getElementById('parentesco').value || 'No especificado'}`, margin + 25, yPosition + 45);
        }

        // Consentimientos procedimientos invasivos
        if (consentimientos.length > 0) {
            const startY = nombreFamiliar ? yPosition + 55 : yPosition + 25;
            doc.text('⚠️ CONSENTIMIENTO PROCEDIMIENTOS INVASIVOS:', margin + 15, startY);
            consentimientos.forEach((consentimiento, index) => {
                const label = consentimiento.parentElement.textContent.trim().replace('✅', '').trim();
                doc.text(`• ${label}`, margin + 25, startY + 8 + (index * 6));
            });
        }

        const obsConsentimiento = document.getElementById('observaciones_consentimiento').value;
        if (obsConsentimiento) {
            const startY = consentimientos.length > 0 ? 
                (nombreFamiliar ? yPosition + 55 : yPosition + 25) + 8 + (consentimientos.length * 6) : 
                (nombreFamiliar ? yPosition + 55 : yPosition + 25);
            doc.text('Observaciones del Consentimiento:', margin + 15, startY + 5);
            const lineasObs = doc.splitTextToSize(obsConsentimiento, pageWidth - margin * 2 - 30);
            doc.text(lineasObs, margin + 15, startY + 13);
            yPosition += startY + 20 + (lineasObs.length * 4);
        } else {
            const alturaBase = nombreFamiliar ? 55 : 25;
            const alturaConsentimientos = consentimientos.length > 0 ? 8 + (consentimientos.length * 6) : 0;
            yPosition += alturaBase + alturaConsentimientos + 20;
        }
    }

    // ==================== 14. RECHAZO DE TRASLADO ====================
    const rechazoPresente = document.querySelector('input[name="rechazo_traslado"]:checked')?.value;
    if (rechazoPresente === 'Sí') {
        if (yPosition > 120) { doc.addPage(); yPosition = 40; }
        
        doc.setFillColor(255, 170, 0, 0.2);
        doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 100, 3, 3, 'F');
        doc.setDrawColor(255, 170, 0);
        doc.setLineWidth(1);
        doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 100, 3, 3);
        
        doc.setFontSize(14);
        doc.setTextColor(255, 170, 0);
        doc.text('🚫 RECHAZO DE TRASLADO', margin + 10, yPosition + 12);

        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text(`¿Paciente/familiar rechaza traslado?: ${rechazoPresente}`, margin + 15, yPosition + 25);

        const datosRechazo = [
            `Motivo del Rechazo: ${document.getElementById('motivo_rechazo').value || 'No especificado'}`,
            `Fecha y Hora del Rechazo: ${document.getElementById('fecha_rechazo').value || 'No registrada'}`
        ];
        
        datosRechazo.forEach((dato, index) => {
            doc.text(dato, margin + 15, yPosition + 37 + (index * 7));
        });

        const obsRechazo = document.getElementById('observaciones_rechazo').value;
        if (obsRechazo) {
            doc.text('Observaciones del Rechazo:', margin + 15, yPosition + 55);
            const lineasObs = doc.splitTextToSize(obsRechazo, pageWidth - margin * 2 - 30);
            doc.text(lineasObs, margin + 15, yPosition + 63);
        }

        const testigosRechazo = document.getElementById('testigos_rechazo').value;
        if (testigosRechazo) {
            const startY = obsRechazo ? yPosition + 63 + (lineasObs.length * 4) : yPosition + 55;
            doc.text('Testigos del Rechazo:', margin + 15, startY + 5);
            doc.text(testigosRechazo, margin + 15, startY + 13);
            yPosition += startY + 20;
        } else {
            yPosition += obsRechazo ? 80 + (lineasObs.length * 4) : 70;
        }
    }

    // ==================== 15. FOTOS ====================
    const fotosParaIncluir = [
        { id: 'previewFotoPaciente', label: '📷 FOTO DEL PACIENTE' },
        { id: 'previewFotoConciencia', label: '🧠 ESTADO DE CONCIENCIA' },
        { id: 'previewFotoPostrado', label: '🛌 PACIENTE POSTRADO' },
        { id: 'previewFotoPCR', label: '💔 PCR / MONITOR' },
        { id: 'previewFotoSignosVitales', label: '📊 SIGNOS VITALES' },
        { id: 'previewFotoAntecedentes', label: '🫀 ANTECEDENTES' },
        { id: 'previewFotoAlergias', label: '⚠️ ALERGIAS' },
        { id: 'previewFotoComplejidad', label: '🚨 COMPLEJIDAD' },
        { id: 'previewFotoVentilacion', label: '💨 VENTILACIÓN' },
        { id: 'previewFotoTrauma', label: '🩹 TRAUMA' }
    ];

    // Agregar título de sección de fotos
    if (yPosition > 150) { doc.addPage(); yPosition = 40; }
    doc.setFontSize(16);
    doc.setTextColor(...colorPrimario);
    doc.text('🖼️ REGISTRO FOTOGRÁFICO', pageWidth/2, yPosition, { align: 'center' });
    yPosition += 20;

    fotosParaIncluir.forEach(foto => {
        const imgElement = document.getElementById(foto.id);
        if (imgElement && imgElement.style.display !== 'none' && imgElement.src) {
            if (yPosition > 180) {
                doc.addPage();
                yPosition = 40;
            }

            // Marco para la foto con diseño moderno
            doc.setDrawColor(...colorPrimario);
            doc.setLineWidth(1);
            doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 90, 5, 5);

            // Fondo azul suave para el título
            doc.setFillColor(...colorSecundario);
            doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 15, 5, 5, 'F');
            
            doc.setFontSize(10);
            doc.setTextColor(...colorPrimario);
            doc.text(foto.label, margin + 10, yPosition + 10);

            try {
                // Agregar la imagen centrada
                const imgWidth = 70;
                const imgHeight = 60;
                const imgX = margin + (pageWidth - margin * 2 - imgWidth) / 2;
                const imgY = yPosition + 25;
                
                doc.addImage(imgElement.src, 'JPEG', imgX, imgY, imgWidth, imgHeight);
                yPosition += 100;
            } catch (error) {
                doc.setTextColor(255, 0, 0);
                doc.text('❌ Error al cargar imagen', margin + 20, yPosition + 50);
                yPosition += 60;
            }
        }
    });

    // ==================== 16. FIRMAS DIGITALES ====================
    if (yPosition > 120) {
        doc.addPage();
        yPosition = 40;
    }

    doc.setFillColor(...colorSecundario);
    doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 100, 5, 5, 'F');
    
    doc.setFontSize(16);
    doc.setTextColor(...colorPrimario);
    doc.text('✍️ FIRMAS DIGITALES', pageWidth/2, yPosition + 15, { align: 'center' });

    // Firma del profesional
    doc.setFontSize(12);
    doc.setTextColor(...colorPrimario);
    doc.text('FIRMA DEL PROFESIONAL', margin + 50, yPosition + 35, { align: 'center' });
    
    if (!signaturePadProfesional.isEmpty()) {
        const firmaProfesional = signaturePadProfesional.toDataURL();
        doc.addImage(firmaProfesional, 'PNG', margin + 30, yPosition + 40, 60, 30);
    }
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nombre: ${document.getElementById('nombre_profesional').value || 'No especificado'}`, margin + 50, yPosition + 75, { align: 'center' });

    // Firma del receptor
    doc.setFontSize(12);
    doc.setTextColor(...colorPrimario);
    doc.text('FIRMA DEL RECEPTOR', pageWidth - margin - 50, yPosition + 35, { align: 'center' });
    
    if (!signaturePadReceptor.isEmpty()) {
        const firmaReceptor = signaturePadReceptor.toDataURL();
        doc.addImage(firmaReceptor, 'PNG', pageWidth - margin - 90, yPosition + 40, 60, 30);
    }
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nombre: ${document.getElementById('nombre_receptor').value || 'No especificado'}`, pageWidth - margin - 50, yPosition + 75, { align: 'center' });

    // ==================== PIE DE PÁGINA ====================
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        
        // Línea decorativa
        doc.setDrawColor(...colorPrimario);
        doc.setLineWidth(0.5);
        doc.line(margin, doc.internal.pageSize.height - 15, pageWidth - margin, doc.internal.pageSize.height - 15);
        
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Página ${i} de ${totalPages}`, pageWidth/2, doc.internal.pageSize.height - 10, { align: 'center' });
        doc.text(`Folio: ${document.getElementById('folioNumber').textContent}`, margin + 5, doc.internal.pageSize.height - 10);
        doc.text('UCI Ambulancias - Ficha Clínica Electrónica', pageWidth - margin - 5, doc.internal.pageSize.height - 10, { align: 'right' });
    }

    // ==================== GUARDAR PDF ====================
    const fileName = `ficha_clinica_completa_${document.getElementById('folioNumber').textContent}.pdf`;
    doc.save(fileName);
    showNotification('✅ PDF COMPLETO generado con toda la ficha clínica', 'success');
    
    return doc;
}
   

        // CERRAR MODAL CON ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                cerrarImagen();
            }
        });

    </script>
</body>
</html>


