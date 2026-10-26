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
              TECNO LIGHT S.R.L. fabrica y provee señalización vial reglamentaria, preventiva, informativa y
              transitoria. Opera planta propia en el Área Industrial Los Polígonos (Santa Fe) con equipamiento
              de corte láser, pintura y el sistema de impresión digital reflectiva de Avery Dennison.
            </p>
            <p>
              Comercializa EPP e indumentaria de trabajo para obras civiles, viales e industriales, y provee
              alquiler de equipamiento de seguridad vial para desvíos y eventos. Provee a municipios, comunas y
              empresas contratistas de obra pública y privada.
            </p>
            <p>
              Atención comercial de lunes a viernes de 8:00 a 17:00 hs. Sede comercial en Santa Fe Capital y sede operativa en Rosario.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 mt-10" style={BODY}>
            {['Santa Fe', 'Rosario', 'Los Polígonos'].map((tag) => (
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
