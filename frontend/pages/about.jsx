import React from 'react';
import Head from 'next/head';

const HEADING = { fontFamily: "'Raleway', sans-serif", fontWeight: 900, textTransform: 'uppercase' };
const BODY = { fontFamily: "'Roboto', sans-serif" };
const MONO = { fontFamily: "'Roboto', sans-serif" };

export default function About() {
  return (
    <>
      <Head>
        <title>Quiénes Somos | Tecnolight SRL</title>
        <meta
          name="description"
          content="TECNO LIGHT S.R.L. fabrica y provee señalización vial reglamentaria, preventiva, informativa y transitoria."
        />
      </Head>

      <section className="min-h-[70vh] flex items-center bg-slate-950 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-5 lg:px-10 w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary flex-shrink-0" />
            <span className="text-primary text-[10px] tracking-[0.32em] uppercase" style={MONO}>
              Tecno Light S.R.L.
            </span>
          </div>

          <h1
            className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-white m-0 mb-10"
            style={HEADING}
          >
            QUIÉNES<br />
            <span className="text-primary">SOMOS</span>
          </h1>

          <div className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed" style={BODY}>
            <p>
              Con más de <strong className="text-white font-bold">30 años de experiencia y trayectoria</strong>, <strong className="text-white font-bold">TECNO LIGHT S.R.L.</strong> es referente en la fabricación y provisión de señalización vial reglamentaria, preventiva, informativa y transitoria con los más altos estándares de calidad y durabilidad óptica.
            </p>
            <p>
              En su planta fabril ubicada en el Parque Industrial Los Polígonos (Santa Fe), integra procesos de corte láser computarizado, conformado de chapa de diferentes espesores, PVC, alto impacto, plástico compacto, tratamiento superficial con pintura epoxi termoconvertible, la impresora digital <strong className="text-white font-bold">Mimaki UCJV300-160 UV-LED</strong> y el sistema oficial de impresión digital reflectiva <strong className="text-white font-bold">Avery Dennison TrafficJet™ Xpress</strong> con láminas microprismáticas OmniCube™ (Grado Diamante) y de alta intensidad.
            </p>
            <p>
              Comercializa además equipamiento de protección personal homologado e indumentaria de trabajo para obras viales, civiles e industriales, y gestiona servicios de alquiler, montaje y mantenimiento de vallas y dispositivos de seguridad en ruta.
            </p>
            <p className="text-sm text-slate-400">
              Sede Comercial (Asesoramiento técnico y ventas): Suipacha 3248, Santa Fe Capital | Tel: (0342) 455-3582 | Correo:{' '}
              <a href="mailto:tecnolightsrl@tecnolightsrl.com?subject=Contacto%20Institucional%20-%20Tecno%20Light%20S.R.L." target="_self" className="text-primary hover:underline">
                tecnolightsrl@tecnolightsrl.com
              </a><br />
              Sede Operativa: Fuhr 1282, Rosario | Tel: 341 636 9053 | Planta Fabril: Cnel. Loza 7198, P.I. Los Polígonos, Santa Fe.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 mt-10" style={BODY}>
            {['+30 Años de Trayectoria', 'Santa Fe Capital', 'Rosario', 'P.I. Los Polígonos', 'Avery Dennison TrafficJet'].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
