import { useState, useEffect } from "react";
import {
  getCorporateDocuments,
  type ApiCorporateDocument,
} from "../service/api";
import {
  FaFileAlt,
  FaBook,
  FaShieldAlt,
  FaHandshake,
  FaFilePdf,
  FaFileDownload,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";
import type { IconType } from "react-icons";

// -------------------------------------------------------
// Tipos de la API
// -------------------------------------------------------

type ApiDocument = ApiCorporateDocument;

// -------------------------------------------------------
// Tipo normalizado para el componente
// -------------------------------------------------------

export interface DocumentoCorporativo {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: IconType;
  fileType: string;
  fileSize: string;
  pages: number;
  lastUpdate: string;
  color: string;
  category: string;
  downloadUrl: string;
  previewUrl: string;
  downloadsCount: number;
  features: string[];
  benefits: string[];
}

// -------------------------------------------------------
// Mapas de conversión
// -------------------------------------------------------

const ICON_MAP: Record<string, IconType> = {
  "file-text": FaFileAlt,
  "file-pdf": FaFilePdf,
  "book": FaBook,
  "shield": FaShieldAlt,
  "handshake": FaHandshake,
  "download": FaFileDownload,
  "clipboard": FaClipboardList,
  "chart": FaChartBar,
};

const THEME_COLOR_MAP: Record<string, string> = {
  gestion: "#198754",
  comercial: "#22c55e",
  institucional: "#20c997",
  calidad: "#0ea5e9",
  ambiental: "#16a34a",
  seguridad: "#f59e0b",
};

function resolveIcon(iconName: string): IconType {
  return ICON_MAP[iconName] ?? FaFileAlt;
}

function resolveColor(theme: string): string {
  return THEME_COLOR_MAP[theme.toLowerCase()] ?? "#198754";
}

function mapApiDocument(doc: ApiDocument): DocumentoCorporativo {
  return {
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    subtitle: doc.subtitle,
    description: doc.description,
    longDescription: doc.long_description,
    icon: resolveIcon(doc.icon),
    fileType: doc.file_type,
    fileSize: doc.file_size,
    pages: doc.pages,
    lastUpdate: doc.last_update,
    color: resolveColor(doc.theme),
    category: doc.category,
    downloadUrl: doc.download_url,
    previewUrl: doc.preview_url,
    downloadsCount: doc.downloads_count ?? 0,
    features: doc.features ?? [],
    benefits: doc.benefits ?? [],
  };
}

// -------------------------------------------------------
// Hook
// -------------------------------------------------------

interface UseDocumentoCorporativoReturn {
  documents: DocumentoCorporativo[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDocumentoCorporativo(): UseDocumentoCorporativoReturn {
  const [documents, setDocuments] = useState<DocumentoCorporativo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getCorporateDocuments();
        if (!cancelled) setDocuments(res.data.data.map(mapApiDocument));
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDocuments();
    return () => { cancelled = true; };
  }, [tick]);

  const refetch = () => setTick((t) => t + 1);

  return { documents, loading, error, refetch };
}
