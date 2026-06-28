import React from 'react';
import Head from 'next/head';
import { Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="container-site py-32 max-md:py-20 section-with-pattern">
      <Head>
        <title>Contacto - Tecnolight | Santa Fe</title>
        <meta name="description" content="Contactanos por WhatsApp para solicitar asesoramiento y cotización de señales viales y comerciales. Ubicados en Santa Fe, Argentina." />
      </Head>

      <div className="text-center max-w-[600px] mx-auto mb-16">
        <span className="text-[#FF5A1F] font-semibold tracking-wider uppercase text-sm">Contacto Directo</span>
        <h1 className="text-[2.5rem] font-bold mt-2 mb-4 max-md:text-3xl text-gray-900">Hablemos de tu Proyecto</h1>
        <p className="text-gray-500">Estamos listos para asesorarte técnicamente conforme a normativas viales nacionales.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-10 text-center">
            <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone size={36} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Escríbenos por WhatsApp</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Somos rápidos y directos. Enviános un mensaje con tu consulta y te responderemos a la brevedad.
            </p>
            <a
              href="https://wa.me/543424567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white font-semibold px-10 py-5 rounded-xl text-xl transition-all duration-300 hover:bg-[#1DA851] hover:-translate-y-1 hover:shadow-lg"
            >
              <Phone size={26} />
              +54 342 456-7890
            </a>
            <p className="text-xs text-gray-400 mt-4">Horario de atención: Lun a Vie 8:00 - 18:00 hs</p>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#FF5A1F] shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Sede Comercial</h3>
                <p className="text-gray-500 text-sm">Salvador Caputto 3243, Santa Fe</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#FF5A1F] shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Fábrica</h3>
                <p className="text-gray-500 text-sm">Cv Oeste, Santa Fe</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Sede Comercial</h3>
            <div className="w-full h-[250px] rounded-xl overflow-hidden border border-gray-100">
              <iframe
                src="https://www.google.com/maps?q=Salvador+Caputto+3243+Santa+Fe+Argentina&output=embed"
                className="w-full h-full"
                allowFullScreen=""
                loading="lazy"
                title="Sede Comercial Tecnolight"
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Fábrica</h3>
            <div className="w-full h-[250px] rounded-xl overflow-hidden border border-gray-100">
              <iframe
                src="https://www.google.com/maps?q=Cv+Oeste+Santa+Fe+Argentina&output=embed"
                className="w-full h-full"
                allowFullScreen=""
                loading="lazy"
                title="Fábrica Tecnolight"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
