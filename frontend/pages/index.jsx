import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield, HardHat, PaintBucket, Truck, TriangleAlert, Zap,
  Award, CheckCircle, Clock, Users, UserCheck, ArrowUpRight,
  MessageCircle, MapPin, Phone, ArrowRight
} from 'lucide-react';
import InstagramGallery from '../components/InstagramGallery';

import { getWaLink } from '../utils/whatsapp';

const WA_LINK = getWaLink();

const WaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Honeycomb SVG — trazo naranja/ámbar, opacidad 20%, bordes delgados (0.8px)
const HEX_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='104'><polygon points='30,2 58,18 58,50 30,66 2,50 2,18' fill='none' stroke='rgba(251,146,60,0.18)' stroke-width='0.8'/><polygon points='30,70 58,86 58,104 30,104 2,104 2,86' fill='none' stroke='rgba(251,146,60,0.18)' stroke-width='0.8'/><polygon points='59,18 87,2 87,34 59,50' fill='none' stroke='rgba(251,146,60,0.18)' stroke-width='0.8'/><polygon points='1,18 1,50 -27,34 -27,2' fill='none' stroke='rgba(251,146,60,0.18)' stroke-width='0.8'/></svg>`;
const HEX = `url("data:image/svg+xml,${encodeURIComponent(HEX_SVG)}")`;
const MONO = { fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 };
const HEADING = { fontFamily: "'Montserrat', sans-serif", fontWeight: 900, textTransform: 'uppercase' };
const BODY = { fontFamily: "'Inter', sans-serif" };

const SERVICES = [
  { n: '01', Icon: TriangleAlert, title: 'Cartelería Vial', desc: 'Señales verticales retroreflectivas Tipo III, IV y XI bajo normas IRAM. Fabricación propia para rutas, autopistas y vías urbanas.', tag: 'Fabricación propia' },
  { n: '02', Icon: Shield, title: 'Señalización de Obra', desc: 'Sistemas completos de señalización transitoria para cortes de carril, desvíos y zonas de trabajo. Entrega e instalación incluidas.', tag: 'Llave en mano' },
  { n: '03', Icon: PaintBucket, title: 'Demarcación Horizontal', desc: 'Pintado de líneas, flechas, símbolos y sendas peatonales sobre asfalto y hormigón. Pinturas termoplásticas de alta durabilidad.', tag: 'Materiales premium' },
  { n: '04', Icon: Truck, title: 'Alquiler de Vallas', desc: 'Vallas peatonales, barreras New Jersey y delineadores. Alquiler, traslado y colocación en obra en Santa Fe y Rosario.', tag: 'Retiro en 24 h' },
  { n: '05', Icon: HardHat, title: 'Seguridad Laboral', desc: 'EPP certificado: cascos, calzado, arneses, chalecos reflectivos y señalización perimetral para trabajadores en zona de riesgo.', tag: 'Homologado' },
  { n: '06', Icon: Zap, title: 'Balizamiento LED', desc: 'Luces estroboscópicas, baliza solar y señalización luminosa nocturna para obras de alta exposición al tránsito vehicular.', tag: 'Alta visibilidad' },
];

const PROJ_CATS = ["Todo", "Cartelería", "Señalización", "Demarcación", "Seguridad"];

const fallbackProjects = [
  { id: 'f1', title: 'Autopista A008 — Santa Fe', cat: 'Cartelería', year: '2024', image: null },
  { id: 'f2', title: 'Acceso Norte Rosario', cat: 'Señalización', year: '2024', image: null },
  { id: 'f3', title: 'Ruta 9 — Tramo Córdoba', cat: 'Demarcación', year: '2023', image: '/images/instagram/posts/g-urbana.jpg' },
  { id: 'f4', title: 'Circunvalación Rosario', cat: 'Señalización', year: '2023', image: '/images/instagram/posts/galeria-1.jpg' },
  { id: 'f5', title: 'Puerto Rosario — Vialidad', cat: 'Seguridad', year: '2022', image: '/images/instagram/posts/galeria-2.jpg' },
  { id: 'f6', title: 'Autopista Córdoba–Rosario', cat: 'Cartelería', year: '2022', image: null },
  { id: 'f7', title: 'Corredor Vial NOA', cat: 'Demarcación', year: '2022', image: null },
  { id: 'f8', title: 'Ruta Provincial 6 — CABA', cat: 'Cartelería', year: '2021', image: null },
  { id: 'f9', title: 'Puerto San Martín — EPP', cat: 'Seguridad', year: '2021', image: '/images/instagram/posts/galeria-6.jpg' },
];

export default function Home() {
  const [projFilter, setProjFilter] = useState("Todo");
  const [form, setForm] = useState({ name: "", phone: "", msg: "" });
  const [sent, setSent] = useState(false);

  const projects = fallbackProjects;
  const filtered = projFilter === "Todo"
    ? projects
    : projects.filter(p => p.cat === projFilter);

  const openWa = (e) => {
    e.preventDefault();
    const t = `Hola, soy *${form.name}*.\n${form.msg}${form.phone ? `\nTel: ${form.phone}` : ""}`;
    window.open(getWaLink(t), "_blank");
    setSent(true);
    setForm({ name: "", phone: "", msg: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div>
      <Head>
        <title>Tecnolight SRL — Soluciones Viales de Precisión | Santa Fe</title>
        <meta name="description" content="30 años fabricando señalética, demarcación y seguridad para obras viales en Santa Fe, Rosario y todo el país." />
      </Head>

      {/* ══════════ HERO — SPLIT DIAGONAL ══════════ */}
      <section className="relative min-h-screen overflow-hidden bg-background -mt-[72px] lg:-mt-[72px] pt-[72px] lg:pt-[72px]">
        <div className="hidden lg:block absolute top-0 right-0 h-full w-[52%]" style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)' }}>
          <Image src="/images/hero/hero-vial.webp" alt="Autopista nocturna — señalización vial retroreflectiva Tecnolight" fill className="object-cover object-center" sizes="52vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="lg:hidden absolute inset-0">
          <Image src="/images/hero/hero-vial.webp" alt="Señalización vial nocturna Tecnolight" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-background/88" />
        </div>
        {/* Hexagrid naranja con fade gradiente — desvanece hacia el centro-derecha */}
        <div
          className="absolute inset-0 lg:w-[60%] pointer-events-none"
          style={{
            backgroundImage: HEX,
            backgroundSize: '60px 104px',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
            maskComposite: 'intersect',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
            WebkitMaskComposite: 'source-in',
          }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-site mx-auto px-5 lg:px-10 w-full py-32 lg:py-40">
            <div className="lg:max-w-[52%]">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-primary flex-shrink-0" />
                <span className="text-primary uppercase tracking-[0.32em] text-[10px] text-stroke-heavy" style={{ ...MONO }}>✨ Desde 1994 | Más de 30 años en Santa Fe y la región.</span>
              </div>
              <h1 className="text-foreground leading-[0.88] tracking-tight mb-8 text-stroke-heavy" style={{ ...HEADING, fontSize: 'clamp(4rem, 10vw, 7.5rem)' }}>
                SEGURIDAD<br /><span className="text-primary">VIAL</span> E<br />INDUSTRIAL
              </h1>
              <p className="text-white max-w-lg leading-relaxed mb-10 text-stroke-heavy font-semibold" style={{ ...BODY, fontSize: '1.15rem' }}>
                Señalización & Protección Personal. Tres décadas de experiencia técnica, solvencia y liderazgo. Abastecemos obras y proyectos con atención especializada.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-14">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] text-white font-bold px-8 py-4 rounded-[4px] hover:bg-[#1db954] transition-all text-sm tracking-wide" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>
                  <WaIcon size={17} /> Pedir presupuesto
                </a>
                <Link href="/projects" className="inline-flex items-center justify-center gap-2 border border-white/12 text-white/70 font-medium px-8 py-4 rounded-[4px] hover:border-primary/50 hover:text-primary transition-all text-sm tracking-wide" style={{ ...BODY, textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000' }}>
                  Ver proyectos <ArrowUpRight size={14} />
                </Link>
              </div>
              <div className="flex flex-wrap gap-5 border-t border-white/6 pt-8">
                {[{ v: '+30', l: 'Años' }, { v: '+1.500', l: 'Obras' }, { v: '1994', l: 'Fundación' }, { v: 'Stock', l: 'Marcas Líderes' }].map(s => (
                  <div key={s.l} className="flex items-baseline gap-2 text-stroke-heavy">
                    <span className="text-primary" style={{ ...HEADING, fontSize: '1.6rem' }}>{s.v}</span>
                    <span className="text-white text-xs uppercase tracking-wider font-bold" style={{ ...MONO }}>{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-8 left-10 text-white/15 text-[10px] tracking-widest" style={MONO}>31.4201° S  64.1888° W</div>
        <div className="hidden lg:block absolute top-24 right-8 text-white/12 text-[10px]" style={MONO}>TL-001 / HERO</div>
      </section>

      {/* ══════════ SERVICIOS ══════════ */}
      <section id="servicios" className="py-24 lg:py-32 bg-background relative overflow-hidden">
        {/* Hexagrid naranja sutil en sección servicios */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: HEX,
            backgroundSize: '60px 104px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 100%)',
            opacity: 0.7,
          }}
        />
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary flex-shrink-0" />
                <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={MONO}>Servicios</span>
              </div>
              <h2 className="text-foreground leading-none tracking-tight" style={{ ...HEADING, fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}>QUÉ HACEMOS</h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed" style={BODY}>
              Soluciones completas en señalización, demarcación y seguridad vial para obras públicas y privadas.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-[6px] overflow-hidden">
            {SERVICES.map(svc => (
              <div key={svc.n} className="group relative bg-card hover:bg-secondary transition-all duration-300 p-7 lg:p-8 flex flex-col gap-5 overflow-hidden cursor-default">
                <div className="absolute -bottom-4 -right-2 text-white/[0.03] select-none leading-none pointer-events-none" style={{ ...HEADING, fontSize: '6.5rem' }}>{svc.n}</div>
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 bg-primary/10 border border-primary/15 rounded-[4px] flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                    <svc.Icon size={19} className="text-primary" />
                  </div>
                  <span className="text-white/15 group-hover:text-primary/40 transition-colors" style={{ ...MONO, fontSize: '0.72rem' }}>{svc.n}</span>
                </div>
                <div>
                  <h3 className="text-foreground leading-tight mb-2.5" style={{ ...HEADING, fontSize: '1.45rem' }}>{svc.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed" style={BODY}>{svc.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 group-hover:border-primary/10 transition-colors">
                  <span className="text-primary/60 text-[10px] uppercase tracking-widest" style={MONO}>{svc.tag}</span>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-white/30 group-hover:text-primary transition-colors"><ArrowUpRight size={15} /></a>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
          <div className="mt-8 border border-white/6 rounded-[6px] bg-card overflow-hidden">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/6">
              {[
                { n: '01', Icon: WaIcon, t: 'Consultá por WhatsApp', d: 'Respondemos en minutos con asesoramiento técnico real.' },
                { n: '02', Icon: UserCheck, t: 'Presupuesto en el día', d: 'Un especialista analiza tu obra y elabora una propuesta clara.' },
                { n: '03', Icon: Truck, t: 'Entrega o Retiro', d: 'Coordinamos logística. Entrega en obra o retiro en planta Rosario.' },
              ].map(s => (
                <div key={s.n} className="flex items-start gap-4 px-7 py-6 group hover:bg-secondary/50 transition-colors">
                  <span className="text-primary/25 shrink-0 mt-0.5" style={{ ...HEADING, fontSize: '1.3rem' }}>{s.n}</span>
                  <div>
                    <div className="text-foreground text-sm font-semibold mb-1" style={BODY}>{s.t}</div>
                    <div className="text-muted-foreground text-xs leading-relaxed" style={BODY}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PROYECTOS — FIGMA FILTER GALLERY ══════════ */}
      <section id="proyectos" className="py-24 lg:py-32 bg-background" style={{ backgroundImage: HEX, backgroundSize: '58px 100px' }}>
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary flex-shrink-0" />
                <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={MONO}>Portfolio</span>
              </div>
              <h2 className="text-foreground leading-none tracking-tight" style={{ ...HEADING, fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}>PROYECTOS<br />REALIZADOS</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {PROJ_CATS.map(cat => (
                <button key={cat}
                  onClick={() => setProjFilter(cat)}
                  className={`px-4 py-2 rounded-[4px] text-xs font-semibold transition-all tracking-wide ${
                    projFilter === cat
                      ? 'bg-primary text-white'
                      : 'bg-card border border-white/8 text-muted-foreground hover:border-primary/35 hover:text-foreground'
                  }`}
                  style={BODY}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 rounded-[6px] overflow-hidden">
            {filtered.map((p, i) => (
              <a href="https://www.instagram.com/tecnolight.srl/" target="_blank" rel="noopener noreferrer" key={p.id || i} className="group relative block aspect-[4/3] overflow-hidden bg-card cursor-pointer">
                {p.image ? (
                  <Image src={p.image} alt={p.title || ''} fill className="object-cover transition-transform duration-700 group-hover:scale-106" sizes="33vw" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Shield size={48} className="text-white/5" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-primary text-[9px] font-bold tracking-[0.25em] uppercase" style={MONO}>{p.cat || 'Proyecto'}</span>
                    <div className="w-1 h-1 rounded-full bg-white/25" />
                    <span className="text-white/40 text-[9px]" style={MONO}>{p.year || '2024'}</span>
                  </div>
                  <div className="text-white leading-tight group-hover:text-primary transition-colors" style={{ ...HEADING, fontSize: '1.1rem' }}>{p.title}</div>
                </div>
                <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-7 h-7 bg-primary rounded-[3px] flex items-center justify-center">
                    <ArrowUpRight size={13} className="text-white" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground text-sm" style={BODY}>
              No hay proyectos en esta categoría aún.
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/projects" className="inline-flex items-center gap-2.5 text-primary font-semibold text-sm transition-all hover:gap-4" style={BODY}>
              Ver todos los proyectos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ NOSOTROS / VENTAJAS ══════════ */}
      <section id="nosotros" className="py-24 lg:py-32 bg-background" style={{ backgroundImage: HEX, backgroundSize: '58px 100px' }}>
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-[6px] overflow-hidden bg-card">
                <Image src="/images/instagram-seleccionadas/nosotros-1.jpg" alt="Equipo técnico Tecnolight — más de 30 años en señalización vial" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-5 -right-3 bg-primary text-white rounded-[4px] px-6 py-4" style={{ boxShadow: '0 16px 48px rgba(242,101,14,0.4)' }}>
                <div className="leading-none mb-0.5" style={{ ...HEADING, fontSize: '2.6rem' }}>1994</div>
                <div className="text-white/75 uppercase tracking-wider" style={{ ...MONO, fontSize: '0.62rem' }}>Fundación</div>
              </div>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-[6px]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-[6px]" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary flex-shrink-0" />
                <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={MONO}>Nosotros</span>
              </div>
              <h2 className="text-foreground leading-none tracking-tight mb-7 text-stroke-heavy" style={{ ...HEADING, fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}>
                POR QUÉ ELEGIR<br /><span className="text-primary">TECNOLIGHT</span>
              </h2>
              <div className="mb-6 border-l-2 border-primary pl-4">
                <p className="text-foreground text-lg font-medium italic" style={BODY}>
                  "No vendemos carteles, tampoco vendemos cascos ni alquilamos vallas... VENDEMOS EXPERIENCIA Y PROFESIONALISMO!!"
                </p>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-10" style={BODY}>
                Nuestra vocación de servicio nos permite brindar un asesoramiento técnico inigualable. Trabajamos junto a profesionales, constructoras y empresas para proveer seguridad en cada proyecto.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  { Icon: Award, n: '+30', label: 'Años de trayectoria', desc: 'y solidez comercial.' },
                  { Icon: Shield, n: '1994', label: 'Fundación', desc: 'Desde 1994 abasteciendo obras.' },
                  { Icon: CheckCircle, n: '+1.500', label: 'Proyectos', desc: 'asesorados en la región.' },
                  { Icon: Zap, n: 'Stock', label: 'Primeras marcas', desc: 'con atención especializada.' },
                ].map(adv => (
                  <div key={adv.label} className="bg-card border border-white/6 rounded-[4px] p-4 hover:border-primary/25 transition-colors group">
                    <div className="flex items-center gap-2.5 mb-2">
                      <adv.Icon size={14} className="text-primary" />
                      <span className="text-primary" style={{ ...HEADING, fontSize: '1.35rem' }}>{adv.n}</span>
                    </div>
                    <div className="text-foreground text-sm font-semibold mb-0.5" style={BODY}>{adv.label}</div>
                    <div className="text-muted-foreground text-xs leading-relaxed" style={BODY}>{adv.desc}</div>
                  </div>
                ))}
              </div>
              <div className="border border-white/6 rounded-[4px] p-5 bg-card">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4" style={MONO}>Por qué somos mejor opción que la competencia</div>
                <div className="space-y-2.5">
                  {[
                    'Fabricación propia — sin intermediarios ni demoras',
                    'Presupuesto técnico detallado en el día',
                    'Retroreflectancia certificada Tipo IV y XI (no solo Tipo I)',
                    'Asesoramiento normativo incluido sin costo adicional',
                    <span key="ombu">Amplio catálogo en seguridad industrial y convenio con <a href="https://ombuindumentaria.com.ar/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">botines OMBU</a>.</span>,
                  ].map((t, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm" style={BODY}>
                      <CheckCircle size={13} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/75">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <Link href="/about" className="inline-flex items-center gap-2.5 text-primary font-semibold text-sm transition-all hover:gap-4" style={BODY}>
                  Conocer nuestra historia <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InstagramGallery />

      {/* ══════════ CONTACTO — INTERACTIVE WA FORM ══════════ */}
      <section id="contacto" className="py-24 lg:py-32 bg-background" style={{ backgroundImage: HEX, backgroundSize: '58px 100px' }}>
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="relative rounded-[6px] overflow-hidden mb-12" style={{ background: 'linear-gradient(120deg, #0d1f12 0%, #0a160c 60%, #0c1a0e 100%)' }}>
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: HEX, backgroundSize: '58px 100px' }} />
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#25D366]" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 px-8 lg:px-14 py-12 lg:py-14">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2.5 mb-3 justify-center lg:justify-start">
                  <WaIcon size={22} />
                  <span className="text-[#25D366] font-bold text-sm tracking-widest uppercase" style={MONO}>WhatsApp</span>
                </div>
                <h3 className="text-white leading-tight mb-2" style={{ ...HEADING, fontSize: 'clamp(1.7rem, 4vw, 2.8rem)' }}>
                  RESPONDEMOS EN MINUTOS.<br />SIN TURNOS. SIN FORMULARIOS.
                </h3>
                <p className="text-white/40 text-sm" style={BODY}>
                  El camino más corto entre tu obra y una solución profesional.
                </p>
              </div>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 inline-flex items-center gap-3 bg-[#25D366] text-white font-bold text-base px-10 py-5 rounded-[4px] hover:bg-[#1db954] transition-all hover:scale-105 active:scale-95 whitespace-nowrap" style={{ boxShadow: '0 8px 36px rgba(37,211,102,0.35)' }}>
                <WaIcon size={20} /> Escribir ahora
              </a>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary flex-shrink-0" />
                <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={MONO}>Contacto</span>
              </div>
              <h2 className="text-foreground leading-none tracking-tight mb-7" style={{ ...HEADING, fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>TAMBIÉN<br />ENCONTRANOS</h2>
              <div className="space-y-4 mb-10">
                {[
                  { Icon: Phone, label: 'Teléfono', v: '+54 342 455-3582' },
                  { Icon: MessageCircle, label: 'WhatsApp', v: '+54 9 3424 27-8117' },
                  { Icon: MapPin, label: 'Planta', v: 'Rosario, Santa Fe — Argentina' },
                ].map(({ Icon, label, v }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-primary/8 border border-primary/15 rounded-[4px] flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-[10px] uppercase tracking-widest mb-0.5" style={MONO}>{label}</div>
                      <div className="text-foreground text-sm font-medium" style={BODY}>{v}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border border-white/6 rounded-[4px] p-5 bg-card">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3" style={MONO}>Zona de cobertura</div>
                <div className="flex flex-wrap gap-2">
                  {['Santa Fe', 'Rosario', 'Gran Rosario', 'Córdoba', 'Entre Ríos', 'Buenos Aires', '+6 provincias'].map(z => (
                    <span key={z} className="bg-secondary text-foreground/60 text-xs px-3 py-1 rounded-[3px]" style={BODY}>{z}</span>
                  ))}
                </div>
              </div>
              <div className="mt-7">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2.5" style={MONO}>Instagram</div>
                <a href="https://www.instagram.com/tecnolight.srl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-foreground/50 text-sm hover:text-primary transition-colors" style={BODY}>
                  @tecnolight.srl <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
            <div className="bg-card border border-white/6 rounded-[6px] p-8 lg:p-9">
              <div className="flex items-center gap-2.5 mb-6">
                <WaIcon size={17} />
                <h3 className="text-foreground font-bold" style={{ ...HEADING, fontSize: '1.3rem' }}>Solicitar presupuesto</h3>
              </div>
              {sent && (
                <div className="mb-5 p-3.5 bg-[#25D366]/10 border border-[#25D366]/20 rounded-[4px] flex items-center gap-2 text-[#25D366] text-sm font-medium" style={BODY}>
                  <CheckCircle size={14} /> Abriendo WhatsApp con tu mensaje...
                </div>
              )}
              <form onSubmit={openWa} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5" style={MONO}>Nombre</label>
                    <input type="text" required placeholder="Juan García"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-background border border-white/8 rounded-[4px] px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-colors"
                      style={BODY} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5" style={MONO}>Teléfono</label>
                    <input type="tel" placeholder="+54 341 000-0000"
                      value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-background border border-white/8 rounded-[4px] px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-colors"
                      style={BODY} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5" style={MONO}>¿Qué necesitás?</label>
                  <textarea required rows={4} placeholder="Describí tu obra: tipo de señalización, ubicación, cantidad y cronograma estimado..."
                    value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })}
                    className="w-full bg-background border border-white/8 rounded-[4px] px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    style={BODY} />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] text-white font-bold py-4 rounded-[4px] hover:bg-[#1db954] transition-colors text-sm tracking-wide" style={BODY}>
                  <WaIcon size={16} /> Enviar por WhatsApp
                </button>
                <p className="text-muted-foreground/40 text-[11px] text-center" style={BODY}>
                  Se abrirá WhatsApp con tu consulta preescrita. Sin bots, atención personal.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

