# Arquitectura del Módulo RAG

## Diagrama de Capas

```
┌─────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  RAGSystem   │  │ChatInterface │  │ FileSidebar  │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
┌─────────┼──────────────────┼──────────────────┼─────────────┐
│         │         HOOKS LAYER (Business Logic)│             │
│  ┌──────▼──────┐  ┌────────▼────────┐  ┌─────▼──────┐     │
│  │ useSidebar  │  │ useChatMessages │  │useFileList │     │
│  └─────────────┘  │  useChatInput   │  │useFileUpload│    │
│                   │  useRAGQuery    │  │useClipboard │     │
│                   └────────┬────────┘  └─────┬──────┘      │
└────────────────────────────┼──────────────────┼─────────────┘
                             │                  │
┌────────────────────────────┼──────────────────┼─────────────┐
│                   REACT QUERY LAYER           │             │
│                   ┌────────▼────────┐  ┌──────▼──────┐     │
│                   │  useMutation    │  │  useQuery   │     │
│                   │  (executeQuery) │  │ (fileList)  │     │
│                   │  (uploadFile)   │  └─────┬───────┘     │
│                   └────────┬────────┘        │             │
└────────────────────────────┼─────────────────┼─────────────┘
                             │                 │
┌────────────────────────────┼─────────────────┼─────────────┐
│                      API SERVICE LAYER       │             │
│                   ┌────────▼────────┐  ┌─────▼──────┐     │
│                   │ executeRAGQuery │  │fetchFileList│    │
│                   │   uploadFile    │  │ deleteFile │     │
│                   └────────┬────────┘  └─────┬──────┘      │
└────────────────────────────┼──────────────────┼─────────────┘
                             │                  │
                             ▼                  ▼
                    ┌─────────────────────────────┐
                    │      BACKEND API            │
                    │  /rag_query                 │
                    │  /upload_datasheets         │
                    │  /list_sources              │
                    │  /delete_file               │
                    └─────────────────────────────┘
```

## Flujo de Datos: Subir Archivo

```
Usuario hace click en "Subir"
         │
         ▼
FileSidebar.handleFileSelect()
         │
         ▼
useFileUpload.uploadFile(file)
         │
         ├─► Validación local (tipo, tamaño)
         │
         ▼
React Query useMutation
         │
         ▼
API Service: uploadFile(file)
         │
         ▼
HTTP POST /upload_datasheets
         │
         ▼
Backend procesa archivo
         │
         ▼
Respuesta exitosa
         │
         ▼
React Query: onSuccess
         │
         ├─► Invalida cache de fileList
         │
         ▼
useFileList se refresca automáticamente
         │
         ▼
FileSidebar muestra nuevo archivo
```

## Flujo de Datos: Ejecutar Consulta

```
Usuario escribe pregunta y presiona Enter
         │
         ▼
useChatInput.handleSubmit()
         │
         ├─► Valida que no esté vacío
         │
         ▼
useChatMessages.addUserMessage()
         │
         ├─► Agrega mensaje a la lista
         │
         ▼
useRAGQuery.executeQuery({ query })
         │
         ▼
React Query useMutation
         │
         ▼
API Service: executeRAGQuery()
         │
         ▼
HTTP POST /rag_query
         │
         ▼
Backend procesa con RAG
         │
         ▼
Respuesta con answer, sources, confidence
         │
         ▼
React Query: onSuccess
         │
         ▼
useEffect detecta nueva respuesta
         │
         ▼
useChatMessages.addAssistantMessage()
         │
         ▼
ChatInterface renderiza nuevo mensaje
         │
         ▼
Auto-scroll al final
```

## 🎨 Principios de Diseño (Premium UI/UX)

El sistema ha sido evolucionado a una estética **Premium Light Enterprise**, diseñada para proyectar profesionalismo y limpieza tecnológica.

### Visual Identity
- **Paleta**: White (#FFFFFF), Pearl Gray (#F8FAFC) y Sky Blue (#0EA5E9) como acento de marca.
- **Tipografía**: Plus Jakarta Sans (Modern Geometric Sans) para legibilidad y aire tecnológico.
- **Materialidad**: Uso extensivo de Glassmorphism suave (backdrop-blur) en headers y sidebars.

### Component UX
- **Chat**: Burbujas asimétricas con gradientes suaves para el usuario y superficies sólidas blancas para el asistente.
- **Sidebar**: Organización de activos con indicadores de seguridad y estados de cumplimiento (ISO simulation).
- **Mobile**: Navegación optimized-touch mediante "Bottom Sheets" intuitivos en lugar de sidebars laterales tradicionales.

## 🚀 Speed & Performance
- **Optimized Rendering**: Uso de `framer-motion` para transiciones fluidas de 60fps.
- **Zero CLS**: Estructura de layout fija con áreas de scroll independientes.
- **Smart Loading**: Implementación de Skeletons de alta fidelidad para estados de carga de archivos.

## Responsabilidades por Capa

### 🎨 Presentation Layer (Components)
- **Responsabilidad**: Renderizar UI y capturar eventos del usuario
- **NO debe**: Contener lógica de negocio, hacer llamadas HTTP directas
- **Debe**: Delegar toda la lógica a hooks

### 🔧 Hooks Layer
- **Responsabilidad**: Encapsular lógica de negocio y estado
- **NO debe**: Renderizar JSX, conocer detalles de la API
- **Debe**: Ser reutilizable, testeable, composable

### 🌐 React Query Layer
- **Responsabilidad**: Gestionar estado del servidor, caching, sincronización
- **NO debe**: Conocer detalles de la UI
- **Debe**: Manejar loading, error, success states

### 📡 API Service Layer
- **Responsabilidad**: Comunicación HTTP con el backend
- **NO debe**: Manejar estado de la UI
- **Debe**: Ser agnóstico del framework, retornar Promises

## Ventajas de esta Arquitectura

### 1. Testabilidad
```typescript
// Cada capa se puede testear independientemente
test('API Service', () => {
  // Mock fetch
  // Test uploadFile()
});

test('Hook', () => {
  // Mock API Service
  // Test useFileUpload()
});

test('Component', () => {
  // Mock hooks
  // Test FileSidebar
});
```

### 2. Reutilización
```typescript
// Los hooks se pueden usar en diferentes componentes
function AnotherComponent() {
  const { data } = useFileList(); // Mismo hook, mismo cache
  // ...
}
```

### 3. Mantenibilidad
```typescript
// Cambiar la API no afecta a los componentes
// Solo se actualiza el API Service
export async function uploadFile(file: File) {
  // Cambiar de REST a GraphQL
  // Los hooks y componentes no cambian
}
```

### 4. Separación de Concerns
```typescript
// Cada archivo tiene una responsabilidad única
useFileUpload.ts    → Solo subir archivos
useFileList.ts      → Solo listar archivos
useRAGQuery.ts      → Solo consultas RAG
```

## Patrones Aplicados

1. **Repository Pattern**: API Service actúa como repositorio
2. **Custom Hooks Pattern**: Encapsulación de lógica reutilizable
3. **Barrel Exports**: Importaciones limpias
4. **Separation of Concerns**: Cada capa tiene su responsabilidad
5. **Dependency Injection**: Los componentes reciben callbacks
6. **Single Responsibility**: Un archivo, una responsabilidad
