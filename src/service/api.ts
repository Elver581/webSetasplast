import axios from "axios";

// -------------------------------------------------------
// Configuración base (conectada al .env -> VITE_API_BASE_URL)
// -------------------------------------------------------

export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Helper genérico basado en fetch (se mantiene por compatibilidad)
export async function fetchData<T = any>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/${endpoint.replace(/^\/+/, "")}`);
  if (!response.ok) {
    throw new Error(
      `Error fetching data from ${endpoint}: ${response.statusText}`
    );
  }
  return response.json();
}

// -------------------------------------------------------
// Tipos de la API
// -------------------------------------------------------

export interface ApiCorporateDocument {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  long_description: string;
  icon: string;
  file_type: string;
  file_size: string;
  pages: number;
  last_update: string;
  category: string;
  theme: string;
  download_url: string;
  preview_url: string;
  downloads_count: number;
  features: string[];
  benefits: string[];
}

export interface ReporteBic {
  id: number;
  uuid: string;
  nombre: string;
  archivo_path: string;
  fecha_reporte: string;
  empresa_id: number;
  empresa: {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ApiCertificacion {
  id: number;
  uuid: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  logo: string;
  logo_url: string;
  activo: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface VentanaWeb {
  activo: boolean;
  uuid: string;
  titulo: string;
  subtitulo: string;
  contenido: string;
  imagen_url: string;
  boton_activo: boolean;
  boton_texto: string;
}

export interface VentanaWebRegistroPayload {
  nombre: string;
  correo: string;
  telefono: string;
}

export interface ContactoPayload {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  mensaje: string;
}

export interface EventoPayload {
  name: string;
  company: string;
  phone: string;
  email: string;
}

// -------------------------------------------------------
// Endpoints
// -------------------------------------------------------

export function getCorporateDocuments() {
  return api.get<{ data: ApiCorporateDocument[] }>("/api/corporate-documents");
}

export function corporateDocumentDownloadUrl(slug: string): string {
  return `${API_BASE_URL}/api/corporate-documents/${slug}/download`;
}

export function getReportesBic() {
  return api.get<{ data: ReporteBic[] }>("/api/obtener-reportes-bic");
}

export function enviarPqr(formData: FormData) {
  return api.post("/api/pqr", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function enviarContacto(payload: ContactoPayload) {
  return api.post("/api/contacto", payload);
}

export function registrarEvento(payload: EventoPayload) {
  return api.post("/api/eventos", payload);
}
// Certificaciones
export function getCertificaciones() {
  return api.get<ApiCertificacion[]>("/api/obtener-certificaciones");
}

// Ventana web (popup al cargar el sitio)
export function getVentanaWebPublica() {
  return api.get<VentanaWeb>("/api/ventana-web-publica");
}

export function registrarVentanaWeb(payload: VentanaWebRegistroPayload) {
  return api.post("/api/ventana-web-registros", payload);
}