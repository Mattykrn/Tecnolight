import Head from 'next/head';
import { useState } from 'react';
import { getWaLink } from '../utils/whatsapp';

const FONT_RALEWAY_900 = { fontFamily: "'Raleway', sans-serif", fontWeight: 900, textTransform: 'uppercase' };
const FONT_ROBOTO = { fontFamily: "'Roboto', sans-serif" };
const FONT_ROBOTO_500 = { fontFamily: "'Roboto', sans-serif", fontWeight: 500 };

const WaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CATEGORIAS = [
  { id: 'calzado', label: 'Calzados (Venta)' },
  { id: 'ropa_trabajo', label: 'Ropa de Trabajo (Venta)' },
  { id: 'proteccion_auditiva_ocular_facial', label: 'Protección Auditiva, Ocular y Facial (Venta)' },
  { id: 'proteccion_anticaidas_sujecion', label: 'Protección Anticaídas y Sujeción (Venta)' },
  { id: 'cintas_mallas', label: 'Cintas y Mallas de b (Venta)' },
  { id: 'guantes', label: 'Guantes de Seguridad (Venta)' },
  { id: 'bajas', label: 'Chalecos de Alta Visibilidad (Venta)' },
  { id: 'alquiler', label: 'Equipamiento (Alquiler)' },
];

const MODALIDADES = [
  { id: 't', label: 'Todo' },
  { id: 'venta', label: '🛒 Venta: EPP e Indumentaria' },
  { id: 'alquiler', label: '🔶 Alquiler: Equipamiento de b' },
];

// ──────────────────────────────────────────────────────────────────────────────
// PRODUCTOS SEGÚN CATEGORÍA - División estricta VENTA vs ALQUILER
// ⚠️ REGLA: VENTA = artículos para el obrero (EPP e indumentaria)
//            ALQUILER = equipamiento para obra (vallas, balizamiento, equipos vialiales)
//
// All product descriptions have been cleaned of prohibited terms:
// - No Grado Ingeniería references
// - No Alta Intensidad Prismática (HIP)
// - No DPV certification
// - No retrorreflectividad - only Omnicube for high-grade laminae
// ──────────────────────────────────────────────────────────────────────────────

const PRODUCTOS = [
  // CALZADOS (VENTA) - Marca: OMBU
  { id: 101, categoria: 'calzado', modalidad: 'venta', nombre: 'Botas de Seguridad OMBU', desc: 'Botas de seguridad con puntera de acero y suela anti-deslizante. Marca: OMBU.', specs: ['Puntera de acero', 'Suela anti-deslizante', 'Certificación IRAM'], foto: null },
  { id: 102, categoria: 'calzado', modalidad: 'venta', nombre: 'Botines de Seguridad OMBU', desc: 'Botines de seguridad liger con puntera de acero para trabajo general. Marca: OMBU.', specs: ['Puntera de acero', 'Ligereza'], foto: null },

  // ROPA DE TRABAJO (VENTA)
  { id: 201, categoria: 'ropa_trabajo', modalidad: 'venta', nombre: 'Pantalones Grafa', desc: 'Pantalones de trabajo marca Grafa. Marcas disponibles: Grafa, AIRE LIBRE.', specs: ['Tela resistente', 'Bolsillos múltiples'], foto: null },
  { id: 202, categoria: 'ropa_trabajo', modalidad: 'venta', nombre: 'Bombachas', desc: 'Bombachas de trabajo. Marca: OMBU y AIRE LIBRE.', specs: ['Algodón resistente', 'Corte ergonómico'], foto: null },
  { id: 203, categoria: 'ropa_trabajo', modalidad: 'venta', nombre: 'Jeans de Trabajo', desc: 'Jeans para trabajo pesado. Marca: AIRE LIBRE.', specs: ['Denim reforzado', 'Bolsillos laterales'], foto: null },
  { id: 204, categoria: 'ropa_trabajo', modalidad: 'venta', nombre: 'Camisas Grafa', desc: 'Camisas de trabajo marca Grafa. Marca disponible: Grafa.', specs: ['Algodón 100%', 'Bolsillo pechera'], foto: null },
  { id: 205, categoria: 'ropa_trabajo', modalidad: 'venta', nombre: 'Camisas AIRE LIBRE', desc: 'Camisas de trabajo marca AIRE LIBRE.', specs: ['Tela transpirable', 'Corte clásico'], foto: null },

  // PROTECCIÓN AUDITIVA, OCULAR Y FACIAL (VENTA)
  { id: 301, categoria: 'proteccion_auditiva_ocular_facial', modalidad: 'venta', nombre: 'Copa Auditiva LIBUS', desc: 'Copa auditiva para protección auditiva. Marca: LIBUS.', specs: ['Aislamiento acústico', 'Cómodo para uso prolongado'], foto: null },
  { id: 302, categoria: 'proteccion_auditiva_ocular_facial', modalidad: 'venta', nombre: 'Tapón Auditivo LIBUS', desc: 'Tapón auditivo desechable o reutilizable. Marca: LIBUS.', specs: ['Aislamiento sonoro', 'Fácil inserción'], foto: null },
  { id: 303, categoria: 'proteccion_auditiva_ocular_facial', modalidad: 'venta', nombre: 'Copa Auditiva FRAVIDA', desc: 'Copa auditiva marca FRAVIDA.', specs: ['Protección auditiva certificada'], foto: null },
  { id: 304, categoria: 'proteccion_auditiva_ocular_facial', modalidad: 'venta', nombre: 'Anteojos de Seguridad LIBUS', desc: 'Anteojos de seguridad para protección ocular. Marca: LIBUS.', specs: ['Lentes resistentes a impactos'], foto: null },
  { id: 305, categoria: 'proteccion_auditiva_ocular_facial', modalidad: 'venta', nombre: 'Anteojos UCU', desc: 'Anteojos de protección marca UCU.', specs: ['Lentes ópticas de seguridad'], foto: null },
  { id: 306, categoria: 'proteccion_auditiva_ocular_facial', modalidad: 'venta', nombre: 'Antiparras', desc: 'Antiparras para protección facial en trabajos de molienda.', specs: ['Protección facial', 'Ventilación'], foto: null },
  { id: 307, categoria: 'proteccion_auditiva_ocular_facial', modalidad: 'venta', nombre: 'Protectores para Soldar', desc: 'Protectores facial para soldar. Marca: LIBUS.', specs: ['Carcasa resistente', 'Filtro de soldar'], foto: null },
  { id: 308, categoria: 'proteccion_auditiva_ocular_facial', modalidad: 'venta', nombre: 'Amoladora Protection', desc: 'Protección para uso con amoladora.', specs: ['Protección facial'], foto: null },

  // PROTECCIÓN ANTICAÍDAS Y SUJECIÓN (VENTA)
  { id: 401, categoria: 'proteccion_anticaidas_sujecion', modalidad: 'venta', nombre: 'Sistema Anticaídas SKY', desc: 'Sistema anticaídas marca SKY con norma IRAM.', specs: ['Norma IRAM', 'Cable de acero'], foto: null },
  { id: 402, categoria: 'proteccion_anticaidas_sujecion', modalidad: 'venta', nombre: 'Sujeción de Carga SKY', desc: 'Sistemas de sujeción de carga marca SKY.', specs: ['Correas de sujeción', 'Alto capacidad'], foto: null },

  // CINTAS Y MALLAS DE ADVERTENCIA (VENTA)
  { id: 501, categoria: 'cintas_mallas', modalidad: 'venta', nombre: 'Cinta Peligro DPSA', desc: 'Cinta de advertencia "Peligro". Marca: DPSA.', specs: ['Alta visibilidad', 'Resistencia UV'], foto: null },
  { id: 502, categoria: 'cintas_mallas', modalidad: 'venta', nombre: 'Cinta Subterránea DUPONT', desc: 'Cinta para uso subterráneoneo. Marca: DUPONT.', specs: ['Resistencia a químicos', 'Alta visibilidad'], foto: null },
  { id: 503, categoria: 'cintas_mallas', modalidad: 'venta', nombre: 'Cinta Demarcatoria GAUGE', desc: 'Cinta de demarcación. Marca: GAUGE.', specs: ['Delimitación de áreas'], foto: null },
  { id: 504, categoria: 'cintas_mallas', modalidad: 'venta', nombre: 'Cinta Antideslizante', desc: 'Cinta antideslizante para áreas resbaladizasrias.', specs: ['Antideslizante', 'Alta adherencia'], foto: null },
  { id: 505, categoria: 'cintas_mallas', modalidad: 'venta', nombre: 'Malla Subterránea', desc: 'Malla para uso subterráneoneo. ', specs: ['Durabilidad', 'Visibilidad'], foto: null },
  { id: 506, categoria: 'cintas_mallas', modalidad: 'venta', nombre: 'Malla Perimetral', desc: 'Malla perimetral para delimitndo.', specs: ['Perimetración', 'Resistencia'], foto: null },

  // GUANTES DE SEGURIDAD (VENTA)
  { id: 601, categoria: 'guantes', modalidad: 'venta', nombre: 'Guantes Cuero', desc: 'Guantes de cuero para protección general.', specs: ['Cuero genuino', 'Durabilidad'], foto: null },
  { id: 602, categoria: 'guantes', modalidad: 'venta', nombre: 'Guantes Látex', desc: 'Guantes de látex para protección.', specs: ['Látex', 'Flexibilidad'], foto: null },
  { id: 603, categoria: 'guantes', modalidad: 'venta', nombre: 'Guantes Nitrilo', desc: 'Guantes de nitrilo para protección química.', specs: ['Nitrilo', 'Resistencia química'], foto: null },

  // CHALECOS DE ALTA VISIBILIDAD (VENTA)
  { id: 701, categoria: 'bajas', modalidad: 'venta', nombre: 'Chaleco Alta Visibilidad H.V.', desc: 'Chaleco de alta visibilidad.', specs: ['Franjas reflectivas', 'Clase ALTA VISIBILIDAD'], foto: null },
];

// ──────────────────────────────────────────────────────────────────────────────
// FILTROSÓ Y BÚSQUEDA
// ──────────────────────────────────────────────────────────────────────────────
