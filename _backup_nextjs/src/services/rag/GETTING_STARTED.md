# 🚀 Guía de Inicio Rápido - Módulo RAG Refactorizado

## ✅ Estado de la Refactorización

**✨ COMPLETADO** - La refactorización del módulo RAG ha sido exitosa.

## 📁 Estructura Creada

```
src/services/rag/
├── api/
│   └── ragService.ts           # Servicios HTTP
├── components/
│   ├── RAGSystem.tsx           # Componente principal
│   ├── ChatInterface.tsx       # Interfaz de chat
│   ├── FileSidebar.tsx         # Sidebar de archivos
│   └── index.ts                # Exports
├── hooks/
│   ├── useFileList.ts          # Lista de archivos (React Query)
│   ├── useFileUpload.ts        # Subida de archivos
│   ├── useRAGQuery.ts          # Consultas RAG
│   ├── useChatMessages.ts      # Historial de mensajes
│   ├── useChatInput.ts         # Input del chat
│   ├── useClipboard.ts         # Copiar al portapapeles
│   ├── useSidebar.ts           # Estado del sidebar
│   └── index.ts                # Exports
├── types/
│   └── index.ts                # Tipos TypeScript
├── utils/
│   └── formatters.ts           # Funciones de formateo
├── index.ts                    # Export principal
├── README.md                   # Documentación
├── ARCHITECTURE.md             # Diagramas de arquitectura
└── REFACTORING_SUMMARY.md      # Resumen de cambios

src/providers/
└── QueryProvider.tsx           # Provider de React Query

app/layout.tsx                  # Actualizado con QueryProvider
app/rag/page.tsx                # Actualizado con nueva importación
```

## 🎯 Cambios Principales

### 1. Hooks Especializados

**Antes:**
```typescript
const { files, query, setQuery, response, loading, uploadFile, executeQuery, refreshFileList } = useRAG();
```

**Ahora:**
```typescript
// Cada hook tiene una responsabilidad específica
const { data, isLoading, refetch } = useFileList();
const { uploadFile, isUploading, error } = useFileUpload();
const { executeQuery, response, isLoading } = useRAGQuery();
const { messages, addUserMessage, addAssistantMessage } = useChatMessages();
const chatInput = useChatInput({ onSubmit: handleSubmit });
const clipboard = useClipboard();
const sidebar = useSidebar();
```

### 2. React Query Integrado

- ✅ Caching automático
- ✅ Revalidación en segundo plano
- ✅ Estados de loading/error/success
- ✅ Invalidación de cache inteligente

### 3. Componentes Refactorizados

- **RAGSystem**: Solo coordinación de layout
- **ChatInterface**: Dividido en subcomponentes (EmptyState, LoadingIndicator, MessageBubble)
- **FileSidebar**: Dividido en subcomponentes (FileItem, EmptyFileList, FileListSkeleton)

## 🚀 Cómo Usar

### Ejecutar en Desarrollo

```bash
npm run dev
```

Luego navega a: `http://localhost:3000/rag`

### Importar el Módulo

```typescript
// Importar todo el sistema
import { RAGSystem } from '@/src/services/rag';

// Importar hooks específicos
import { useFileList, useFileUpload, useRAGQuery } from '@/src/services/rag/hooks';

// Importar tipos
import type { RAGFile, RAGResponse, ChatMessage } from '@/src/services/rag/types';

// Importar servicios API
import { fetchFileList, uploadFile, executeRAGQuery } from '@/src/services/rag/api/ragService';
```

### Ejemplo de Uso de Hooks

```typescript
'use client';

import { useFileList, useFileUpload } from '@/src/services/rag/hooks';

export function MyComponent() {
  // Hook para lista de archivos
  const { data, isLoading, error, refetch } = useFileList();
  
  // Hook para subir archivos
  const { uploadFile, isUploading } = useFileUpload();
  
  const handleUpload = async (file: File) => {
    try {
      await uploadFile(file);
      // El cache se invalida automáticamente
      // La lista se refresca sola
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h2>Archivos: {data?.files.length}</h2>
      {/* ... */}
    </div>
  );
}
```

## 📦 Dependencias Instaladas

```json
{
  "@tanstack/react-query": "^5.x.x",
  "@tanstack/react-query-devtools": "^5.x.x"
}
```

## ⚙️ Configuración

### Variables de Entorno

Asegúrate de tener en `.env.local`:

```env
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

### QueryProvider

Ya está configurado en `app/layout.tsx`:

```typescript
import { QueryProvider } from '@/src/providers/QueryProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

## 🎨 Características Implementadas

### ✅ Gestión de Archivos
- Listar archivos cargados
- Subir nuevos archivos
- Validación de tipo y tamaño
- Feedback visual de carga

### ✅ Chat Inteligente
- Historial de mensajes
- Respuestas con fuentes
- Nivel de confianza
- Copiar respuestas
- Auto-scroll

### ✅ UI/UX
- Diseño responsivo (desktop/mobile)
- Sidebar deslizante en mobile
- Estados de carga
- Manejo de errores
- Animaciones suaves

## 🧪 Testing (Próximamente)

```typescript
// Ejemplo de test
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFileList } from '@/src/services/rag/hooks';

test('should fetch file list', async () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const { result } = renderHook(() => useFileList(), { wrapper });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data?.files).toBeDefined();
});
```

## 📚 Documentación Adicional

- **README.md** - Guía completa del módulo
- **ARCHITECTURE.md** - Diagramas y flujos de datos
- **REFACTORING_SUMMARY.md** - Resumen de cambios

## 🐛 Troubleshooting

### Error: "Cannot find module '@tanstack/react-query'"

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

### Error: "You're importing a component that needs useState"

Asegúrate de que los hooks tienen `'use client'` al inicio del archivo.

### La lista de archivos no se actualiza

React Query cachea los datos. Usa `refetch()` o espera a que se invalide automáticamente.

## 🎓 Mejores Prácticas

### 1. Usar hooks especializados
```typescript
// ❌ No hagas esto
const [files, setFiles] = useState([]);
const [loading, setLoading] = useState(false);

// ✅ Haz esto
const { data, isLoading } = useFileList();
```

### 2. Aprovechar React Query
```typescript
// ❌ No hagas esto
useEffect(() => {
  fetchFiles();
}, []);

// ✅ Haz esto
const { data } = useFileList(); // Auto-fetch, auto-cache
```

### 3. Separar responsabilidades
```typescript
// ❌ No hagas esto
function Component() {
  // 200 líneas de lógica + UI
}

// ✅ Haz esto
function Component() {
  const logic = useCustomHook(); // Lógica
  return <UI {...logic} />; // Presentación
}
```

## 🚀 Próximos Pasos

1. **Probar la aplicación**
   ```bash
   npm run dev
   # Navega a http://localhost:3000/rag
   ```

2. **Revisar la documentación**
   - Lee `README.md` para entender la estructura
   - Revisa `ARCHITECTURE.md` para ver los flujos

3. **Extender funcionalidad**
   - Agregar eliminación de archivos
   - Implementar búsqueda
   - Agregar paginación

4. **Agregar tests**
   - Unit tests para hooks
   - Integration tests para componentes
   - E2E tests para flujos

## 💡 Consejos

- **Usa React Query DevTools** en desarrollo para ver el estado del cache
- **Aprovecha el caching** para reducir llamadas al servidor
- **Usa TypeScript** para detectar errores temprano
- **Lee la documentación** de React Query para features avanzadas

## 🎉 ¡Listo!

La refactorización está completa. Ahora tienes un módulo RAG modular, escalable y mantenible siguiendo las mejores prácticas de la industria.

**¿Preguntas?** Revisa la documentación en los archivos README.md y ARCHITECTURE.md.
