import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MapPin, MessageCircle, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';

const MONO = { fontFamily: "'JetBrains Mono', monospace" };
const HEADING = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 };
const BODY = { fontFamily: "'Inter', sans-serif" };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const WA_NUMBER = '543424553582';
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Tecnolight, me interesa solicitar un presupuesto para mi obra.')}`;

const WaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', msg: '' });
  const [sent, setSent] = useState(false);

  const openWa = (e) => {
    e.preventDefault();
    const t = encodeURIComponent(`Hola, soy *${form.name}*.\n${form.msg}${form.phone ? `\nTel: ${form.phone}` : ''}`);
    window.open(`https://wa.me/${WA_NUMBER}?text=${t}`, '_blank');
    setSent(true);
    setForm({ name: '', phone: '', msg: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div>
      <Head>
        <title>Contacto | Tecnolight SRL — Señalización Vial Santa Fe</title>
        <meta name="description" content="Contactanos por WhatsApp para solicitar asesoramiento y cotización de señales viales. Ubicados en Santa Fe, Argentina." />
      </Head>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden py-32 max-md:py-28 bg-background">
        <div className="absolute inset-0">
          <Image src="/images/contacto/contact-bg.webp" alt="" fill className="object-cover" sizes="100vw" priority />
          <div className="hex-overlay-hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,90,31,0.12)_0%,transparent_60%)]" />
        </div>
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-[1]">
          <motion.div className="max-w-[700px]" initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#25D366] flex-shrink-0" />
              <span className="text-[#25D366] text-[10px] tracking-[0.32em] uppercase" style={MONO}>Respuesta Inmediata</span>
            </div>
            <h1 className="text-[clamp(2.5rem,4.5vw,4rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white m-0" style={HEADING}>
              HABLEMOS DE<br /><span className="text-primary">TU PROYECTO</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-[580px] mt-4" style={BODY}>
              Estamos listos para asesorarte técnicamente. Consultas, presupuestos y asesoría normativa sin cargo. Te respondemos en minutos.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/40 mt-4" style={BODY}>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#25D366]" /> WhatsApp Directo</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-primary" /> Asesoría Técnica</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-primary" /> Sin Cargo</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WA Banner */}
      <section className="py-16 lg:py-20 relative bg-background">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="relative rounded-[6px] overflow-hidden" style={{ background: 'linear-gradient(120deg, #0d1f12 0%, #0a160c 60%, #0c1a0e 100%)' }}>
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "url('/images/hex-pattern.svg')", backgroundSize: '58px 100px' }} />
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
                <p className="text-white/40 text-sm" style={BODY}>El camino más corto entre tu obra y una solución profesional.</p>
              </div>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 inline-flex items-center gap-3 bg-[#25D366] text-white font-bold text-base px-10 py-5 rounded-[4px] hover:bg-[#1db954] transition-all hover:scale-105 active:scale-95 whitespace-nowrap" style={{ boxShadow: '0 8px 36px rgba(37,211,102,0.35)' }}>
                <WaIcon size={20} /> Escribir ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="pb-24 lg:pb-32 relative bg-background">
        <div className="max-w-site mx-auto px-5 lg:px-10">
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
                  { Icon: MessageCircle, label: 'WhatsApp', v: '+54 342 455-3582' },
                  { Icon: MapPin, label: 'Sede Comercial', v: 'Salvador Caputto 3243, Santa Fe' },
                  { Icon: MapPin, label: 'Fábrica', v: 'Cnel. Loza 7198, P.I. Los Polígonos, Santa Fe' },
                  { Icon: Clock, label: 'Horarios', v: 'Lun a Vie 8:00 - 18:00 hs' },
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
              <div className="border border-white/6 rounded-[4px] p-5 bg-card mb-6">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3" style={MONO}>Zona de cobertura</div>
                <div className="flex flex-wrap gap-2">
                  {['Santa Fe', 'Rosario', 'Gran Rosario', 'Córdoba', 'Entre Ríos', 'Buenos Aires', '+6 provincias'].map(z => (
                    <span key={z} className="bg-secondary text-foreground/60 text-xs px-3 py-1 rounded-[3px]" style={BODY}>{z}</span>
                  ))}
                </div>
              </div>
              <div className="border border-white/6 rounded-[4px] p-5 bg-card">
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
                  <CheckCircle2 size={14} /> Abriendo WhatsApp con tu mensaje...
                </div>
              )}
              <form onSubmit={openWa} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5" style={MONO}>Nombre</label>
                    <input type="text" required placeholder="Juan García" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-background border border-white/8 rounded-[4px] px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-colors" style={BODY} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5" style={MONO}>Teléfono</label>
                    <input type="tel" placeholder="+54 341 000-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full bg-background border border-white/8 rounded-[4px] px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-colors" style={BODY} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5" style={MONO}>¿Qué necesitás?</label>
                  <textarea required rows={4} placeholder="Describí tu obra: tipo de señalización, ubicación, cantidad y cronograma estimado..." value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} className="w-full bg-background border border-white/8 rounded-[4px] px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-colors resize-none" style={BODY} />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] text-white font-bold py-4 rounded-[4px] hover:bg-[#1db954] transition-colors text-sm tracking-wide" style={BODY}>
                  <WaIcon size={16} /> Enviar por WhatsApp
                </button>
                <p className="text-muted-foreground/40 text-[11px] text-center" style={BODY}>Se abrirá WhatsApp con tu consulta preescrita. Sin bots, atención personal.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Maps */}
      <section className="pb-24 lg:pb-32 relative bg-background">
        <div className="max-w-site mx-auto px-5 lg:px-10 space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-lg flex items-center gap-2" style={HEADING}>
              <MapPin size={18} className="text-primary" /> Sede Comercial
            </h3>
            <div className="w-full h-[250px] rounded-[6px] overflow-hidden border border-white/6">
              <iframe src="https://www.google.com/maps?q=Salvador+Caputto+3243+Santa+Fe+Argentina&output=embed" className="w-full h-full" allowFullScreen="" loading="lazy" title="Sede Comercial Tecnolight" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-lg flex items-center gap-2" style={HEADING}>
              <MapPin size={18} className="text-primary" /> Fábrica — Parque Industrial Los Polígonos
            </h3>
            <div className="w-full h-[250px] rounded-[6px] overflow-hidden border border-white/6">
              <iframe src="https://www.google.com/maps?q=Cnel+Loza+7198+Santa+Fe+Argentina&output=embed" className="w-full h-full" allowFullScreen="" loading="lazy" title="Fábrica Tecnolight" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
