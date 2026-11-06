import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {
  Check,
  Construction,
  Play,
  ShieldAlert,
  Truck,
  Wrench
} from 'lucide-react';

import InteractiveRoadHero from '../components/InteractiveRoadHero';

/* ============================================================
   Datos internos — Contenido institucional, catálogo y servicios
   ============================================================ */

const QUIENES = [
  'TECNO LIGHT S.R.L. es una firma referente en el diseño, manufactura y provisión de sistemas de señalización vial reglamentaria, preventiva, informativa y transitoria.',
  'En nuestra planta del Parque Industrial Los Polígonos (Santa Fe Capital) desarrollamos procesos de corte láser, conformado de chapa en calibres 14, 16 y distintos calibres dependiendo el trabajo, tratamiento anticorrosivo con pintura epoxi de alta resistencia, impresión digital UV-LED TrafficJet™ Xpress y laminado continuo sobre láminas reflectivas Avery Dennison.',
  'Completamos nuestra propuesta con la venta mayorista y minorista de ropa de trabajo y equipamiento de protección personal (EPP) homologado, junto a una división especializada en el alquiler de elementos de seguridad vial, vallas para eventos (2 m x 1,3 m), vallas metálicas para obras (cortas de 1,5 mts. y largas de 3 mts.) y chapones (2 m x 1,5 m).'
];

const QUIENES_TAGS = [
  'Planta Fabril Los Polígonos',
  'Sede Comercial Santa Fe',
  'Sede Operativa Rosario',
  'Homologación Vial Oficial'
];

const FABRICACION_SENALIZACION = {
  kicker: 'Pilar 01 · Manufactura Vial, Industrial y Tecnología Reflectiva',
  title: 'Fabricación de Carteles y Señalización',
  description:
    'Centralizamos el diseño, manufactura metalúrgica, impresión digital TrafficJet™ Xpress y laminado continuo sobre láminas microprismáticas Avery Dennison para señales viales reglamentarias, cartelería industrial, urbana y de seguridad.',
  bullets: [
    'Impresión digital con impresora Mimaki UCJV300-160 TrafficJet™ Xpress con tintas UV-LED en colores viales reglamentarios.',
    'Láminas microprismáticas Avery Dennison (OmniCube™ T-11500, HIP T-6500 y EGP T-2500).',
    'Laminado continuo en frío con película protectora UV y barrera antigraffiti.',
    'Fabricación sobre chapa en calibres 14, 16 y distintos calibres dependiendo el trabajo.'
  ],
  lineas: [
    {
      title: 'Carteles Viales y Transitorios de Obra',
      desc: 'Señales reglamentarias, preventivas e informativas para rutas, autopistas y desvíos transitorios de obra.'
    },
    {
      title: 'Cartelería Industrial, Municipal y de Seguridad',
      desc: 'Nomencladores urbanos, pórticos aéreos, carteles de seguridad industrial, evacuación y señalética interna para plantas.'
    },
    {
      title: 'Señalización Lumínica: Balizas, Flechas, Tráiler para Desvíos y Chevron',
      desc: 'Dispositivos luminosos LED de alta visibilidad para canalización nocturna, desvíos y curvas pronunciadas.'
    },
    {
      title: 'Fabricación de Vallas para Eventos y Obras',
      desc: 'Módulos metálicos de vallado perimetral para eventos (2 m x 1,3 m) y obras viales (cortas de 1,5 mts. y largas de 3 mts.).'
    }
  ],
  laminas: [
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
      title: 'Sobrelaminados y Laminado UV Antigraffiti',
      description:
        'Película protectora transparente con filtro UV y barrera antigraffiti fijada por laminado continuo a presión para blindar la señal frente a la intemperie.'
    }
  ],
  etapasPlanta: [
    {
      id: 'corte-laser',
      title: '1. CORTE LÁSER DE ALTA PRECISIÓN',
      description: 'Mecanizado y dimensionado por corte láser de alta precisión sobre chapa de acero para máxima resistencia mecánica.'
    },
    {
      id: 'pintura-epoxi',
      title: '2. TRATAMIENTO Y PINTURA EPOXI',
      description: 'Desengrase, fosfatizado y aplicación de pintura epoxi anticorrosiva de alta adherencia y durabilidad a la intemperie.'
    },
    {
      id: 'impresion-final',
      title: '3. IMPRESIÓN DIGITAL UV-LED Y LAMINADO',
      description: 'Impresión TrafficJet™ Xpress sobre láminas Avery Dennison, laminado continuo antigraffiti y control fotométrico previo al despacho.'
    }
  ],
  capacidades: [
    'Planta industrial propia con equipamiento computarizado de alta escala',
    'Flota de unidades móviles y cuadrillas técnicas para entrega y asistencia en ruta',
    'Sede Comercial en Santa Fe Capital y Sede Operativa en Rosario',
    'Capacidad de abastecimiento para licitaciones públicas y frentes viales simultáneos'
  ]
};

const SENALIZACION_OBRAS_REALES = [
  {
    id: 'cartel-obra-avenida-7-jefes',
    src: '/images/obras-reales/cartel-obra-avenida-7-jefes.jpg',
    badge: 'Obra Pública · Santa Fe',
    title: 'Cartel de Obra Pública de Gran Formato',
    description: 'Puesta en valor de Av. 7 Jefes (Santa Fe). Sustrato de chapa en calibres 14, 16 y distintos calibres dependiendo el trabajo con tratamiento anticorrosivo e impresión digital microprismática sobre láminas reflectivas Avery Dennison.',
    specs: ['Chapa Calibre 14, 16 y según el trabajo', 'Láminas reflectivas Avery Dennison']
  },
  {
    id: 'nomencladores-urbanos-calles',
    src: '/images/obras-reales/nomencladores-urbanos-calles.jpg',
    badge: 'Cartelería Urbana',
    title: 'Nomencladores Urbanos de Doble Faz',
    description: 'Cartelería de nomenclatura vial urbana (Ayacucho / Dr. Edmundo Rosas). Fabricación en chapa en calibres 14, 16 y distintos calibres dependiendo el trabajo con láminas reflectivas Avery Dennison para máxima legibilidad diurna y nocturna.',
    specs: ['Chapa Calibre 14, 16 y según el trabajo', 'Láminas reflectivas Avery Dennison']
  },
  {
    id: 'lamina-reflectiva-microprismatica-helvecia',
    src: '/images/obras-reales/lamina-reflectiva-microprismatica-helvecia.jpg',
    badge: 'Control Óptico en Planta',
    title: 'Impresión Digital Microprismática',
    description: 'Producción de cartelería municipal para la Comuna de Helvecia. Terminación sobre chapa en calibres 14, 16 y distintos calibres dependiendo el trabajo con láminas reflectivas Avery Dennison y laminado protector UV.',
    specs: ['Chapa Calibre 14, 16 y según el trabajo', 'Láminas reflectivas Avery Dennison']
  },
  {
    id: 'caballete-seguridad-litoral-gas',
    src: '/images/obras-reales/caballete-seguridad-litoral-gas.jpg',
    badge: 'Dispositivos de Seguridad',
    title: 'Caballete Metálico y Valla Barricada',
    description: 'Dispositivo móvil de delimitación y seguridad vial para Litoral Gas S.A. Módulo rígido en chapa en calibres 14, 16 y distintos calibres dependiendo el trabajo con bandas de láminas reflectivas Avery Dennison de alta intensidad.',
    specs: ['Chapa Calibre 14, 16 y según el trabajo', 'Láminas reflectivas Avery Dennison']
  },
  {
    id: 'colocacion-reductores-tachas-cuadrilla',
    src: '/images/obras-reales/colocacion-reductores-tachas-cuadrilla.jpg',
    badge: 'Trabajos en Calzada',
    title: 'Cuadrilla Técnica e Intervención Vial',
    description: 'Operativo en calzada con colocación de reductores de velocidad, tachas viales y señalización vertical sobre chapa en calibres 14, 16 y distintos calibres dependiendo el trabajo con láminas reflectivas Avery Dennison.',
    specs: ['Chapa Calibre 14, 16 y según el trabajo', 'Láminas reflectivas Avery Dennison']
  },
  {
    id: 'vallas-obra-municipalidad-rosario',
    src: '/images/obras-reales/vallas-obra-municipalidad-rosario.jpg',
    badge: 'Obra Pública · Rosario',
    title: 'Vallas Delimitadoras de Obra Urbana',
    description: 'Lote de vallas metálicas delimitadoras y de señalización para Conylog S.R.L. y la Municipalidad de Rosario. Estructuras tubulares y paneles de chapa en calibres 14, 16 y distintos calibres dependiendo el trabajo con láminas reflectivas Avery Dennison.',
    specs: ['Chapa Calibre 14, 16 y según el trabajo', 'Láminas reflectivas Avery Dennison']
  }
];

const ALQUILER_VALLAS_SEGURIDAD = {
  kicker: 'Pilar 03 · Alquiler de Equipamiento Vial, Eventos y Logística en Obra',
  title: 'Alquiler de Elementos de Seguridad Vial',
  description:
    'Disponibilidad inmediata de stock, entrega en sitio y logística integral para el alquiler de elementos de seguridad vial y encauzamiento de desvíos de obra en Santa Fe, Rosario y toda la región.',
  eventos: {
    title: 'Vallas para Eventos (2 m x 1,3 m)',
    description:
      'Provisión en alquiler de vallas para eventos (2 m x 1,3 m), fabricadas en acero con terminación epoxi. Coordinamos la entrega, distribución perimetral y retiro programado según el cronograma de su evento u obra.',
    items: [
      'Disponibilidad inmediata de vallas para eventos (2 m x 1,3 m)',
      'Estructuras metálicas de alta estabilidad, encastre rápido y resistencia perimetral',
      'Logística de traslado, distribución y retiro ágil en sitio para eventos y obras'
    ]
  },
  items: [
    {
      id: 'vallas-obras',
      Icon: ShieldAlert,
      title: 'Vallas Metálicas para Obras',
      description: 'Módulos metálicos de vallado perimetral en versiones cortas (1,5 m) y largas (3 m) de alta resistencia para frentes de obra, desvíos y cerramientos viales.'
    },
    {
      id: 'balizas',
      Icon: Construction,
      title: 'Balizas',
      description: 'Balizas luminosas intermitentes de alta visibilidad diurna y nocturna para señalización preventiva en frentes de obra y desvíos.'
    },
    {
      id: 'flechas-luminicas',
      Icon: Truck,
      title: 'Flechas Lumínicas',
      description: 'Sistemas de flechas lumínicas direccionales LED para encauzamiento vehicular seguro en rutas, autopistas y calzadas reducidas.'
    },
    {
      id: 'tambores',
      Icon: ShieldAlert,
      title: 'Tambores',
      description: 'Tambores demarcatorios viales con bandas reflectivas prismáticas de alta intensidad para delimitación de zonas de trabajo.'
    },
    {
      id: 'carteles-viales',
      Icon: Construction,
      title: 'Carteles Viales',
      description: 'Alquiler de carteles viales transitorios reglamentarios, preventivos e informativos con pie portacartel para desvíos y obras en calzada.'
    },
    {
      id: 'canalizadores',
      Icon: Truck,
      title: 'Canalizadores',
      description: 'Canalizadores viales New Jersey plásticos y delimitadores encastrables para segregación de carriles y desvíos temporales.'
    },
    {
      id: 'chapones',
      Icon: Wrench,
      title: 'Chapones (2 m x 1,5 m)',
      description: 'Chapones de acero de alta resistencia (2 m x 1,5 m) para cobertura segura de zanjas, excavaciones y paso vehicular o peatonal en obra.'
    }
  ],
  flota: {
    kicker: 'Infraestructura Móvil Especializada',
    title: 'Flota Operativa y Cuadrillas en Ruta',
    description:
      'Unidades móviles y vehículos de apoyo técnico trasladan cuadrillas especializadas, vallas para eventos y elementos de seguridad vial directamente al lugar del operativo.',
    items: [
      {
        src: '/images/flota/sprinter-flota-1.jpg',
        alt: 'Unidad móvil Tecno Light apostada en banquina durante operativo en R.P. 61',
        title: 'Operativo en ruta — R.P. 61',
        tag: 'Despliegue y logística vial'
      },
      {
        src: '/images/flota/sprinter-flota-2.jpg',
        alt: 'Cuadrilla especializada realizando asistencia en obra junto a la unidad móvil',
        title: 'Cuadrilla especializada en obra',
        tag: 'Logística y asistencia en ruta'
      },
      {
        src: '/images/flota/sprinter-flota-3.jpg',
        alt: 'Intervención vial en banquina durante jornada de trabajo en corredor provincial',
        title: 'Despliegue y control en ruta',
        tag: 'Corredores viales de Santa Fe'
      }
    ]
  }
};

const SEGURIDAD_INDUSTRIAL_EPP = {
  kicker: 'Pilar 02 · Venta Mayorista y Minorista de Ropa de Trabajo y EPP Homologado',
  title: 'Seguridad Industrial y EPP',
  description:
    'Venta mayorista y minorista de ropa de trabajo certificada y elementos de protección personal (EPP) homologados para empresas, contratistas, obras civiles, viales, industrias y particulares.',
  groups: [
    {
      id: 'indumentaria',
      title: 'Ropa de Trabajo Grafa y Técnica (Mayorista y Minorista)',
      items: [
        'Venta mayorista y minorista de ropa de trabajo para empresas, cuadrillas y particulares',
        'Pantalones Grafa 70 y Cargo reforzados; bombachas de campo y jeans de obra',
        'Camisas Grafa y Cargo (Aire Libre) con costura de seguridad',
        'Mamelucos térmicos e ignífugos y ropa de trabajo industrial',
        'Chalecos de alta visibilidad con bandas reflectivas normadas',
        'Indumentaria térmica para trabajos a la intemperie y bajas temperaturas',
        'Trajes impermeables para lluvia, waders y botas para agua y barro'
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
        'Mantas ignífugas, duchas lavaojos y kits de respuesta ante derrames'
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
  return (
    <>
      <Head>
        <title>Tecno Light S.R.L. | Señalización Vial y Cartelería Reflectiva</title>
        <meta
          name="description"
          content="Fabricación y provisión de señalización vial oficial, cartelería reflectiva Avery Dennison, impresión digital TrafficJet™ Xpress, Seguridad Industrial y EPP (venta mayorista y minorista), y alquiler de elementos de seguridad vial."
        />
      </Head>

      {/* 1. HERO PRINCIPAL: Logo y sellos oficiales Avery Dennison / TrafficJet Xpress */}
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
              description="Integrando planta industrial propia, tecnología reflectiva certificada, laminado continuo y logística directa en todo el país."
            />

            {/* Bloque Institucional */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
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
          </div>
        </section>

        {/* PILAR 1. FABRICACIÓN DE CARTELES Y SEÑALIZACIÓN */}
        <section
          id="senalizacion"
          className="section-ig-card border-b border-white/5 py-20 lg:py-28 relative scroll-mt-28"
        >
          <div id="avery-dennison" className="absolute -top-28" aria-hidden="true" />
          <div id="tecnologia" className="absolute -top-28" aria-hidden="true" />
          <div id="infraestructura" className="absolute -top-28" aria-hidden="true" />
          <div id="proceso" className="absolute -top-28" aria-hidden="true" />
          <div className="max-w-site mx-auto px-5 lg:px-10">
            {/* Encabezado Principal del Pilar 01 + Video de Manufactura y Laminado */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
              <div className="lg:col-span-5">
                <SectionTitle
                  kicker={FABRICACION_SENALIZACION.kicker}
                  title={FABRICACION_SENALIZACION.title}
                  description={FABRICACION_SENALIZACION.description}
                />
                <CheckList items={FABRICACION_SENALIZACION.bullets} />
              </div>
              <div className="lg:col-span-7">
                <CentralFactoryVideo />
              </div>
            </div>

            {/* Líneas de Fabricación de Cartelería y Señalización */}
            <div className="mb-12">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">
                Líneas de Fabricación y Señalización Oficial
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {FABRICACION_SENALIZACION.lineas.map((item, idx) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 hover:border-primary/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em] text-primary block mb-3">
                        LÍNEA 0{idx + 1}
                      </span>
                      <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-primary text-xs font-semibold">
                      <Check size={14} />
                      <span>Fabricación a medida</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Láminas Reflectivas Avery Dennison y Laminado UV */}
            <div className="mb-12">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">
                Láminas Microprismáticas Avery Dennison y Laminado Continuo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {FABRICACION_SENALIZACION.laminas.map((card, index) => (
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
                    <h4 className="text-base font-semibold text-slate-100 mb-2">{card.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{card.description}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* Proceso Industrial en Planta (3 etapas) + Capacidad Instalada */}
            <div className="mt-12 pt-12 border-t border-white/10">
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary block mb-1">
                  Circuito Productivo en Planta Los Polígonos
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Proceso Industrial Continuo hasta el Producto Final
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                {FABRICACION_SENALIZACION.etapasPlanta.map((stage) => (
                  <div
                    key={stage.id}
                    className="bg-slate-950/60 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all"
                  >
                    <div className="w-8 h-[3px] bg-primary rounded-full mb-4" />
                    <h4 className="text-sm font-bold tracking-widest text-white mb-2">{stage.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{stage.description}</p>
                  </div>
                ))}
              </div>
              <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                  Capacidad Instalada y Recursos Operativos
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                  {FABRICACION_SENALIZACION.capacidades.map((cap) => (
                    <div key={cap} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {cap}
                    </div>
                  ))}
                </div>
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
                      Lámina microprismática de alta intensidad Tipo IV (Serie T-6500) sobre chapa en calibres 14, 16 y distintos calibres dependiendo el trabajo.
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
                      Vinilo microprismático reflectivo azul con flechas direccionales hacia abajo, terminación perimetral y laminado continuo.
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

            {/* Galería de Trabajos y Cartelería Urbana en Ruta y Vía Pública */}
            <div className="mt-16 pt-12 border-t border-white/10">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary block mb-1">
                    Trabajos en Ruta y Cartelería Urbana
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    Registro Visual de Obras Reales e Intervenciones
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
          </div>
        </section>

        {/* PILAR 2. SEGURIDAD INDUSTRIAL Y EPP */}
        <section
          id="catalogo"
          className="py-20 lg:py-28 section-ig-card relative overflow-hidden border-b border-white/5 scroll-mt-28"
        >
          <div id="seguridad" className="absolute -top-24 scroll-mt-28" aria-hidden="true" />
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <SectionTitle
              kicker={SEGURIDAD_INDUSTRIAL_EPP.kicker}
              title={SEGURIDAD_INDUSTRIAL_EPP.title}
              description={SEGURIDAD_INDUSTRIAL_EPP.description}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SEGURIDAD_INDUSTRIAL_EPP.groups.map((group) => (
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
          </div>
        </section>

        {/* PILAR 3. ALQUILER DE ELEMENTOS DE SEGURIDAD VIAL */}
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
                  kicker={ALQUILER_VALLAS_SEGURIDAD.kicker}
                  title={ALQUILER_VALLAS_SEGURIDAD.title}
                  description={ALQUILER_VALLAS_SEGURIDAD.description}
                />

                {/* Alquiler destacado: Vallas para Eventos (2 x 1,3) */}
                <div className="mb-8 grid lg:grid-cols-[1.2fr_1fr] gap-6 rounded-xl border border-primary/40 bg-primary/[0.06] p-6 md:p-8 items-center">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-2">
                      Alquiler destacado · Medida (2 m x 1,3 m)
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                      {ALQUILER_VALLAS_SEGURIDAD.eventos.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                      {ALQUILER_VALLAS_SEGURIDAD.eventos.description}
                    </p>
                    <Image
                      src="/images/trabajos/vallas-evento.jpg"
                      alt="Vallas para eventos (2m x 1,3m) instaladas al aire libre"
                      width={1600}
                      height={979}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="mt-5 h-40 w-full rounded-lg border border-primary/20 object-cover md:h-48"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-5">
                    <ul className="space-y-3">
                      {ALQUILER_VALLAS_SEGURIDAD.eventos.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <Check size={15} className="text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Grilla de los 7 elementos de seguridad vial en alquiler */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ALQUILER_VALLAS_SEGURIDAD.items.map((item, index) => (
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
                        {item.description && (
                          <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Flota Operativa y Cuadrillas en Ruta */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-slate-950/60 p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-2">
                {ALQUILER_VALLAS_SEGURIDAD.flota.kicker}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                {ALQUILER_VALLAS_SEGURIDAD.flota.title}
              </h3>
              <p className="max-w-2xl text-sm text-slate-400 leading-relaxed">
                {ALQUILER_VALLAS_SEGURIDAD.flota.description}
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {ALQUILER_VALLAS_SEGURIDAD.flota.items.map((item) => (
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
        </section>
      </div>
    </>
  );
}