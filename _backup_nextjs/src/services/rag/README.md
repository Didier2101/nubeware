# Módulo RAG - Arquitectura Modular

## 📁 Estructura del Proyecto

```
src/services/rag/
├── api/                    # Servicios API
│   └── ragService.ts      # Cliente HTTP para endpoints RAG
├── components/             # Componentes React
│   ├── RAGSystem.tsx      # Componente principal
│   ├── ChatInterface.tsx  # Interfaz de chat
│   ├── FileSidebar.tsx    # Sidebar de archivos
│   └── index.ts           # Barrel export
├── hooks/                  # Custom Hooks
│   ├── useFileList.ts     # Hook para lista de archivos (React Query)
│   ├── useFileUpload.ts   # Hook para subida de archivos
│   ├── useRAGQuery.ts     # Hook para consultas RAG
│   ├── useChatMessages.ts # Hook para gestión de mensajes
│   ├── useChatInput.ts    # Hook para input del chat
│   ├── useClipboard.ts    # Hook para copiar al portapapeles
│   ├── useSidebar.ts      # Hook para estado del sidebar
│   └── index.ts           # Barrel export
├── types/                  # Definiciones TypeScript
│   └── index.ts           # Tipos compartidos
├── utils/                  # Funciones utilitarias
│   └── formatters.ts      # Funciones de formateo
└── index.ts               # Barrel export principal
```

## 🎯 Principios de Arquitectura

### 1. Separación de Responsabilidades
Cada módulo tiene una responsabilidad única y bien definida:

- **API Layer**: Maneja todas las comunicaciones HTTP
- **Hooks Layer**: Gestiona el estado y la lógica de negocio
- **Components Layer**: Solo se encarga de la presentación
- **Types Layer**: Define los contratos de datos
- **Utils Layer**: Funciones puras reutilizables

### 2. React Query para Estado del Servidor
Usamos `@tanstack/react-query` para:
- ✅ Caching automático
- ✅ Revalidación en segundo plano
- ✅ Manejo de estados de carga y error
- ✅ Sincronización automática
- ✅ Invalidación de cache inteligente

### 3. Custom Hooks Especializados
Cada hook tiene una responsabilidad única:

#### `useFileList`
- **Responsabilidad**: Obtener y cachear la lista de archivos
- **Tecnología**: React Query (`useQuery`)
- **Características**: Auto-revalidación, caching

#### `useFileUpload`
- **Responsabilidad**: Subir archivos con validación
- **Tecnología**: React Query (`useMutation`)
- **Características**: Validación de tipo/tamaño, invalidación de cache

#### `useRAGQuery`
- **Responsabilidad**: Ejecutar consultas al sistema RAG
- **Tecnología**: React Query (`useMutation`)
- **Características**: Reintentos automáticos, manejo de errores

#### `useChatMessages`
- **Responsabilidad**: Gestionar el historial de mensajes
- **Tecnología**: React State
- **Características**: CRUD de mensajes, optimizado con useCallback

#### `useChatInput`
- **Responsabilidad**: Gestionar el input del chat
- **Tecnología**: React State + Refs
- **Características**: Validación, límite de caracteres, manejo de teclado

#### `useClipboard`
- **Responsabilidad**: Copiar texto al portapapeles
- **Tecnología**: Clipboard API
- **Características**: Feedback visual temporal

#### `useSidebar`
- **Responsabilidad**: Gestionar estado del sidebar
- **Tecnología**: React State
- **Características**: Toggle, open, close optimizados

## 🔧 Uso

### Importar el módulo completo
```typescript
import { RAGSystem } from '@/src/services/rag';
```

### Importar hooks específicos
```typescript
import { useFileList, useFileUpload, useRAGQuery } from '@/src/services/rag/hooks';
```

### Importar tipos
```typescript
import type { RAGFile, RAGResponse, ChatMessage } from '@/src/services/rag/types';
```

### Importar servicios API
```typescript
import { fetchFileList, uploadFile, executeRAGQuery } from '@/src/services/rag/api/ragService';
```

## 🚀 Configuración

### 1. Instalar dependencias
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

### 2. Configurar QueryProvider
El `QueryProvider` ya está configurado en `app/layout.tsx`:

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

### 3. Variables de entorno
Crear `.env.local`:
```env
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

## 📊 Flujo de Datos

```
Usuario → Componente → Hook → API Service → Backend
                ↓
         React Query Cache
                ↓
         Actualización UI
```

## 🎨 Mejores Prácticas Implementadas

1. ✅ **Barrel Exports**: Importaciones limpias desde un solo punto
2. ✅ **TypeScript Strict**: Tipado fuerte en todo el código
3. ✅ **Separation of Concerns**: Cada archivo tiene una responsabilidad
4. ✅ **Custom Hooks**: Lógica reutilizable y testeable
5. ✅ **Error Boundaries**: Manejo robusto de errores
6. ✅ **Loading States**: Feedback visual en todas las operaciones
7. ✅ **Optimistic Updates**: Invalidación de cache automática
8. ✅ **Accessibility**: Atributos ARIA y labels descriptivos

## 🧪 Testing

Para testear este módulo:

```typescript
// Ejemplo de test para useFileList
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

## 📝 Notas de Migración

### Cambios desde la versión anterior:

1. **Hook unificado eliminado**: El antiguo `useRAG` se dividió en hooks especializados
2. **React Query**: Ahora manejamos el estado del servidor con React Query
3. **Validación mejorada**: Validación de archivos antes de subir
4. **Mejor manejo de errores**: Estados de error específicos por operación
5. **Componentes más pequeños**: Componentes divididos en subcomponentes

### Beneficios:

- 🚀 **Mejor rendimiento**: Caching inteligente reduce llamadas al servidor
- 🧪 **Más testeable**: Hooks y servicios separados son fáciles de testear
- 🔧 **Más mantenible**: Código organizado por responsabilidades
- 📦 **Más reutilizable**: Hooks pueden usarse en otros módulos
- 🎯 **Mejor DX**: Autocompletado y tipos mejorados

## 🔮 Próximas Mejoras

- [ ] Implementar paginación en lista de archivos
- [ ] Agregar búsqueda/filtrado de archivos
- [ ] Implementar eliminación de archivos
- [ ] Agregar tests unitarios
- [ ] Implementar streaming de respuestas
- [ ] Agregar soporte para múltiples idiomas
- [ ] Implementar persistencia de conversaciones
