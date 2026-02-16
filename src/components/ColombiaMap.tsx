"use client";
import { memo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { motion } from "framer-motion";
import { FaTree, FaHome } from "react-icons/fa";

// -------------------------------------------------------------
// 🧩 Tipos personalizados
// -------------------------------------------------------------
interface Location {
  name: string;
  coords: [number, number];
  type: "sede" | "reforestacion";
  description: string;
  trees?: number;
}

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// 🔹 Puntos de interés: sedes principales y zonas de reforestación
const locations: Location[] = [
  {
    name: "Bogotá",
    coords: [-74.0817, 4.6097],
    type: "sede",
    description: "Sede Principal",
  },
  {
    name: "Cali",
    coords: [-76.532, 3.4516],
    type: "sede",
    description: "Punto estratégico suroccidente",
  },
  {
    name: "Medellín",
    coords: [-75.5636, 6.2518],
    type: "sede",
    description: "Punto estratégico noroccidente",
  },
  {
    name: "Bojacá",
    coords: [-74.3456, 4.7331],
    type: "reforestacion",
    description: "500 Árboles",
    trees: 500,
  },
  {
    name: "Girardot",
    coords: [-74.8067, 4.3017],
    type: "reforestacion",
    description: "500 Árboles",
    trees: 500,
  },
];

// -------------------------------------------------------------
// 🌎 Componente principal del mapa
// -------------------------------------------------------------
const ColombiaMapBase: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.div
      className="relative w-full h-[460px] rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Encabezado */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-setasplast px-6 py-2 rounded-full text-white text-sm font-semibold flex items-center gap-2 z-20">
        <FaTree className="text-green-200" />
        Compromiso Ambiental - Cundinamarca
      </div>

      {/* Efectos decorativos */}
      <motion.div
        className="absolute -top-8 -left-8 w-36 h-36 bg-green-400/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-8 -right-8 w-28 h-28 bg-setasplast/10 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* 🌎 Mapa */}
      <ComposableMap
        projection="geoMercator"
        width={800}
        height={480}
        style={{ width: "100%", height: "100%" }}
        projectionConfig={{ center: [-74.3, 4.5], scale: 2800 }}
      >
        <defs>
          <radialGradient id="spot-cundi" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="rgba(34,197,94,0.6)" />
            <stop offset="100%" stopColor="rgba(22,163,74,0.2)" />
          </radialGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ZoomableGroup center={[-74.3, 4.5]} zoom={1}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#E5E7EB"
                  stroke="#A1A1AA"
                  strokeWidth={0.3}
                />
              ))
            }
          </Geographies>

          {/* 🔹 Marcadores */}
          {locations.map((location, index) => (
            <Marker key={location.name} coordinates={location.coords}>
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.6 + index * 0.2,
                  type: "spring",
                  stiffness: 260,
                }}
                onMouseEnter={() => setHovered(location.name)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Halo animado */}
                <motion.circle
                  r={location.type === "sede" ? 12 : 10}
                  fill={
                    location.type === "sede"
                      ? "rgba(25,135,84,0.2)"
                      : "rgba(34,197,94,0.2)"
                  }
                  animate={{
                    r: location.type === "sede" ? [10, 14, 10] : [8, 12, 8],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Ícono según tipo */}
                {location.type === "sede" ? (
                  <FaHome className="text-green-700 w-4 h-4" />
                ) : (
                  <FaTree className="text-green-500 w-4 h-4" />
                )}

                {/* Nombre del marcador */}
                <text
                  y={-14}
                  textAnchor="middle"
                  className="fill-setasplast-dark font-semibold"
                  fontSize={10}
                >
                  {location.name}
                </text>

                {/* Tooltip animado */}
                {hovered === location.name && (
                  <foreignObject x={-60} y={-70} width={120} height={60}>
                    <div className="bg-white/90 text-setasplast-dark rounded-xl shadow-md p-2 text-xs text-center">
                      <strong>{location.name}</strong>
                      <br />
                      {location.description}
                      {location.trees && (
                        <>
                          <br />
                          <span className="text-green-700">
                            CO₂ estimado: ~
                            {(location.trees * 0.025).toFixed(1)} ton/año
                          </span>
                        </>
                      )}
                    </div>
                  </foreignObject>
                )}
              </motion.g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Resumen inferior */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-setasplast/90 text-green-700 px-6 py-2 rounded-2xl text-sm shadow-md">
        <strong>1000 árboles sembrados</strong> · Compromiso BIC 2024
      </div>
    </motion.div>
  );
}

export const ColombiaMap = memo(ColombiaMapBase);
