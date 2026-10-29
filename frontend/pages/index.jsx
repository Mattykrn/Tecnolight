import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Play,
  Truck,
  Wrench
} from 'lucide-react';

import InteractiveRoadHero from '../components/InteractiveRoadHero';
import { getWaLink } from '../utils/whatsapp';
import { getMapsDirectionsLink } from '../utils/links';

/* ============================================================
   Datos internos — Contenido institucional, catálogo y servicios
   ============================================================ */

const QUIENES = [
  'Con más de tres décadas de trayectoria ininterrumpida y liderazgo regional, TECNO LIGHT S.R.L. se posiciona como una firma referente en el diseño, manufactura e instalación de sistemas de señalización vial reglamentaria, preventiva, informativa y transitoria.',
  'Desde nuestra planta industrial ubicada en el Parque Industrial Los Polígonos (Santa Fe Capital), coordinamos procesos productivos de vanguardia: corte láser computarizado, conformado de chapa, tratamiento anticorrosivo mediante pintura epoxi termoconvertible, la plataforma digital de impresión Mimaki UCJV300-160 UV-LED y laminado continuo sobre láminas reflectivas Avery Dennison.',
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
  title: 'Impresión Digital Mimaki UCJV300-160 y Láminas Avery Dennison',
  description:
    'Tecno Light S.R.L. opera con la avanzada plataforma digital Mimaki UCJV300-160 con curado instantáneo UV-LED sobre láminas microprismáticas Avery Dennison (OmniCube™, HIP y EGP), combinada con la estación de laminado continuo que sella la película protectora UV antigraffiti. Garantizamos la máxima durabilidad óptica del mercado y respuesta retrorreflectiva a largo plazo.',
  standards: 'Certificación técnica oficial de retrorreflexión (Tipos I, IV, VIII, IX y XI).',
  proceso: [
    'Impresión digital UV-LED de alta definición mediante la plataforma industrial Mimaki UCJV300-160.',
    'Curado instantáneo en frío por emisión LED, evitando tensiones térmicas sobre los microprismas reflectivos.',
    'Laminado continuo de alta presión con película protectora transparente con filtro UV y barrera antigraffiti.',
    'Control fotométrico de precisión y transferencia sobre chapa galvanizada, PVC espumado, alto impacto o plástico compacto.'
  ],
  videoDesc:
    'Registro directo en nuestra planta industrial: proceso centralizado de impresión digital Mimaki UCJV300-160 sobre láminas microprismáticas Avery Dennison y sellado mediante laminado continuo de alta resistencia.',
  cards: [
    {
      id: 'mimaki',
      title: 'Mimaki UCJV300-160 (TrafficJet™ Xpress)',
      description:
        'Impresora digital oficial Mimaki UCJV300-160 con tecnología UV-LED en frío calibrada exclusivamente para láminas reflectivas Avery Dennison y sistema TrafficJet™ Xpress.'
    },
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
      title: 'Serie T-1500 Engineering Grade Prismatic (EGP)',
      description:
        'Tipo I. Alternativa prismática eficiente para señalización comercial, cartelería informativa y nomenclatura urbana.'
    },
    {
      id: 'sobrelaminados',
      title: 'Sobrelaminados y Laminado Continuo UV',
      description:
        'Películas transparentes con filtro UV y barrera antigraffiti fijadas mediante rodillos continuos de alta presión para blindar la señal contra la intemperie.'
    },
    {
      id: 'zona-obras',
      title: 'Zona de Obras: Series Flexibles WR-6100 y WR-7100',
      description:
        'Línea de prismáticos flexibles de alta adaptabilidad para dispositivos de canalización temporal, tambores y vallas de obra.'
    },
    {
      id: 'sustratos',
      title: 'Sustratos Normados y Calidad Estructural',
      description:
        'Mecanizado e integración sobre chapa de diferentes espesores, PVC espumado, polímeros de alto impacto y plástico compacto con recubrimiento epoxi.'
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
  kicker: 'Diseño Vial y Manufactura Homologada',
  title: 'Señalización Vial Reglamentaria, Cartelería y Sustratos Normados',
  description:
    'Producción integral de dispositivos viales bajo rigurosas normativas técnicas y estándares internacionales de seguridad vial. Fabricación automatizada sobre sustratos de máxima resistencia: chapa de acero galvanizado en diversos espesores, placas de PVC espumado, polímeros de alto impacto, plástico compacto de alta densidad y perfiles de aluminio tratados con recubrimiento epoxi termoconvertible. Incorporación certificada de láminas microprismáticas Avery Dennison de alta retrorreflexión angular para autopistas, rutas, municipios y complejos industriales.',
  sustratos: [
    {
      title: 'Chapa de Acero Galvanizado',
      desc: 'Calibres 16, 18 y 20 con pestaña perimetral doble, confiriendo rigidez estática ante vientos intensos.'
    },
    {
      title: 'PVC Espumado de Alta Densidad',
      desc: 'Placas livianas e inoxidables, óptimas para nomenclatura urbana, señalización interior e indicativa.'
    },
    {
      title: 'Polímeros de Alto Impacto',
      desc: 'Material de absorción elástica frente a golpes, con aditivos de protección UV contra envejecimiento solar.'
    },
    {
      title: 'Plástico Compacto',
      desc: 'Sustrato de alta densidad mecánica y química, libre de mantenimiento y resistente a la intemperie.'
    }
  ],
  groups: [
    {
      id: 'carteleria',
      title: 'Señales Reglamentarias, Preventivas y Estructuras Viales',
      items: [
        'Señales reglamentarias, preventivas e informativas con retrorreflexión certificada de alta visibilidad',
        'Cartelería transitoria de obra, desvíos y balizamiento de alta advertencia para zonas de camino',
        'Dispositivos electromecánicos viales (banderilleros mecánicos sincronizados para operativos en ruta)',
        'Sistemas modulares de nomenclatura urbana y señalética de orientación para municipios y comunas',
        'Pórticos, semipórticos y pasarelas peatonales de gran porte con cálculo estático de resistencia al viento'
      ]
    },
    {
      id: 'comercial',
      title: 'Cartelería Corporativa, Plantas Industriales y Flotas',
      items: [
        'Señalización de seguridad industrial para plantas fabriles, depósitos y centros logísticos',
        'Impresión y mecanizado sobre chapa galvanizada, PVC, alto impacto, plástico compacto y acrílicos técnicos',
        'Kits reflectivos reglamentarios y señalización de seguridad para flotas de transporte y maquinaria pesada',
        'Asesoramiento técnico, relevamiento planimétrico y diagramación gráfica según especificaciones técnicas'
      ]
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
      description: 'Selección estricta de chapa de diferentes espesores, PVC espumado, alto impacto y plástico compacto. Elaboración de planos técnicos bajo especificaciones viales aplicables.'
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
      title: '4. IMPRESIÓN DIGITAL MIMAKI, LAMINADO Y MONTAJE FINAL',
      description: 'Impresión digital Mimaki UCJV300-160 UV-LED sobre microprismas Avery Dennison, laminado continuo protector antigraffiti, sellado perimetral y control fotométrico previo al despacho.'
    }
  ],
  capacidades: [
    'Planta industrial en el Parque Industrial Los Polígonos (Santa Fe Capital)',
    'Tecnología de corte láser computarizado y líneas de plegado de chapa de precisión',
    'Impresora digital Mimaki UCJV300-160 UV-LED y estación de laminado continuo',
    'Flota de unidades móviles y cuadrillas técnicas para logística y montaje en ruta',
    'Sede Comercial en Santa Fe Capital y Sede Operativa en la ciudad de Rosario'
  ]
};

const SERVICIOS = {
  kicker: 'Soluciones Operativas y Logística Vial',
  title: 'Servicios y Alquiler: Equipamiento Vial, Balizas, Vallas y Colocación en Ruta',
  description:
    'Disponibilidad inmediata de stock, logística integral y cuadrillas técnicas para encauzar desvíos de tránsito, operativos viales y eventos multitudinarios. Cobertura permanente en Santa Fe, Rosario y todo el litoral argentino.',
  eventos: {
    title: 'Alquiler de Vallas de Contención para Eventos y Obras',
    description:
      'Módulos de vallado de alta resistencia fabricados en acero con terminación epoxi. Coordinamos la logística integral de entrega, montaje estructural, supervisión en sitio y retiro programado según el cronograma operativo en Santa Fe, Rosario y zona de influencia.',
    items: [
      'Vallas de contención de alta resistencia y cerramiento perimetral',
      'Logística coordinada de traslado, montaje técnico y retiro ágil',
      'Disponibilidad inmediata de stock en Santa Fe Capital y Rosario'
    ]
  },
  items: [
    {
      id: 'alquiler',
      Icon: Truck,
      title: 'Alquiler y Logística de Traslado',
      description: 'Alquiler y distribución puntual de vallas y dispositivos de señalización vial directamente en obra o evento.'
    },
    {
      id: 'colocacion',
      Icon: Wrench,
      title: 'Instalación y Anclaje Técnico en Obra',
      description: 'Montaje de cartelería, reductores de velocidad (lomos de burro), tachas reflectivas y sistemas de iluminación de emergencia.'
    },
    {
      id: 'entrega',
      Icon: PackageCheck,
      title: 'Entrega Directa en Ruta u Obrador',
      description: 'Despacho y entrega puntual de pedidos directamente en el obrador o en el punto kilométrico asignado por la empresa contratista.'
    }
  ],
  detalles: [
    'Vallas de seguridad y cerramiento perimetral',
    'Balizamiento nocturno y señalización luminosa LED',
    'Conos viales flexibles y canalizadores de tránsito',
    'Linternas viales y cadenas plásticas de advertencia',
    'Dispositivos de delineación y tachas reflectivas',
    'Logística y cuadrillas de servicio permanente en ruta'
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

/* Doble CTA institucional obligatorio por sección (WhatsApp + Correo formal) */
function SectionDualCta({
  text,
  waText,
  waLabel = 'Consultar por WhatsApp',
  emailSubject,
  emailLabel = 'Solicitud Formal y Pliegos',
}) {
  const waHref = getWaLink(waText);
  const emailHref = `mailto:tecnolightsrl@tecnolightsrl.com?subject=${encodeURIComponent(emailSubject)}`;

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
        <a
          href={emailHref}
          target="_self"
          className="inline-flex items-center justify-center gap-2 rounded bg-white/10 border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 hover:border-primary/50 transition-all cursor-pointer"
        >
          <Mail size={16} className="text-primary" />
          <span>{emailLabel}</span>
        </a>
      </div>
    </div>
  );
}

/* Reproductor unificado interactivo para videos fabriles */
const FACTORY_VIDEOS = [
  {
    id: 'proceso-unificado',
    title: 'Proceso Unificado: Impresora Mimaki UCJV300-160 y Laminado Continuo',
    tag: 'Planta Fabril Los Polígonos — Santa Fe',
    src: '/videos/proceso/proceso-laminado-unificado.mp4',
    poster: '/videos/proceso/proceso-laminado-poster.jpg',
    description:
      'Registro directo en planta: video unificado que integra la impresión digital Mimaki UCJV300-160 (TrafficJet™ Xpress) sobre láminas Avery Dennison y el posterior sellado en estación de laminado continuo a presión con barrera protectora UV.'
  },
  {
    id: 'laminado',
    title: 'Laminado Continuo Protector UV Antigraffiti',
    tag: 'Estación de Laminado en Planta',
    src: '/videos/proceso/laminado-proceso.mp4',
    poster: '/videos/proceso/laminado-poster.jpg',
    description:
      'Operación de laminado continuo a presión: aplicación de película protectora UV transparente sobre el gráfico reflectivo, brindando blindaje total contra intemperie y graffiti.'
  },
  {
    id: 'mimaki-impresion',
    title: 'Impresión Digital Mimaki UCJV300-160 UV-LED',
    tag: 'Impresión Digital en Frío',
    src: '/videos/proceso/mimaki-impresion.mp4',
    poster: '/videos/proceso/mimaki-poster.jpg',
    description:
      'Impresión digital UV-LED de alta resolución con curado instantáneo sobre láminas microprismáticas Avery Dennison de máxima graduación óptica.'
  }
];

function UnifiedFactoryVideo() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const videoRef = React.useRef(null);
  const currentVideo = FACTORY_VIDEOS[activeIdx];

  const handleSelect = (index) => {
    setActiveIdx(index);
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  };

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
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl p-5 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary block mb-1">
            Reproductor Unificado de Planta
          </span>
          <h4 className="text-base font-bold text-white">{currentVideo.title}</h4>
        </div>
        <span className="text-xs text-slate-400 font-mono self-start sm:self-auto px-2.5 py-1 rounded bg-white/5 border border-white/10">
          {currentVideo.tag}
        </span>
      </div>

      <figure className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0B0D12]">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={`${playing ? 'Pausar' : 'Reproducir'} video: ${currentVideo.title}`}
          aria-pressed={playing}
          className="group relative block aspect-[16/9] w-full overflow-hidden bg-black"
        >
          <video
            key={currentVideo.src}
            ref={videoRef}
            src={currentVideo.src}
            poster={currentVideo.poster}
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label={currentVideo.title}
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

      <p className="mt-3 text-xs md:text-sm text-slate-400 leading-relaxed">
        {currentVideo.description}
      </p>

      {/* Selector de clips en el mismo reproductor */}
      <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2">
        {FACTORY_VIDEOS.map((v, i) => (
          <button
            key={v.id}
            type="button"
            onClick={() => handleSelect(i)}
            className={`text-xs px-3.5 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              activeIdx === i
                ? 'bg-primary text-white shadow-md shadow-primary/30'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            <Play size={12} fill={activeIdx === i ? 'currentColor' : 'none'} />
            <span>{v.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <>
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

            {/* Ficha técnica y Reproductor Unificado de Video */}
            <div className="mt-14 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-2">
                  En planta — tecnología operativa
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Impresora Digital Mimaki UCJV300-160 y Laminado Continuo en Planta
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {AVERY_DENNISON.videoDesc}
                </p>
                <ul className="space-y-3">
                  {AVERY_DENNISON.proceso.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed"
                    >
                      <Check size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-7">
                <UnifiedFactoryVideo />
              </div>
            </div>

            <SectionDualCta
              text="Asesoramiento técnico en especificación de láminas reflectivas OmniCube™, HIP y EGP con impresión Mimaki UV-LED y laminado continuo."
              waText="Hola, solicito asesoramiento técnico sobre impresión digital Mimaki UCJV300-160, láminas Avery Dennison y laminado protector."
              waLabel="Consultar por WhatsApp"
              emailSubject="Solicitud Técnica y Pliego - Impresión Mimaki y Laminados Avery Dennison"
              emailLabel="Solicitud Formal y Pliegos"
            />
          </div>
        </section>

        {/* 3. SEÑALIZACIÓN VIAL Y CARTELERÍA: Sustratos y Normativas */}
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

            {/* Sustratos Normados */}
            <div className="mb-10">
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

            <div className="grid md:grid-cols-2 gap-6">
              {SENALIZACION.groups.map((group) => (
                <div key={group.id} className="card-corporate p-8">
                  <h3 className="text-lg font-semibold text-slate-100 mb-5">{group.title}</h3>
                  <CheckList items={group.items} />
                </div>
              ))}
            </div>

            <SectionDualCta
              text="Fabricación homologada de señalización vial reglamentaria, urbana e industrial sobre sustratos de máxima resistencia."
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
                      <span>Consultar vallas para eventos</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>

                {/* Items de servicio */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SERVICIOS.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-slate-950/60 border border-primary/20 rounded-xl p-6 hover:border-primary/60 hover:bg-slate-950/80 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
                          <item.Icon size={18} className="text-primary" />
                        </div>
                        <span className="text-primary text-xs font-bold tracking-[0.25em]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-100 mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>

                {/* Detalles de equipamiento vial */}
                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SERVICIOS.detalles.map((detalle) => (
                    <div
                      key={detalle}
                      className="flex items-center gap-2.5 text-xs text-slate-300 bg-white/5 border border-white/10 rounded-lg px-4 py-3"
                    >
                      <Check size={14} className="text-primary shrink-0" />
                      {detalle}
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
                          <a
                            href={`mailto:${sede.email}`}
                            target="_self"
                            className="flex items-center gap-2.5 hover:text-primary transition-colors break-all"
                          >
                            <Mail size={15} className="text-primary shrink-0" />
                            <span>{sede.email}</span>
                          </a>
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
                <a
                  href="mailto:tecnolightsrl@tecnolightsrl.com?subject=Contacto%20Institucional%20y%20Pliegos%20-%20Tecno%20Light%20S.R.L."
                  target="_self"
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-primary/50 hover:bg-white/[0.04] transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Correo Institucional</span>
                    <span className="text-xs md:text-sm font-semibold text-white break-all">tecnolightsrl@tecnolightsrl.com</span>
                  </div>
                </a>

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
