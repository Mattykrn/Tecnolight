import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, MapPin, MessageCircle, Clock, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Contact() {
  return (
    <div>
      <Head>
        <title>Contacto - Tecnolight | Señalización Vial Santa Fe</title>
        <meta name="description" content="Contactanos por WhatsApp para solicitar asesoramiento y cotización de señales viales y comerciales. Ubicados en Santa Fe, Argentina." />
      </Head>

      <section className="relative min-h-[70vh] flex items-center overflow-hidden py-32 max-md:py-28">
        <div className="absolute inset-0">
          <Image src="/images/obras/projects-aerial.webp" alt="" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,90,31,0.1)_0%,transparent_60%)]" style={{ animation: 'pulse-glow 4s ease-in-out infinite' }} />
        </div>
        <div className="texture-stripes" />
        <div className="container-site relative z-[1]">
          <motion.div className="max-w-[700px]" initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full text-xs font-semibold text-[#25D366] mb-6">
              <MessageCircle size={14} />
              Respuesta Inmediata
            </div>
            <h1 className="text-[clamp(2.5rem,4.5vw,4rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white m-0">
              Hablemos de{' '}
              <span className="relative text-[#FF5A1F] inline-block">
                tu Proyecto
                <motion.span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF5A1F] to-transparent rounded origin-left"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
              </span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-[580px] mt-4">
              Estamos listos para asesorarte técnicamente. Consultas, presupuestos y asesoría normativa sin cargo. Te respondemos en minutos.
            </p>
            <motion.div className="flex flex-wrap items-center gap-4 text-sm text-white/40 mt-4" variants={fadeUp}>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#25D366]" /> WhatsApp Directo</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#FF5A1F]" /> Asesoría Técnica</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#FF5A1F]" /> Sin Cargo</span>
            </motion.div>
            <motion.div className="flex flex-wrap gap-4 mt-8" variants={fadeUp}>
              <a href="https://wa.me/543424567890" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-[#1DA851] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#25D366]/30">
                <MessageCircle size={24} />
                WhatsApp +54 342 456-7890
              </a>
              <Link href="/catalog" className="inline-flex items-center gap-2 bg-transparent text-white font-semibold px-5 py-2.5 rounded-lg border border-white/30 text-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50">
                Explorar Catálogo <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-[15%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-[400px] mx-auto" />
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/obras/highway-signs.webp" alt="" fill className="object-cover" sizes="100vw" />
          <div className="section-overlay-warm" />
        </div>
        <div className="container-site relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <motion.div className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-premium" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="w-20 h-20 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#25D366]/20">
                  <Phone size={36} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Escríbenos por WhatsApp</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Somos rápidos y directos. Enviános un mensaje con tu consulta y te responderemos a la brevedad.
                </p>
                <a href="https://wa.me/543424567890" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold px-10 py-5 rounded-xl text-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#25D366]/30">
                  <MessageCircle size={26} />
                  +54 342 456-7890
                </a>
                <p className="text-xs text-gray-400 mt-4">Lun a Vie 8:00 - 18:00 hs</p>
              </motion.div>

              <motion.div className="bg-white border border-gray-100 rounded-xl p-6 space-y-5 shadow-premium" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
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
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#FF5A1F] shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Horarios de Atención</h3>
                    <p className="text-gray-500 text-sm">Lunes a Viernes 8:00 - 18:00 hs</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <MapPin size={18} className="text-[#FF5A1F]" /> Sede Comercial
                </h3>
                <div className="w-full h-[250px] rounded-xl overflow-hidden border border-gray-100 shadow-premium">
                  <iframe src="https://www.google.com/maps?q=Salvador+Caputto+3243+Santa+Fe+Argentina&output=embed"
                    className="w-full h-full" allowFullScreen="" loading="lazy" title="Sede Comercial Tecnolight" />
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <MapPin size={18} className="text-[#FF5A1F]" /> Fábrica
                </h3>
                <div className="w-full h-[250px] rounded-xl overflow-hidden border border-gray-100 shadow-premium">
                  <iframe src="https://www.google.com/maps?q=Cv+Oeste+Santa+Fe+Argentina&output=embed"
                    className="w-full h-full" allowFullScreen="" loading="lazy" title="Fábrica Tecnolight" />
                </div>
              </motion.div>

              <motion.div className="bg-gradient-to-br from-[#FF5A1F]/5 to-white border border-[#FF5A1F]/10 rounded-xl p-6 shadow-premium" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield size={18} className="text-[#FF5A1F]" /> ¿Por qué contactarnos?
                </h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#FF5A1F] shrink-0" /> Asesoría normativa sin cargo</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#FF5A1F] shrink-0" /> Presupuesto en 24 horas</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#FF5A1F] shrink-0" /> Materiales certificados IRAM 3950</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#FF5A1F] shrink-0" /> +30 años de trayectoria sin reclamos</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
