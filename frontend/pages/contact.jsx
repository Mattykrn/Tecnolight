import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Phone, MapPin, Clock, ArrowUpRight, Mail } from 'lucide-react';
import { getWaLink } from '../utils/whatsapp';

const FONT_ROBOTO_500 = { fontFamily: "'Roboto', sans-serif", fontWeight: 500 };
const FONT_RALEWAY_900 = { fontFamily: "'Raleway', sans-serif", fontWeight: 900, textTransform: 'uppercase' };
const FONT_ROBOTO = { fontFamily: "'Roboto', sans-serif" };

const HEX_BG = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='60' height='104'><polygon points='30,2 58,18 58,50 30,66 2,50 2,18' fill='none' stroke='rgba(251,146,60,0.15)' stroke-width='0.8'/><polygon points='30,70 58,86 58,104 30,104 2,104 2,86' fill='none' stroke='rgba(251,146,60,0.15)' stroke-width='0.8'/></svg>"
)}")`;

const CANALES = [
  {
    id: 'email',
    Icon: Mail,
    label: 'Email institucional',
    value: 'tecnolightsrl.rosario@gmail.com',
    desc: 'Cotizaciones formales, pliegos y licitaciones.',
    href: 'mailto:tecnolightsrl.rosario@gmail.com',
    highlight: true,
  },
  {
    id: 'whatsapp',
    Icon: ({ size = 16 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: 'WhatsApp',
    value: '+54 9 3424 27-8117',
    desc: 'Respuesta rápida. Consultas y presupuestos informales.',
    href: getWaLink(),
    external: true,
  },
  {
    id: 'telefono',
    Icon: Phone,
    label: 'Teléfono',
    value: '(0342) 455-3582',
    desc: 'Atención directa. Lunes a Viernes, 8:00 a 17:00 hs.',
    href: 'tel:03424553582',
  },
];

const SEDES_CARDS = [
  {
    id: 'santa-fe',
    label: 'Sede Central Santa Fe',
    value: 'Suipacha 3243, Santa Fe Capital',
    desc: 'Tel/Fax: (0342) 455-3582 | tecnolightsrl.rosario@gmail.com',
    href: 'https://www.google.com/maps/search/?api=1&query=Suipacha+3243,+Santa+Fe,+Argentina',
  },
  {
    id: 'rosario',
    label: 'Sede Rosario',
    value: 'Fuhr 1281, Rosario',
    desc: 'Tel/Fax: (0341) 438-8444 | tecnolightsrl.rosario@gmail.com',
    href: 'https://www.google.com/maps/search/?api=1&query=Fuhr+1281,+Rosario,+Santa+Fe',
  },
];

function InteractiveLocationsMap() {
  const [activeTab, setActiveTab] = useState('comercial');

  const loc = {
    comercial: {
      nombre: 'Sede Comercial y Ventas',
      direccion: 'Suipacha 3243, S3000 Santa Fe, Argentina',
      mapUrl: 'https://maps.google.com/maps?q=Suipacha+3243,+Santa+Fe,+Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed',
      gmapsLink: 'https://www.google.com/maps/search/?api=1&query=Suipacha+3243,+Santa+Fe,+Argentina',
    },
    planta: {
      nombre: 'Planta Industrial y Fabricación',
      direccion: 'Parque Industrial Los Polígonos, Santa Fe, Argentina',
      mapUrl: 'https://maps.google.com/maps?q=Parque+Industrial+Los+Poligonos,+Santa+Fe,+Argentina&t=&z=15&ie=UTF8&iwloc=&output=embed',
      gmapsLink: 'https://www.google.com/maps/search/?api=1&query=Parque+Industrial+Los+Poligonos,+Santa+Fe,+Argentina',
    },
  }[activeTab];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Nuestras Ubicaciones</span>
          <h3 className="text-xl font-bold text-slate-900">{loc.nombre}</h3>
          <p className="text-sm text-slate-600 mt-1">{loc.direccion}</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('comercial')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'comercial' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Sede Comercial
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('planta')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'planta' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Planta Industrial
          </button>
        </div>
      </div>
      <div className="w-full h-[380px] rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100 shadow-inner">
        <iframe
          key={activeTab}
          title={loc.nombre}
          src={loc.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="mt-4 flex justify-end">
        <a
          href={loc.gmapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline"
        >
          <span>Abrir ruta en Google Maps</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div>
      <Head>
        <title>Contacto | TECNO LIGHT S.R.L. — Señalización Vial Santa Fe, Argentina</title>
        <meta
          name="description"
          content="Comunicate con TECNO LIGHT S.R.L. Email, teléfono y WhatsApp. Fabricantes de señalización vial certificada. Santa Fe, Argentina."
        />
        <link rel="preload" href="/images/contacto/contact-hero.jpg" as="image" />
      </Head>

      {/* Hero Section */}
      <section id="contacto-hero" className="relative overflow-hidden bg-background" style={{ minHeight: 'clamp(380px, 55vw, 520px)' }}>
        <div className="absolute inset-0">
          <Image
            src="/images/contacto/contact-hero.jpg"
            alt="Señal preventiva de curva instalada en Ruta Provincial 70, Santa Fe — TECNO LIGHT S.R.L."
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/60 to-black/10" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #090b10 0%, transparent 55%)' }} />
          <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ backgroundImage: HEX_BG, backgroundSize: '60px 104px' }} />
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
        </div>
        <div className="relative z-10 flex items-center" style={{ minHeight: 'clamp(380px, 55vw, 520px)' }}>
          <div className="max-w-site mx-auto px-5 lg:px-10 w-full py-20 lg:py-28">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-primary flex-shrink-0" />
                <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={FONT_ROBOTO_500}>
                  Señalización Vial e Industrial
                </span>
              </div>
              <h1 className="text-white leading-none tracking-tight mb-5" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(2.2rem, 6vw, 4.2rem)' }}>
                CANALES DE<br />
                <span className="text-primary">CONTACTO</span>
              </h1>
              <p className="text-white/65 leading-relaxed" style={{ ...FONT_ROBOTO, fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                Atención personalizada de Lunes a Viernes, 8:00 a 17:00 hs.<br />
                Para pliegos y licitaciones, escribinos al email institucional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Canales Grid */}
      <section className="py-16 lg:py-24 relative bg-background" style={{ backgroundImage: HEX_BG, backgroundSize: '60px 104px' }}>
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-primary flex-shrink-0" />
              <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={FONT_ROBOTO_500}>
                Canales
              </span>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {CANALES.map(({ id, Icon, label, value, desc, href, highlight, external }) => (
                <a
                  key={id}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className={`group flex flex-col gap-4 rounded-[6px] p-6 border transition-all duration-300 hover:-translate-y-1 ${
                    highlight
                      ? 'bg-primary/8 border-primary/25 hover:border-primary/50 hover:bg-primary/12'
                      : 'bg-card border-white/6 hover:border-primary/25'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-[4px] flex items-center justify-center shrink-0 border transition-colors ${
                      highlight
                        ? 'bg-primary/15 border-primary/30 text-primary group-hover:bg-primary/25'
                        : 'bg-white/5 border-white/10 text-muted-foreground group-hover:text-primary'
                    }`}
                  >
                    <Icon size={17} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1" style={FONT_ROBOTO_500}>
                      {label}
                    </div>
                    <div
                      className={`font-bold text-sm mb-1.5 transition-colors ${
                        highlight ? 'text-primary' : 'text-foreground group-hover:text-primary'
                      }`}
                      style={FONT_ROBOTO}
                    >
                      {value}
                    </div>
                    <div className="text-muted-foreground/60 text-[11px] leading-snug" style={FONT_ROBOTO}>
                      {desc}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {SEDES_CARDS.map(({ id, label, value, desc, href }) => (
              <div key={id} className="bg-card border border-white/6 rounded-[6px] p-6 flex flex-col gap-3">
                <div className="w-9 h-9 rounded-[4px] bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={15} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1" style={FONT_ROBOTO_500}>
                    {label}
                  </div>
                  <div className="text-foreground text-sm font-semibold mb-1" style={FONT_ROBOTO}>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </div>
                  <div className="text-muted-foreground/55 text-[11px]" style={FONT_ROBOTO}>
                    {desc}
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-card border border-white/6 rounded-[6px] p-6 flex flex-col gap-3">
              <div className="w-9 h-9 rounded-[4px] bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Clock size={15} className="text-muted-foreground" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1" style={FONT_ROBOTO_500}>
                  Horario Comercial
                </div>
                <div className="text-foreground text-sm font-semibold mb-1" style={FONT_ROBOTO}>
                  Lunes a Viernes, 8:00 a 17:00 hs.
                </div>
                <div className="text-muted-foreground/55 text-[11px]" style={FONT_ROBOTO}>
                  Sábados y domingos: cerrado.
                </div>
              </div>
            </div>
          </div>

          <div className="border border-white/6 rounded-[4px] p-5 bg-card mb-6">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3" style={FONT_ROBOTO_500}>
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
                <span key={provincia} className="bg-secondary text-foreground/60 text-xs px-3 py-1 rounded-[3px]" style={FONT_ROBOTO}>
                  {provincia}
                </span>
              ))}
            </div>
          </div>

          <div className="border border-white/6 rounded-[4px] p-5 bg-card">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2.5" style={FONT_ROBOTO_500}>
              Instagram
            </div>
            <a
              href="https://www.instagram.com/tecnolight.srl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground/60 text-sm hover:text-primary transition-colors"
              style={FONT_ROBOTO}
            >
              @tecnolight.srl <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="pb-16 lg:pb-24 relative bg-background">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <InteractiveLocationsMap />
        </div>
      </section>
    </div>
  );
}
