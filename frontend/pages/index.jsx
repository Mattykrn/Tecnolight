import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Construction,
  Mail,
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
import { useSolicitudModal } from '../components/SolicitudModal';

/* ============================================================
   Datos internos — Contenido institucional, catálogo y servicios
   ============================================================ */

const QUIENES = [
  'TECNO LIGHT S.R.L. es una firma referente en el diseño, manufactura e instalación de sistemas de señalización vial reglamentaria, preventiva, informativa y transitoria.',
  'En nuestra planta del Parque Industrial Los Polígonos (Santa Fe Capital) desarrollamos procesos de corte láser, conformado de chapa en Calibre 14, tratamiento anticorrosivo con pintura epoxi de alta resistencia, impresión digital UV-LED TrafficJet™ Xpress y laminado continuo sobre láminas reflectivas Avery Dennison.',
  'Completamos nuestra propuesta con la provisión mayorista de indumentaria técnica y equipamiento de protección personal (EPP) homologado, junto a una división especializada en alquiler y montaje de vallas de contención para grandes eventos y obras viales.'
];

const QUIENES_TAGS = [
  '+30 Años de Trayectoria',
  'Planta Fabril Los Polígonos',
  'Sede Comercial Santa Fe',
  'Sede Operativa Rosario',
  'Homologación Vial Oficial'
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
      title: 'Sobrelaminados y Sellado UV Antigraffiti',
      description:
        'Película protectora transparente con filtro UV y barrera antigraffiti fijada a presión continua para blindar la señal frente a la intemperie.'
    }
  ]
};

const SENALIZACION = {
  kicker: 'Líderes en Señalización Vial',
  title: 'Fabricación de Señalización Vial y Cartelería Urbana',
  description:
    'Fabricación integral de cartelería y dispositivos viales bajo especificaciones oficiales con terminaciones metalúrgicas de alta rigidez.',
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

const SENALIZACION_OBRAS_REALES = [
  {
    id: 'cartel-obra-avenida-7-jefes',
    src: '/images/obras-reales/cartel-obra-avenida-7-jefes.jpg',
    badge: 'Obra Pública · Santa Fe',
    title: 'Cartel de Obra Pública de Gran Formato',
    description: 'Puesta en valor de Av. 7 Jefes (Santa Fe). Sustrato de chapa Calibre 14 con tratamiento anticorrosivo e impresión digital microprismática sobre láminas reflectivas Avery Dennison.',
    specs: ['Chapa Calibre 14', 'Láminas reflectivas Avery Dennison']
  },
  {
    id: 'nomencladores-urbanos-calles',
    src: '/images/obras-reales/nomencladores-urbanos-calles.jpg',
    badge: 'Cartelería Urbana',
    title: 'Nomencladores Urbanos de Doble Faz',
    description: 'Cartelería de nomenclatura vial urbana (Ayacucho / Dr. Edmundo Rosas). Fabricación en chapa Calibre 14 con láminas reflectivas Avery Dennison para máxima legibilidad diurna y nocturna.',
    specs: ['Chapa Calibre 14', 'Láminas reflectivas Avery Dennison']
  },
  {
    id: 'lamina-reflectiva-microprismatica-helvecia',
    src: '/images/obras-reales/lamina-reflectiva-microprismatica-helvecia.jpg',
    badge: 'Control Óptico en Planta',
    title: 'Impresión Digital Microprismática',
    description: 'Producción de cartelería municipal para la Comuna de Helvecia. Terminación sobre chapa Calibre 14 con láminas reflectivas Avery Dennison y sellado protector UV.',
    specs: ['Chapa Calibre 14', 'Láminas reflectivas Avery Dennison']
  },
  {
    id: 'caballete-seguridad-litoral-gas',
    src: '/images/obras-reales/caballete-seguridad-litoral-gas.jpg',
    badge: 'Dispositivos de Seguridad',
    title: 'Caballete Metálico y Valla Barricada',
    description: 'Dispositivo móvil de delimitación y seguridad vial para Litoral Gas S.A. Módulo rígido en chapa Calibre 14 con bandas de láminas reflectivas Avery Dennison de alta intensidad.',
    specs: ['Chapa Calibre 14', 'Láminas reflectivas Avery Dennison']
  },
  {
    id: 'colocacion-reductores-tachas-cuadrilla',
    src: '/images/obras-reales/colocacion-reductores-tachas-cuadrilla.jpg',
    badge: 'Trabajos en Calzada',
    title: 'Cuadrilla Técnica e Intervención Vial',
    description: 'Operativo en calzada con colocación de reductores de velocidad, tachas viales y señalización vertical sobre chapa Calibre 14 con láminas reflectivas Avery Dennison.',
    specs: ['Chapa Calibre 14', 'Láminas reflectivas Avery Dennison']
  }
];

const PROCESO = {
  kicker: 'Capacidad Fabril y Precisión Operativa',
  title: 'Proceso Industrial Continuo: De la Materia Prima al Producto Final',
  description:
    'Circuito productivo estandarizado en 4 fases continuas en nuestra planta fabril con controles de calidad en cada etapa.',
  stages: [
    {
      id: 'materia-prima',
      title: '1. MATERIA PRIMA Y PLANOS TÉCNICOS',
      description: 'Selección estricta de sustratos homologados y modelado de planos bajo normativas viales aplicables.'
    },
    {
      id: 'corte-laser',
      title: '2. CORTE LÁSER Y PLEGADO',
      description: 'Mecanizado por corte láser de alta precisión y plegado computarizado perimetral para máxima resistencia mecánica.'
    },
    {
      id: 'pintura-epoxi',
      title: '3. TRATAMIENTO Y PINTURA EPOXI',
      description: 'Desengrase, fosfatizado y aplicación de pintura epoxi anticorrosiva de alta adherencia y durabilidad a la intemperie.'
    },
    {
      id: 'impresion-final',
      title: '4. IMPRESIÓN DIGITAL UV-LED Y SELLADO',
      description: 'Impresión TrafficJet™ Xpress sobre láminas Avery Dennison, laminado continuo antigraffiti y control fotométrico previo al despacho.'
    }
  ],
  capacidades: [
    'Planta industrial propia con equipamiento computarizado de alta escala',
    'Flota de unidades móviles y cuadrillas técnicas para montaje en ruta',
    'Sede Comercial en Santa Fe Capital y Sede Operativa en Rosario',
    'Capacidad de abastecimiento para licitaciones públicas y frentes viales simultáneos'
  ]
};

const SERVICIOS = {
  kicker: 'Soluciones Operativas y Logística Vial',
  title: 'Servicios y Alquiler: Equipamiento Vial, Balizas, Vallas y Colocación en Ruta',
  description:
    'Disponibilidad inmediata de stock, logística integral y cuadrillas técnicas para encauzar desvíos de tránsito, operativos viales y eventos multitudinarios en Santa Fe, Rosario y la región.',
  eventos: {
    title: 'Alquiler y Logística de Vallas de Contención',
    description:
      'Módulos de cerramiento perimetral fabricados en acero con terminación epoxi. Coordinamos la entrega, montaje estructural y retiro programado según el cronograma de su evento u obra.',
    items: [
      'Estructuras metálicas de alta estabilidad y resistencia perimetral',
      'Logística de traslado, armado y retiro ágil en sitio',
      'Disponibilidad permanente de stock para despliegue inmediato'
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
  flota: {
    kicker: 'Infraestructura Móvil Especializada',
    title: 'Flota Operativa y Cuadrillas en Ruta',
    description:
      'Unidades móviles y vehículos de apoyo técnico trasladan cuadrillas especializadas, cartelería e instrumental de montaje pesado directamente a la ruta.',
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
  title: 'Seguridad Industrial y EPP',
  description:
    'Comercialización mayorista y distribución corporativa de equipos de protección personal (EPP) e indumentaria de trabajo certificada para obras civiles, viales e industriales, con entrega directa en obrador.',
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
        'Bandas reflectivas y carteles de advertencia para vehículos de carga'
      ]
    }
  ]
};

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
        {/* 2. QUIÉNES SOMOS: Presentación Institucional de la Empresa */}
        <section
          id="nosotros"
          className="py-20 lg:py-28 section-solid-dark bg-hex-pattern scroll-mt-28 border-b border-white/5 relative"
        >
          <div id="quienes-somos" className="absolute -top-28" aria-hidden="true" />
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <SectionTitle
              kicker="Presentación Institucional"
              title="Quiénes Somos: Liderazgo en Señalización Vial"
              description="Más de tres décadas integrando planta industrial propia, tecnología reflectiva certificada y logística directa en todo el país."
            />

            {/* Bloque Institucional */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mb-10">
              <div className="lg:col-span-8 space-y-5 text-slate-300 leading-relaxed text-base md:text-lg">
                {QUIENES.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="lg:col-span-4">
                <div className="card-corporate p-6 bg-slate-950/80 border border-primary/20">
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
                    Capacidad fabril instalada, stock permanente y logística de despacho directo a obra.
                  </p>
                </div>
              </div>
            </div>

            <SectionDualCta
              text="Coordinamos visitas a planta y brindamos asesoramiento técnico integral para licitaciones y proyectos viales."
              waText="Hola, me comunico para conocer más sobre Tecno Light S.R.L. y coordinar asesoramiento técnico."
              waLabel="Contactar por WhatsApp"
              emailSubject="Presentación Institucional y Asesoramiento - Tecno Light S.R.L."
              emailLabel="Solicitud Formal y Pliegos"
            />
          </div>
        </section>

        {/* 3. SOLUCIONES REFLECTIVAS Y CATÁLOGO TÉCNICO AVERY DENNISON */}
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
              text="Especificaciones técnicas, compatibilidad de láminas y muestras para proyectos de señalización vial reflectiva."
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

            {/* Galería de Trabajos y Cartelería Urbana en Ruta y Vía Pública */}
            <div className="mt-16 pt-12 border-t border-white/10">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary block mb-1">
                    Trabajos en Ruta y Cartelería Urbana
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    Registro Visual de Obras Reales e Instalaciones
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Santa Fe · Rosario · Región Litoral
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SENALIZACION_OBRAS_REALES.map((obra) => (
                  <figure
                    key={obra.id}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition-all hover:border-primary/50 shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-900 mb-4">
                        <Image
                          src={obra.src}
                          alt={obra.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
                        <span className="absolute top-3 left-3 rounded bg-primary/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm shadow">
                          {obra.badge}
                        </span>
                      </div>
                      <figcaption>
                        <h4 className="text-base font-bold text-white mb-2">{obra.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          {obra.description}
                        </p>
                      </figcaption>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2">
                      {obra.specs.map((spec) => (
                        <span
                          key={spec}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary bg-primary/10 border border-primary/20 rounded-md px-2.5 py-0.5"
                        >
                          <Check size={12} className="shrink-0" />
                          <span>{spec}</span>
                        </span>
                      ))}
                    </div>
                  </figure>
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

            {/* Flota Operativa y Cuadrillas en Ruta */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-slate-950/60 p-8">
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

            <SectionDualCta
              text="Solicite cotización inmediata para alquiler de vallas, balizamiento vial o cuadrillas para montaje e instalación en ruta."
              waText="Hola, solicito presupuesto para alquiler de vallas, equipamiento vial o colocación en ruta."
              waLabel="Solicitar por WhatsApp"
              emailSubject="Solicitud Formal y Pliegos - Alquiler de Vallas y Servicios en Ruta"
              emailLabel="Solicitud Formal y Pliegos"
            />
          </div>
        </section>

        {/* 6. SEGURIDAD INDUSTRIAL Y EPP*/}
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
              text="Provisión mayorista de indumentaria Grafa y equipos de protección personal (EPP) homologados por lote para empresas y licitaciones."
              waText="Hola, deseo solicitar cotización mayorista por lote de indumentaria Grafa y equipamiento EPP."
              waLabel="Cotizar por WhatsApp"
              emailSubject="Cotización Mayorista y Pliegos - Seguridad Industrial y EPP"
              emailLabel="Solicitud Formal y Pliegos"
            />
          </div>
        </section>


      </div>
    </>
  );
}
