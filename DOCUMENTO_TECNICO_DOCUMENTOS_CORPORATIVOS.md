# Documento tecnico: Seccion de documentos corporativos desde base de datos

## 1. Objetivo

Implementar la seccion `Centro de Recursos` para que los documentos corporativos se administren desde una base de datos y no desde datos quemados en el componente React `CorporateDocumentsSection.tsx`.

La solucion debe permitir:

- Listar documentos activos desde una API.
- Mostrar metadatos del documento: titulo, subtitulo, descripcion, categoria, tema visual, fecha, paginas y tamano.
- Mostrar caracteristicas y beneficios asociados.
- Descargar archivos PDF desde una URL publica o controlada por backend.
- Registrar el numero real de descargas.
- Copiar el enlace publico del documento.

## 2. Estado actual

Actualmente la seccion usa datos locales dentro de `src/components/CorporateDocumentsSection.tsx`.

Los documentos se importan directamente desde assets:

```ts
import brochure from "../assets/pdf/Brochure.pdf";
import politica from "../assets/pdf/PoliticaIntegral.pdf";
import catalogo from "../assets/pdf/Catalogo.pdf";
```

Y los contadores de descarga estan definidos en memoria:

```ts
const [downloadCounts, setDownloadCounts] = useState({
  "politica-integral": 1247,
  "catalogo-productos": 3856,
  "brochure-corporativo": 2134,
});
```

Esto significa que:

- Los cambios requieren modificar codigo fuente.
- Los contadores no son persistentes.
- Los PDF quedan acoplados al build del frontend.
- No hay administracion dinamica de documentos.

## 3. Arquitectura propuesta

La arquitectura recomendada es:

```txt
React / Vite
   |
   | HTTP JSON
   v
API Backend Laravel
   |
   | ORM / Eloquent
   v
MySQL o MariaDB
   |
   v
Storage publico o privado para PDF
```

El frontend solo debe renderizar la informacion. La API debe encargarse de consultar documentos, exponer URLs de descarga y registrar eventos.

## 4. Base de datos recomendada

Se recomienda usar MySQL o MariaDB, porque el proyecto ya parece consumir endpoints de una API compatible con Laravel:

- `api/obtener-reportes-bic`
- `api/pqr`

## 5. Modelo de datos

### 5.1 Tabla `corporate_documents`

Tabla principal para almacenar los documentos visibles en la seccion.

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| `id` | BIGINT UNSIGNED PK | Identificador interno |
| `slug` | VARCHAR(120) UNIQUE | Identificador publico: `politica-integral` |
| `title` | VARCHAR(180) | Titulo del documento |
| `subtitle` | VARCHAR(220) | Subtitulo mostrado en la tarjeta |
| `description` | TEXT | Descripcion corta |
| `long_description` | TEXT NULL | Descripcion extendida |
| `icon` | VARCHAR(60) | Clave del icono: `shield`, `book`, `handshake` |
| `file_type` | VARCHAR(20) | Tipo de archivo, por ejemplo `PDF` |
| `file_size` | VARCHAR(40) | Tamano legible, por ejemplo `2.4 MB` |
| `pages` | INT UNSIGNED | Numero de paginas |
| `last_update` | DATE | Fecha de actualizacion del documento |
| `category` | VARCHAR(80) | Categoria visible |
| `theme` | VARCHAR(60) | Tema visual predefinido: `gestion`, `comercial`, `institucional` |
| `file_path` | VARCHAR(500) | Ruta del archivo en storage |
| `downloads_count` | BIGINT UNSIGNED | Contador acumulado |
| `is_active` | BOOLEAN | Indica si se muestra en frontend |
| `sort_order` | INT UNSIGNED | Orden de aparicion |
| `created_at` | TIMESTAMP | Fecha de creacion |
| `updated_at` | TIMESTAMP | Fecha de actualizacion |

### 5.2 Tabla `corporate_document_features`

Tabla para los puntos de contenido principal.

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| `id` | BIGINT UNSIGNED PK | Identificador |
| `corporate_document_id` | BIGINT UNSIGNED FK | Documento asociado |
| `text` | VARCHAR(255) | Texto de la caracteristica |
| `sort_order` | INT UNSIGNED | Orden |
| `created_at` | TIMESTAMP | Fecha de creacion |
| `updated_at` | TIMESTAMP | Fecha de actualizacion |

### 5.3 Tabla `corporate_document_benefits`

Tabla para los beneficios mostrados como etiquetas.

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| `id` | BIGINT UNSIGNED PK | Identificador |
| `corporate_document_id` | BIGINT UNSIGNED FK | Documento asociado |
| `text` | VARCHAR(255) | Texto del beneficio |
| `sort_order` | INT UNSIGNED | Orden |
| `created_at` | TIMESTAMP | Fecha de creacion |
| `updated_at` | TIMESTAMP | Fecha de actualizacion |

### 5.4 Tabla `corporate_document_downloads`

Tabla opcional para auditoria de descargas.

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| `id` | BIGINT UNSIGNED PK | Identificador |
| `corporate_document_id` | BIGINT UNSIGNED FK | Documento descargado |
| `ip_address` | VARCHAR(45) NULL | IP del usuario |
| `user_agent` | TEXT NULL | Navegador/dispositivo |
| `referer` | VARCHAR(500) NULL | Pagina de origen |
| `created_at` | TIMESTAMP | Fecha de descarga |

## 6. Endpoints de API

### 6.1 Listar documentos

```http
GET /api/corporate-documents
```

Respuesta esperada:

```json
{
  "data": [
    {
      "id": 1,
      "slug": "politica-integral",
      "title": "Politica Integral",
      "subtitle": "Sistema de Gestion Integrado",
      "description": "Documento que establece nuestro compromiso con la calidad...",
      "long_description": "Nuestra Politica Integral refleja el compromiso...",
      "icon": "shield",
      "file_type": "PDF",
      "file_size": "2.4 MB",
      "pages": 24,
      "last_update": "2024-01-15",
      "category": "Gestion",
      "theme": "gestion",
      "download_url": "https://api.setas.etstechnolgy.com/storage/documents/politica-integral.pdf",
      "downloads_count": 1247,
      "features": [
        "Politica de Calidad ISO 9001:2015",
        "Compromiso Ambiental ISO 14001:2015"
      ],
      "benefits": [
        "Transparencia Corporativa",
        "Cumplimiento Normativo"
      ]
    }
  ]
}
```

### 6.2 Registrar descarga

```http
POST /api/corporate-documents/{slug}/download
```

Respuesta esperada:

```json
{
  "message": "Descarga registrada",
  "data": {
    "slug": "politica-integral",
    "download_url": "https://api.setas.etstechnolgy.com/storage/documents/politica-integral.pdf",
    "downloads_count": 1248
  }
}
```

### 6.3 Consultar documento por slug

Endpoint opcional.

```http
GET /api/corporate-documents/{slug}
```

## 7. Migraciones sugeridas en Laravel

### 7.1 `corporate_documents`

```php
Schema::create('corporate_documents', function (Blueprint $table) {
    $table->id();
    $table->string('slug', 120)->unique();
    $table->string('title', 180);
    $table->string('subtitle', 220);
    $table->text('description');
    $table->text('long_description')->nullable();
    $table->string('icon', 60)->default('pdf');
    $table->string('file_type', 20)->default('PDF');
    $table->string('file_size', 40)->nullable();
    $table->unsignedInteger('pages')->default(0);
    $table->date('last_update')->nullable();
    $table->string('category', 80);
    $table->string('theme', 60)->default('gestion');
    $table->string('file_path', 500);
    $table->unsignedBigInteger('downloads_count')->default(0);
    $table->boolean('is_active')->default(true);
    $table->unsignedInteger('sort_order')->default(0);
    $table->timestamps();
});
```

### 7.2 `corporate_document_features`

```php
Schema::create('corporate_document_features', function (Blueprint $table) {
    $table->id();
    $table->foreignId('corporate_document_id')
        ->constrained('corporate_documents')
        ->cascadeOnDelete();
    $table->string('text', 255);
    $table->unsignedInteger('sort_order')->default(0);
    $table->timestamps();
});
```

### 7.3 `corporate_document_benefits`

```php
Schema::create('corporate_document_benefits', function (Blueprint $table) {
    $table->id();
    $table->foreignId('corporate_document_id')
        ->constrained('corporate_documents')
        ->cascadeOnDelete();
    $table->string('text', 255);
    $table->unsignedInteger('sort_order')->default(0);
    $table->timestamps();
});
```

### 7.4 `corporate_document_downloads`

```php
Schema::create('corporate_document_downloads', function (Blueprint $table) {
    $table->id();
    $table->foreignId('corporate_document_id')
        ->constrained('corporate_documents')
        ->cascadeOnDelete();
    $table->string('ip_address', 45)->nullable();
    $table->text('user_agent')->nullable();
    $table->string('referer', 500)->nullable();
    $table->timestamp('created_at')->useCurrent();
});
```

## 8. Cambios requeridos en frontend

### 8.1 Crear tipo de dato para respuesta API

```ts
import type { IconType } from "react-icons";

export interface CorporateDocumentApi {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  long_description?: string;
  icon: string;
  file_type: string;
  file_size: string;
  pages: number;
  last_update: string;
  category: string;
  theme: string;
  download_url: string;
  downloads_count: number;
  features: string[];
  benefits: string[];
}

export interface CorporateDocumentView {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: IconType;
  fileType: string;
  fileSize: string;
  pages: number;
  lastUpdate: string;
  category: string;
  color: string;
  downloadUrl: string;
  downloadsCount: number;
  features: string[];
  benefits: string[];
}
```

### 8.2 Mapear iconos en React

La base de datos no debe guardar componentes React. Debe guardar una clave de texto.

```ts
const iconMap: Record<string, IconType> = {
  shield: FaShieldAlt,
  book: FaBook,
  handshake: FaHandshake,
  pdf: FaFilePdf,
};
```

### 8.3 Mapear temas visuales en React

El usuario administrativo no debe seleccionar colores hexadecimales. La base de datos debe guardar una clave sencilla en `theme`, y React debe traducir esa clave a un color aprobado por diseno.

```ts
const themeColorMap: Record<string, string> = {
  gestion: "#198754",
  comercial: "#22c55e",
  institucional: "#20c997",
  default: "#198754",
};
```

### 8.4 Consumir API

```ts
useEffect(() => {
  fetchData("api/corporate-documents")
    .then((res) => {
      const mappedDocuments = res.data.map((doc: CorporateDocumentApi) => ({
        id: doc.slug,
        title: doc.title,
        subtitle: doc.subtitle,
        description: doc.description,
        longDescription: doc.long_description ?? "",
        icon: iconMap[doc.icon] ?? FaFilePdf,
        fileType: doc.file_type,
        fileSize: doc.file_size,
        pages: doc.pages,
        lastUpdate: doc.last_update,
        category: doc.category,
        color: themeColorMap[doc.theme] ?? themeColorMap.default,
        downloadUrl: doc.download_url,
        downloadsCount: doc.downloads_count,
        features: doc.features,
        benefits: doc.benefits,
      }));

      setDocuments(mappedDocuments);
    })
    .catch(() => {
      setError("No fue posible cargar los documentos corporativos.");
    })
    .finally(() => {
      setLoading(false);
    });
}, []);
```

### 8.5 Descargar registrando en backend

```ts
const handleDownload = async (doc: CorporateDocumentView) => {
  const response = await fetch(`${API_BASE_URL}/api/corporate-documents/${doc.id}/download`, {
    method: "POST",
  });

  const result = await response.json();

  const link = document.createElement("a");
  link.href = result.data.download_url;
  link.download = doc.title;
  link.click();

  setDocuments((prev) =>
    prev.map((item) =>
      item.id === doc.id
        ? { ...item, downloadsCount: result.data.downloads_count }
        : item
    )
  );
};
```

## 9. Consideraciones de seguridad

- Validar que solo documentos activos sean visibles en el endpoint publico.
- No exponer rutas internas del servidor.
- Usar URLs publicas generadas por `Storage::url()` o rutas firmadas si el documento requiere control.
- Validar extensiones y tamano de archivos cuando se suban documentos desde un panel administrativo.
- Evitar que el frontend envie rutas de archivos para descargar; el backend debe decidir la URL final.

## 10. Consideraciones administrativas

Para una administracion completa se recomienda crear un modulo en backend con:

- Crear documento.
- Editar documento.
- Activar/desactivar documento.
- Subir o reemplazar PDF.
- Reordenar documentos.
- Seleccionar categoria y tema visual desde listas predefinidas, no desde campos de color libres.
- Ver cantidad de descargas.
- Consultar historial de descargas por fecha.

## 11. Datos iniciales sugeridos

Los documentos actuales pueden migrarse como seeders:

| Slug | Titulo | Icono | Categoria | Tema visual |
| --- | --- | --- | --- | --- |
| `politica-integral` | Politica Integral | `shield` | Gestion | `gestion` |
| `catalogo-productos` | Catalogo de Productos | `book` | Comercial | `comercial` |
| `brochure-corporativo` | Brochure Corporativo | `handshake` | Institucional | `institucional` |

## 12. Criterios de aceptacion

La implementacion se considera completa cuando:

- La seccion carga documentos desde `GET /api/corporate-documents`.
- Si la API no responde, el frontend muestra un estado de error o fallback controlado.
- Las descargas se registran en backend.
- El contador se actualiza despues de descargar.
- El enlace copiado corresponde a la URL real del PDF.
- Agregar un documento nuevo desde DB no requiere modificar el frontend, salvo que use un nuevo icono no registrado en `iconMap`.
