import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Copy,
  Check,
  Send,
  MessageCircle,
  ExternalLink,
  Building,
  Phone,
  User,
  FileText,
  MapPin
} from 'lucide-react';
import { getWaLink } from '../utils/whatsapp';
import { getGmailLink } from '../utils/links';

const SolicitudModalContext = createContext({
  openSolicitudModal: () => {},
  closeSolicitudModal: () => {}
});

export const useSolicitudModal = () => useContext(SolicitudModalContext);

const OFFICIAL_EMAIL = 'tecnolightsrl@tecnolightsrl.com';

export function SolicitudModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    subject: 'Solicitud Formal y Pliegos - Tecno Light S.R.L.',
    sectionTitle: 'Consulta Comercial y Técnica',
    text: ''
  });

  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openSolicitudModal = (data = {}) => {
    const subject = data.subject || data.emailSubject || 'Solicitud Formal y Pliegos - Tecno Light S.R.L.';
    const sectionTitle = data.sectionTitle || 'Atención Comercial y Técnica';
    const text = data.text || '';

    setModalData({ subject, sectionTitle, text });
    setForm({
      name: '',
      company: '',
      phone: '',
      email: '',
      subject: subject,
      message: text ? `Requerimiento referente a: ${text}\n\n` : ''
    });
    setSubmitted(false);
    setErrorMessage('');
    setIsOpen(true);
  };

  const closeSolicitudModal = () => {
    setIsOpen(false);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) closeSolicitudModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(OFFICIAL_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSendViaWhatsApp = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setErrorMessage('Por favor ingresa al menos tu nombre y teléfono para enviar por WhatsApp.');
      return;
    }

    const waMessage =
      `*SOLICITUD FORMAL — TECNO LIGHT S.R.L.*\n\n` +
      `*Nombre:* ${form.name}\n` +
      (form.company ? `*Empresa / Organismo:* ${form.company}\n` : '') +
      `*Teléfono:* ${form.phone}\n` +
      (form.email ? `*Correo:* ${form.email}\n` : '') +
      `*Asunto:* ${form.subject || modalData.subject}\n` +
      (form.message ? `\n*Detalle del requerimiento / Pliego:*\n${form.message}` : '');

    const waUrl = getWaLink(waMessage);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleSubmitWeb = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      setErrorMessage('Por favor completa nombre, teléfono y detalle del mensaje.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/solicitud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          phone: form.phone,
          email: form.email,
          subject: form.subject || modalData.subject,
          message: form.message
        })
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(json.error || 'No se pudo enviar la solicitud. Por favor intenta por WhatsApp.');
      }
    } catch (err) {
      setErrorMessage('Ocurrió un error de conexión. Puedes enviarla directamente por WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const gmailWebLink = getGmailLink(OFFICIAL_EMAIL, form.subject || modalData.subject);

  return (
    <SolicitudModalContext.Provider value={{ openSolicitudModal, closeSolicitudModal }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop con desenfoque */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSolicitudModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Diálogo Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-[#0C101A] shadow-2xl text-white z-10 my-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 p-5 sm:p-6 bg-gradient-to-r from-primary/10 via-slate-900 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 border border-primary/30 text-primary shrink-0 shadow-lg shadow-primary/10">
                    <Mail size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary block mb-0.5">
                      Atención Comercial y Técnica Oficial
                    </span>
                    <h3 id="modal-title" className="text-lg sm:text-xl font-bold text-white">
                      Solicitud Formal y Envío de Pliegos
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeSolicitudModal}
                  className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Cerrar ventana"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Contenido */}
              <div className="p-5 sm:p-6 max-h-[calc(85vh-140px)] overflow-y-auto space-y-6">
                {/* Indicador de sección / Asunto preconfigurado */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs text-slate-300 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-primary">Asunto Asignado:</span>
                    <span className="font-semibold text-white break-words">{modalData.subject}</span>
                  </div>
                  {modalData.text && (
                    <p className="text-slate-400 text-[11px] leading-relaxed border-t border-white/5 pt-1.5">
                      {modalData.text}
                    </p>
                  )}
                </div>

                {/* Acciones Rápidas Directas (Sin redirecciones erróneas) */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                      Casilla Institucional Directa:
                    </span>
                    <span className="font-mono text-sm sm:text-base font-bold text-white select-all">
                      {OFFICIAL_EMAIL}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-2 text-xs font-semibold text-white transition-all active:scale-95"
                    >
                      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                      <span>{copied ? '¡Copiado!' : 'Copiar Correo'}</span>
                    </button>
                    <a
                      href={gmailWebLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 px-3.5 py-2 text-xs font-semibold text-red-200 transition-all"
                    >
                      <span>Abrir en Gmail</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Estado: Éxito tras envío */}
                {submitted ? (
                  <div className="rounded-xl border border-green-500/30 bg-green-950/30 p-6 text-center space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      <Check size={26} />
                    </div>
                    <h4 className="text-lg font-bold text-white">¡Solicitud Procesada con Éxito!</h4>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Hemos recibido tu solicitud formal para <strong className="text-white">{form.name}</strong>. Nuestro equipo técnico comercial se pondrá en contacto al teléfono <span className="font-mono text-white">{form.phone}</span>.
                    </p>
                    <div className="pt-3 flex flex-wrap justify-center gap-3">
                      <button
                        type="button"
                        onClick={closeSolicitudModal}
                        className="rounded-lg bg-white/10 border border-white/20 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-all"
                      >
                        Cerrar Ventana
                      </button>
                      <button
                        type="button"
                        onClick={handleSendViaWhatsApp}
                        className="btn-whatsapp text-xs py-2.5 px-4"
                      >
                        <MessageCircle size={15} />
                        <span>Reenviar por WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Formulario Integrado */
                  <form onSubmit={handleSubmitWeb} className="space-y-4">
                    <div className="border-b border-white/10 pb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Completá tus datos para envío inmediato:
                      </span>
                    </div>

                    {errorMessage && (
                      <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/30 text-red-300 text-xs">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                          Nombre y Apellido *
                        </label>
                        <div className="relative">
                          <User size={15} className="absolute left-3 top-3 text-slate-500" />
                          <input
                            type="text"
                            required
                            placeholder="Ej: Ing. Martín Gómez"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full rounded-lg border border-white/10 bg-slate-950/80 pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                          Empresa / Organismo
                        </label>
                        <div className="relative">
                          <Building size={15} className="absolute left-3 top-3 text-slate-500" />
                          <input
                            type="text"
                            placeholder="Ej: Constructora Vial / Comuna"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            className="w-full rounded-lg border border-white/10 bg-slate-950/80 pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                          Teléfono / Celular *
                        </label>
                        <div className="relative">
                          <Phone size={15} className="absolute left-3 top-3 text-slate-500" />
                          <input
                            type="tel"
                            required
                            placeholder="Ej: +54 9 342 123-4567"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full rounded-lg border border-white/10 bg-slate-950/80 pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                          Correo de Respuesta
                        </label>
                        <div className="relative">
                          <Mail size={15} className="absolute left-3 top-3 text-slate-500" />
                          <input
                            type="email"
                            placeholder="Ej: contacto@empresa.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full rounded-lg border border-white/10 bg-slate-950/80 pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Asunto del Pliego / Solicitud
                      </label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Mensaje / Detalle de la Consulta o Pliego *
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Especificá carteles requeridos, cantidades, tipo de lámina reflectiva (OmniCube, HIP, EGP), sustratos, dimensiones o adjuntá referencias..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      />
                    </div>

                    {/* Botonera de Envío Doble dentro del Modal */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={handleSendViaWhatsApp}
                        className="btn-whatsapp text-xs sm:text-sm py-3 px-5 flex-1 justify-center gap-2"
                      >
                        <MessageCircle size={17} />
                        <span>Enviar Solicitud por WhatsApp</span>
                      </button>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all flex-1 disabled:opacity-50"
                      >
                        <Send size={16} />
                        <span>{submitting ? 'Enviando...' : 'Enviar por Correo Web'}</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Info institucional de respaldo */}
                <div className="border-t border-white/10 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-400">
                  <div>
                    <strong className="text-white block font-semibold">Sede Santa Fe:</strong>
                    Suipacha 3248 | Tel: (0342) 455-3582
                  </div>
                  <div>
                    <strong className="text-white block font-semibold">Sede Rosario:</strong>
                    Fuhr 1282 | Tel: 341 636 9053
                  </div>
                  <div>
                    <strong className="text-white block font-semibold">Planta Fabril:</strong>
                    Cnel. Loza 7198, P.I. Los Polígonos
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SolicitudModalContext.Provider>
  );
}
