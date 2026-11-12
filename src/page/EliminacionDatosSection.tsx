import { Link } from 'react-router-dom';
import { FaEnvelope, FaWhatsapp, FaClock, FaShieldAlt } from 'react-icons/fa';

const CORREO = 'habeasdata@setasplast.com.co';

const pasos = [
  {
    titulo: 'Escríbenos',
    texto: `Envía un correo a ${CORREO} con el asunto «Eliminación de datos», o radica la solicitud en nuestro formulario de PQR.`,
  },
  {
    titulo: 'Identifícate',
    texto: 'Indica tu nombre completo y los datos con los que nos contactaste: el correo, el teléfono o el número de WhatsApp desde el que nos escribiste, para ubicar tu información.',
  },
  {
    titulo: 'Confirmamos y eliminamos',
    texto: 'Verificamos que la solicitud sea tuya, eliminamos tus datos de nuestros sistemas y te confirmamos por el mismo medio.',
  },
];

const datos = [
  'Datos de contacto: nombre, correo electrónico, teléfono y empresa.',
  'Conversaciones con nuestro asistente virtual del sitio web y de WhatsApp.',
  'Solicitudes, cotizaciones y PQR registradas a tu nombre que no estemos obligados a conservar.',
];

const EliminacionDatosSection = () => (
  <section className="mx-auto max-w-3xl px-4 py-12">
    <p className="text-sm font-semibold uppercase tracking-wide text-setasplast">Protección de datos</p>
    <h1 className="mt-2 text-3xl font-bold text-gray-900">Eliminación de datos personales</h1>
    <p className="mt-4 text-gray-600">
      En SetasPlast SAS BIC puedes pedir en cualquier momento que eliminemos tus datos personales, incluidos los de las conversaciones que hayas tenido con
      nosotros por WhatsApp, por el chat de este sitio o por cualquier otro canal. Es un derecho que te reconoce la Ley 1581 de 2012 y lo cumplimos sin costo.
    </p>

    <h2 className="mt-10 text-xl font-bold text-gray-900">Cómo solicitarlo</h2>
    <ol className="mt-4 space-y-4">
      {pasos.map((paso, i) => (
        <li key={paso.titulo} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-setasplast text-sm font-bold text-white">{i + 1}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{paso.titulo}</h3>
            <p className="mt-1 text-sm text-gray-600">{paso.texto}</p>
          </div>
        </li>
      ))}
    </ol>

    <div className="mt-6 flex flex-wrap gap-3">
      <a href={`mailto:${CORREO}?subject=Eliminación de datos`} className="inline-flex items-center gap-2 rounded-full bg-setasplast px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-setasplast-dark">
        <FaEnvelope /> Escribir por correo
      </a>
      <Link to="/pqr" className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
        <FaShieldAlt /> Ir al formulario de PQR
      </Link>
    </div>

    <h2 className="mt-10 flex items-center gap-2 text-xl font-bold text-gray-900"><FaWhatsapp className="text-green-600" /> Qué datos eliminamos</h2>
    <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
      {datos.map((dato) => <li key={dato}>{dato}</li>)}
    </ul>
    <p className="mt-4 text-sm text-gray-500">
      Podemos conservar la información que la ley nos obligue a mantener (por ejemplo, soportes contables o tributarios de operaciones ya realizadas) únicamente
      durante el tiempo que la norma exija; en ese caso te lo explicamos en la respuesta.
    </p>

    <h2 className="mt-10 flex items-center gap-2 text-xl font-bold text-gray-900"><FaClock className="text-setasplast" /> Cuánto tardamos</h2>
    <p className="mt-2 text-gray-600">
      Respondemos tu solicitud en un máximo de quince (15) días hábiles contados desde su recepción, como lo establece la Ley 1581 de 2012.
    </p>

    <p className="mt-10 text-sm text-gray-500">
      Más información sobre cómo tratamos tus datos en nuestra <Link to="/politica-privacidad" className="font-semibold text-setasplast hover:underline">Política de privacidad</Link>.
    </p>
  </section>
);

export default EliminacionDatosSection;
