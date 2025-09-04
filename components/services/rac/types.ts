export interface RAGResponse {
    answer?: string;
    message?: string;
    status?: string;
    error?: string;
    [key: string]: unknown;
}

export interface ResponseDisplayProps {
    data: RAGResponse | null;
    isError?: boolean;
}

export interface RAGQueryProps {
    onQuery: (username: string, query: string) => Promise<void>;
    loading: boolean;
}

export interface FileUploadProps {
    onUpload: (files: FileList | null, metadata: string) => Promise<void>;
    loading: boolean;
}

export interface SourceManagerProps {
    onListSources: () => Promise<void>;
    onRemoveSource: (sourceName: string) => Promise<void>;
    loading: boolean;
}

export interface AdminPanelProps {
    onGetDatabaseInfo: () => Promise<void>;
    onClearDatabase: () => Promise<void>;
    loading: boolean;
}