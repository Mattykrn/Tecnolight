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
          content="señalización vial santa fe, carteles viales obra, indumentaria epp, impresión reflectiva Omnicube, señales reglamentarias, seguridad vial, demarcación horizontal, Tecno Light Santa Fe, cartelería de obra"
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
                TECNO LIGHT S.R.L. provee señalización vial reglamentaria, preventiva, informativa y transitoria conforme a normativas. Opera planta propia en el Área Industrial Los Polígonos (Santa Fe) con equipamiento de corte, soldadura, pintura y el sistema de impresión digital  de Avery Dennison.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-slate-300 text-base leading-relaxed font-medium" style={FONT_ROBOTO}>
                Comercializa EPP e indumentaria de trabajo para obras civiles, viales e industriales, y provee alquiler de equipamiento de seguridad vial para desvíos y eventos. Vinculada con municipios, comunas y empresas, comunas y empresas contratistas de obra pública en Santa Fe, Córdoba, Entre Ríos y Buenos Aires.
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

      {/* Proceso Industrial */}
      <ErrorBoundary>
      </ErrorBoundary>

      {/* Fabricación & Catálogo */}
      <ErrorBoundary>
      </ErrorBoundary>

      {/* Servicios & Alquiler de Vallas */}
      <ErrorBoundary>
      </ErrorBoundary>

      {/* Seguridad & EPP */}
      <ErrorBoundary>
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
                Atención comercial de Lunes a Viernes, 8:00 a 17:00 hs. Para licitaciones, escribinos por email.
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
                    href="mailto:tecnolightsrl@tecnolightsrl.com"
                    className="text-black font-semibold text-sm hover:text-primary transition-colors flex items-center gap-2"
                    style={FONT_ROBOTO}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    tecnolightsrl@tecnolightsrl.com
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
                  Fuhr 1281, Rosario
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
                    341 636 9053
                  </a>
                  <a
                    href="mailto:tecnolightsrl@tecnolightsrl.com"
                    className="text-black font-semibold text-sm hover:text-primary transition-colors flex items-center gap-2"
                    style={FONT_ROBOTO}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    tecnolightsrl@tecnolightsrl.com
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
                    href="mailto:tecnolightsrl@tecnolightsrl.com"
                    className="text-black font-semibold text-sm hover:text-primary transition-colors flex items-center gap-2"
                    style={FONT_ROBOTO}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    tecnolightsrl@tecnolightsrl.com
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
