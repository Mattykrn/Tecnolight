import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Truck,
  Wrench
} from 'lucide-react';

import InteractiveRoadHero from '../components/InteractiveRoadHero';
import { getWaLink } from '../utils/whatsapp';

/* ============================================================
   Datos internos — Contenido institucional, catálogo y servicios
   ============================================================ */

const QUIENES = [
  'TECNO LIGHT S.R.L. fabrica y provee señalización vial reglamentaria, preventiva, informativa y transitoria. Opera planta propia en el Área Industrial Los Polígonos (Santa Fe) con equipamiento de corte láser, pintura y el sistema de impresión digital reflectiva de Avery Dennison.',
  'Comercializa EPP e indumentaria de trabajo para obras civiles, viales e industriales, y provee alquiler de equipamiento de seguridad vial para desvíos y eventos. Provee a municipios, comunas y empresas contratistas de obra pública y privada.',
  'Atención comercial de lunes a viernes de 8:00 a 17:00 hs. Sede comercial en Santa Fe Capital y sede operativa en Rosario.'
];

const QUIENES_TAGS = ['Santa Fe', 'Rosario', 'Los Polígonos'];

const IMPRESION = {
  kicker: 'Tecnología',
  title: 'Impresión Digital Reflectiva',
  description:
    'Tecnología Omnicubo microprismática de alta calidad con impresión digital reflectiva.'
};

const PROCESO = {
  kicker: 'Capacidad Operativa e Infraestructura',
  title: 'Proceso Industrial de Fabricación',
  description:
    'Fabricación integral desde diseño hasta producto final. Proceso continuo en planta propia con equipamiento especializado y control de calidad en cada etapa.',
  stages: [
    { id: 'diseno', title: 'DISEÑO', description: 'Elaboración de planos técnicos y diagramación.' },
    { id: 'corte', title: 'CORTE LÁSER', description: 'Corte de chapas y perfiles de hierro mediante tecnología láser de alta precisión.' },
    { id: 'pintura', title: 'PINTURA', description: 'Pintura Epoxi de alta durabilidad.' },
    { id: 'impresion', title: 'IMPRESIÓN', description: 'Impresión digital reflectiva sobre láminas microprismáticas de alta calidad.' }
  ],
  capacidades: [
    'Planta fabril en Área Industrial Los Polígonos, Santa Fe',
    'Sistema de corte láser, plegado y conformado de chapa metálica',
    'Flota propia para traslado y colocación en traza',
    'Cuadrillas capacitadas para montaje en ruta y obra urbana',
    'Depósito de equipamiento en alquiler para desvíos y eventos',
    'Sede comercial en Santa Fe y sede operativa en Rosario'
  ]
};

const SENALIZACION = {
  kicker: 'Señalización Vial y Fabricación',
  title: 'Señalización Vial y Cartelería',
  description:
    'Producción propia de señalización vial reglamentaria, preventiva, informativa y transitoria. Fabricamos sobre múltiples sustratos con láminas microprismáticas Avery Dennison. Proveemos a constructoras, municipios, organismos viales y distribuidores del sector.',
  groups: [
    {
      id: 'carteleria',
      title: 'Cartelería Reglamentaria, Preventiva e Informativa',
      items: [
        'Señales reglamentarias, preventivas e informativas',
        'Cartelería transitoria de obra y desvíos viales',
        'Nomenclatura urbana y vial para municipios y comunas',
        'Pasarelas peatonales y señalización de infraestructura pública'
      ]
    }
  ]
};

const SERVICIOS = {
  kicker: 'Servicios y Alquiler',
  title: 'Alquiler de Equipamiento Vial y Servicios en Obra',
  description:
    'Provisión y alquiler de dispositivos de seguridad vial para desvíos, obras civiles y eventos. Logística de colocación y mantenimiento directamente en traza. Entrega en obrador o depósito asignado.',
  items: [
    {
      id: 'alquiler',
      Icon: Truck,
      title: 'Alquiler, Traslado y Mantenimiento',
      description: 'Alquiler, traslado y mantenimiento de equipos de señalización vial: balizas, vallas, semáforos y carteles viales.'
    },
    {
      id: 'colocacion',
      Icon: Wrench,
      title: 'Colocación en Obra',
      description: 'Colocación de carteles, lomos de burro, tachas reflectivas y luces de emergencia.'
    },
    {
      id: 'entrega',
      Icon: PackageCheck,
      title: 'Entrega en Obra',
      description: 'Entrega de pedidos en obra o en cualquier ubicación asignada por la empresa contratista.'
    }
  ],
  detalles: [
    'Vallas de seguridad y cerramiento',
    'Balizamiento y señalización luminosa',
    'Dispositivos de delineación',
    'Logística de servicio en traza'
  ]
};

const INSTALACION = {
  kicker: 'Despliegue Operativo',
  title: 'Instalación y Montaje en Ruta y Ciudad',
  cards: [
    {
      id: 'vertical',
      title: 'Montaje de Señalización Vertical en Rutas y Autovías',
      description: 'Hincado de postes de acero y fijación antivandálica de carteles preventivos y reglamentarios en banquinas y zonas de camino.'
    },
    {
      id: 'granporte',
      title: 'Cartelería de Gran Porte y Señalización Aérea',
      description: 'Fabricación y montaje de cartelería de gran porte con láminas microprismáticas Avery Dennison — Tecnología Omnicubo.'
    },
    {
      id: 'urbana',
      title: 'Demarcación, Vallado y Balizamiento de Obras Urbanas',
      description: 'Balizamiento nocturno y demarcación horizontal con pintura termoplástica y reflectiva.'
    }
  ]
};

const EPP = {
  kicker: 'Seguridad Industrial y EPP',
  title: 'Elementos de Protección Personal e Indumentaria',
  description:
    'Comercialización de indumentaria de trabajo homologada y equipamiento de protección personal (EPP) para obras civiles, viales e industriales. Provisión por unidad o por volumen con entrega en obra o centro logístico asignado.',
  groups: [
    {
      id: 'indumentaria',
      title: 'Indumentaria de Trabajo',
      items: [
        'Ropa de trabajo (mameluco, pantalón, camisa y campera)',
        'Indumentaria térmica para bajas temperaturas',
        'Trajes impermeables para lluvia y waders de pescador',
        'Botas pescadoras y calzado de goma para trabajo en agua'
      ]
    },
    {
      id: 'calzado',
      title: 'Calzado de Seguridad',
      items: [
        'Calzado con puntera de acero y suela antiperforación',
        'Calzado dieléctrico para trabajos eléctricos',
        'Botines de cuero con suela de goma antideslizante'
      ]
    },
    {
      id: 'respiratoria',
      title: 'Protección Respiratoria',
      items: [
        'Semimáscaras faciales con filtros intercambiables',
        'Filtros para vapores orgánicos y partículas (P100)',
        'Mascarillas desechables N95 y quirúrgicas'
      ]
    },
    {
      id: 'auditiva',
      title: 'Protección Auditiva',
      items: [
        'Protectores endoaurales (tapones reutilizables y descartables)',
        'Protectores de copa con banda de cabeza y de nuca',
        'Protectores adosables a casco'
      ]
    },
    {
      id: 'ocular',
      title: 'Protección Ocular y Facial',
      items: [
        'Anteojos de seguridad con lente policarbonato',
        'Antiparras ventiladas e indiferentes para uso industrial',
        'Caretas para soldar con visor de electro-oscurecimiento',
        'Pantallas faciales para proyecciones y productos químicos'
      ]
    },
    {
      id: 'guantes',
      title: 'Guantes de Seguridad',
      items: [
        'Guantes de vaqueta, descarne y nitrilo',
        'Guantes anticorte para manipulación de materiales',
        'Guantes de látex y jersey para tareas generales'
      ]
    },
    {
      id: 'cascos',
      title: 'Cascos de Seguridad',
      items: [
        'Cascos clase A, B y E (dieléctrico)',
        'Cascos con barbijo y accesorios de sujeción',
        'Protección para trabajos en obra e industria'
      ]
    },
    {
      id: 'anticaidas',
      title: 'Protección Anticaídas y Sujeción',
      items: [
        'Arneses de seguridad full body con punto de anclaje dorsal/esternal',
        'Colas de amarre con absorbedor de energía',
        'Fajas lumbares de soporte para esfuerzos'
      ]
    },
    {
      id: 'cintas',
      title: 'Cintas y Mallas de Advertencia',
      items: [
        'Cintas de peligro, subterráneas, demarcatorias y antideslizantes',
        'Mallas subterráneas y perimetrales',
        'Demarcación de áreas de trabajo y circulación'
      ]
    },
    {
      id: 'incendio',
      title: 'Seguridad contra Incendio y Primeros Auxilios',
      items: [
        'Matafuegos de polvo ABC y CO₂ (revisión y recarga)',
        'Botiquines reglamentarios para obra y empresa',
        'Señalización de seguridad para plantas e instalaciones'
      ]
    }
  ]
};

const CONTACTO = [
  {
    id: 'santa-fe',
    label: 'Sede Comercial',
    city: 'Santa Fe',
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
    label: 'Planta Fabril e Industrial',
    city: 'Los Polígonos',
    address: 'Cnel. Loza 7198, P.I. Los Polígonos, Santa Fe',
    phone: '(0342) 455-3582',
    phoneHref: 'tel:03424553582',
    email: 'tecnolightsrl@tecnolightsrl.com'
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

export default function Index() {
  const waLink = getWaLink();

  return (
    <>
      <div id="inicio" className="h-0 scroll-mt-20" aria-hidden="true" />
      <InteractiveRoadHero />

      <main className="bg-background text-white">
        {/* ========== QUIÉNES SOMOS ========== */}
        <section id="nosotros" className="py-20 lg:py-28 section-solid-mid border-b border-white/5 relative scroll-mt-28">
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <SectionTitle kicker="Empresa" title="Quiénes Somos" />
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-8 space-y-5 text-slate-300 leading-relaxed">
                {QUIENES.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="lg:col-span-4">
                <div className="card-corporate p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                    Presencia
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
                    Planta propia, producción integral y logística de entrega en obra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== IMPRESIÓN DIGITAL ========== */}
        <section id="tecnologia" className="section-ig-card border-y border-white/5 py-16 lg:py-24 px-4 relative scroll-mt-28">
          <div className="max-w-site mx-auto">
            <SectionTitle
              kicker={IMPRESION.kicker}
              title={IMPRESION.title}
            />
            <div className="card-corporate p-8">
              <div className="w-8 h-[3px] bg-primary rounded-full mb-4" />
              <p className="text-slate-200 text-base md:text-lg leading-relaxed">
                {IMPRESION.description}
              </p>
            </div>
          </div>
        </section>

        {/* ========== PROCESO INDUSTRIAL ========== */}
        <section id="infraestructura" className="py-20 lg:py-28 section-ig-card border-b border-white/5 relative z-10 scroll-mt-28">
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <SectionTitle
              kicker={PROCESO.kicker}
              title={PROCESO.title}
              description={PROCESO.description}
            />
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
          </div>
        </section>

        {/* ========== SEÑALIZACIÓN VIAL ========== */}
        <section id="senalizacion" className="py-20 lg:py-28 section-ig-card border-b border-white/5 scroll-mt-28">
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <SectionTitle
              kicker={SENALIZACION.kicker}
              title={SENALIZACION.title}
              description={SENALIZACION.description}
            />
            <div className="grid gap-6">
              {SENALIZACION.groups.map((group) => (
                <div key={group.id} className="card-corporate p-8">
                  <h3 className="text-lg font-semibold text-slate-100 mb-5">{group.title}</h3>
                  <CheckList items={group.items} />
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-slate-500 leading-relaxed">
              Tecno Light S.R.L. provee a municipios, comunas y empresas contratistas de obra pública y privada.
            </p>
          </div>
        </section>

        {/* ========== SERVICIOS Y ALQUILER ========== */}
        <section id="servicios" className="py-20 lg:py-28 section-ig-card border-b border-white/5 scroll-mt-28">
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-[#131720] via-slate-950 to-primary/10 p-8 md:p-12">
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
                  Servicio disponible en Santa Fe y Rosario
                </p>
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
                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={getWaLink('Hola, quiero solicitar un presupuesto de alquiler de equipamiento vial.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                  >
                    Solicitar presupuesto de alquiler <ArrowRight size={16} />
                  </a>
                  <Link href="/contact" className="btn-secondary text-sm">
                    Consultar disponibilidad
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== INSTALACIÓN Y MONTAJE ========== */}
        <section id="instalacion" className="py-20 lg:py-28 section-ig-card border-b border-white/5 scroll-mt-28">
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <SectionTitle kicker={INSTALACION.kicker} title={INSTALACION.title} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INSTALACION.cards.map((card) => (
                <div
                  key={card.id}
                  className="card-corporate p-6"
                >
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CATÁLOGO EPP ========== */}
        <section id="catalogo" className="py-24 lg:py-32 section-ig-card relative overflow-hidden border-b border-white/5 scroll-mt-28">
          <div id="seguridad" className="absolute -top-24 scroll-mt-28" aria-hidden="true" />
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <SectionTitle
              kicker={EPP.kicker}
              title={EPP.title}
              description={EPP.description}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {EPP.groups.map((group) => (
                <div key={group.id} className="card-corporate p-6">
                  <h3 className="text-base font-semibold text-slate-100 mb-4">{group.title}</h3>
                  <ul className="space-y-2.5">
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
            <p className="mt-8 text-sm text-slate-500">
              Provisión de EPP e indumentaria para obras públicas y privadas. Cotizaciones por pliego,
              por lote o por proveedor único. Entrega directa en obrador o depósito designado por el
              contratista.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:tecnolightsrl@tecnolightsrl.com?subject=Cotizaci%C3%B3n%20EPP%20e%20Indumentaria"
                className="btn-primary text-sm"
              >
                Solicitar cotización de EPP <ArrowRight size={16} />
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ========== CONTACTO ========== */}
        <section id="contacto" className="py-24 lg:py-32 section-solid-dark bg-hex-pattern scroll-mt-28">
          <div className="max-w-site mx-auto px-5 lg:px-10">
            <SectionTitle
              kicker="Contacto"
              title="Canales de Contacto"
              description="Atención comercial de lunes a viernes, 8:00 a 17:00 hs. Para pliegos y licitaciones, escribinos por email."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CONTACTO.map((sede) => (
                <div key={sede.id} className="card-corporate p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-2">
                    {sede.label}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">{sede.city}</h3>
                  <div className="space-y-3 text-sm text-slate-400">
                    <p className="flex items-start gap-2.5">
                      <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
                      {sede.address}
                    </p>
                    <a href={sede.phoneHref} className="flex items-center gap-2.5 hover:text-primary transition-colors">
                      <Clock size={15} className="text-primary shrink-0" />
                      {sede.phone}
                    </a>
                    <a href={`mailto:${sede.email}`} className="flex items-center gap-2.5 hover:text-primary transition-colors break-all">
                      <Mail size={15} className="text-primary shrink-0" />
                      {sede.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm"
              >
                <MessageCircle size={16} /> Contactar por WhatsApp
              </a>
              <Link href="/contact" className="btn-secondary text-sm">
                Ver formulario de contacto
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
