import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Clock,
  Construction,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Paintbrush,
  Play,
  ShieldAlert,
  Truck,
  Wrench
} from 'lucide-react';

import InteractiveRoadHero from '../components/InteractiveRoadHero';
import { getWaLink } from '../utils/whatsapp';
import { getMapsDirectionsLink } from '../utils/links';
import { useSolicitudModal } from '../components/SolicitudModal';

/* ============================================================
   Datos internos — Contenido institucional, catálogo y servicios
   ============================================================ */

const QUIENES = [
  'Con más de tres décadas de trayectoria ininterrumpida y liderazgo regional, TECNO LIGHT S.R.L. se posiciona como una firma referente en el diseño, manufactura e instalación de sistemas de señalización vial reglamentaria, preventiva, informativa y transitoria.',
  'Desde nuestra planta industrial ubicada en el Parque Industrial Los Polígonos (Santa Fe Capital), coordinamos procesos productivos de vanguardia: corte láser computarizado, conformado de chapa en Calibre 14, tratamiento anticorrosivo mediante pintura epoxi termoconvertible, la plataforma digital de impresión UV-LED TrafficJet™ Xpress y laminado continuo sobre láminas reflectivas Avery Dennison.',
  'Nuestra estructura abarca la provisión mayorista de indumentaria técnica de trabajo y equipamiento de protección personal e industrial (EPP) homologado, además de una división especializada en el alquiler, montaje y logística de vallas de contención para grandes eventos y obras viales, brindando cobertura permanente en Santa Fe, Rosario y todo el litoral argentino.'
];

const QUIENES_TAGS = [
  '+30 Años de Trayectoria',
  'Planta Fabril Los Polígonos',
  'Sede Comercial Santa Fe Capital',
  'Sede Operativa Rosario',
  'Certificación Vial Oficial'
];

const AVERY_DENNISON = {
  kicker: 'Tecnología Reflectiva y Laminado Continuo',
  title: 'Impresión Digital TrafficJet™ Xpress',
  description:
    'Impresión digital TrafficJet™ Xpress sobre láminas microprismáticas Avery Dennison (OmniCube™, HIP y Serie T-2500) con sellado continuo antigraffiti. Máxima retrorreflexión angular y durabilidad óptica certificada.',
  standards: 'Certificación técnica oficial de retrorreflexión (Tipos I, IV, VIII, IX y XI).',
  videoDesc:
    'Circuito continuo de manufactura en planta: curado instantáneo UV-LED en frío que preserva la estructura óptica de los microprismas y transferencia a presión sobre chapa Calibre 14 con control fotométrico previo al despacho.',
  cards: [
    {
      id: 'omnicube',
      title: 'Serie T-11500 OmniCube™ (Grado Diamante)',
      description:
        'Tipo XI / IX (Cubo Completo). Máxima retrorreflexión angular y 100% de eficiencia óptica para autopistas, cartelería aérea y pórticos viales de alta velocidad.'
    },
    {
      id: 'hip',
      title: 'Serie T-6500 High Intensity Prismatic (HIP)',
      description:
        'Tipo IV. Microprismas encapsulados de alta intensidad para señales viales urbanas y rurales con durabilidad garantizada a 10 años.'
    },
    {
      id: 'egp',
      title: 'Serie T-2500 Engineering Grade Prismatic (EGP)',
      description:
        'Tipo I. Vinilo microprismático eficiente de alta visibilidad para señalización urbana, cartelería reglamentaria e informativa.'
    },
    {
      id: 'sobrelaminados',
      title: 'Sobrelaminados y Sellado UV',
      description:
        'Película transparente con filtro UV y barrera antigraffiti fijada a presión continua para blindar la señal frente a la intemperie.'
    },
    {
      id: 'zona-obras',
      title: 'Zona de Obras: Series Flexibles WR-6100 y WR-7100',
      description:
        'Línea de prismáticos flexibles de alta adaptabilidad para dispositivos de canalización temporal, tambores y vallas de obra.'
    },
    {
      id: 'garantia',
      title: 'Garantía Oficial y Respaldo Avery Dennison',
      description:
        'Certificación técnica oficial, control de calidad por lote y respaldo directo de durabilidad garantizada.'
    }
  ]
};

const SENALIZACION = {
  kicker: 'Líderes en Señalización Vial',
  title: 'Fabricación de Señalización Vial y Cartelería Urbana',
  description:
    'Fabricación de señalización vial bajo especificaciones oficiales con terminaciones metalúrgicas de alta calidad. Proceso integral: Diseño, Corte, Soldadura, Pintura y Rotulado.',
  etapas: [
    { num: '01', title: 'Diseño', desc: 'Planos técnicos y tipografía vial reglamentaria' },
    { num: '02', title: 'Corte', desc: 'Mecanizado y corte de sustratos con tolerancias exactas' },
    { num: '03', title: 'Soldadura', desc: 'Estructuras reforzadas y anclajes resistentes' },
    { num: '04', title: 'Pintura', desc: 'Tratamiento anticorrosivo y pintura epoxi termoconvertible' },
    { num: '05', title: 'Rotulado', desc: 'Montaje de vinilo reflectivo microprismático y laminado' }
  ],
  fabricacion: [
    {
      title: 'Carteles Viales y Transitorios de Obra',
      desc: 'Señales reglamentarias, preventivas e informativas para rutas, autopistas y desvíos transitorios de obra.'
    },
    {
      title: 'Cartelería para Municipios y Empresas',
      desc: 'Nomencladores urbanos, pórticos aéreos, carteles de obra y señalética interna para complejos industriales.'
    },
    {
      title: 'Señalización Lumínica: Balizas, Flechas, Tráiler para Desvíos y Chevron',
      desc: 'Dispositivos luminosos LED de alta visibilidad para canalización nocturna, desvíos y curvas pronunciadas.'
    },
    {
      title: 'Vallas: Delimitadoras de Obra',
      desc: 'Módulos metálicos de vallado de contención perimetral de alta resistencia para resguardo de frentes de obra.'
    }
  ],
  sustratos: [
    {
      title: 'Chapa de Acero Galvanizado',
      desc: 'Chapa de acero galvanizado en Calibre 14, confiriendo máxima rigidez estructural, resistencia mecánica y durabilidad ante vientos intensos.'
    },
    {
      title: 'PVC Espumado',
      desc: 'Placas sintéticas livianas e inoxidables, ideales para cartelería urbana e interior.'
    },
    {
      title: 'Polímeros de Alto Impacto',
      desc: 'Material de absorción elástica frente a golpes, con aditivos de protección UV contra envejecimiento solar.'
    },
    {
      title: 'Plástico Compacto',
      desc: 'Sustrato de alta densidad mecánica y química, libre de mantenimiento y resistente a la intemperie.'
    }
  ]
};

const PROCESO = {
  kicker: 'Capacidad Fabril y Precisión Operativa',
  title: 'Proceso Industrial Continuo: De la Materia Prima al Producto Final',
  description:
    'En nuestra planta industrial en el Parque Industrial Los Polígonos (Santa Fe Capital), cada pieza atraviesa un circuito productivo estandarizado en 4 fases con controles de calidad rigurosos.',
  stages: [
    {
      id: 'materia-prima',
      title: '1. MATERIA PRIMA Y DISEÑO',
      description: 'Selección estricta de chapa en Calibre 14, PVC espumado, alto impacto y plástico compacto. Elaboración de planos técnicos bajo especificaciones viales aplicables.'
    },
    {
      id: 'corte-laser',
      title: '2. CORTE LÁSER Y PLEGADO',
      description: 'Mecanizado por corte láser de alta precisión y plegado computarizado de aristas perimetrales, garantizando resistencia mecánica y seguridad en aristas.'
    },
    {
      id: 'pintura-epoxi',
      title: '3. TRATAMIENTO Y PINTURA EPOXI',
      description: 'Desengrase, fosfatizado y aplicación electrostática de pintura epoxi termoconvertible con curado térmico controlado, asegurando máxima durabilidad anticorrosiva.'
    },
    {
      id: 'impresion-final',
      title: '4. IMPRESIÓN DIGITAL UV-LED, LAMINADO Y MONTAJE FINAL',
      description: 'Impresión digital UV-LED TrafficJet™ Xpress sobre microprismas Avery Dennison, laminado continuo protector antigraffiti, sellado y control fotométrico previo al despacho.'
    }
  ],
  capacidades: [
    'Planta industrial de escala fabril en Parque Industrial Los Polígonos',
    'Flota de unidades móviles y cuadrillas técnicas para montaje en ruta',
    'Sede Comercial en Santa Fe Capital y Sede Operativa en la ciudad de Rosario',
    'Capacidad de abastecimiento para licitaciones públicas y frentes viales simultáneos'
  ]
};

const SERVICIOS = {
  kicker: 'Soluciones Operativas y Logística Vial',
  title: 'Servicios y Alquiler: Equipamiento Vial, Balizas, Vallas y Colocación en Ruta',
  description:
    'Disponibilidad inmediata de stock, logística integral y cuadrillas técnicas para encauzar desvíos de tránsito, operativos viales y eventos multitudinarios. Cobertura permanente en Santa Fe, Rosario y todo el litoral argentino.',
  eventos: {
    title: 'Alquiler y Logística de Vallas de Contención',
    description:
      'Módulos de cerramiento perimetral fabricados en acero con terminación epoxi. Coordinamos la entrega, montaje estructural y retiro programado según el cronograma de su evento u obra en Santa Fe, Rosario y la región.',
    items: [
      'Estructuras metálicas de alta resistencia y estabilidad perimetral',
      'Logística de traslado, armado y retiro ágil en sitio',
      'Disponibilidad permanente de stock en Santa Fe Capital y Rosario'
    ]
  },
  items: [
    {
      id: 'alquiler-obras',
      Icon: Construction,
      title: 'Alquiler de Señalización para Obras Viales',
      description: 'Equipamiento transitorio de seguridad: balizas LED, conos flexibles y canalizadores de tránsito.'
    },
    {
      id: 'alquiler-vallas',
      Icon: ShieldAlert,
      title: 'Alquiler de Vallas para Eventos',
      description: 'Vallado perimetral de contención para resguardo de frentes de obra y eventos multitudinarios.'
    },
    {
      id: 'demarcacion',
      Icon: Paintbrush,
      title: 'Demarcación de Calles e Industrias',
      description: 'Pintura vial horizontal reflectiva para calles, avenidas, sendas peatonales y plantas fabriles.'
    },
    {
      id: 'colocacion',
      Icon: Wrench,
      title: 'Colocación de Carteles de Obra, Lomos de Burro, Delineadores y Tachas Viales.',
      description: 'Cuadrillas técnicas para instalación y anclaje en ruta de reductores de velocidad, cartelería y elementos viales.'
    }
  ],
  instalacionCards: [
    {
      id: 'vertical',
      title: 'Señalización Vertical e Hincado en Banquinas',
      description: 'Hincado mecánico de postes de acero galvanizado y fijación de cartelería preventiva y reglamentaria en zonas de camino y autopistas.'
    },
    {
      id: 'granporte',
      title: 'Cartelería de Gran Formato y Pórticos Aéreos',
      description: 'Cálculo de cargas, manufactura y montaje en altura de carteles de gran porte con tecnología microprismática Avery Dennison OmniCube™.'
    },
    {
      id: 'urbana',
      title: 'Demarcación y Vallado para Obras Urbanas',
      description: 'Canalización de tránsito diurno y nocturno, balizamiento reflectivo y demarcación horizontal para garantizar la seguridad de operarios y usuarios viales.'
    }
  ],
  flota: {
    kicker: 'Infraestructura Móvil Especializada',
    title: 'Flota Operativa y Cuadrillas en Ruta',
    description:
      'Nuestras unidades móviles y vehículos de apoyo técnico trasladan cuadrillas especializadas, cartelería e instrumental de montaje pesado directamente a la ruta, permaneciendo apostadas en obra para una ejecución continua y segura.',
    items: [
      {
        src: '/images/flota/sprinter-flota-1.jpg',
        alt: 'Unidad móvil Tecno Light apostada en banquina durante la colocación de cartelería en R.P. 61',
        title: 'Operativo en ruta — R.P. 61',
        tag: 'Hincado de postes y señales'
      },
      {
        src: '/images/flota/sprinter-flota-2.jpg',
        alt: 'Cuadrilla especializada realizando montaje de señal reglamentaria junto a la unidad móvil',
        title: 'Cuadrilla especializada en obra',
        tag: 'Montaje de cartelería vertical'
      },
      {
        src: '/images/flota/sprinter-flota-3.jpg',
        alt: 'Señal reglamentaria colocada en banquina durante jornada de trabajo en corredor provincial',
        title: 'Instalación y control de aplomo',
        tag: 'Corredores viales de Santa Fe'
      }
    ]
  }
};

const EPP = {
  kicker: 'Seguridad Industrial y Personal',
  title: 'Seguridad Industrial y EPP: Indumentaria Grafa y Protección Homologada',
  description:
    'Comercialización mayorista y distribución corporativa de equipos de protección personal (EPP) homologados e indumentaria de trabajo certificada para obras civiles, viales, químicas e industriales. Suministro confiable por lote con logística de entrega directa en obrador o centro de distribución asignado.',
  groups: [
    {
      id: 'indumentaria',
      title: 'Indumentaria de Trabajo Grafa y Técnica',
      items: [
        'Pantalones Grafa 70 y Cargo reforzados; bombachas y jeans de obra',
        'Mamelucos térmicos e ignífugos y ropa de trabajo industrial',
        'Camisas Grafa y Cargo (Aire Libre) con costura de seguridad',
        'Chalecos de alta visibilidad con bandas reflectivas normadas',
        'Indumentaria térmica para trabajos a la intemperie y bajas temperaturas',
        'Trajes impermeables para lluvia y waders de alta resistencia',
        'Botas pescadoras y calzado de goma para tareas en agua y barro'
      ]
    },
    {
      id: 'calzado',
      title: 'Calzado de Seguridad Certificado',
      items: [
        'Calzado con puntera de acero y plantilla antiperforación de acero/kevlar',
        'Botines dieléctricos homologados para trabajos de riesgo eléctrico',
        'Calzado de cuero flor con suela de poliuretano bidensidad antideslizante'
      ]
    },
    {
      id: 'ocular',
      title: 'Protección Ocular, Facial y Cascos',
      items: [
        'Cascos de seguridad industrial clase B con arnés a cremallera',
        'Anteojos de seguridad envolventes con lente de policarbonato anti-rayadura y filtro UV',
        'Antiparras de ventilación indirecta para salpicaduras químicas y partículas',
        'Caretas para soldador con visores fotosensibles de oscurecimiento automático',
        'Pantallas faciales transparentes de policarbonato para amolado y mecanizado'
      ]
    },
    {
      id: 'auditiva',
      title: 'Protección Auditiva Certificada',
      items: [
        'Protectores auditivos de copa de alta atenuación (Libus, Fravida)',
        'Protectores de copa con vincha multiposición y adaptables a casco',
        'Tapones endoaurales de silicona reutilizables y de espuma descartables'
      ]
    },
    {
      id: 'respiratoria',
      title: 'Protección Respiratoria Homologada',
      items: [
        'Semimáscaras faciales elastoméricas con doble filtro intercambiable',
        'Filtros para vapores orgánicos, gases ácidos y partículas (P100)',
        'Mascarillas descartables N95 / FFP2 y barbijos para polvo industrial'
      ]
    },
    {
      id: 'anticaidas',
      title: 'Protección Anticaídas y Trabajo en Altura',
      items: [
        'Arneses de seguridad anticaídas de cuerpo completo con puntos de anclaje dorsal y esternal (línea SKY)',
        'Colas de amarre con amortiguador de impacto y mosquetones de doble traba de 55 mm',
        'Eslingas y sistemas de sujeción y amarre de carga homologados',
        'Cinturones de posicionamiento ergonómicos y fajas lumbares reforzadas'
      ]
    },
    {
      id: 'guantes',
      title: 'Guantes de Protección y Destreza',
      items: [
        'Guantes de vaqueta, descarne y soldador con costura reforzada',
        'Guantes de nitrilo, neopreno y PVC para resistencia química e hidrocarburos',
        'Guantes tejidos con recubrimiento de látex/nitrilo (Wintex, Congo)',
        'Guantes anticorte de alta resistencia (Nivel 5) para manipulación de chapa'
      ]
    },
    {
      id: 'cintas',
      title: 'Cintas, Mallas y Delimitación',
      items: [
        'Cintas de peligro con leyenda normalizada, demarcatorias y bandas antideslizantes',
        'Mallas plásticas de advertencia subterránea y vallado perimetral naranja de obra',
        'Demarcación perimetral de áreas de maniobras, excavaciones y circulación'
      ]
    },
    {
      id: 'incendio',
      title: 'Seguridad contra Incendio y Primeros Auxilios',
      items: [
        'Matafuegos de polvo químico ABC y CO₂ (dotación, revisión periódica y recarga)',
        'Gabinetes metálicos, fundas y soportes de pared para extintores',
        'Botiquines reglamentarios de primeros auxilios para obradores y flotas',
        'Cartelería fotoluminiscente de evacuación y salidas de emergencia'
      ]
    },
    {
      id: 'seguridad-vial',
      title: 'Dispositivos de Seguridad Vial e Intervención',
      wide: true,
      items: [
        'Conos viales flexibles de PVC de alta visibilidad y conos con base pesada',
        'Balizas rotativas, destellantes y estroboscópicas con tecnología LED',
        'Semáforos portátiles para control de tránsito y luces de emergencia',
        'Chalecos de seguridad vial reglamentarios con bandas reflectivas de alta intensidad',
        'Reductores de velocidad de goma vulcanizada (lomos de burro modulares)',
        'Tachas reflectivas bidireccionales de alta durabilidad en calzada',
        'Cintas de peligro de alta resistencia y mallas plásticas de contención perimetral',
        'Bandas reflectivas y carteles de advertencia para vehículos de carga'
      ]
    }
  ]
};

const CONTACTO = [
  {
    id: 'santa-fe',
    label: 'Sede Comercial (Asistencia y Ventas)',
    city: 'Santa Fe Capital',
    address: 'Suipacha 3248, Santa Fe Capital',
    phone: '(0342) 455-3582',
    phoneHref: 'tel:03424553582',
    email: 'tecnolightsrl@tecnolightsrl.com'
  },
  {
    id: 'rosario',
    label: 'Sede Operativa',
    city: 'Rosario',
    address: 'Fuhr 1282, Rosario, Santa Fe',
    phone: '341 636 9053',
    phoneHref: 'tel:3416369053',
    email: 'rosario@tecnolightsrl.com'
  },
  {
    id: 'planta',
    label: 'Planta Fabril (Producción y Conversión)',
    city: 'Parque Industrial Los Polígonos',
    address: 'Cnel. Loza 7198, P.I. Los Polígonos, Santa Fe Capital',
    phone: null,
    phoneHref: null,
    email: null
  }
];

/* ============================================================
   Componentes UI locales
   ============================================================ */

function Kicker({ children }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary mb-3">
      {children}
    </p>
  );
}

function SectionTitle({ kicker, title, description, center = false }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl mb-10`}>
      <Kicker>{kicker}</Kicker>
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-slate-400 leading-relaxed">{description}</p>
      )}
    </div>
  );
}

function CheckList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
          <Check size={16} className="text-primary shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* Doble CTA institucional obligatorio por sección (WhatsApp + Modal de Correo formal y pliegos) */
function SectionDualCta({
  text,
  waText,
  waLabel = 'Consultar por WhatsApp',
  emailSubject,
  emailLabel = 'Solicitud Formal y Pliegos',
}) {
  const waHref = getWaLink(waText);
  const { openSolicitudModal } = useSolicitudModal();

  return (
    <div className="mt-10 flex flex-col gap-5 rounded-xl border border-white/10 bg-white/[0.02] p-5 md:p-6 lg:flex-row lg:items-center lg:justify-between">
      {text && <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">{text}</p>}
      <div className={`flex flex-col sm:flex-row gap-3 ${text ? 'lg:shrink-0' : 'lg:ml-auto'}`}>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp text-sm inline-flex items-center justify-center gap-2"
        >
          <MessageCircle size={16} />
          <span>{waLabel}</span>
        </a>
        <button
          type="button"
          onClick={() => openSolicitudModal({ subject: emailSubject, text, emailLabel })}
          className="inline-flex items-center justify-center gap-2 rounded bg-white/10 border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 hover:border-primary/50 transition-all cursor-pointer group"
        >
          <Mail size={16} className="text-primary group-hover:scale-110 transition-transform" />
          <span>{emailLabel}</span>
        </button>
      </div>
    </div>
  );
}

/* Reproductor centralizado de video de manufactura y laminado en planta */
function CentralFactoryVideo() {
  const [playing, setPlaying] = React.useState(false);
  const videoRef = React.useRef(null);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl p-3 md:p-4">
      <figure className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0B0D12]">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={`${playing ? 'Pausar' : 'Reproducir'} video del proceso de manufactura y laminado continuo en planta`}
          aria-pressed={playing}
          className="group relative block aspect-[16/9] w-full overflow-hidden bg-black cursor-pointer"
        >
          <video
            ref={videoRef}
            src="/videos/proceso/proceso-laminado-unificado.mp4"
            poster="/videos/proceso/proceso-laminado-poster.jpg"
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="Proceso de manufactura e impresión digital y laminado continuo en planta"
            className="h-full w-full object-cover"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          <span
            className={`absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/20 to-black/30 transition-opacity duration-300 ${
              playing ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110 shadow-xl">
              <Play size={26} fill="currentColor" className="ml-1 text-primary" />
            </span>
          </span>
        </button>
      </figure>
    </div>
  );
}

export default function Index() {
  const { openSolicitudModal } = useSolicitudModal();
  return (
    <>
      <Head>
        <title>Tecno Light S.R.L. | Señalización Vial y Cartelería Reflectiva</title>
        <meta
          name="description"
          content="Fabricación y provisión de señalización vial oficial, cartelería reflectiva Avery Dennison, impresión digital TrafficJet™ Xpress, EPP y servicios de alquiler."
        />
      </Head>

      {/* 1. HERO PRINCIPAL: Logo, +30 años y sellos oficiales Avery Dennison / TrafficJet Xpress */}
      <div id="inicio" className="h-0 scroll-mt-20" aria-hidden="true" />
      <InteractiveRoadHero />

      <div className="bg-background text-white">
        {/* 2. SOLUCIONES REFLECTIVAS Y CATÁLOGO TÉCNICO AVERY DENNISON */}
        <section
          id="avery-dennison"
          className="section-ig-card border-b border-white/5 py-20 lg:py-28 relative scroll-mt-28"
        >
          <div id="tecnologia" className="absolute -top-28" aria-hidden="true" />
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <SectionTitle
              kicker={AVERY_DENNISON.kicker}
              title={AVERY_DENNISON.title}
              description={AVERY_DENNISON.description}
            />
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-semibold text-slate-300">
              <Check size={14} className="text-primary" />
              {AVERY_DENNISON.standards}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {AVERY_DENNISON.cards.map((card, index) => (
                <article
                  key={card.id}
                  className="border border-white/10 bg-white/[0.02] rounded-[4px] p-6 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-100 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{card.description}</p>
                </article>
              ))}
            </div>

            {/* Proceso en Planta y Video Centralizado */}
            <div className="mt-14 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-2">
                  En planta — proceso operativo
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Manufactura y Sellado Continuo
                </h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  {AVERY_DENNISON.videoDesc}
                </p>
              </div>
              <div className="lg:col-span-7">
                <CentralFactoryVideo />
              </div>
            </div>

            {/* Galería de Producción Real en Planta (Fotos 1, 2 y 3) */}
            <div className="mt-16 pt-12 border-t border-white/10">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary block mb-1">
                    Producción Real en Planta
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    Señales Oficiales Terminadas e Impresión Digital Reflectiva
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Planta Los Polígonos — Santa Fe
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Foto 1: Señal Niebla / Precaución 60 */}
                <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-3 transition-all hover:border-primary/50 shadow-xl">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-900">
                    <Image
                      src="/images/fotos-reales/foto1.jpg"
                      alt="Cartel vial oficial DPV Santa Fe - En caso de niebla precaución 60 con vinilo reflectivo microprismático"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 left-3 rounded bg-primary/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      Foto 1 · DPV Santa Fe
                    </span>
                  </div>
                  <figcaption className="p-3">
                    <h4 className="text-sm font-bold text-white mb-1">Señal Vial Preventiva de Niebla</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Lámina microprismática de alta intensidad Tipo IV (Serie T-6500) sobre chapa Calibre 14 homologada.
                    </p>
                  </figcaption>
                </figure>

                {/* Foto 2: Bifurcación direccional DPV Santa Fe AP 01 (Flechas hacia abajo) */}
                <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-3 transition-all hover:border-primary/50 shadow-xl">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-900">
                    <Image
                      src="/images/fotos-reales/foto2.jpg"
                      alt="Señal vial circular reglamentaria azul de bifurcación direccional con flechas hacia abajo DPV Santa Fe AP 01"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 left-3 rounded bg-blue-600/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      Foto 2 · DPV AP 01
                    </span>
                  </div>
                  <figcaption className="p-3">
                    <h4 className="text-sm font-bold text-white mb-1">Señal Reglamentaria Direccional</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Vinilo microprismático reflectivo azul con flechas direccionales hacia abajo, terminación perimetral y sellado continuo.
                    </p>
                  </figcaption>
                </figure>

                {/* Foto 3: Cartel R.N. 226 Estación Transformadora en banco de laminado */}
                <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-3 transition-all hover:border-primary/50 shadow-xl">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-900">
                    <Image
                      src="/images/fotos-reales/foto3.jpg"
                      alt="Cartel vial oficial R.N. N° 226 Estación Transformadora en mesa de trabajo y laminado continuo en planta"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 left-3 rounded bg-emerald-600/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      Foto 3 · R.N. Nº 226
                    </span>
                  </div>
                  <figcaption className="p-3">
                    <h4 className="text-sm font-bold text-white mb-1">Cartelería de Obra y Estación de Laminado</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Señal R.N. Nº 226 Estación Transformadora en estación de laminado continuo a presión con sobrelaminado protector UV.
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>

            <SectionDualCta
              text="Asesoramiento técnico en especificación de láminas reflectivas OmniCube™, HIP y Serie T-2500 con impresión digital TrafficJet™ Xpress UV-LED y laminado continuo."
              waText="Hola, solicito asesoramiento técnico sobre impresión digital TrafficJet™ Xpress, láminas Avery Dennison y laminado protector."
              waLabel="Consultar por WhatsApp"
              emailSubject="Solicitud Técnica y Pliego - Impresión Digital TrafficJet y Laminados Avery Dennison"
              emailLabel="Solicitud Formal y Pliegos"
            />
          </div>
        </section>

        {/* 3. SEÑALIZACIÓN VIAL Y CARTELERÍA: Fabricación y Sustratos */}
        <section
          id="senalizacion"
          className="py-20 lg:py-28 section-ig-card border-b border-white/5 scroll-mt-28"
        >
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <SectionTitle
              kicker={SENALIZACION.kicker}
              title={SENALIZACION.title}
              description={SENALIZACION.description}
            />

            {/* Ítems oficiales de Fabricación según folleto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {SENALIZACION.fabricacion.map((item, idx) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 hover:border-primary/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-primary block mb-3">
                      LÍNEA 0{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-primary text-xs font-semibold">
                    <Check size={14} />
                    <span>Fabricación a medida</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Proceso en 5 etapas: Diseño, Corte, Soldadura, Pintura y Rotulado */}
            <div className="mb-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  Proceso de Fabricación Homologado
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Diseño · Corte · Soldadura · Pintura · Rotulado
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {SENALIZACION.etapas.map((etapa) => (
                  <div
                    key={etapa.num}
                    className="rounded-xl border border-white/10 bg-slate-950/80 p-4 hover:border-primary/40 transition-colors"
                  >
                    <span className="text-xs font-extrabold text-primary font-mono block mb-1">
                      {etapa.num}
                    </span>
                    <h4 className="text-sm font-bold text-white mb-1">{etapa.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-normal">{etapa.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sustratos Normados */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">
                Sustratos Normados de Alta Resistencia
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SENALIZACION.sustratos.map((sustrato) => (
                  <div
                    key={sustrato.title}
                    className="p-5 rounded-xl border border-white/10 bg-slate-950/60 hover:border-primary/40 transition-colors"
                  >
                    <div className="w-6 h-1 bg-primary rounded-full mb-3" />
                    <h4 className="text-sm font-semibold text-white mb-2">{sustrato.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{sustrato.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <SectionDualCta
              text="Fabricación homologada de señalización vial reglamentaria, urbana e industrial sobre chapa Calibre 14 y sustratos de máxima rigidez."
              waText="Hola, deseo cotizar fabricación de señalización vial reglamentaria, cartelería o estructuras."
              waLabel="Cotizar por WhatsApp"
              emailSubject="Cotización Formal y Pliegos - Señalización Vial y Cartelería"
              emailLabel="Solicitud Formal y Pliegos"
            />
          </div>
        </section>

        {/* 4. PROCESO INDUSTRIAL EN PLANTA: Las 4 Fases de Manufactura */}
        <section
          id="infraestructura"
          className="py-20 lg:py-28 section-ig-card border-b border-white/5 relative z-10 scroll-mt-28"
        >
          <div id="proceso" className="absolute -top-28" aria-hidden="true" />
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <SectionTitle
              kicker={PROCESO.kicker}
              title={PROCESO.title}
              description={PROCESO.description}
            />

            {/* Las 4 fases */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {PROCESO.stages.map((stage) => (
                <div
                  key={stage.id}
                  className="bg-slate-950/60 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all"
                >
                  <div className="w-8 h-[3px] bg-primary rounded-full mb-4" />
                  <h3 className="text-sm font-bold tracking-widest text-white mb-2">{stage.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{stage.description}</p>
                </div>
              ))}
            </div>

            {/* Capacidad Instalada */}
            <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-5">
                Capacidad Instalada y Recursos Operativos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                {PROCESO.capacidades.map((cap) => (
                  <div key={cap} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {cap}
                  </div>
                ))}
              </div>
            </div>

            <SectionDualCta
              text="Capacidad técnica y de producción a escala para abastecer licitaciones, corredores viales y proyectos de gran envergadura."
              waText="Hola, me comunico para consultar por capacidad de fabricación y producción en planta industrial Los Polígonos."
              waLabel="Consultar por WhatsApp"
              emailSubject="Consulta de Fabricación y Pliegos - Planta Industrial Los Polígonos"
              emailLabel="Solicitud Formal y Pliegos"
            />
          </div>
        </section>

        {/* 5. SERVICIOS Y ALQUILER: Equipamiento Vial, Balizas, Vallas y Colocación en Ruta */}
        <section
          id="servicios"
          className="py-20 lg:py-28 section-ig-card border-b border-white/5 scroll-mt-28"
        >
          <div id="instalacion" className="absolute -top-28" aria-hidden="true" />
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-[#131720] via-slate-950 to-primary/10 p-8 md:p-12 mb-12">
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <SectionTitle
                  kicker={SERVICIOS.kicker}
                  title={SERVICIOS.title}
                  description={SERVICIOS.description}
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-5">
                  Servicio disponible en Santa Fe, Rosario y todo el litoral argentino
                </p>

                {/* Alquiler destacado */}
                <div className="mb-8 grid lg:grid-cols-[1.2fr_1fr] gap-6 rounded-xl border border-primary/40 bg-primary/[0.06] p-6 md:p-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-2">
                      Alquiler destacado
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                      {SERVICIOS.eventos.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                      {SERVICIOS.eventos.description}
                    </p>
                    <Image
                      src="/images/trabajos/vallas-evento.jpg"
                      alt="Vallas de contención instaladas para un evento al aire libre"
                      width={1600}
                      height={979}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="mt-5 h-40 w-full rounded-lg border border-primary/20 object-cover md:h-48"
                    />
                  </div>
                  <div className="flex flex-col justify-between gap-5">
                    <ul className="space-y-2.5">
                      {SERVICIOS.eventos.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <Check size={15} className="text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={getWaLink('Hola, quiero consultar por alquiler de vallas para un evento o frente de obra.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm self-start inline-flex items-center gap-2"
                    >
                      <span>Consultar alquiler de vallas</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>

                {/* Items de servicio */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {SERVICIOS.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-slate-950/60 border border-primary/20 rounded-xl p-6 hover:border-primary/60 hover:bg-slate-950/80 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
                            <item.Icon size={18} className="text-primary" />
                          </div>
                          <span className="text-primary text-xs font-bold tracking-[0.25em]">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-100 mb-2 leading-snug">{item.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instalación y Montaje en Ruta */}
            <div className="mt-12">
              <SectionTitle
                kicker="Capacidad de Despliegue en Terreno"
                title="Instalación, Montaje e Hincado en Rutas y Espacios Urbanos"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {SERVICIOS.instalacionCards.map((card) => (
                  <div key={card.id} className="card-corporate p-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">{card.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
                  </div>
                ))}
              </div>

              {/* Flota Operativa */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-2">
                  {SERVICIOS.flota.kicker}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {SERVICIOS.flota.title}
                </h3>
                <p className="max-w-2xl text-sm text-slate-400 leading-relaxed">
                  {SERVICIOS.flota.description}
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {SERVICIOS.flota.items.map((item) => (
                    <figure
                      key={item.src}
                      className="group overflow-hidden rounded-xl border border-white/10 bg-[#0B0D12] transition-colors hover:border-primary/40"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <figcaption className="border-t border-white/5 px-4 py-3">
                        <span className="block text-sm font-semibold text-slate-100">{item.title}</span>
                        <span className="mt-0.5 block text-[10px] uppercase tracking-[0.18em] text-slate-500">
                          {item.tag}
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>

            <SectionDualCta
              text="Solicite cotización inmediata para alquiler de vallas, balizamiento vial o cuadrillas para montaje e instalación en ruta."
              waText="Hola, solicito presupuesto para alquiler de vallas, equipamiento vial o colocación en ruta."
              waLabel="Solicitar por WhatsApp"
              emailSubject="Solicitud Formal y Pliegos - Alquiler de Vallas y Servicios en Ruta"
              emailLabel="Solicitud Formal y Pliegos"
            />
          </div>
        </section>

        {/* 6. SEGURIDAD INDUSTRIAL Y EPP: Indumentaria Grafa y Protección Homologada */}
        <section
          id="catalogo"
          className="py-20 lg:py-28 section-ig-card relative overflow-hidden border-b border-white/5 scroll-mt-28"
        >
          <div id="seguridad" className="absolute -top-24 scroll-mt-28" aria-hidden="true" />
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <SectionTitle
              kicker={EPP.kicker}
              title={EPP.title}
              description={EPP.description}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {EPP.groups.map((group) => (
                <div
                  key={group.id}
                  className={`card-corporate p-6 ${group.wide ? 'sm:col-span-2 lg:col-span-3 border-primary/30' : ''}`}
                >
                  <h3 className="text-base font-semibold text-slate-100 mb-4">{group.title}</h3>
                  <ul className={group.wide ? 'grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2.5' : 'space-y-2.5'}>
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <SectionDualCta
              text="Provisión técnica y logística mayorista de indumentaria Grafa y equipos de protección personal e industrial homologados por lote o requerimiento de pliego."
              waText="Hola, deseo solicitar cotización mayorista por lote de indumentaria Grafa y equipamiento EPP."
              waLabel="Cotizar por WhatsApp"
              emailSubject="Cotización Mayorista y Pliegos - Seguridad Industrial y EPP"
              emailLabel="Solicitud Formal y Pliegos"
            />
          </div>
        </section>

        {/* 7. QUIÉNES SOMOS Y SEDES OFICIALES: Institucional, Planta Fabril y Contacto */}
        <section
          id="nosotros"
          className="py-20 lg:py-28 section-solid-dark bg-hex-pattern scroll-mt-28 border-b border-white/5"
        >
          <div id="contacto" className="h-0 scroll-mt-28" aria-hidden="true" />
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <SectionTitle
              kicker="Institucional & Red Operativa"
              title="Quiénes Somos, Planta Fabril y Sedes Oficiales"
              description="Con más de 30 años de experiencia y liderazgo continuo en el litoral argentino, Tecno Light S.R.L. integra planta fabril propia, tecnología reflectiva certificada y atención comercial personalizada en Santa Fe y Rosario."
            />

            {/* Bloque Institucional */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
              <div className="lg:col-span-8 space-y-5 text-slate-300 leading-relaxed">
                {QUIENES.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="lg:col-span-4">
                <div className="card-corporate p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                    Presencia y Respaldo
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {QUIENES_TAGS.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 text-sm text-slate-400 leading-relaxed">
                    Planta fabril propia, producción integral y logística de entrega directa en obra.
                  </p>
                </div>
              </div>
            </div>

            {/* Sedes Oficiales */}
            <div className="mb-12">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-6">
                Sedes de Operación y Asistencia Técnica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CONTACTO.map((sede) => (
                  <div key={sede.id} className="card-corporate p-6 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-2">
                        {sede.label}
                      </p>
                      <h4 className="text-lg font-semibold text-slate-100 mb-4">{sede.city}</h4>
                      <div className="space-y-3 text-sm text-slate-400">
                        <p className="flex items-start gap-2.5">
                          <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
                          <span>{sede.address}</span>
                        </p>
                        <a
                          href={getMapsDirectionsLink(sede.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                        >
                          Cómo llegar <ArrowRight size={12} />
                        </a>
                        {sede.phone && (
                          <a
                            href={sede.phoneHref}
                            className="flex items-center gap-2.5 hover:text-primary transition-colors"
                          >
                            <Clock size={15} className="text-primary shrink-0" />
                            <span>{sede.phone}</span>
                          </a>
                        )}
                        {sede.email && (
                          <button
                            type="button"
                            onClick={() => openSolicitudModal({ subject: `Consulta Comercial y Técnica - ${sede.title}` })}
                            className="flex items-center gap-2.5 hover:text-primary transition-colors break-all text-left cursor-pointer"
                          >
                            <Mail size={15} className="text-primary shrink-0" />
                            <span>{sede.email}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Canales Oficiales Destacados (Email, Instagram, WhatsApp) */}
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 md:p-8 mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                Canales Oficiales y Redes
              </h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => openSolicitudModal({ subject: 'Contacto Institucional y Pliegos - Tecno Light S.R.L.' })}
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-primary/50 hover:bg-white/[0.04] transition-all text-left w-full cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Correo Institucional</span>
                    <span className="text-xs md:text-sm font-semibold text-white break-all">tecnolightsrl@tecnolightsrl.com</span>
                  </div>
                </button>

                <a
                  href="https://www.instagram.com/tecnolight.srl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#E1306C] hover:bg-white/[0.04] transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#E1306C]/10 border border-[#E1306C]/20 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#FD1D1D] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Instagram Oficial</span>
                    <span className="text-xs md:text-sm font-semibold text-white">@tecnolight.srl</span>
                  </div>
                </a>

                <a
                  href={getWaLink('Hola, me comunico desde el sitio web de Tecno Light S.R.L.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#25D366] hover:bg-white/[0.04] transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0">
                    <MessageCircle size={20} className="text-[#25D366]" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">WhatsApp Comercial</span>
                    <span className="text-xs md:text-sm font-semibold text-white">+54 9 342 427-8117</span>
                  </div>
                </a>
              </div>
            </div>

            <SectionDualCta
              text="Atención comercial y asesoramiento técnico centralizado. Envíe planos, requerimientos o pliegos para una respuesta inmediata."
              waText="Hola, me comunico con Tecno Light S.R.L. para realizar una consulta comercial/institucional."
              waLabel="Contactar por WhatsApp"
              emailSubject="Contacto Institucional y Pliegos - Tecno Light S.R.L."
              emailLabel="Enviar Solicitud / Pliego"
            />
          </div>
        </section>
      </div>
    </>
  );
}
