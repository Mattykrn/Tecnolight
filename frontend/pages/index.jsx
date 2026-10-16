import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  MessageCircle,
  ShieldCheck,
  Droplet,
  Clock,
  Sparkles,
  X,
  AlertTriangle,
} from 'lucide-react';
import { getWaLink } from '../utils/whatsapp';

const FONT_ROBOTO_500 = { fontFamily: "'Roboto', sans-serif", fontWeight: 500 };
const FONT_RALEWAY_900 = { fontFamily: "'Raleway', sans-serif", fontWeight: 900, textTransform: 'uppercase' };
const FONT_ROBOTO = { fontFamily: "'Roboto', sans-serif" };

const WaIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary atrapó un error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 m-4 bg-red-50/50 border border-red-100 rounded-xl">
          <AlertTriangle className="text-red-500 w-12 h-12 mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">Se produjo un error al cargar este módulo</h3>
          <p className="text-sm text-slate-500 text-center max-w-md mb-4">
            Lo sentimos, no pudimos cargar esta sección correctamente. Refresca la página o intenta de nuevo más tarde.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            Refrescar página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ── Banda de estadísticas corporativa ───────────────────── */
function StatsSection() {
  const stats = [
    { number: '+30', label: 'Años de experiencia' },
    { number: '4', label: 'Provincias operativas' },
    { number: 'DNV', label: 'Certificación vial' },
    { number: '2', label: 'Sedes comerciales' },
  ];
  return (
    <div className="stats-band">
      <div className="max-w-site mx-auto px-5 lg:px-10">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-y-6">
          {stats.map((s, i) => (
            <div key={i} className="stat-item flex-1 min-w-[140px]">
              <span className="stat-number">{s.number}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const waLink = getWaLink();
  return (
    <section
      id="inicio"
      className="relative min-h-[75vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden overflow-x-hidden pt-32 md:pt-40 pb-16 px-4 scroll-mt-28 bg-hex-pattern"
    >
      {/* Glow de marca en esquina — igual al Instagram */}
      <div className="corner-brand-glow" style={{ width: '300px', height: '300px', opacity: 0.6 }} />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/75 to-slate-950 pointer-events-none" />
      <motion.div
        className="relative z-10 max-w-6xl mx-auto text-center space-y-6 flex flex-col items-center w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="w-full flex justify-center items-center mt-4 sm:mt-6 mb-8 sm:mb-10 px-4">
          <img
            src="/images/logo-tecnolight-white.png"
            alt="TECNO LIGHT S.R.L."
            className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-auto object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
            style={{ width: '100%', maxWidth: '960px', height: 'auto' }}
          />
        </div>
        {/* Tagline oficial de marca */}
        <p
          className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          Fabricación y provisión de señalización vial, EPP e indumentaria de trabajo bajo normativas DNV, DPV e IRAM.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
          <a
            href="#contacto"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FF5A1F] hover:bg-[#e54e18] text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-[#FF5A1F]/30"
          >
            <FileText size={18} />
            Solicitar Presupuesto
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-xl border border-slate-700 hover:border-slate-500 text-sm transition-all duration-300 hover:-translate-y-1"
          >
            <MessageCircle size={18} />
            Contactar por WhatsApp
          </a>
        </div>
        <div className="pt-8 mt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-4xl mx-auto px-2 sm:px-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-slate-200 font-bold text-center sm:text-left leading-snug">
            DISTRIBUIDORES Y CONVERTIDORES <span className="text-[#FF5A1F]">CERTIFICADOS:</span>
          </span>
          <div className="flex items-center gap-3 sm:gap-4 bg-white/95 border border-white/30 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-xl hover:bg-white transition-all max-w-full shrink-0">
            <img src="/images/avery-dennison-official.svg" alt="Avery Dennison" className="h-6 sm:h-8 w-auto object-contain shrink-0" />
            <div className="h-5 sm:h-6 w-px bg-slate-200 shrink-0" />
            <img src="/images/trafficjet-xpress-official.svg" alt="TrafficJet™ Xpress" className="h-5 sm:h-7 w-auto object-contain shrink-0" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const PROCESS_GALLERY = [
  {
    src: '/images/trafficjet/gallery/proceso-1-impresion.jpg',
    alt: 'Plotter industrial TrafficJet™ Xpress imprimiendo lámina reflectiva',
  },
  {
    src: '/images/carteleria/4f20f2f2-398d-44ca-9061-e3ce6b69e98b.jpg',
    alt: 'Bobinas de lámina microprismática retrorreflectiva Avery Dennison en planta',
  },
  {
    src: '/images/trafficjet/impresion-microprismatica-detalle.jpg',
    alt: 'Detalle de curado UV sobre estructura microprismática de alta intensidad',
  },
  {
    src: '/images/carteleria/efed8a3c-6e4d-4d5f-9e20-20d38467c75a.jpg',
    alt: 'Cartelería vial terminada de alta visibilidad en mesa de ensamble',
  },
];

function TecnologiaSection() {
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImg(null);
    };
    if (selectedImg) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImg]);

  return (
    <section id="tecnologia" className="section-ig-card border-y border-white/5 py-16 lg:py-24 px-4 relative scroll-mt-28">
      <div className="corner-brand-glow" />
      <div id="planta-tecnologia" className="absolute top-0 scroll-mt-28" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span
            className="badge-ig mb-4 inline-block"
          >
            Bloque B — Impresión Digital y Rotulación
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight" style={FONT_RALEWAY_900}>
            Impresión Digital Retrorreflectiva: <span className="text-[#FF5A1F]">Avery Dennison TrafficJet™ Xpress</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium" style={FONT_ROBOTO}>
            Impresión digital directa sobre láminas retrorreflectivas microprismáticas (Grado Ingeniería, Alta Intensidad Prismática y Grado Diamante) con tintas pigmentadas de curado instantáneo UV-LED homologadas (Avery Dennison True Traffic Color™). Sobrelaminado protector Anti-Graffiti para remoción de aerosoles y pinturas sin pérdida de reflectividad. Rotulación gráfica de vehículos comerciales, transporte pesado y flotas corporativas.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
              Norma ASTM D4956
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
              Tintas Curables UV-LED
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">
              Sobrelaminado Anti-Graffiti
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-black shadow-2xl aspect-video group">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/images/trafficjet/video_poster.jpg"
                className="w-full h-full object-cover pointer-events-none"
              >
                <source src="/videos/trafficjet/video_home.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de video HTML5.
              </video>
              <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/10" />
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">
                  En planta: Impresión TrafficJet™ Xpress
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <div className="bg-white rounded-2xl p-6 shadow-2xl border border-white/20 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <img src="/images/avery-dennison-official.svg" alt="Avery Dennison" className="h-8 md:h-9 w-auto object-contain" />
                  <div className="h-6 w-px bg-slate-200" />
                  <img src="/images/trafficjet-xpress-official.svg" alt="TrafficJet™ Xpress" className="h-6 md:h-7 w-auto object-contain" />
                </div>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 uppercase tracking-wider"
                  style={FONT_ROBOTO_500}
                >
                  <ShieldCheck size={14} className="text-emerald-600" />
                  Convertidor Oficial
                </span>
              </div>
              <div className="pt-4">
                <p className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1" style={FONT_ROBOTO_500}>
                  Garantía de Retrorreflectividad Homologada (DNV / IRAM 3952)
                </p>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed" style={FONT_ROBOTO}>
                  Impresión digital directa sobre láminas microprismáticas Grado Ingeniería y Grado Diamante con tintas UV-LED homologadas True Traffic Color™. Durabilidad exterior certificada por Avery Dennison de 10 a 12 años.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                {
                  icon: <ShieldCheck className="text-orange-400" size={20} />,
                  title: 'Láminas Retrorreflectivas Certificadas',
                  desc: 'Grado Ingeniería, Alta Intensidad Prismática (HIP) y Grado Diamante (DNV / DPV).',
                },
                {
                  icon: <Droplet className="text-orange-400" size={20} />,
                  title: 'Tintas UV-LED Homologadas',
                  desc: 'Tecnología True Traffic Color™ con curado UV-LED en frío. Fijación micrométrica, estabilidad cromática absoluta y cumplimiento de coordenadas de color según normas IRAM y ASTM D4956.',
                },
                {
                  icon: <Sparkles className="text-emerald-400" size={20} />,
                  title: 'Protección Integral Anti-Graffiti',
                  desc: 'Blindaje repelente a pinturas sintéticas y aerosoles. Permite limpieza sin degradación.',
                },
                {
                  icon: <Clock className="text-orange-400" size={20} />,
                  title: 'Garantía Extendida de Fábrica',
                  desc: 'Durabilidad a la intemperie de hasta 10 a 12 años certificada por Avery Dennison.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 hover:border-orange-500/40 hover:bg-slate-800/80 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-wide" style={FONT_ROBOTO_500}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-normal" style={FONT_ROBOTO}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-12">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-white text-lg font-bold uppercase tracking-widest" style={FONT_ROBOTO_500}>
              Galería de Proceso
            </h3>
            <div className="h-px bg-slate-800 flex-grow" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROCESS_GALLERY.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-700 cursor-pointer group hover:border-orange-500/50 transition-colors"
                onClick={() => setSelectedImg(img.src)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button
              type="button"
              className="fixed top-4 right-4 z-[60] flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-slate-900/90 hover:bg-orange-600 text-white border border-white/20 transition-all shadow-xl active:scale-95 cursor-pointer"
              onClick={() => setSelectedImg(null)}
              aria-label="Cerrar imagen"
            >
              <X size={24} />
            </button>
            <div
              className="relative w-full max-w-5xl aspect-video md:aspect-auto md:h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImg} alt="Vista ampliada" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const FABRICATION_STEPS = [
  { title: 'DISEÑO', desc: 'Elaboración de planos técnicos y diagramación conforme a pliegos DNV / DPV y normativas IRAM vigentes.' },
  { title: 'CORTE', desc: 'Corte de chapas y perfiles metálicos mediante guillotina y pantógrafo industrial de alta precisión.' },
  { title: 'SOLDADURA', desc: 'Ensamble y soldadura estructural de marcos, refuerzos y pescantes para cartelería de gran porte.' },
  { title: 'PINTURA', desc: 'Tratamiento anticorrosivo y pintura horneada de alta durabilidad para exposición a la intemperie.' },
  { title: 'IMPRESIÓN Y ROTULADO', desc: 'Impresión digital directa sobre láminas retrorreflectivas Avery Dennison con sistema TrafficJet™ Xpress. Aplicación de láminas grado Ingeniería, HIP y Diamante.' },
];

const CAPACIDAD_RECURSOS = [
  'Planta fabril en Área Industrial Los Polígonos, Santa Fe',
  'Maquinaria de corte, plegado y soldadura de chapa metálica',
  'Sistema de impresión digital TrafficJet™ Xpress (Avery Dennison)',
  'Flota propia para traslado y colocación en traza',
  'Cuadrillas capacitadas para montaje en ruta y obra urbana',
  'Depósito de equipamiento en alquiler para desvíos y eventos',
  'Sedes comerciales en Santa Fe y Rosario',
  'Cobertura operativa en Santa Fe, Córdoba, Entre Ríos y Buenos Aires',
];

function InfraestructuraSection() {
  return (
    <section id="infraestructura" className="py-20 lg:py-28 section-ig-card border-b border-white/5 relative z-10 scroll-mt-28">
      <div className="corner-brand-glow" />
      <div id="obras" className="absolute top-0 scroll-mt-28" />
      <div className="max-w-site mx-auto px-5 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary flex-shrink-0" />
            <span className="text-primary text-[10px] tracking-[0.32em] uppercase font-bold" style={FONT_ROBOTO_500}>
              Capacidad Operativa e Infraestructura
            </span>
            <div className="h-px w-8 bg-primary flex-shrink-0" />
          </div>
          <h2 className="text-white leading-none tracking-tight mb-6" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            PROCESO INDUSTRIAL DE FABRICACIÓN
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium" style={FONT_ROBOTO}>
            Fabricación integral desde diseño hasta rotulado final. Proceso continuo en planta propia con equipamiento especializado y control de calidad en cada etapa.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {FABRICATION_STEPS.map((step) => (
            <div key={step.title} className="bg-slate-900/50 p-5 sm:p-6 rounded-md border border-white/5 hover:border-primary/40 transition-colors flex flex-col items-start">
              <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 shrink-0">
                <div className="w-2 h-2 bg-primary" />
              </div>
              <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white mb-3" style={FONT_ROBOTO_500}>
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed" style={FONT_ROBOTO}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-8">
          <h3 className="text-white text-sm font-extrabold uppercase tracking-wider mb-6 pb-3 border-b border-white/10" style={FONT_RALEWAY_900}>
            Capacidad Instalada y Recursos Operativos
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPACIDAD_RECURSOS.map((text, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-slate-300 text-xs sm:text-sm leading-relaxed" style={FONT_ROBOTO}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CATALOGO_ITEMS = [
  {
    cat: 'Cartelería Reglamentaria, Preventiva e Informativa',
    items: [
      'Señales reglamentarias, preventivas e informativas bajo pliegos DNV / DPV',
      'Cartelería transitoria de obra y desvíos viales',
      'Pórticos, ménsulas pescantes y estructuras de gran porte en chapa galvanizada',
      'Nomenclatura urbana y vial para municipios y comunas',
      'Pasarelas peatonales y señalización de infraestructura pública',
    ],
  },
  {
    cat: 'Sustratos y Materiales de Producción',
    items: [
      'Fabricación sobre chapa de acero galvanizada y aluminio',
      'Alto impacto, PVC espumado y acrílico para señalización interior/exterior',
      'Plástico corrugado para cartelería transitoria de obra',
      'Estructuras metálicas para instalación en banquina, mástil o pared',
    ],
  },
];

const NORMATIVAS = [
  { code: 'DNV', label: 'Dirección Nacional de Vialidad' },
  { code: 'DPV', label: 'Dirección Provincial de Vialidad' },
  { code: 'IRAM 3952', label: 'Señalización reglamentaria homologada' },
  { code: 'ASTM D4956', label: 'Láminas retrorreflectivas tipo I–XI' },
];

function CatalogoSection() {
  return (
    <section id="catalogo" className="py-24 lg:py-32 section-ig-card relative overflow-hidden border-b border-white/5 scroll-mt-28">
      <div className="corner-brand-glow" />
      <div className="max-w-site mx-auto px-5 lg:px-10 relative z-10">
        <div className="mb-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary flex-shrink-0" />
              <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={FONT_ROBOTO_500}>
                Bloque A — Señalización Vial y Fabricación
              </span>
            </div>
            <h2 className="text-white leading-none tracking-tight mb-6" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}>
              SEÑALIZACIÓN VIAL Y <span className="text-primary">CARTELERÍA</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium mb-6" style={FONT_ROBOTO}>
              Producción propia de señalización vial reglamentaria, preventiva, informativa y transitoria conforme a pliegos DNV y DPV. Fabricamos sobre múltiples sustratos con láminas retrorreflectivas Avery Dennison homologadas. Proveemos a constructoras, municipios, organismos viales y distribuidores del sector.
            </p>
            <div className="flex flex-wrap gap-3 mt-4 mb-8 text-sm text-slate-300">
              {NORMATIVAS.map((norm) => (
                <span key={norm.code} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs font-semibold tracking-wide" style={FONT_ROBOTO_500}>
                  <span className="text-primary">{norm.code}</span> — {norm.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {CATALOGO_ITEMS.map((catItem) => (
            <div key={catItem.cat} className="bg-slate-900/60 border border-white/8 rounded-xl p-7 hover:border-primary/30 transition-colors">
              <h3 className="text-white text-sm font-extrabold uppercase tracking-wider mb-5 pb-3 border-b border-white/10" style={FONT_RALEWAY_900}>
                {catItem.cat}
              </h3>
              <ul className="space-y-3">
                {catItem.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-slate-300 text-sm leading-relaxed" style={FONT_ROBOTO}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-slate-900/40 border border-slate-700/50 rounded-lg px-6 py-5">
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed" style={FONT_ROBOTO}>
            <span className="text-white font-semibold">Distribución y referencias comerciales:</span> Tecno Light S.R.L. provee y trabaja en vinculación con distribuidores del sector como <span className="text-slate-200 font-medium">Rosi Distribuciones</span> y <span className="text-slate-200 font-medium">Parpal</span>, además de municipios, comunas y empresas contratistas de obra pública y privada en las provincias de Santa Fe, Entre Ríos, Córdoba y Buenos Aires.
          </p>
        </div>
      </div>
    </section>
  );
}

const VALLAS_SERVICES = [
  {
    cat: 'Vallas de Seguridad y Cerramiento',
    items: [
      'Vallas metálicas peatonales para canalización de flujos y contención de público.',
      'Vallas de obra pesadas con elementos reflectivos homologados.',
      'Pasarelas peatonales metálicas con barandas reglamentarias.',
    ],
  },
  {
    cat: 'Balizamiento y Señalización Luminosa',
    items: [
      'Balizas luminosas intermitentes / destellantes autónomas a LED (solar y eléctrica).',
      'Semáforos viales portátiles para desvíos de tránsito en obra.',
      'Flechas luminosas direccionales para esquemas de desvío.',
    ],
  },
  {
    cat: 'Dispositivos de Delineación',
    items: [
      'Tambores canalizadores viales plásticos retrorreflectivos.',
      'Conos reflectivos y delineadores flexibles de PVC.',
      'Chapones de acero reforzados para cruce y tapado de zanjas sobre pavimento.',
      'Banderilleros mecánicos de aviso continuo para obras con tránsito activo.',
    ],
  },
  {
    cat: 'Logística de Servicio',
    items: [
      'Entrega y retiro directo en obrador, frente de avance o locación indicada por el contratista.',
      'Montaje de esquemas de desvío conforme a normativa DNV / DPV.',
      'Reposición y mantenimiento preventivo durante el plazo de ejecución del proyecto.',
    ],
  },
];

const LOGISTICA_OPERATIVA = [
  'Traslado, colocación en traza y mantenimiento de dispositivos de seguridad en zona de camino.',
  'Entrega directamente en obrador o centro logístico asignado por la empresa contratista.',
  'Señalización y balizamiento para obras urbanas, servicios públicos (ASSA) y eventos masivos.',
  'Colocación de señalización vial normada en rutas, caminos rurales y accesos urbanos.',
  'Demarcación horizontal con pintura termoplástica y reflectiva para sendas, cordones y estacionamientos.',
];

const DESPLIEGUE_CARDS = [
  {
    title: 'Montaje de Señalización Vertical en Rutas y Autovías',
    desc: 'Hincado de postes de acero, hormigonado de bases y fijación antivandálica de carteles preventivos y reglamentarios en banquinas y zonas de camino.',
  },
  {
    title: 'Cartelería de Gran Porte y Señalización Aérea',
    desc: 'Fabricación y montaje de pescantes, ménsulas y pórticos viales con láminas microprismáticas Avery Dennison de alta reflectividad.',
  },
  {
    title: 'Demarcación, Vallado y Balizamiento de Obras Urbanas',
    desc: 'Delimitación de intervenciones en vía pública, zanjeos y obras de saneamiento/pavimento con defensas metálicas, cartelería transitoria de obra y balizamiento nocturno.',
  },
];

function ServiciosSection() {
  return (
    <section id="servicios" className="py-20 lg:py-28 section-ig-card border-b border-white/5 scroll-mt-28">
      <div className="corner-brand-glow" />
      <div className="max-w-site mx-auto px-5 lg:px-10">
        <div className="mb-14 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary flex-shrink-0" />
            <span className="text-primary text-[10px] tracking-[0.32em] uppercase font-bold" style={FONT_ROBOTO_500}>
              Bloque D — Servicios y Alquiler de Equipamiento
            </span>
          </div>
          <h2 className="text-white leading-none tracking-tight mb-6" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            ALQUILER DE EQUIPAMIENTO VIAL Y <span className="text-primary">SERVICIOS EN OBRA</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium" style={FONT_ROBOTO}>
            Provisión y alquiler de dispositivos de seguridad vial para desvíos, obras civiles y eventos. Logística de colocación y mantenimiento directamente en traza. Entrega en obrador o depósito asignado.
          </p>
        </div>

        <div id="alquiler-vallas" className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 my-10 scroll-mt-28">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-primary flex-shrink-0" />
            <span className="text-primary text-[10px] tracking-[0.32em] uppercase font-bold" style={FONT_ROBOTO_500}>
              Servicio disponible en Santa Fe y Rosario
            </span>
          </div>
          <h3 className="text-white leading-tight tracking-tight mb-3" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
            ALQUILER Y PROVISIÓN DE VALLAS Y <span className="text-primary">DISPOSITIVOS DE SEGURIDAD VIAL</span>
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium mb-8 max-w-3xl" style={FONT_ROBOTO}>
            Servicio integral de provisión transitoria, traslado y mantenimiento en sitio de cerramientos y balizamiento para obras viales, civiles, zanjeos urbanos y eventos masivos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {VALLAS_SERVICES.map((valla) => (
              <div key={valla.cat} className="bg-[#080A0F]/70 border border-slate-700/60 rounded-xl p-5 hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-1 h-5 bg-primary rounded-full shrink-0" />
                  <h4 className="text-white text-xs font-extrabold uppercase tracking-widest leading-snug" style={FONT_ROBOTO_500}>
                    {valla.cat}
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {valla.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                      <span className="text-slate-300 text-sm sm:text-base leading-snug" style={FONT_ROBOTO}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-700/50 mb-7" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg" style={FONT_ROBOTO}>
              <span className="text-slate-200 font-semibold">Modalidad:</span> Alquiler por jornada, semana o plazo de obra. Cotización sin cargo para obras con pliego o por adjudicación directa.
            </p>
            <a
              id="btn-cotizar-vallas"
              href={getWaLink('Hola, quiero solicitar un presupuesto.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-primary/25 whitespace-nowrap shrink-0"
              style={FONT_ROBOTO_500}
            >
              <WaIcon size={18} />
              Cotizar Alquiler de Vallas y Dispositivos
            </a>
          </div>
        </div>

        <div className="mb-14">
          <h3 className="text-white/90 text-sm font-extrabold uppercase tracking-wider mb-6 pb-3 border-b border-white/10" style={FONT_RALEWAY_900}>
            Logística Operativa y Colocación en Traza
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOGISTICA_OPERATIVA.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-slate-900/40 p-4 rounded-md border border-white/5 hover:border-primary/30 transition-colors">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                <span className="text-white/80 text-xs sm:text-sm font-medium leading-snug" style={FONT_ROBOTO}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div id="instalacion" className="scroll-mt-28">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary flex-shrink-0" />
            <span className="text-primary text-[10px] tracking-[0.32em] uppercase font-bold" style={FONT_ROBOTO_500}>
              Despliegue Operativo
            </span>
            <div className="h-px w-8 bg-primary flex-shrink-0" />
          </div>
          <h3 className="text-white leading-none tracking-tight mb-8 text-center" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
            INSTALACIÓN Y MONTAJE EN RUTA Y CIUDAD
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {DESPLIEGUE_CARDS.map((card, idx) => (
              <div key={idx} className="bg-slate-900/50 rounded-xl p-6 border border-white/5 hover:border-primary/30 transition-colors flex flex-col">
                <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 shrink-0">
                  <div className="w-2 h-2 bg-primary" />
                </div>
                <h4 className="text-sm sm:text-base font-black tracking-wide text-white leading-snug mb-3" style={FONT_RALEWAY_900}>
                  {card.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed flex-grow" style={FONT_ROBOTO}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const EPP_GROUPS = [
  {
    grupo: 'Indumentaria de Trabajo',
    items: [
      'Ropa de trabajo homologada (mameluco, pantalón, camisa y campera)',
      'Indumentaria de alta visibilidad — chalecos clase 2 y clase 3',
      'Indumentaria térmica para bajas temperaturas',
      'Trajes impermeables para lluvia y waders de pescador',
      'Botas pescadoras y calzado de goma para trabajo en agua',
    ],
  },
  {
    grupo: 'Calzado de Seguridad',
    items: [
      'Calzado con puntera de acero y suela antiperforación',
      'Calzado dieléctrico para trabajos eléctricos',
      'Botines de cuero con suela de goma antideslizante',
    ],
  },
  {
    grupo: 'Protección Respiratoria',
    items: [
      'Semimáscaras faciales con filtros intercambiables',
      'Filtros para vapores orgánicos y partículas (P100)',
      'Mascarillas desechables N95 y quirúrgicas',
    ],
  },
  {
    grupo: 'Protección Auditiva',
    items: [
      'Protectores endoaurales (tapones reutilizables y descartables)',
      'Protectores de copa con banda de cabeza y de nuca',
      'Protectores adosables a casco',
    ],
  },
  {
    grupo: 'Protección Ocular y Facial',
    items: [
      'Anteojos de seguridad con lente policarbonato',
      'Antiparras ventiladas e indiferentes para uso industrial',
      'Caretas para soldar con visor de electro-oscurecimiento',
      'Pantallas faciales para proyecciones y productos químicos',
    ],
  },
  {
    grupo: 'Protección en Altura y Personal',
    items: [
      'Arneses de seguridad full body con punto de anclaje dorsal/esternal',
      'Colas de amarre con absorbedor de energía',
      'Fajas lumbares de soporte para esfuerzos',
      'Guantes de vaqueta, descarne, nitrilo y anticorte',
      'Cascos de seguridad clase A, B y E (dieléctrico)',
    ],
  },
  {
    grupo: 'Seguridad contra Incendio y Primeros Auxilios',
    items: [
      'Matafuegos de polvo ABC y CO₂ (revisión y recarga)',
      'Botiquines reglamentarios para obra y empresa',
      'Señalización de seguridad para plantas e instalaciones',
    ],
  },
];

function SeguridadSection() {
  return (
    <section id="seguridad" className="py-24 lg:py-32 section-ig-card relative overflow-hidden border-b border-white/5 scroll-mt-28">
      <div id="seguridad-industrial" className="absolute top-0 scroll-mt-28" />
      <div className="corner-brand-glow" />
      <div className="max-w-site mx-auto px-5 lg:px-10 relative z-10">
        <div className="mb-14 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary flex-shrink-0" />
            <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={FONT_ROBOTO_500}>
              Bloque C — EPP e Indumentaria
            </span>
          </div>
          <h2 className="text-white leading-none tracking-tight mb-6" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            ELEMENTOS DE PROTECCIÓN PERSONAL <span className="text-primary">E INDUMENTARIA</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium" style={FONT_ROBOTO}>
            Comercialización de indumentaria de trabajo homologada y equipamiento de protección personal (EPP) para obras civiles, viales e industriales. Provisión por unidad o por volumen con entrega en obra o centro logístico asignado.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
          {EPP_GROUPS.map((epp) => (
            <div key={epp.grupo} className="flex flex-col bg-slate-900/60 p-5 rounded-xl border border-white/8 hover:border-primary/40 transition-colors">
              <h3 className="text-primary text-[10px] font-bold uppercase tracking-widest mb-3 pb-2 border-b border-white/10" style={FONT_ROBOTO_500}>
                {epp.grupo}
              </h3>
              <ul className="space-y-2 flex-grow">
                {epp.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                    <span className="text-white/80 text-xs leading-relaxed" style={FONT_ROBOTO}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 text-center max-w-3xl mx-auto">
          <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 font-medium text-left" style={FONT_ROBOTO}>
            Provisión de EPP e indumentaria para obras públicas y privadas. Cotizaciones por pliego, por lote o por proveedor único. Entrega directa en obrador o depósito designado por el contratista.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:tecnolightsrl@arnet.com.ar?subject=Cotizaci%C3%B3n%20EPP%20e%20Indumentaria"
              className="inline-flex items-center justify-center bg-primary hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-[4px] transition-colors uppercase tracking-wider text-xs"
              style={FONT_ROBOTO_500}
            >
              Solicitar Cotización de EPP
            </a>
            <a
              href="mailto:tecnolightrsr@arnet.com.ar?subject=Cotizaci%C3%B3n%20EPP%20e%20Indumentaria"
              className="inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold px-8 py-3.5 rounded-[4px] transition-colors uppercase tracking-wider text-xs"
              style={FONT_ROBOTO_500}
            >
              Sede Rosario
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tecno Light S.R.L. | Señalización Vial, EPP y Servicios en Obra</title>
        <meta
          name="description"
          content="Fabricación y provisión integral de señalización vial e industrial, indumentaria de trabajo y elementos de protección personal en Santa Fe."
        />
        <meta
          name="keywords"
          content="señalización vial santa fe, carteles viales obra, indumentaria epp, impresión retrorreflectiva Avery Dennison, señales reglamentarias, seguridad vial, demarcación horizontal, Tecno Light Santa Fe, cartelería de obra"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.tecnolight.com.ar" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tecno Light S.R.L." />
        <meta property="og:locale" content="es_AR" />
        <meta property="og:url" content="https://www.tecnolight.com.ar" />
        <meta property="og:title" content="Tecno Light S.R.L. | Señalización Vial, EPP y Servicios en Obra" />
        <meta
          property="og:description"
          content="Fabricación y provisión integral de señalización vial e industrial, indumentaria de trabajo y elementos de protección personal en Santa Fe."
        />
        <meta property="og:image" content="https://www.tecnolight.com.ar/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://www.tecnolight.com.ar/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Tecno Light S.R.L. | Señalización Vial, EPP y Servicios en Obra" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tecno Light S.R.L. | Señalización Vial, EPP y Servicios en Obra" />
        <meta
          name="twitter:description"
          content="Fabricación y provisión integral de señalización vial e industrial, indumentaria de trabajo y elementos de protección personal en Santa Fe."
        />
        <meta name="twitter:image" content="https://www.tecnolight.com.ar/og-image.jpg" />
        <meta name="twitter:image:alt" content="Tecno Light S.R.L. | Señalización Vial, EPP y Servicios en Obra" />
      </Head>

      <HeroSection />

      {/* ── Banda de estadísticas corporativas ── */}
      <StatsSection />

      {/* Clientes — franja sólida oscura con logos en blanco */}
      <section className="py-10 section-solid-dark border-b border-white/5">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="badge-corporate">Trabajan con nosotros</span>
            <div className="h-px flex-1 bg-white/8" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
            {[
              'Vialidad Nacional',
              'DPV Santa Fe',
              'Rosi Distribuciones',
              'Parpal',
              'Municipios y Comunas',
              'ASSA',
              'Constructoras Viales',
            ].map((cliente) => (
              <span key={cliente} className="text-white/30 hover:text-white/70 font-extrabold text-sm tracking-widest uppercase transition-colors duration-300" style={FONT_RALEWAY_900}>
                {cliente}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quiénes Somos — bloque corporativo oscuro con acento lateral */}
      <section id="nosotros" className="py-20 lg:py-28 section-solid-mid border-b border-white/5 relative scroll-mt-28">
        <div id="quienes-somos" className="absolute top-0 scroll-mt-28" />
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <hr className="divider-orange mb-10" />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-corporate mb-4 inline-block">Empresa</span>
              <h2 className="text-white leading-none tracking-tight mb-6 section-title-accent" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                QUIÉNES SOMOS
              </h2>
              <p className="text-slate-300 text-base leading-relaxed font-medium" style={FONT_ROBOTO}>
                TECNO LIGHT S.R.L. fabrica y provee señalización vial reglamentaria, preventiva, informativa y transitoria conforme a pliegos DNV y DPV. Opera planta propia en el Área Industrial Los Polígonos (Santa Fe) con equipamiento de corte, soldadura, pintura y el sistema de impresión digital TrafficJet™ Xpress de Avery Dennison.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-slate-300 text-base leading-relaxed font-medium" style={FONT_ROBOTO}>
                Comercializa EPP e indumentaria de trabajo para obras civiles, viales e industriales, y provee alquiler de equipamiento de seguridad vial para desvíos y eventos. Vinculada con <span className="text-white font-bold">Rosi Distribuciones</span> y <span className="text-white font-bold">Parpal</span>, municipios, comunas y empresas contratistas de obra pública en Santa Fe, Córdoba, Entre Ríos y Buenos Aires.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed" style={FONT_ROBOTO}>
                Atención comercial de lunes a viernes de 8:00 a 17:00 hs. Sedes en Santa Fe Capital y Rosario.
              </p>
              <div className="flex gap-3 pt-2">
                {['Santa Fe', 'Rosario', 'Los Polígonos'].map(sede => (
                  <span key={sede} className="px-3 py-1 border border-white/10 text-white/60 text-xs font-semibold uppercase tracking-wider rounded-sm">{sede}</span>
                ))}
              </div>
            </div>
          </div>
          <hr className="divider-orange mt-10" />
        </div>
      </section>

      {/* Tecnología & Impresión */}
      <TecnologiaSection />

      {/* Proceso Industrial */}
      <ErrorBoundary>
        <InfraestructuraSection />
      </ErrorBoundary>

      {/* Fabricación & Catálogo */}
      <ErrorBoundary>
        <CatalogoSection />
      </ErrorBoundary>

      {/* Servicios & Alquiler de Vallas */}
      <ErrorBoundary>
        <ServiciosSection />
      </ErrorBoundary>

      {/* Seguridad & EPP */}
      <ErrorBoundary>
        <SeguridadSection />
      </ErrorBoundary>

      {/* Contacto */}
      <section id="contacto" className="py-24 lg:py-32 bg-slate-50 bg-hex-pattern border-t border-slate-200 shadow-sm text-slate-900 scroll-mt-28 relative">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary flex-shrink-0" />
              <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={FONT_ROBOTO_500}>
                Contacto
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
              <h2 className="text-black leading-none tracking-tight" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
                CANALES DE<br />
                <span style={{ color: '#F2650E' }}>CONTACTO</span>
              </h2>
              <p className="text-black/55 text-sm max-w-sm leading-relaxed font-medium" style={FONT_ROBOTO}>
                Atención comercial de Lunes a Viernes, 8:00 a 17:00 hs. Para pliegos y licitaciones, escribinos por email.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-6 mb-10">
            {/* Sede Central Santa Fe */}
            <div className="flex flex-col gap-4 bg-white border border-slate-200/80 shadow-sm rounded-[6px] p-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Suipacha+3243,+Santa+Fe,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-[4px] bg-black/5 border border-black/10 flex items-center justify-center shrink-0 hover:text-orange-500 cursor-pointer transition-colors text-[#333]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>
              <div className="flex flex-col h-full">
                <div className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1" style={FONT_ROBOTO_500}>
                  Sede Central
                </div>
                <div className="text-black font-bold text-sm sm:text-base mb-2" style={FONT_ROBOTO}>
                  Santa Fe
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Suipacha+3243,+Santa+Fe,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/70 text-xs sm:text-sm mb-3 hover:text-orange-500 cursor-pointer transition-colors block"
                  style={FONT_ROBOTO}
                >
                  Suipacha 3243, Santa Fe Capital
                </a>
                <div className="mt-auto flex flex-col gap-2">
                  <a
                    href="tel:03424553582"
                    className="text-black font-semibold text-sm hover:text-primary transition-colors flex items-center gap-2"
                    style={FONT_ROBOTO}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z" />
                    </svg>
                    (0342) 455-3582
                  </a>
                  <a
                    href="mailto:tecnolightsrl@arnet.com.ar"
                    className="text-black font-semibold text-sm hover:text-primary transition-colors flex items-center gap-2"
                    style={FONT_ROBOTO}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    tecnolightsrl@arnet.com.ar
                  </a>
                </div>
              </div>
            </div>

            {/* Sede Comercial Rosario */}
            <div className="flex flex-col gap-4 bg-white border border-slate-200/80 shadow-sm rounded-[6px] p-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Gutenberg+1122,+Rosario,+Santa+Fe,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-[4px] bg-black/5 border border-black/10 flex items-center justify-center shrink-0 hover:text-orange-500 cursor-pointer transition-colors text-[#333]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>
              <div className="flex flex-col h-full">
                <div className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1" style={FONT_ROBOTO_500}>
                  Sede Comercial
                </div>
                <div className="text-black font-bold text-sm sm:text-base mb-2" style={FONT_ROBOTO}>
                  Rosario
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Gutenberg+1122,+Rosario,+Santa+Fe,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/70 text-xs sm:text-sm mb-3 hover:text-orange-500 cursor-pointer transition-colors block"
                  style={FONT_ROBOTO}
                >
                  Gutenberg 1122, Rosario, Santa Fe
                </a>
                <div className="mt-auto flex flex-col gap-2">
                  <a
                    href="tel:03414388444"
                    className="text-black font-semibold text-sm hover:text-primary transition-colors flex items-center gap-2"
                    style={FONT_ROBOTO}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z" />
                    </svg>
                    (0341) 438-8444
                  </a>
                  <a
                    href="mailto:tecnolightrsr@arnet.com.ar"
                    className="text-black font-semibold text-sm hover:text-primary transition-colors flex items-center gap-2"
                    style={FONT_ROBOTO}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    tecnolightrsr@arnet.com.ar
                  </a>
                </div>
              </div>
            </div>

            {/* Planta Fabril Los Polígonos */}
            <div className="flex flex-col gap-4 bg-white border border-slate-200/80 shadow-sm rounded-[6px] p-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Parque+Industrial+Los+Poligonos,+Santa+Fe,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-[4px] bg-black/5 border border-black/10 flex items-center justify-center shrink-0 hover:text-orange-500 cursor-pointer transition-colors text-[#333]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>
              <div className="flex flex-col h-full">
                <div className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1" style={FONT_ROBOTO_500}>
                  PLANTA FABRIL E INDUSTRIAL
                </div>
                <div className="text-black font-bold text-sm sm:text-base mb-2" style={FONT_ROBOTO}>
                  Los Polígonos
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Parque+Industrial+Los+Poligonos,+Santa+Fe,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/70 text-xs sm:text-sm mb-3 hover:text-orange-500 cursor-pointer transition-colors block"
                  style={FONT_ROBOTO}
                >
                  Área Industrial Los Polígonos, Santa Fe
                </a>
                <div className="mt-auto flex flex-col gap-2">
                  <a
                    href="tel:03424553582"
                    className="text-black font-semibold text-sm hover:text-primary transition-colors flex items-center gap-2"
                    style={FONT_ROBOTO}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z" />
                    </svg>
                    (0342) 455-3582
                  </a>
                  <a
                    href="mailto:tecnolightsrl@arnet.com.ar"
                    className="text-black font-semibold text-sm hover:text-primary transition-colors flex items-center gap-2"
                    style={FONT_ROBOTO}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    tecnolightsrl@arnet.com.ar
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-slate-200/80 shadow-sm rounded-[4px] p-5 bg-white">
            <div className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-3" style={FONT_ROBOTO_500}>
              Zona de cobertura
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Santa Fe',
                'Rosario',
                'Gran Rosario',
                'Córdoba',
                'Entre Ríos',
                'Buenos Aires',
                '+6 provincias',
              ].map((provincia) => (
                <span
                  key={provincia}
                  className="bg-slate-50 border border-slate-200/80 text-black/80 font-medium text-xs px-3 py-1 rounded-[3px]"
                  style={FONT_ROBOTO}
                >
                  {provincia}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
