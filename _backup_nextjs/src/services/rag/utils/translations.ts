/**
 * Traducciones del Módulo RAG
 * Estructura para soporte multi-idioma
 */

export const translations = {
    en: {
        brand: "Knowledge Intelligence",
        tagline: "Enterprise RAG Solution",
        dashboard: "Dashboard",
        status: "Transmitted",
        assistant_thinking: "Assistant is thinking...",
        processing: "Processing vectors...",
        error_query: "We apologize, but we experienced a technical issue processing your request. Please try again.",
        input_placeholder: "Type your query to analyze documentation...",
        ai_warning: "AI can make mistakes. Consider checking important information.",
        powered_by: "Powered by Nubeware Search Engine",
        empty_title: "Enterprise Knowledge Analysis simplified",
        empty_subtitle: "Interact with your documents intelligently. Upload your contracts, technical files or manuals to start extracting value.",
        suggestion_1: "What are the key points of this document?",
        suggestion_2: "Summarize the risks identified in the text",
        suggestion_3: "Generate a comparison table of costs",
        suggestion_4: "Search for contract termination clauses",
        references: "Verified References",
        confidence: "Confidence",
        sidebar_title: "Knowledge Base",
        repository_status: "Repository Status",
        files: "Files",
        encrypted: "Enterprise Encrypted",
        upload_doc: "Upload Document",
        content_explorer: "Content Explorer",
        no_assets: "No assets detected",
        no_assets_desc: "The repository is empty. Start uploading technical documents to enable the search engine.",
        iso_compliant: "Compliant with ISO-27001",
        sync: "Synchronize",
        delete: "Remove document",
        source_verified: "Source Verified",
        processing_upload: "Processing...",
        transfer_error: "Transfer Error"
    },
    es: {
        brand: "Inteligencia de Conocimiento",
        tagline: "Solución RAG Empresarial",
        dashboard: "Panel",
        status: "Transmitido",
        assistant_thinking: "El asistente está pensando...",
        processing: "Procesando vectores...",
        error_query: "Lo sentimos, hemos experimentado un problema técnico procesando tu solicitud. Por favor, intenta de nuevo.",
        input_placeholder: "Escribe tu consulta para analizar la documentación...",
        ai_warning: "La IA puede cometer errores. Considera verificar la información importante.",
        powered_by: "Potenciado por el motor de búsqueda Nubeware",
        empty_title: "Análisis de Conocimiento Empresarial simplificado",
        empty_subtitle: "Interactúa con tus documentos de manera inteligente. Sube tus contratos, archivos técnicos o manuales para comenzar a extraer valor.",
        suggestion_1: "¿Cuáles son los puntos clave de este documento?",
        suggestion_2: "Resume los riesgos identificados en el texto",
        suggestion_3: "Genera una tabla comparativa de costos",
        suggestion_4: "Busca cláusulas de rescisión de contrato",
        references: "Referencias Verificadas",
        confidence: "Confianza",
        sidebar_title: "Base de Conocimiento",
        repository_status: "Estado del Repositorio",
        files: "Archivos",
        encrypted: "Encriptación Empresarial",
        upload_doc: "Cargar Documento",
        content_explorer: "Explorador de Contenido",
        no_assets: "No se detectaron activos",
        no_assets_desc: "El repositorio está vacío. Inicia la carga de documentos técnicos para habilitar el motor de búsqueda.",
        iso_compliant: "Cumple con ISO-27001",
        sync: "Sincronizar",
        delete: "Dar de baja documento",
        source_verified: "Fuente Verificada",
        processing_upload: "Procesando...",
        transfer_error: "Error de Transferencia"
    }
};

export type Language = 'en' | 'es';
export type Translations = typeof translations.en;
