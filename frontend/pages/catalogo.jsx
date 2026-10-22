import Head from 'next/head';
import { useState } from 'react';
import { getWaLink } from '../utils/whatsapp';

const FONT_RALEWAY_900 = { fontFamily: "'Raleway', sans-serif", fontWeight: 900, textTransform: 'uppercase' };
const FONT_ROBOTO = { fontFamily: "'Roboto', sans-serif" };
const FONT_ROBOTO_500 = { fontFamily: "'Roboto', sans-serif", fontWeight: 500 };

const WaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CATEGORIAS = [
  { id: 'todas', label: 'Todas las categorías' },
  { id: 'indumentaria', label: 'Indumentaria y Calzado (Venta)' },
  { id: 'epp', label: 'Seguridad Personal / EPP (Venta)' },
  { id: 'vallas', label: 'Vallas y Cerramientos (Alquiler)' },
  { id: 'balizamiento', label: 'Balizas y Equipos Viales (Alquiler)' },
];

const MODALIDADES = [
  { id: 'todas', label: 'Todo' },
  { id: 'venta', label: '🛒 Venta: Seguridad Personal (EPP)' },
  { id: 'alquiler', label: '🔶 Solo Alquiler: Equipamiento Vial' },
];

// ──────────────────────────────────────────────────────────────────────────────
// REGLA DE NEGOCIO STRICTA SEGÚN FOLLETOS OFICIALES:
// 1. VENTA: ÚNICAMENTE artículos de seguridad personal para el obrero / EPP
//    e indumentaria laboral.
// 2. ALQUILER: Equipamiento de seguridad vial y cerramiento en obra (vallas,
//    balizas, semáforos, flechas, chapones, conos, tambores, carteles de obra).
//    NO se vende, solo servicio de provisión, traslado y mantenimiento en traza.
// ──────────────────────────────────────────────────────────────────────────────
const PRODUCTOS = [
  // ════════════════════════════════════════════════════════════════════════════
  // 🛒 VENTA: SEGURIDAD PERSONAL PARA EL OBRERO / INDUMENTARIA Y CALZADO
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: 101,
    categoria: 'indumentaria',
    modalidad: 'venta',
    nombre: 'Chaleco Reflectivo de Alta Visibilidad',
    desc: 'Chaleco de seguridad fluorescente con bandas retrorreflectivas homologadas para máxima visibilidad del operario en obra vial y civil.',
    specs: ['Bandas retrorreflectivas normalizadas', 'Colores alta visibilidad (naranja / amarillo flúor)', 'Cierre con velcro ajustable'],
    foto: null,
  },
  {
    id: 102,
    categoria: 'indumentaria',
    modalidad: 'venta',
    nombre: 'Ropa de Trabajo (Pantalón y Camisa de Grafa)',
    desc: 'Conjunto de indumentaria laboral confeccionado en tela de alta resistencia para el obrero en tareas de construcción, taller y vialidad.',
    specs: ['Costuras reforzadas en zonas de esfuerzo', 'Múltiples bolsillos portaherramientas', 'Talles del 38 al 60'],
    foto: null,
  },
  {
    id: 103,
    categoria: 'indumentaria',
    modalidad: 'venta',
    nombre: 'Traje Impermeable para Lluvia',
    desc: 'Conjunto de chaqueta y pantalón impermeable termosellado para operarios en tareas a la intemperie bajo condiciones climáticas adversas.',
    specs: ['Impermeabilidad total en PVC/Poliéster', 'Costuras termoselladas electrónicamente', 'Capucha incorporada con cordón de ajuste'],
    foto: null,
  },
  {
    id: 104,
    categoria: 'indumentaria',
    modalidad: 'venta',
    nombre: 'Calzado de Seguridad con Puntera de Acero',
    desc: 'Botines de seguridad ergonómicos para el operario con puntera de acero certificada y suela antideslizante resistente a hidrocarburos.',
    specs: ['Puntera de acero certificada IRAM 3610', 'Suela de poliuretano bidensidad antideslizante', 'Propiedades dieléctricas'],
    foto: null,
  },
  {
    id: 105,
    categoria: 'indumentaria',
    modalidad: 'venta',
    nombre: 'Botas de Goma y Waders para Obra',
    desc: 'Calzado impermeable de caña alta y waders para obreros en zanjeos, excavaciones, lodo y áreas anegadas.',
    specs: ['Compuesto de PVC/goma impermeable virgen', 'Suela con dibujo autolimpiante de alto agarre', 'Resistencia química e hidrocarburos'],
    foto: null,
  },
  {
    id: 106,
    categoria: 'indumentaria',
    modalidad: 'venta',
    nombre: 'Mameluco de Trabajo Entero',
    desc: 'Mameluco enterizo de protección para operarios industriales, mecánicos y tareas de mantenimiento general.',
    specs: ['Cierre frontal de doble cursor reforzado', 'Cintura elastizada para libertad de movimiento', 'Telas de alta durabilidad y lavado fácil'],
    foto: null,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 🛒 VENTA: SEGURIDAD PERSONAL PARA EL OBRERO / PROTECCIÓN INDIVIDUAL (EPP)
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: 107,
    categoria: 'epp',
    modalidad: 'venta',
    nombre: 'Casco de Seguridad Industrial',
    desc: 'Casco de protección para la cabeza en obras y plantas. Clase A, B y E (dieléctrico) con suspensión y arnés regulable.',
    specs: ['Certificación IRAM 3620', 'Arnés a cremallera regulable', 'Variedad de colores reglamentarios'],
    foto: null,
  },
  {
    id: 108,
    categoria: 'epp',
    modalidad: 'venta',
    nombre: 'Protección Ocular (Anteojos y Antiparras)',
    desc: 'Anteojos de seguridad de policarbonato con tratamiento antirrayadura y antiparras estancas para protección visual del trabajador.',
    specs: ['Lentes de policarbonato alta resistencia al impacto', 'Filtro UV al 99.9%', 'Patillas y puente ergonómicos'],
    foto: null,
  },
  {
    id: 109,
    categoria: 'epp',
    modalidad: 'venta',
    nombre: 'Protección Facial y Caretas para Soldar',
    desc: 'Máscaras faciales rebatibles contra proyecciones de esquirlas y partículas, y caretas para soldadura eléctrica y autógena.',
    specs: ['Pantalla de policarbonato intercambiable', 'Arnés a cremallera regulable', 'Protección integral de rostro y cuello'],
    foto: null,
  },
  {
    id: 110,
    categoria: 'epp',
    modalidad: 'venta',
    nombre: 'Guantes de Seguridad Industrial',
    desc: 'Guantes de vaqueta, descarne, nitrilo y anticorte para manipulación de materiales pesados, fierros y herramientas.',
    specs: ['Modelos en vaqueta, descarne y nitrilo', 'Costuras reforzadas de alta durabilidad', 'Excelente agarre y destreza manual'],
    foto: null,
  },
  {
    id: 111,
    categoria: 'epp',
    modalidad: 'venta',
    nombre: 'Protección Auditiva (Copas y Tapones Endoaurales)',
    desc: 'Protectores auditivos tipo copa adosables o con vincha y tapones endoaurales de silicona o espuma expansible.',
    specs: ['Atenuación acústica NRR/SNR homologada', 'Almohadillas acolchadas de confort continuo', 'Modelos reutilizables y descartables'],
    foto: null,
  },
  {
    id: 112,
    categoria: 'epp',
    modalidad: 'venta',
    nombre: 'Protección Respiratoria (Semimáscaras y Mascarillas)',
    desc: 'Semimáscaras con filtros intercambiables para vapores orgánicos / polvos y mascarillas descartables N95 para operarios.',
    specs: ['Ajuste hermético de cuatro puntos', 'Filtros reemplazables según el riesgo', 'Material elastomérico hipoalergénico'],
    foto: null,
  },
  {
    id: 113,
    categoria: 'epp',
    modalidad: 'venta',
    nombre: 'Arnés de Seguridad y Cinturón Anticaídas',
    desc: 'Arnés anticaídas de cuerpo entero con punto de anclaje dorsal y frontal, y cabo de vida con amortiguador de caída para trabajos en altura.',
    specs: ['Norma IRAM 3622-1', 'Cintas de poliéster de alta tenacidad', 'Herrajes de acero forjado cincado'],
    foto: null,
  },
  {
    id: 114,
    categoria: 'epp',
    modalidad: 'venta',
    nombre: 'Faja Lumbar Ergonómica de Soporte',
    desc: 'Faja de contención con ballenas flexibles y tiradores regulables para obreros que realizan levantamiento y manipulación de cargas.',
    specs: ['Ballenas lumbares flexibles integradas', 'Tiradores elásticos regulables', 'Cierre con velcro de alta adherencia'],
    foto: null,
  },
  {
    id: 115,
    categoria: 'epp',
    modalidad: 'venta',
    nombre: 'Botiquín de Primeros Auxilios para Obra',
    desc: 'Gabinete con elementos básicos de primeros auxilios reglamentarios para frentes de trabajo, obradores y cuadrillas.',
    specs: ['Insumos reglamentarios para emergencias', 'Gabinete portátil con soporte para pared', 'Apertura rápida y cierre hermético'],
    foto: null,
  },
  {
    id: 116,
    categoria: 'epp',
    modalidad: 'venta',
    nombre: 'Matafuegos y Elementos contra Incendio',
    desc: 'Extintores reglamentarios de polvo químico ABC y CO₂ con tarjeta y certificación vigente para obradores y maquinaria pesada.',
    specs: ['Carga certificada y sello de control', 'Manómetro de control de presión', 'Capacidades de 1, 2.5, 5 y 10 kg'],
    foto: null,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 🔶 SOLO ALQUILER: VALLAS, CERRAMIENTOS Y DISPOSITIVOS EN OBRA
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: 201,
    categoria: 'vallas',
    modalidad: 'alquiler',
    nombre: 'Valla Metálica Peatonal (Alquiler)',
    desc: 'Vallas peatonales metálicas modulares para canalización de flujos y delimitación en obra urbana o eventos. Exclusivamente servicio de alquiler con traslado, montaje y retiro en traza.',
    specs: ['2,00 m de largo × 1,10 m de alto', 'Caño galvanizado de alta resistencia', 'Sistema de encastre rápido para encadenado'],
    foto: null,
  },
  {
    id: 202,
    categoria: 'vallas',
    modalidad: 'alquiler',
    nombre: 'Valla de Obra Pesada con Reflectivo (Alquiler)',
    desc: 'Valla robusta para cerramiento de frentes de obra en calzada con franjas retrorreflectivas normalizadas. Provisión en régimen de alquiler con logística en obra.',
    specs: ['Franjas retrorreflectivas de alta visibilidad', 'Estructura rígida de gran estabilidad al viento', 'Servicio de entrega y reposición en obra'],
    foto: null,
  },
  {
    id: 203,
    categoria: 'vallas',
    modalidad: 'alquiler',
    nombre: 'Pasarela Peatonal Metálica para Zanja (Alquiler)',
    desc: 'Pasarelas metálicas con barandas reglamentarias para habilitación de cruce peatonal seguro sobre excavaciones y zanjas en vereda o calzada.',
    specs: ['Piso antideslizante estampado', 'Doble baranda de contención reglamentaria', 'Traslado y colocación en obra'],
    foto: null,
  },
  {
    id: 204,
    categoria: 'vallas',
    modalidad: 'alquiler',
    nombre: 'Chapón de Acero para Pavimento y Zanjas (Alquiler)',
    desc: 'Planchas de acero reforzadas para cruce vehicular transitorio y tapado de zanjas en calzadas urbanas y rutas. Provisión exclusiva en modalidad alquiler.',
    specs: ['Espesores aptos para tránsito pesado y liviano', 'Ojales para izaje y maniobra rápida', 'Servicio de entrega y retiro en obra'],
    foto: null,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 🔶 SOLO ALQUILER: BALIZAS, SEMÁFOROS Y DISPOSITIVOS VIALES DE OBRA
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: 205,
    categoria: 'balizamiento',
    modalidad: 'alquiler',
    nombre: 'Baliza Luminosa LED Intermitente / Destellante (Alquiler)',
    desc: 'Baliza destellante autónoma solar / a batería para señalización nocturna sobre vallas, tambores o conos. Provisión exclusiva en alquiler con recambio y mantenimiento.',
    specs: ['Óptica de 360° con fotocélula crepuscular', 'Destello ámbar o rojo de alta potencia', 'Mantenimiento y recambio de baterías incluido'],
    foto: null,
  },
  {
    id: 206,
    categoria: 'balizamiento',
    modalidad: 'alquiler',
    nombre: 'Semáforo Portátil de Obra para Desvíos (Alquiler)',
    desc: 'Semáforos viales portátiles para regulación de tránsito de carril alternado en tramos de calzada reducida. Solo alquiler con soporte operativo.',
    specs: ['Ópticas LED de alta luminosidad y bajo consumo', 'Temporizador regulable para ciclo de paso', 'Estructura móvil de fácil desplazamiento en obra'],
    foto: null,
  },
  {
    id: 207,
    categoria: 'balizamiento',
    modalidad: 'alquiler',
    nombre: 'Flecha Luminosa Direccional LED (Alquiler)',
    desc: 'Dispositivo luminoso direccional para aviso de desvío y cierre de carril en avenidas y rutas. Provisión en alquiler con logística en sitio.',
    specs: ['LEDs ámbar de alta visibilidad diurna y nocturna', 'Modos flecha derecha, izquierda y destello', 'Soporte telescópico móvil'],
    foto: null,
  },
  {
    id: 208,
    categoria: 'balizamiento',
    modalidad: 'alquiler',
    nombre: 'Tambor / Tacho Canalizador Vial (Alquiler)',
    desc: 'Tambor plástico rotomoldeado con fajas retrorreflectivas para canalización y bifurcación de tránsito en obra vial. Provisión en régimen de alquiler.',
    specs: ['Polietileno de alta resistencia al impacto', 'Fajas retrorreflectivas normalizadas', 'Base lastrable con agua o arena'],
    foto: null,
  },
  {
    id: 209,
    categoria: 'balizamiento',
    modalidad: 'alquiler',
    nombre: 'Conos y Delineadores Viales Reflectivos (Alquiler)',
    desc: 'Conos de PVC flexible de 70 cm y 90 cm con bandas retrorreflectivas y delineadores viales para balizamiento transitorio de obra.',
    specs: ['PVC flexible indeformable de alta visibilidad', 'Bandas reflectivas de alta intensidad', 'Provisión por lote con entrega en obrador'],
    foto: null,
  },
  {
    id: 210,
    categoria: 'balizamiento',
    modalidad: 'alquiler',
    nombre: 'Malla Plástica de Seguridad Naranja (Alquiler y Provisión)',
    desc: 'Mallas plásticas de advertencia color naranja para delimitación perimetral de excavaciones, zanjas y áreas de riesgo en obra.',
    specs: ['Polietileno extruido con tratamiento anti-UV', 'Alta resistencia mecánica y visibilidad', 'Provisión en obra por metros lineales'],
    foto: null,
  },
  {
    id: 211,
    categoria: 'balizamiento',
    modalidad: 'alquiler',
    nombre: 'Cartelería Transitoria de Obra (Alquiler con Instalación)',
    desc: 'Carteles viales transitorios de desvío y velocidad reducida provistos en régimen de alquiler con soporte, traslado y colocación en traza.',
    specs: ['Leyendas normalizadas de obra y desvío', 'Láminas retrorreflectivas de alta reflectividad', 'Montaje sobre caballete o estructura móvil'],
    foto: null,
  },
];

// ─── Badge de modalidad ───────────────────────────────────────────────────────
function ModalidadBadge({ modalidad }) {
  if (modalidad === 'venta') {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
        background: 'linear-gradient(135deg,#1a6fcf,#0e4fa8)',
        color: '#fff', fontSize: '0.62rem', fontWeight: 800,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        padding: '0.24rem 0.65rem', borderRadius: '3px',
        border: '1px solid rgba(30,100,220,0.5)',
        boxShadow: '0 1px 6px rgba(14,79,168,0.4)',
        fontFamily: "'Roboto',sans-serif",
      }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7.3-5h7.45c.75 0 1.41-.41 1.75-1.03L21 4H5.21l-.94-2H1v2h2l3.6 7.59L5.25 14c-.16.28-.25.61-.25.96C5 16.1 5.9 17 7 17h14v-2H7.42c-.14 0-.25-.11-.25-.25z"/></svg>
        VENTA
      </span>
    );
  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
      background: 'linear-gradient(135deg,#d97706,#b45309)',
      color: '#fff', fontSize: '0.62rem', fontWeight: 800,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      padding: '0.24rem 0.65rem', borderRadius: '3px',
      border: '1px solid rgba(217,119,6,0.5)',
      boxShadow: '0 1px 6px rgba(180,83,9,0.4)',
      fontFamily: "'Roboto',sans-serif",
    }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
      SOLO ALQUILER
    </span>
  );
}

function ProductCard({ producto }) {
  const catLabel = CATEGORIAS.find(c => c.id === producto.categoria)?.label || '';
  const esAlquiler = producto.modalidad === 'alquiler';

  const mensajeWa = esAlquiler
    ? `Hola, me comunico desde la web de Tecno Light para solicitar presupuesto de ALQUILER de: ${producto.nombre}`
    : `Hola, me comunico desde la web de Tecno Light para solicitar cotización de compra de: ${producto.nombre}`;

  const waLink = getWaLink(mensajeWa);
  const ctaLabel = esAlquiler ? 'Consultar Alquiler en Obra' : 'Solicitar Cotización de Compra';
  const ctaStyle = esAlquiler
    ? { ...FONT_ROBOTO_500, background: 'linear-gradient(135deg,#d97706,#b45309)', boxShadow: '0 4px 12px rgba(180,83,9,0.3)' }
    : { ...FONT_ROBOTO_500, background: 'linear-gradient(135deg,#1a6fcf,#0e4fa8)', boxShadow: '0 4px 12px rgba(14,79,168,0.3)' };

  return (
    <div className="card-corporate flex flex-col overflow-hidden group">
      <div className="relative bg-slate-800/60 aspect-[4/3] flex items-center justify-center overflow-hidden border-b border-white/5">
        {producto.foto ? (
          <img src={producto.foto} alt={producto.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <svg width="48" height="56" viewBox="0 0 48 56" fill="none">
              <path d="M24 2L46 14V38L24 50L2 38V14L24 2Z" stroke={esAlquiler ? 'rgba(217,119,6,0.35)' : 'rgba(26,111,207,0.35)'} strokeWidth="1.5"/>
              <path d="M24 12L36 19V33L24 40L12 33V19L24 12Z" stroke={esAlquiler ? 'rgba(217,119,6,0.2)' : 'rgba(26,111,207,0.2)'} strokeWidth="1"/>
            </svg>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Foto próximamente</span>
          </div>
        )}
        {/* Badge categoría — izquierda */}
        <div className="absolute top-3 left-3">
          <span className="badge-ig" style={{ fontSize: '0.6rem', padding: '0.25rem 0.65rem' }}>
            {catLabel.replace(' (Venta)', '').replace(' (Alquiler)', '')}
          </span>
        </div>
        {/* Badge modalidad — derecha */}
        <div className="absolute top-3 right-3">
          <ModalidadBadge modalidad={producto.modalidad} />
        </div>
        <div className="corner-brand-glow" style={{ opacity: 0.35 }} />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-white font-bold text-sm leading-snug mb-2" style={FONT_RALEWAY_900}>{producto.nombre}</h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1" style={FONT_ROBOTO}>{producto.desc}</p>
        <ul className="space-y-1 mb-5">
          {producto.specs.map((s, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-slate-400" style={FONT_ROBOTO}>
              <span className={`w-1 h-1 rounded-full ${esAlquiler ? 'bg-amber-500' : 'bg-[#1a6fcf]'} shrink-0`} />{s}
            </li>
          ))}
        </ul>
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 text-white font-bold text-xs px-4 py-2.5 rounded-sm transition-all hover:-translate-y-0.5 shadow-md"
          style={ctaStyle}>
          <WaIcon size={14} />{ctaLabel}
        </a>
        {esAlquiler && (
          <p className="text-[10px] text-amber-500/80 mt-2 text-center leading-tight font-medium" style={FONT_ROBOTO}>
            Servicio de alquiler · traslado · montaje y mantenimiento en traza
          </p>
        )}
      </div>
    </div>
  );
}

export default function Catalogo() {
  const [categoriaActiva, setCategoriaActiva] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [modalidadFiltro, setModalidadFiltro] = useState('todas');

  const productosFiltrados = PRODUCTOS.filter(p => {
    const matchCat = categoriaActiva === 'todas' || p.categoria === categoriaActiva;
    const matchBusq = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.desc.toLowerCase().includes(busqueda.toLowerCase());
    const matchModal = modalidadFiltro === 'todas' || p.modalidad === modalidadFiltro;
    return matchCat && matchBusq && matchModal;
  });

  const totalVenta = PRODUCTOS.filter(p => p.modalidad === 'venta').length;
  const totalAlquiler = PRODUCTOS.filter(p => p.modalidad === 'alquiler').length;

  return (
    <>
      <Head>
        <title>Catálogo de Venta de EPP y Alquiler Vial | TECNO LIGHT S.R.L.</title>
        <meta name="description" content="Venta exclusiva de artículos de seguridad personal para el obrero (EPP e indumentaria). Alquiler de equipamiento vial: vallas, balizas, semáforos, chapones y conos con traslado y mantenimiento en traza." />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Hero */}
      <section className="section-ig-card pt-32 pb-14 px-4 border-b border-white/5 relative">
        <div className="corner-brand-glow" style={{ width: '350px', height: '350px' }} />
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-10">
          <hr className="divider-orange mb-8" style={{ width: '60px' }} />
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="badge-ig mb-4 inline-block">Catálogo Oficial</span>
              <h1 className="text-white leading-none tracking-tight" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
                PRODUCTOS Y <span className="text-[#F26922]">SERVICIOS</span>
              </h1>
              <p className="text-slate-300 text-sm max-w-2xl mt-4 leading-relaxed" style={FONT_ROBOTO}>
                <strong className="text-white">Venta exclusiva</strong> de artículos de seguridad personal para el obrero: calzado, cascos, indumentaria de trabajo, guantes, protección respiratoria, ocular y arneses.{' '}
                <strong className="text-amber-400">Servicio de alquiler exclusivo</strong> de equipamiento de seguridad vial: vallas peatonales y pesadas, balizas destellantes LED, semáforos portátiles, flechas luminosas, chapones de acero y canalizadores en traza.
              </p>
              {/* Indicadores de modalidad */}
              <div className="flex flex-wrap gap-3 mt-5">
                <div className="flex items-center gap-2 bg-blue-900/30 border border-blue-700/40 rounded-md px-3 py-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-blue-300 text-xs font-bold" style={FONT_ROBOTO_500}>VENTA — Seguridad Personal para el Obrero</span>
                  <span className="text-blue-400 text-xs">({totalVenta} artículos)</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-900/30 border border-amber-700/40 rounded-md px-3 py-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-amber-300 text-xs font-bold" style={FONT_ROBOTO_500}>SOLO ALQUILER — Vallas y Dispositivos Viales</span>
                  <span className="text-amber-400 text-xs">({totalAlquiler} equipos)</span>
                </div>
              </div>
            </div>
            <a href={getWaLink('Hola, me comunico desde la web de Tecno Light para solicitar información de productos y servicios.')} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1db954] text-white font-bold px-6 py-3 rounded-sm text-sm transition-all shadow-lg shrink-0"
              style={FONT_ROBOTO_500}>
              <WaIcon size={18} />Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Filtros sticky */}
      <div className="sticky top-16 lg:top-20 z-30 section-solid-dark border-b border-white/5 py-3 px-4 shadow-lg">
        <div className="max-w-site mx-auto px-5 lg:px-10 flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
          {/* Barra de búsqueda */}
          <div className="relative w-full sm:w-56 shrink-0">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" placeholder="Buscar por artículo o equipo..." value={busqueda} onChange={e => setBusqueda(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm pl-9 pr-4 py-2 rounded-sm focus:border-[#F26922]/60 focus:outline-none transition-colors"
              style={FONT_ROBOTO} />
          </div>

          {/* Filtro por modalidad */}
          <div className="flex gap-1.5 shrink-0 flex-wrap">
            {MODALIDADES.map(m => (
              <button key={m.id} onClick={() => setModalidadFiltro(m.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all ${
                  modalidadFiltro === m.id
                    ? m.id === 'alquiler' ? 'bg-amber-600 text-white shadow-md'
                      : m.id === 'venta' ? 'bg-blue-700 text-white shadow-md'
                      : 'bg-[#F26922] text-white shadow-md'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/8'
                }`} style={FONT_ROBOTO_500}>
                {m.label}
              </button>
            ))}
          </div>

          {/* Filtro por categoría */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS.map(cat => (
              <button key={cat.id} onClick={() => setCategoriaActiva(cat.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all ${
                  categoriaActiva === cat.id
                    ? 'bg-[#F26922] text-white shadow-md'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/8'
                }`} style={FONT_ROBOTO_500}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grilla de productos */}
      <section className="section-ig-card py-12 px-4 min-h-[60vh]">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between mb-8">
            <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold" style={FONT_ROBOTO_500}>
              Mostrando {productosFiltrados.length} artículo{productosFiltrados.length !== 1 ? 's' : ''} y equipo{productosFiltrados.length !== 1 ? 's' : ''}
            </p>
            <span className="text-slate-500 text-xs flex items-center gap-1.5" style={FONT_ROBOTO}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              Datos actualizados según folletos oficiales
            </span>
          </div>

          {productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {productosFiltrados.map(p => <ProductCard key={p.id} producto={p} />)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg className="mb-4 text-slate-700" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <p className="text-slate-400 text-sm mb-3" style={FONT_ROBOTO}>No se encontraron artículos con los filtros seleccionados.</p>
              <button onClick={() => { setCategoriaActiva('todas'); setBusqueda(''); setModalidadFiltro('todas'); }}
                className="text-[#F26922] text-xs font-bold hover:underline" style={FONT_ROBOTO_500}>
                Restablecer todos los filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Aclaración de modelo de negocio */}
      <section className="py-12 px-4 border-t border-white/5 bg-slate-950/60">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex gap-4 bg-blue-950/30 border border-blue-800/40 rounded-xl p-6">
              <div className="mt-1 w-3 h-3 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <div>
                <p className="text-blue-300 text-xs font-black uppercase tracking-widest mb-1.5" style={FONT_ROBOTO_500}>
                  VENTA DIRECTA — Artículos de Seguridad Personal para el Obrero
                </p>
                <p className="text-slate-300 text-xs leading-relaxed" style={FONT_ROBOTO}>
                  La empresa comercializa en modalidad de <strong className="text-white">venta</strong> todo el equipamiento de protección para el trabajador: calzado con puntera de acero, cascos, guantes de descarne y vaqueta, indumentaria de trabajo y de lluvia, arneses anticaída, fajas lumbares, protección respiratoria, auditiva y facial, botiquines y matafuegos.
                </p>
              </div>
            </div>
            <div className="flex gap-4 bg-amber-950/30 border border-amber-800/40 rounded-xl p-6">
              <div className="mt-1 w-3 h-3 rounded-full bg-amber-500 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              <div>
                <p className="text-amber-300 text-xs font-black uppercase tracking-widest mb-1.5" style={FONT_ROBOTO_500}>
                  SOLO ALQUILER — Vallas, Balizas y Equipamiento Vial en Obra
                </p>
                <p className="text-slate-300 text-xs leading-relaxed" style={FONT_ROBOTO}>
                  El equipamiento vial y cerramientos (<strong className="text-amber-200">vallas peatonales y pesadas, balizas LED destellantes, semáforos portátiles, flechas luminosas, chapones de acero y canalizadores</strong>) <strong className="text-white">NO se vende</strong>. Se brinda exclusivamente como <strong className="text-amber-300">servicio de alquiler</strong> con traslado, montaje y mantenimiento en traza durante el plazo de obra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="stripe-accent py-12 px-4 text-center relative">
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-white font-black text-xl sm:text-2xl mb-3" style={FONT_RALEWAY_900}>
            ¿Necesitás comprar EPP o alquilar vallas y balizas para tu obra?
          </h2>
          <p className="text-white/80 text-sm mb-6 leading-relaxed" style={FONT_ROBOTO}>
            Atención comercial y asesoramiento técnico directo en Santa Fe y Rosario. Presupuestos y consultas sin cargo.
          </p>
          <a href={getWaLink('Hola, me comunico desde la web de Tecno Light para consultar sobre ventas de EPP o alquiler de equipamiento vial.')} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white text-[#F26922] font-black px-8 py-3.5 rounded-sm text-sm hover:bg-slate-100 transition-all shadow-xl"
            style={FONT_RALEWAY_900}>
            <WaIcon size={18} />Contactar por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
