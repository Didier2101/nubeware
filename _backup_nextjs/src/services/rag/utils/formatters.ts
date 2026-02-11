/**
 * RAG Module - Utility Functions
 * Funciones auxiliares reutilizables
 */

/**
 * Formatea el tamaño de un archivo en bytes a una representación legible
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Formatea una fecha a formato de hora (HH:MM)
 */
export function formatTime(date: Date): string {
    return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Formatea una fecha a formato completo
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Formatea una fecha a formato relativo (hace X minutos/horas/días)
 */
export function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'Hace un momento';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `Hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `Hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
}

/**
 * Trunca un texto a una longitud máxima
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
}

/**
 * Obtiene la extensión de un archivo
 */
export function getFileExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}

/**
 * Obtiene un icono basado en el tipo de archivo
 */
export function getFileIcon(filename: string): string {
    const ext = getFileExtension(filename);

    const iconMap: Record<string, string> = {
        pdf: '📄',
        doc: '📝',
        docx: '📝',
        txt: '📃',
        csv: '📊',
        xls: '📊',
        xlsx: '📊',
    };

    return iconMap[ext] || '📁';
}
