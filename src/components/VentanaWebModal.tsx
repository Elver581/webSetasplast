import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useVentanaWeb } from "../hook/useVentanaWeb";

const dismissKey = (uuid: string) => `setasplast-ventana-web:${uuid}`;

const VentanaWebModal = () => {
  const { ventana, loading, enviando, registrado, errores, registrar } =
    useVentanaWeb();

  const [abierta, setAbierta] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);

  const nombreRef = useRef<HTMLInputElement | null>(null);
  const correoRef = useRef<HTMLInputElement | null>(null);
  const telefonoRef = useRef<HTMLInputElement | null>(null);

  // Abrir la ventana solo si viene activa y no fue cerrada en esta sesión
  useEffect(() => {
    if (loading || !ventana || !ventana.activo) return;

    let yaCerrada = false;
    try {
      yaCerrada = sessionStorage.getItem(dismissKey(ventana.uuid)) === "1";
    } catch {
      yaCerrada = false;
    }

    if (!yaCerrada) setAbierta(true);
  }, [loading, ventana]);

  // Bloquear el scroll del body mientras está abierta
  useEffect(() => {
    if (!abierta) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [abierta]);

  const cerrar = () => {
    setAbierta(false);
    if (ventana) {
      try {
        sessionStorage.setItem(dismissKey(ventana.uuid), "1");
      } catch {
        /* sessionStorage no disponible */
      }
    }
  };

  // Cerrar con ESC
  useEffect(() => {
    if (!abierta) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierta]);

  if (!ventana || !ventana.activo) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = await registrar({
      nombre: nombreRef.current?.value.trim() || "",
      correo: correoRef.current?.value.trim() || "",
      telefono: telefonoRef.current?.value.trim() || "",
    });
    if (ok) {
      toast.success("¡Registro enviado correctamente!");
      setTimeout(cerrar, 1500);
    }
  };

  return (
    <AnimatePresence>
      {abierta && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Fondo */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={cerrar}
          />

          {/* Contenido */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ventana-web-titulo"
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar"
              className="absolute right-3 top-3 z-20 rounded-full bg-white/90 p-2 text-gray-600 shadow-md transition-colors hover:bg-white hover:text-gray-900"
            >
              <FaTimes />
            </button>

            {ventana.imagen_url && (
              <img
                src={ventana.imagen_url}
                alt={ventana.titulo}
                className="max-h-64 w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}

            <div className="p-6 lg:p-8">
              {ventana.subtitulo && (
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-setasplast">
                  {ventana.subtitulo}
                </p>
              )}
              <h2
                id="ventana-web-titulo"
                className="mb-3 text-2xl font-bold text-setasplast-dark"
              >
                {ventana.titulo}
              </h2>

              {ventana.contenido && (
                <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
                  {ventana.contenido}
                </p>
              )}

              {registrado ? (
                <p className="mt-6 rounded-xl bg-green-50 p-4 text-center text-sm font-semibold text-setasplast-dark">
                  ¡Gracias por registrarte!
                </p>
              ) : (
                ventana.boton_activo &&
                (mostrarForm ? (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                    <div>
                      <input
                        ref={nombreRef}
                        type="text"
                        placeholder="Nombre"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-setasplast focus:outline-none"
                      />
                      {errores.nombre && (
                        <p className="mt-1 text-xs text-red-500">{errores.nombre}</p>
                      )}
                    </div>
                    <div>
                      <input
                        ref={correoRef}
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-setasplast focus:outline-none"
                      />
                      {errores.correo && (
                        <p className="mt-1 text-xs text-red-500">{errores.correo}</p>
                      )}
                    </div>
                    <div>
                      <input
                        ref={telefonoRef}
                        type="tel"
                        placeholder="Teléfono"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-setasplast focus:outline-none"
                      />
                      {errores.telefono && (
                        <p className="mt-1 text-xs text-red-500">{errores.telefono}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={enviando}
                      className="w-full rounded-full bg-setasplast px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-setasplast-dark disabled:opacity-60"
                    >
                      {enviando ? "Enviando..." : "Enviar registro"}
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMostrarForm(true)}
                    className="mt-6 w-full rounded-full bg-setasplast px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-setasplast-dark"
                  >
                    {ventana.boton_texto || "Registrarme"}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VentanaWebModal;
