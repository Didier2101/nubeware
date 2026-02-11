/**
 * RAG Module - Type Definitions
 * Centraliza todos los tipos TypeScript del módulo RAG
 */

export interface RAGFile {
    id: string;
    name: string;
    size: number;
    uploadedAt: string;
    type: string;
}

export interface RAGResponse {
    answer: string;
    sources: string[];
    confidence: number;
    timestamp: string;
}

export interface ChatMessage {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    sources?: string[];
    confidence?: number;
}

export interface UploadFileResponse {
    success: boolean;
    message: string;
    file?: RAGFile;
}

export interface QueryRequest {
    query: string;
}

export interface FileListResponse {
    files: RAGFile[];
    total: number;
}
