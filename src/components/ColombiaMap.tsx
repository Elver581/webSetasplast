"use client";
import { memo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { motion } from "framer-motion";
import { FaTree, FaHome, FaStar } from "react-icons/fa";

// -------------------------------------------------------------
// 🧩 Tipos personalizados
// -------------------------------------------------------------
interface Location {
  name: string;
  coords: [number, number];
  type: "sede" | "reforestacion" | "nueva";
  description: string;
  trees?: number;
  /** Color principal del marcador (por defecto verde marca) */
  color?: string;
  /** Color del halo/acento secundario */
  accent?: string;
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
    name: "Barranquilla",
    coords: [-74.7813, 10.9685],
    type: "nueva",
    description: "Nueva presencia · Costa Caribe",
    // 🎨 Colores de la bandera de Colombia
    color: "#FCD116", // amarillo
    accent: "#003893", // azul
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

const markerColor = (l: Location) =>
  l.color ?? (l.type === "sede" ? "#15803d" : "#22c55e");

// 🛰️ Bogotá como centro de operaciones; rutas hacia el resto de puntos
const HUB: [number, number] = [-74.0817, 4.6097];
const routes = locations.filter((l) => l.coords !== HUB && l.name !== "Bogotá");

// -------------------------------------------------------------
// 🌎 Componente principal del mapa
// -------------------------------------------------------------
const ColombiaMapBase: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.div
      className="relative w-full h-[460px]"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Animaciones CSS del mapa */}
      <style>{`
        @keyframes routeFlow { to { stroke-dashoffset: -24; } }
        .co-route { animation: routeFlow 1.1s linear infinite; }
        @keyframes coFloat {
          0%,100% { transform: translateY(0) scale(1.02); }
          50% { transform: translateY(-5px) scale(1.035); }
        }
        .co-map-float { animation: coFloat 7s ease-in-out infinite; transform-origin: center; }
      `}</style>

      {/* Encabezado */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 bg-setasplast-dark px-6 py-2 rounded-full text-white text-sm font-bold flex items-center gap-2 z-20 shadow-xl ring-1 ring-white/20"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.span
          animate={{ rotate: [0, -12, 12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaTree className="text-green-200" />
        </motion.span>
        Cobertura Nacional
      </motion.div>

      {/* 🌎 Mapa */}
      <ComposableMap
        projection="geoMercator"
        width={800}
        height={480}
        className="co-map-float"
        style={{ width: "100%", height: "100%" }}
        projectionConfig={{ center: [-74.3, 7], scale: 1700 }}
      >
        <defs>
          <radialGradient id="spot-cundi" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="rgba(34,197,94,0.6)" />
            <stop offset="100%" stopColor="rgba(22,163,74,0.2)" />
          </radialGradient>

          {/* Bandera de Colombia: amarillo (mitad), azul (1/4), rojo (1/4) */}
          <linearGradient id="flag-co" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FCD116" />
            <stop offset="50%" stopColor="#FCD116" />
            <stop offset="50%" stopColor="#003893" />
            <stop offset="75%" stopColor="#003893" />
            <stop offset="75%" stopColor="#CE1126" />
            <stop offset="100%" stopColor="#CE1126" />
          </linearGradient>

          {/* Brillo que recorre el país */}
          <linearGradient id="shine-co" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <motion.stop
              stopColor="#ffffff"
              stopOpacity="0.5"
              animate={{ offset: ["-0.25", "1.25"] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1.6,
              }}
            />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Trazo de las rutas con leve resplandor */}
          <filter id="route-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ZoomableGroup center={[-74.3, 7]} zoom={1}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies
                .filter(
                  (geo) =>
                    geo.properties.name === "Colombia" ||
                    geo.properties.NAME === "Colombia"
                )
                .map((geo) => (
                  <motion.g
                    key={geo.rsmKey}
                    initial={{ opacity: 0, scale: 0.82 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.9,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.15,
                    }}
                    style={{ transformOrigin: "center", transformBox: "fill-box" }}
                  >
                    {/* Respiración continua */}
                    <motion.g
                      animate={{ opacity: [0.88, 1, 0.88] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    >
                      <Geography
                        geography={geo}
                        fill="url(#flag-co)"
                        stroke="#ffffff"
                        strokeWidth={0.6}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "url(#flag-co)" },
                          pressed: { outline: "none" },
                        }}
                      />
                    </motion.g>
                    {/* Brillo que barre Colombia */}
                    <Geography
                      geography={geo}
                      fill="url(#shine-co)"
                      stroke="none"
                      style={{
                        default: { outline: "none", pointerEvents: "none" },
                        hover: { outline: "none", pointerEvents: "none" },
                        pressed: { outline: "none", pointerEvents: "none" },
                      }}
                    />
                  </motion.g>
                ))
            }
          </Geographies>

          {/* 🛰️ Rutas animadas desde Bogotá */}
          {routes.map((r, i) => (
            <motion.g
              key={`route-${r.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.15 }}
              style={{ pointerEvents: "none" }}
            >
              <Line
                from={HUB}
                to={r.coords}
                stroke="#ffffff"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeDasharray="2 7"
                className="co-route"
                filter="url(#route-glow)"
              />
            </motion.g>
          ))}

          {/* 🔹 Marcadores */}
          {locations.map((location, index) => {
            const isNew = location.type === "nueva";
            const color = markerColor(location);
            const accent = location.accent ?? color;
            // Rojo de la bandera de Colombia para el marcador nuevo
            const flagRed = "#CE1126";

            return (
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
                    fill={color}
                    fillOpacity={0.18}
                    animate={{
                      r: isNew
                        ? [9, 16, 9]
                        : location.type === "sede"
                        ? [10, 14, 10]
                        : [8, 12, 8],
                      opacity: [0.35, 0.08, 0.35],
                    }}
                    transition={{
                      duration: isNew ? 1.8 : 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Anillo giratorio exclusivo de la ciudad nueva */}
                  {isNew && (
                    <motion.circle
                      r={13}
                      fill="none"
                      stroke={accent}
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      style={{ transformOrigin: "0px 0px" }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  {/* Punto central */}
                  <motion.circle
                    r={isNew ? 4.5 : 3.5}
                    fill={isNew ? flagRed : color}
                    stroke="#fff"
                    strokeWidth={1}
                    animate={isNew ? { scale: [1, 1.25, 1] } : {}}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Ícono según tipo */}
                  {location.type === "sede" ? (
                    <FaHome className="text-green-700 w-4 h-4" />
                  ) : location.type === "reforestacion" ? (
                    <FaTree className="text-green-500 w-4 h-4" />
                  ) : (
                    <motion.g
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <FaStar style={{ color: flagRed }} className="w-3 h-3" />
                    </motion.g>
                  )}

                  {/* Nombre del marcador */}
                  <text
                    y={-14}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={800}
                    stroke="#ffffff"
                    strokeWidth={3.5}
                    strokeLinejoin="round"
                    paintOrder="stroke"
                    style={{ fill: isNew ? flagRed : "#0b3d2e" }}
                  >
                    {location.name}
                  </text>

                  {/* Insignia "NUEVO" */}
                  {isNew && (
                    <motion.text
                      y={-27}
                      textAnchor="middle"
                      fontSize={7.5}
                      fontWeight={800}
                      stroke="#ffffff"
                      strokeWidth={3}
                      strokeLinejoin="round"
                      paintOrder="stroke"
                      style={{ fill: flagRed }}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    >
                      ● NUEVO
                    </motion.text>
                  )}

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
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Resumen inferior */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-setasplast-dark text-white px-6 py-2 rounded-2xl text-sm shadow-xl ring-1 ring-white/20 backdrop-blur-sm whitespace-nowrap"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <strong className="text-green-300">1000 árboles sembrados</strong>
        <span className="text-white/70"> · </span>
        Compromiso BIC 2024
      </motion.div>
    </motion.div>
  );
}

export const ColombiaMap = memo(ColombiaMapBase);
