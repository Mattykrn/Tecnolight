import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Mail, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';

const MONO = { fontFamily: "'Roboto', sans-serif" };
const HEADING = { fontFamily: "'Raleway', sans-serif", fontWeight: 900 };
const BODY = { fontFamily: "'Roboto', sans-serif" };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

import { getWaLink } from '../utils/whatsapp';
import { getGmailLink, getMapsDirectionsLink } from '../utils/links';
import { useSolicitudModal } from '../components/SolicitudModal';

const WaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Contact() {
  const { openSolicitudModal } = useSolicitudModal();
  const [form, setForm] = useState({ name: '', phone: '', msg: '' });
  const [sent, setSent] = useState(false);

  const openWa = (e) => {
    e.preventDefault();
    const t = `Hola, soy *${form.name}*.\n${form.msg}${form.phone ? `\nTel: ${form.phone}` : ''}`;
    window.open(getWaLink(t), '_blank');
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
      <section className="relative min-h-[60vh] flex items-center overflow-hidden py-32 max-md:py-28 bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-[#0A0B0D]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,158,11,0.15)_0%,transparent_60%)]" />
          <div className="absolute bottom-[15%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent max-w-[500px] mx-auto" />
        </div>
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-[1]">
          <motion.div className="max-w-[700px]" initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-amber-500 flex-shrink-0" />
              <span className="text-amber-500 text-[10px] tracking-[0.32em] uppercase" style={MONO}>Contacto</span>
            </div>
            <h1 className="text-[clamp(2.5rem,4.5vw,4rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white m-0" style={HEADING}>
              HABLEMOS DE<br /><span className="text-amber-500">TU PROYECTO</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-[580px] mt-4" style={BODY}>
              Estamos disponibles para consultas y presupuestos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="pb-24 lg:pb-32 relative bg-slate-950">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-amber-500 flex-shrink-0" />
                <span className="text-amber-500 text-[10px] tracking-[0.32em] uppercase" style={MONO}>Contacto</span>
              </div>
              <h2 className="text-white leading-none tracking-tight mb-7" style={{ ...HEADING, fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>TAMBIÉN<br />ENCONTRANOS</h2>
              <div className="space-y-4 mb-10">
                {[
                  { Icon: Mail, label: 'Correo', v: 'tecnolightsrl@tecnolightsrl.com', onClick: () => openSolicitudModal({ subject: 'Consulta General - Tecno Light S.R.L.' }) },
                  { Icon: Clock, label: 'Horarios', v: 'Lun a Vie 8:00 - 17:00 hs' },
                ].map(({ Icon, label, v, href, onClick }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/15 rounded-[4px] flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-amber-500" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase tracking-widest mb-0.5" style={MONO}>{label}</div>
                      {onClick ? (
                        <button
                          type="button"
                          onClick={onClick}
                          className="text-white text-sm font-medium hover:text-amber-500 transition-colors text-left cursor-pointer"
                          style={BODY}
                        >
                          {v}
                        </button>
                      ) : href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-sm font-medium hover:text-amber-500 transition-colors"
                          style={BODY}
                        >
                          {v}
                        </a>
                      ) : (
                        <div className="text-white text-sm font-medium" style={BODY}>{v}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border border-slate-800 rounded-[4px] p-5 bg-slate-900 mb-6">
                <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-3" style={MONO}>Zona de cobertura</div>
                <div className="flex flex-wrap gap-2">
                  {['Santa Fe Capital', 'Rosario', 'Gran Rosario', 'Parque Industrial'].map(z => (
                    <span key={z} className="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-[3px]" style={BODY}>{z}</span>
                  ))}
                </div>
              </div>
              <div className="border border-slate-800 rounded-[4px] p-5 bg-slate-900">
                <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-2.5" style={MONO}>Instagram</div>
                <a href="https://www.instagram.com/tecnolight.srl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-slate-400 text-sm hover:text-amber-500 transition-colors" style={BODY}>
                  @tecnolight.srl <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-[6px] p-8 lg:p-9">
              <div className="flex items-center gap-2.5 mb-6">
                <WaIcon size={17} />
                <h3 className="text-white font-bold" style={{ ...HEADING, fontSize: '1.3rem' }}>Solicitar presupuesto</h3>
              </div>
              {sent && (
                <div className="mb-5 p-3.5 bg-[#25D366]/10 border border-[#25D366]/20 rounded-[4px] flex items-center gap-2 text-[#25D366] text-sm font-medium" style={BODY}>
                  <CheckCircle2 size={14} /> Abriendo WhatsApp con tu mensaje...
                </div>
              )}
              <form onSubmit={openWa} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5" style={MONO}>Nombre</label>
                    <input type="text" required placeholder="Juan García" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-[4px] px-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors" style={BODY} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5" style={MONO}>Teléfono</label>
                    <input type="tel" placeholder="+54 341 000-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-[4px] px-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors" style={BODY} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5" style={MONO}>¿Qué necesitás?</label>
                  <textarea required rows={4} placeholder="Describí tu obra: tipo de señalización, ubicación, cantidad y cronograma estimado..." value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-[4px] px-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors resize-none" style={BODY} />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] text-white font-bold py-4 rounded-[4px] hover:bg-[#1db954] transition-colors text-sm tracking-wide" style={BODY}>
                  <WaIcon size={16} /> Enviar por WhatsApp
                </button>
                <p className="text-slate-500 text-[11px] text-center" style={BODY}>Se abrirá WhatsApp con tu consulta preescrita. Sin bots, atención personal.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Maps */}
      <section className="pb-24 lg:pb-32 relative bg-slate-950">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-1 text-lg flex items-center gap-2" style={HEADING}>
                <MapPin size={18} className="text-amber-500" /> Sede Comercial — Santa Fe Capital
              </h3>
              <p className="text-sm text-slate-400 mb-3" style={BODY}>Suipacha 3248 | Tel: (0342) 4553582</p>
              <div className="w-full h-[250px] rounded-[6px] overflow-hidden border border-slate-800">
                <iframe src="https://www.google.com/maps?q=Suipacha+3248+Santa+Fe+Argentina&output=embed" className="w-full h-full" allowFullScreen="" loading="lazy" title="Sede Comercial Santa Fe Capital" />
              </div>
              <a href={getMapsDirectionsLink('Suipacha 3248, Santa Fe, Argentina')} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:text-amber-400 transition-colors">
                Cómo llegar <ArrowUpRight size={13} />
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1 text-lg flex items-center gap-2" style={HEADING}>
                <MapPin size={18} className="text-amber-500" /> Sede Operativa — Rosario
              </h3>
              <p className="text-sm text-slate-400 mb-3" style={BODY}>
                Fuhr 1282 | Tel: (0341) 4388444 | Cel: 341 636 9053 | Correo:{' '}
                <button
                  type="button"
                  onClick={() => openSolicitudModal({ subject: 'Consulta Operativa - Rosario' })}
                  className="text-amber-500 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  rosario@tecnolightsrl.com
                </button>
              </p>
              <div className="w-full h-[250px] rounded-[6px] overflow-hidden border border-slate-800">
                <iframe src="https://www.google.com/maps?q=Fuhr+1282+Rosario+Argentina&output=embed" className="w-full h-full" allowFullScreen="" loading="lazy" title="Sede Operativa Rosario" />
              </div>
              <a href={getMapsDirectionsLink('Fuhr 1282, Rosario, Santa Fe, Argentina')} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:text-amber-400 transition-colors">
                Cómo llegar <ArrowUpRight size={13} />
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1 text-lg flex items-center gap-2" style={HEADING}>
                <MapPin size={18} className="text-amber-500" /> Planta Industrial / Depósito — P.I. Los Polígonos
              </h3>
              <p className="text-sm text-slate-400 mb-3" style={BODY}>Cnel. Loza 7198, P.I. Los Polígonos, Santa Fe</p>
              <div className="w-full h-[250px] rounded-[6px] overflow-hidden border border-slate-800">
                <iframe src="https://www.google.com/maps?q=Cnel+Loza+7198+Santa+Fe+Argentina&output=embed" className="w-full h-full" allowFullScreen="" loading="lazy" title="Planta Industrial Parque Industrial Los Polígonos" />
              </div>
              <a href={getMapsDirectionsLink('Cnel. Loza 7198, Santa Fe, Argentina')} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:text-amber-400 transition-colors">
                Cómo llegar <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
