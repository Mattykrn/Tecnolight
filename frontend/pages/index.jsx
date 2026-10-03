import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  MessageCircle,
  ShieldCheck,
  Droplet,
  Sparkles,
  Clock,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Search,
  HardHat,
  AlertTriangle,
  Grid,
  Wrench,
  CheckCircle2,
  X,
  ChevronRight,
  Eye,
  Flame,
  Wind,
  Shirt,
  Footprints,
  Layers,
  ArrowRight,
} from 'lucide-react';

const FONT_RALEWAY_900 = { fontFamily: "'Raleway', sans-serif", fontWeight: 900, textTransform: 'uppercase' };
const FONT_ROBOTO = { fontFamily: "'Roboto', sans-serif" };
const FONT_ROBOTO_500 = { fontFamily: "'Roboto', sans-serif", fontWeight: 500 };

/**
 * Cluster de Hexágonos Geométricos de Marca
 * Reproduce la geometría institucional de Tecno Light (@tecnolight.srl)
 */
const HexagonCluster = ({ className = '', style = {}, variant = 'orange' }) => {
  const strokeColor = variant === 'orange' ? '#FF5A1F' : '#ffffff';
  const fillColor = variant === 'orange' ? 'rgba(255, 90, 31, 0.08)' : 'rgba(255, 255, 255, 0.04)';

  return (
    <div className={`pointer-events-none select-none ${className}`} style={style}>
      <svg
        viewBox="0 0 320 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_24px_rgba(255,90,31,0.25)]"
      >
        {/* Hexágono Principal Grueso */}
        <polygon
          points="160,20 280,90 280,230 160,300 40,230 40,90"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeOpacity="0.85"
          fill={fillColor}
        />
        {/* Hexágono Interior Concéntrico Punteado */}
        <polygon
          points="160,50 250,105 250,215 160,270 70,215 70,105"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeOpacity="0.5"
          strokeDasharray="6 4"
          fill="none"
        />
        {/* Hexágono Adyacente Superior Izquierdo */}
        <polygon
          points="70,10 130,45 130,115 70,150 10,115 10,45"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeOpacity="0.55"
          fill="rgba(255, 90, 31, 0.05)"
        />
        {/* Hexágono Inferior Derecho */}
        <polygon
          points="250,200 310,235 310,305 250,340 190,305 190,235"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeOpacity="0.6"
          fill="rgba(255, 90, 31, 0.06)"
        />
        {/* Hexágono Mini Detalle */}
        <polygon
          points="290,60 318,76 318,108 290,124 262,108 262,76"
          stroke={strokeColor}
          strokeWidth="1.6"
          strokeOpacity="0.45"
          fill="none"
        />
        {/* Matriz de Puntos Técnicos */}
        <circle cx="160" cy="160" r="3.5" fill="#FF5A1F" fillOpacity="0.85" />
        <circle cx="135" cy="160" r="2" fill="#FF5A1F" fillOpacity="0.45" />
        <circle cx="185" cy="160" r="2" fill="#FF5A1F" fillOpacity="0.45" />
        <circle cx="160" cy="135" r="2" fill="#FF5A1F" fillOpacity="0.45" />
        <circle cx="160" cy="185" r="2" fill="#FF5A1F" fillOpacity="0.45" />
        {/* Retículo Cruz de Precisión */}
        <line x1="160" y1="125" x2="160" y2="195" stroke="#FF5A1F" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="125" y1="160" x2="195" y2="160" stroke="#FF5A1F" strokeWidth="1" strokeOpacity="0.35" />
      </svg>
    </div>
  );
};

/**
 * Contenedor Hexagonal para Íconos e Indicadores
 */
const HexagonIconBox = ({ children, size = 52, className = '' }) => (
  <div
    className={`relative flex items-center justify-center shrink-0 ${className}`}
    style={{ width: `${size}px`, height: `${size * 1.15}px` }}
  >
    <svg viewBox="0 0 100 115" className="absolute inset-0 w-full h-full" fill="none">
      <polygon
        points="50,2 98,28 98,87 50,113 2,87 2,28"
        stroke="#FF5A1F"
        strokeWidth="4"
        fill="rgba(15, 23, 42, 0.9)"
        className="filter drop-shadow-[0_2px_8px_rgba(255,90,31,0.3)]"
      />
      <polygon
        points="50,12 88,34 88,81 50,103 12,81 12,34"
        stroke="rgba(255, 90, 31, 0.35)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="none"
      />
    </svg>
    <div className="relative z-10 text-[#FF5A1F] flex items-center justify-center">
      {children}
    </div>
  </div>
);

/**
 * Viñeta Hexagonal Técnica
 */
const HexagonBullet = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="shrink-0 mt-1">
    <polygon points="5,1 9.5,3.5 9.5,8.5 5,11 0.5,8.5 0.5,3.5" fill="#FF5A1F" />
  </svg>
);

/**
 * Separador de Sección con Geometría Hexagonal Institucional
 */
const HexagonDivider = ({ className = '' }) => (
  <div className={`relative flex items-center justify-center py-6 sm:py-8 overflow-hidden select-none pointer-events-none ${className}`}>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FF5A1F]/30 to-[#FF5A1F]/70" />
    <div className="mx-3 sm:mx-6 flex items-center gap-2.5">
      <svg width="20" height="24" viewBox="0 0 24 28" fill="none" className="opacity-40 hidden sm:block">
        <polygon points="12,2 22,8 22,20 12,26 2,20 2,8" stroke="#FF5A1F" strokeWidth="1.5" />
      </svg>
      <div className="relative flex items-center justify-center">
        <svg width="34" height="40" viewBox="0 0 36 42" fill="none" className="filter drop-shadow-[0_0_12px_rgba(255,90,31,0.6)]">
          <polygon points="18,3 33,12 33,30 18,39 3,30 3,12" stroke="#FF5A1F" strokeWidth="2.4" fill="rgba(15,23,42,0.92)" />
          <polygon points="18,8 28,14 28,28 18,34 8,28 8,14" stroke="#FF5A1F" strokeWidth="1.2" strokeDasharray="3 2" fill="rgba(255,90,31,0.18)" />
          <circle cx="18" cy="21" r="3" fill="#FF5A1F" />
        </svg>
      </div>
      <svg width="20" height="24" viewBox="0 0 24 28" fill="none" className="opacity-40 hidden sm:block">
        <polygon points="12,2 22,8 22,20 12,26 2,20 2,8" stroke="#FF5A1F" strokeWidth="1.5" />
      </svg>
    </div>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#FF5A1F]/30 to-[#FF5A1F]/70" />
  </div>
);

/**
 * Insignia / Tag Hexagonal para Normas, Pilares y Certificaciones
 */
const HexagonBadge = ({ children, variant = 'orange', className = '' }) => {
  const isOrange = variant === 'orange';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md ${
        isOrange
          ? 'bg-[#FF5A1F]/15 border border-[#FF5A1F]/40 text-[#FF5A1F]'
          : 'bg-white/10 border border-white/20 text-slate-200'
      } ${className}`}
      style={FONT_ROBOTO_500}
    >
      <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor" className="shrink-0">
        <polygon points="4,0.5 7.5,2.5 7.5,7.5 4,9.5 0.5,7.5 0.5,2.5" />
      </svg>
      <span>{children}</span>
    </span>
  );
};

// ========================================================================
// FLOTA DE ALQUILER DE VALLAS Y DISPOSITIVOS DE SEGURIDAD VIAL
// ========================================================================
const EQUIPOS_ALQUILER_VALLAS = [
  {
    id: 'vallas-peatonales',
    nombre: 'Vallas Metálicas Peatonales (2.50 m x 1.10 m)',
    badge: 'Disponibilidad Inmediata',
    norma: 'Acero Galvanizado / Encastre Rápido',
    desc: 'Cerramientos modulares de caño estructural de alta resistencia con sistema de encastre macho-hembra antivuelco. Pies desmontables planos para paso peatonal seguro.',
    specs: [
      'Caño perimetral de acero de 1 1/4" zincado y pintado epoxi amarillo vial',
      'Barras verticales intermedias cada 10 cm con trabas de unión continua',
      'Despliegue rápido de cientos de metros en minutos sin bulonería adicional',
    ],
    ideal: 'Desvíos de tránsito urbano, eventos masivos, obras de red y canalización peatonal',
  },
  {
    id: 'conos-reflectivos',
    nombre: 'Conos Viales de Seguridad (75 cm y 100 cm)',
    badge: 'Norma IRAM 3964',
    norma: 'PVC Flexible / Memoria Elástica',
    desc: 'Conos de PVC flexible de alta memoria elástica resistentes al aplastamiento accidental con doble collar retrorreflectivo microprismático Avery Dennison.',
    specs: [
      'Base cuadrada pesada de caucho para máxima estabilidad con ráfagas de viento',
      'Doble faja reflectiva Grado Ingeniería / Diamante con retrorreflexión 360°',
      'Ranura superior para montaje directo de balizas solares intermitentes o cinta',
    ],
    ideal: 'Canalización de tránsito en calzada, cortes parciales de carril y retenes viales',
  },
  {
    id: 'tambores-canalizadores',
    nombre: 'Tambores Canalizadores de Tránsito (100 cm)',
    badge: 'Alta Visibilidad Vial',
    norma: 'Polietileno UV / Lastrable',
    desc: 'Canalizadores cilíndricos rotomoldeados en polietileno indeformable con 4 franjas horizontales de 15 cm de lámina reflectiva de alta intensidad prismática.',
    specs: [
      'Cuerpo estriado de máxima resistencia a la intemperie y rayos UV',
      'Base con receptáculo para lastrado con agua o arena (hasta 25 kg)',
      'Manija ergonómica superior para manipulación rápida y fijación de baliza',
    ],
    ideal: 'Bifurcaciones de calzada, inicio de desvíos en autopistas y frentes de asfalto',
  },
  {
    id: 'balizas-destellantes',
    nombre: 'Balizas Solares LED Destellantes Autónomas',
    badge: 'Autonomía Solar 360°',
    norma: 'LED Ámbar / Fotocélula Día-Noche',
    desc: 'Dispositivos de balizamiento luminoso autónomo con óptica de alta intensidad 360°, fotocélula de encendido crepuscular y panel solar integrado.',
    specs: [
      'Visibilidad nocturna superior a 800 metros con destello de 60 pulsos/minuto',
      'Batería recargable integrada con autonomía continua de hasta 120 horas sin sol',
      'Soporte metálico universal para anclaje a vallas peatonales, conos y tambores',
    ],
    ideal: 'Balizamiento nocturno obligatorio en zanjeos, pozos abiertos y obras en ruta',
  },
  {
    id: 'semaforos-flechas',
    nombre: 'Semáforos Viales Portátiles y Flechas Direccionales',
    badge: 'Desvíos de Calzada',
    norma: 'Óptica LED / Paso Alternado',
    desc: 'Sistemas luminosos móviles para regulación de tránsito en tramos de ruta con reducción a calzada simple, puentes y reparaciones asfálticas.',
    specs: [
      'Lentes LED de alto impacto visual con ciclos de verde y rojo programables',
      'Chasis móvil con mástil telescópico y estabilizadores de viento antivuelco',
      'Alimentación con acumulador 12V y panel solar para autonomía 24 horas continua',
    ],
    ideal: 'Obras viales de bacheo, repavimentación y cortes con habilitación por sentido',
  },
  {
    id: 'chapones-zanjas',
    nombre: 'Chapones de Acero Antideslizantes para Cruce de Zanjas',
    badge: 'Tránsito Pesado',
    norma: 'Chapa Estriada Antideslizante',
    desc: 'Placas de acero estructural de alta capacidad portante para cobertura y cruce vehicular y peatonal seguro sobre zanjeos y redes de servicios.',
    specs: [
      'Superficie estriada semilla de melón antideslizante apta para camiones y colectivos',
      'Ojales de izaje para manipulación con grúa/pluma y anclaje perimetral a calzada',
      'Bordes biselados que facilitan la transición suave de vehículos sin saltos',
    ],
    ideal: 'Cruce de zanjas de agua (ASSA), gasoductos, tendido de fibra y obras de cloacas',
  },
];

// ========================================================================
// CATEGORÍAS DEL CATÁLOGO DE SEGURIDAD INDUSTRIAL & EPP
// ========================================================================
const CATEGORIAS_EPP = [
  { id: 'todas', label: 'Todos los EPP', icon: Grid },
  { id: 'calzado', label: 'Calzado & Botines', icon: Footprints },
  { id: 'chalecos', label: 'Chalecos & Reflectivos', icon: ShieldCheck },
  { id: 'fajas', label: 'Fajas & Ergonomía', icon: AlertTriangle },
  { id: 'arneses', label: 'Arneses & Altura', icon: Wrench },
  { id: 'camperas', label: 'Camperas & Indumentaria', icon: Shirt },
  { id: 'cascos', label: 'Cascos & Cabeza', icon: HardHat },
  { id: 'proteccion', label: 'Ocular, Auditiva & Respiratoria', icon: Eye },
  { id: 'incendio', label: 'Incendio & Primeros Auxilios', icon: Flame },
];

// ========================================================================
// 20 PRODUCTOS DE SEGURIDAD INDUSTRIAL (BOTINES, CHALECOS, FAJAS, ARNESES, CAMPERAS...)
// ========================================================================
const PRODUCTOS_EPP = [
  {
    id: 1,
    categoria: 'calzado',
    nombre: 'Botines de Seguridad con Puntera de Acero',
    norma: 'IRAM 3610 / Sello S',
    desc: 'Calzado industrial confeccionado en cuero vacuno flor de primera calidad con puntera de acero templado y suela de poliuretano bidensidad inyectada.',
    specs: [
      'Puntera resistente a impacto de 200 Joules y compresión de 15 kN',
      'Plantilla antiperforación de acero templado o textil kevlar',
      'Suela antideslizante con estrías autolimpiantes e hidrocarburo-resistente',
    ],
  },
  {
    id: 2,
    categoria: 'calzado',
    nombre: 'Calzado de Seguridad Dieléctrico sin Metal',
    norma: 'Dieléctrico hasta 20.000 V',
    desc: 'Botines desarrollados para tareas eléctricas de media y baja tensión. Puntera de composite ultra-liviana y fondo 100% no conductor.',
    specs: [
      'Puntera no metálica en resina composite atérmica',
      'Aislación dieléctrica ensayada bajo norma IRAM 3610',
      'Cuero hidrófugo repelente al agua, barro y aceites',
    ],
  },
  {
    id: 3,
    categoria: 'calzado',
    nombre: 'Botas de Goma Pescadoras y de Caña Alta',
    norma: '100% Impermeables / PVC',
    desc: 'Calzado de goma impermeable de alta resistencia química para trabajos viales en zanjas, saneamiento público (ASSA) y anegamientos.',
    specs: [
      'Fabricadas en compuesto de PVC virgen resistente a hidrocarburos y ácidos leves',
      'Disponible en caña alta estándar o modelo jardinera / wader enterizo',
      'Suela estriada de gran tracción sobre lodo y superficies húmedas',
    ],
  },
  {
    id: 4,
    categoria: 'chalecos',
    nombre: 'Chaleco Reflectivo de Alta Visibilidad Clase 2',
    norma: 'Norma IRAM 3859 / EN 471',
    desc: 'Indumentaria reglamentaria para trabajadores en traza vial y calzada activa. Cintas retrorreflectivas microprismáticas de alta penetración.',
    specs: [
      'Tejido fluorescente de poliéster amarillo o naranja de alta visibilidad diurna',
      'Dos bandas retrorreflectivas perimetrales horizontales de 50 mm',
      'Cierre frontal mediante abrojo reforzado o cremallera de alta duración',
    ],
  },
  {
    id: 5,
    categoria: 'chalecos',
    nombre: 'Chaleco de Seguridad Vial Clase 3 con Mangas',
    norma: 'Vialidad Nacional / DNV',
    desc: 'Chaleco de máxima exigencia para operarios en autopistas y rutas de alta velocidad, con protección reflectiva 360° en torso y brazos.',
    specs: [
      'Configuración reglamentaria Clase 3 para zonas de tránsito rápido y noche',
      'Cintas reflectivas combinadas en hombros, brazos y contorno de torso',
      'Bolsillo porta-radio VHF, credencial transparente y lapicero de obra',
    ],
  },
  {
    id: 6,
    categoria: 'fajas',
    nombre: 'Faja Lumbar Ergonómica de Soporte con Tiradores',
    norma: 'Ergonomía Laboral y Sobreesfuerzo',
    desc: 'Soporte lumbosacro para operarios en tareas de carga, estiba manual y mantenimiento vial. Previene lumbalgias y hernias por esfuerzo.',
    specs: [
      'Banda elástica principal de alta compresión con doble banda tensora de ajuste',
      '4 ballenas de soporte lumbar flexibles que estabilizan la columna',
      'Tiradores elásticos regulables y lavables con hebillas de liberación rápida',
    ],
  },
  {
    id: 7,
    categoria: 'arneses',
    nombre: 'Arnés de Seguridad Full Body Paracaidista',
    norma: 'Certificación IRAM 3622-1',
    desc: 'Arnés integral anticaídas con punto de enganche dorsal y esternal para trabajos en altura sobre andamios, torres, mástiles y puentes.',
    specs: [
      'Cintas de poliéster de alta tenacidad de 45 mm con costuras computarizadas',
      'Argollas de anclaje de acero forjado cincado de 22 kN de resistencia',
      'Herrajes de regulación rápida en hombros, pecho y perneras acolchadas',
    ],
  },
  {
    id: 8,
    categoria: 'arneses',
    nombre: 'Cola de Amarre con Absorbedor de Impacto',
    norma: 'Norma IRAM 3622-2',
    desc: 'Elemento de amarre con disipador de energía para reducir la fuerza de choque en caso de detención de caída a menos de 6 kN.',
    specs: [
      'Cinta tubular de poliéster con absorbedor de choque por desgarro controlado',
      'Mosquetón estándar de 18 mm y gancho para andamio de 55 mm con doble traba',
      'Longitud reglamentaria de 1,50 m para máxima seguridad operativa',
    ],
  },
  {
    id: 9,
    categoria: 'camperas',
    nombre: 'Campera Térmica de Trabajo Tipo Trucker',
    norma: 'Protección Bajas Temperaturas',
    desc: 'Campera de abrigo para operarios en intemperie, fabricada con exterior en gabardina pesada de alta durabilidad y forro interior matelaseado térmico.',
    specs: [
      'Exterior en sarga de algodón/poliéster de máxima resistencia al roce',
      'Relleno de guata siliconada térmica de 150 gr con tafeta matelaseada',
      'Cierre frontal reforzado con solapa cortaviento y 4 bolsillos amplios',
    ],
  },
  {
    id: 10,
    categoria: 'camperas',
    nombre: 'Campera Impermeable de Alta Visibilidad',
    norma: 'Térmica & Impermeable / Clase 3',
    desc: 'Campera para cuadrillas de ruta con exterior Oxford impermeable, abrigo interior desmontable y cintas reflectivas termoselladas.',
    specs: [
      'Tejido Oxford 300D con recubrimiento de poliuretano 100% impermeable',
      'Costuras termoselladas y capucha oculta en cuello con cordón de ajuste',
      'Cintas reflectivas combinadas para visibilidad nocturna bajo lluvia intensa',
    ],
  },
  {
    id: 11,
    categoria: 'camperas',
    nombre: 'Mameluco de Trabajo Homologado (Grafa 100% Algodón)',
    norma: 'Tela Grafa Homologada',
    desc: 'Overol enterizo de uso intensivo para operarios de planta, taller y obra vial, confeccionado con costuras triples de seguridad.',
    specs: [
      'Tela Grafa 70 de 240 gr/m² de máxima durabilidad y confort térmico',
      'Cierre doble camino de bronce reforzado con solapa de protección',
      'Cintura con elástico trasero y 6 bolsillos utilitarios reforzados con remaches',
    ],
  },
  {
    id: 12,
    categoria: 'camperas',
    nombre: 'Traje de Lluvia Impermeable de 2 Piezas',
    norma: '100% Impermeable PVC/Poliéster',
    desc: 'Conjunto de campera y pantalón impermeable para tareas bajo condiciones de lluvia severa, zanjeos y obras de saneamiento.',
    specs: [
      'Material bicapa PVC/Poliéster/PVC de 0.35 mm de espesor reforzado',
      'Espalda con sistema de ventilación y axilas respirables para evitar condensación',
      'Pantalón con cintura elastizada y botamangas ajustables mediante broches a presión',
    ],
  },
  {
    id: 13,
    categoria: 'cascos',
    nombre: 'Casco de Seguridad Industrial Clase A, B y E',
    norma: 'IRAM 3620 / Dieléctrico 20.000 V',
    desc: 'Casco fabricado en polietileno de alta densidad (PEAD) para protección craneana contra impactos mecánicos y descargas eléctricas de alto voltaje.',
    specs: [
      'Arnés interior de suspensión de 4 o 6 puntos regulable con cremallera a rodillo',
      'Banda antisudor frontal de espuma microperforada reemplazable',
      'Ranuras laterales universales para montaje de protectores auditivos y faciales',
    ],
  },
  {
    id: 14,
    categoria: 'proteccion',
    nombre: 'Protectores Auditivos de Copa para Casco e Independientes',
    norma: 'IRAM 4060 / SNR 28-32 dB',
    desc: 'Atenuación acústica de alto rendimiento para operarios de maquinaria vial pesada, martillos neumáticos y corte de chapa industrial.',
    specs: [
      'Almohadillas acolchadas de espuma suave de baja presión para uso continuo',
      'Brazo pivotante de acero con anclaje a slot universal de casco o vincha',
      'Atenuación certificada para ruidos continuos de alto impacto sonoro',
    ],
  },
  {
    id: 15,
    categoria: 'proteccion',
    nombre: 'Anteojos de Seguridad con Lente de Policarbonato',
    norma: 'IRAM 3630 / ANSI Z87.1',
    desc: 'Protección ocular envolvente contra proyección de partículas a gran velocidad, esquirlas de soldadura y polvo en suspensión.',
    specs: [
      'Lentes de policarbonato ópticamente neutros con tratamiento antirrayadura',
      'Filtro de protección contra radiación ultravioleta UV 99.9%',
      'Patillas extensibles regulables en ángulo y longitud para ajuste ergonómico',
    ],
  },
  {
    id: 16,
    categoria: 'proteccion',
    nombre: 'Antiparras de Seguridad Ventiladas e Indiferentes',
    norma: 'Protección Química y Polvo',
    desc: 'Antiparra de sello estanco flexible de PVC para trabajos con salpicaduras de pinturas sintéticas, solventes o partículas finas en planta.',
    specs: [
      'Cuerpo de elastómero flexible que sella sobre el contorno facial',
      'Válvulas de ventilación indirecta que evitan el empañamiento del visor',
      'Banda elástica de ajuste perimetral regulable apta para usar sobre anteojos recetados',
    ],
  },
  {
    id: 17,
    categoria: 'proteccion',
    nombre: 'Semimáscara Respiratoria con Filtros P100 y Vapores',
    norma: 'IRAM 3649 / NIOSH',
    desc: 'Respirador de media cara en silicona flexible hipoalergénica con doble cartucho intercambiable para polvos tóxicos, pinturas y solventes.',
    specs: [
      'Válvula de exhalación que facilita la respiración y reduce calor en el rostro',
      'Arnés de sujeción para nuca y coronilla con hebillas de enganche rápido',
      'Compatible con filtros para partículas P100 y cartuchos para vapores orgánicos',
    ],
  },
  {
    id: 18,
    categoria: 'proteccion',
    nombre: 'Guantes de Vaqueta, Descarne y Anticorte',
    norma: 'Protección Mecánica y Térmica',
    desc: 'Guantes de trabajo confeccionados en cuero vacuno seleccionado para manipulación de chapas, perfiles metálicos y tareas de soldadura.',
    specs: [
      'Cuero vaqueta flor suave para tareas que requieren destreza y ajuste',
      'Cuero descarne pesado con costuras de hilo kevlar para soldadura y corte',
      'Versiones con puño largo de seguridad para protección de muñeca y antebrazo',
    ],
  },
  {
    id: 19,
    categoria: 'incendio',
    nombre: 'Matafuegos de Polvo Químico Seco ABC (1, 2.5, 5 y 10 kg)',
    norma: 'Sello IRAM / DPS Homologado',
    desc: 'Extintores reglamentarios de polvo químico presurizado con nitrógeno para vehículos de obra, obradores, plantas industriales y depósitos.',
    specs: [
      'Manómetro de control de presión y válvula de bronce forjado de alta resistencia',
      'Manguera de descarga de alta flexibilidad con tobera difusora (en 5 y 10 kg)',
      'Soporte metálico de fijación vehicular o de pared incluido con estampilla legal',
    ],
  },
  {
    id: 20,
    categoria: 'incendio',
    nombre: 'Botiquín de Primeros Auxilios Reglamentario para Obra',
    norma: 'Normativa de Seguridad e Higiene Laboral',
    desc: 'Gabinete metálico o valija estanca plástica con dotación completa de apósitos, gasas, desinfectantes y férulas para atención en sitio.',
    specs: [
      'Contenido reglamentario según cantidad de operarios en obra civil o vial',
      'Elementos de curación estériles, vendas, tijera, guantes descartables y antiséptico',
      'Cierre hermético antipolvo y manija para traslado inmediato en el frente de avance',
    ],
  },
];

export default function Home() {
  const [categoriaEpp, setCategoriaEpp] = useState('todas');
  const [busquedaEpp, setBusquedaEpp] = useState('');
  const [modalFoto, setModalFoto] = useState(null);


  const productosEppFiltrados = PRODUCTOS_EPP.filter((prod) => {
    const coincideCat = categoriaEpp === 'todas' || prod.categoria === categoriaEpp;
    const coincideBusq =
      busquedaEpp.trim() === '' ||
      prod.nombre.toLowerCase().includes(busquedaEpp.toLowerCase()) ||
      prod.desc.toLowerCase().includes(busquedaEpp.toLowerCase()) ||
      prod.norma.toLowerCase().includes(busquedaEpp.toLowerCase());
    return coincideCat && coincideBusq;
  });

  const galeriaFotos = [
    {
      src: '/images/trafficjet/gallery/proceso-1-impresion.jpg',
      alt: 'Plotter industrial TrafficJet™ Xpress imprimiendo lámina reflectiva',
      caption: 'Plotter industrial TrafficJet™ Xpress imprimiendo lámina reflectiva',
    },
    {
      src: '/images/carteleria/4f20f2f2-398d-44ca-9061-e3ce6b69e98b.jpg',
      alt: 'Bobinas de lámina microprismática retrorreflectiva Avery Dennison en planta',
      caption: 'Bobinas de lámina microprismática retrorreflectiva Avery Dennison en planta',
    },
    {
      src: '/images/trafficjet/impresion-microprismatica-detalle.jpg',
      alt: 'Detalle de curado UV sobre estructura microprismática de alta intensidad',
      caption: 'Detalle de curado UV sobre estructura microprismática de alta intensidad',
    },
    {
      src: '/images/carteleria/efed8a3c-6e4d-4d5f-9e20-20d38467c75a.jpg',
      alt: 'Cartelería vial terminada de alta visibilidad en mesa de ensamble',
      caption: 'Cartelería vial terminada de alta visibilidad en mesa de ensamble',
    },
  ];

  return (
    <div className="bg-background text-foreground" style={FONT_ROBOTO}>
      <Head>
        <title>TECNO LIGHT S.R.L. | Señalización Vial e Industrial</title>
        <meta
          name="description"
          content="Fabricación y provisión integral de señalización vial, indumentaria de trabajo, EPP y alquiler de equipamiento para obra bajo normativas DNV, DPV y estándares IRAM. Sede comercial en Santa Fe Capital y sucursal Rosario."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* ========================================================================
          HERO SECTION (Identidad Visual Original + Patrón de Hexágonos Instagram)
          ======================================================================== */}
      <section
        id="inicio"
        className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 bg-hex-pattern-strong text-white overflow-hidden overflow-x-hidden pt-24 sm:pt-28 md:pt-32 pb-16 px-4 scroll-mt-20"
      >
        {/* Hexágonos Geométricos de Marca (@tecnolight.srl) */}
        <HexagonCluster
          className="absolute -top-12 -right-12 md:-right-4 w-72 md:w-[420px] h-auto opacity-75 z-0"
        />
        <HexagonCluster
          className="absolute -bottom-16 -left-12 md:-left-4 w-64 md:w-[380px] h-auto opacity-55 rotate-45 z-0"
        />

        {/* Gradiente con transparencia controlada */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950 pointer-events-none z-0" />

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6 flex flex-col items-center w-full">
          {/* Logo Corporativo Blanco Original */}
          <div className="w-full flex justify-center items-center mt-2 sm:mt-4 mb-3 sm:mb-4 px-4">
            <img
              src="/images/logo-tecnolight-white.png"
              alt="TECNO LIGHT S.R.L."
              className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-auto object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
              style={{ width: '100%', maxWidth: '960px', height: 'auto' }}
            />
          </div>

          <h1
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide text-center uppercase max-w-4xl mx-auto mt-1 leading-tight"
            style={FONT_RALEWAY_900}
          >
            TECNO LIGHT <span className="text-[#FF5A1F]">S.R.L.</span>
          </h1>

          {/* Sello Distribuidores y Convertidores Certificados Avery Dennison */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 bg-slate-900/90 hover:bg-slate-900 border border-slate-700/80 hover:border-[#FF5A1F]/70 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-300 mt-2 mb-1 max-w-3xl w-full">
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF5A1F] animate-pulse shrink-0"></span>
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-slate-200 font-bold leading-snug">
                DISTRIBUIDORES Y CONVERTIDORES <span className="text-[#FF5A1F]">CERTIFICADOS:</span>
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 sm:gap-4 bg-white/95 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-md shrink-0">
              <img
                src="/images/avery-dennison-official.svg"
                alt="Avery Dennison"
                className="h-5 sm:h-7.5 w-auto object-contain shrink-0"
              />
              <div className="h-4 sm:h-6 w-px bg-slate-300 shrink-0" />
              <img
                src="/images/trafficjet-xpress-official.svg"
                alt="TrafficJet™ Xpress"
                className="h-4.5 sm:h-6.5 w-auto object-contain shrink-0"
              />
            </div>
          </div>

          <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto font-medium leading-relaxed">
            Fabricación y provisión integral de señalización vial, indumentaria de trabajo, elementos de protección personal (EPP) y alquiler de equipamiento para obra bajo normativas DNV, DPV y estándares IRAM.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <a
              href="#contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FF5A1F] hover:bg-[#e54e18] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-[#FF5A1F]/30"
            >
              <FileText size={18} />
              Solicitar Cotización Formal
            </a>
            <a
              href="mailto:tecnolightsrl@arnet.com.ar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-sm transition-all duration-300 hover:-translate-y-1"
            >
              <Mail size={18} />
              Atención por Correo Electrónico
            </a>
          </div>
        </div>
      </section>

      {/* Separador Hexagonal de Marca */}
      <HexagonDivider />

      {/* ========================================================================
          CLIENTES, ORGANISMOS Y DISTRIBUIDORES
          ======================================================================== */}
      <section className="py-10 sm:py-12 bg-slate-100 bg-hex-pattern border-t border-slate-200 shadow-sm border-b border-black/5">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
            <div className="h-px w-8 bg-slate-300 flex-shrink-0" />
            <span className="text-slate-500 text-[10px] tracking-[0.32em] uppercase font-bold" style={FONT_ROBOTO_500}>
              Clientes, organismos y distribuidores
            </span>
            <div className="h-px w-8 bg-slate-300 flex-shrink-0" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-5 sm:gap-x-10 gap-y-3 sm:gap-y-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              'Vialidad Nacional',
              'DPV Santa Fe',
              'Municipios y Comunas',
              'Constructoras Viales',
              'ASSA',
              'Concesiones Viales',
              'Cooperativas y Consorcios',
            ].map((cli) => (
              <span
                key={cli}
                className="text-slate-900 font-extrabold text-sm sm:text-lg md:text-xl tracking-tighter uppercase"
                style={FONT_RALEWAY_900}
              >
                {cli}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Separador Hexagonal de Marca */}
      <HexagonDivider />

      {/* ========================================================================
          QUIÉNES SOMOS
          ======================================================================== */}
      <section id="nosotros" className="py-20 lg:py-28 bg-white bg-hex-pattern text-slate-900 border-b border-black/5 relative scroll-mt-28 overflow-hidden">
        <div id="quienes-somos" className="absolute top-0 scroll-mt-28" />

        {/* Hexágono Geométrico de fondo */}
        <HexagonCluster
          variant="white"
          className="absolute -top-16 -right-16 w-80 md:w-96 h-auto opacity-20 pointer-events-none z-0"
        />

        <div className="max-w-5xl mx-auto px-5 lg:px-10 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#FF5A1F]" />
            <span className="text-[#FF5A1F] text-[10px] tracking-[0.32em] uppercase font-bold" style={FONT_ROBOTO_500}>
              Trayectoria Industrial
            </span>
            <div className="h-px w-8 bg-[#FF5A1F]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 text-slate-900" style={FONT_RALEWAY_900}>
            QUIÉNES SOMOS
          </h2>
          <div className="space-y-4 text-base md:text-lg text-slate-700 font-medium leading-relaxed max-w-4xl mx-auto">
            <p>
              Con más de 30 años de experiencia, <strong>TECNO LIGHT S.R.L.</strong> es un referente en la fabricación y provisión de soluciones integrales para la infraestructura vial y la seguridad laboral: señalización vertical homologada, indumentaria de trabajo, elementos de protección personal (EPP) y alquiler de dispositivos para obras y eventos.
            </p>
            <p>
              Abastecemos de manera directa a empresas constructoras, entes viales, cooperativas y organismos públicos de todo el país, garantizando estricto apego a pliegos técnicos, asesoramiento especializado y logística ágil en traza y obrador.
            </p>
          </div>

          {/* Lema Oficial del Catálogo Institucional */}
          <div className="mt-10 p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-15">
              <HexagonCluster className="w-48 h-auto" />
            </div>
            <p className="text-sm md:text-base italic text-slate-200 leading-relaxed font-medium">
              &ldquo;Nuestro objetivo es brindar seguridad en todos los servicios, desarrollando nuevos productos, para seguir avanzando, agradeciendo a las empresas que confían en nosotros.&rdquo;
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rotate-45 bg-[#FF5A1F]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF5A1F]" style={FONT_RALEWAY_900}>
                TECNO LIGHT S.R.L.
              </span>
              <span className="w-2 h-2 rotate-45 bg-[#FF5A1F]" />
            </div>
          </div>

          {/* 3 Destacados Institucionales con Íconos Hexagonales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 text-left">
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:border-[#FF5A1F]/50 hover:shadow-md transition-all group">
              <div className="mb-4">
                <HexagonIconBox size={46}>
                  <Wrench size={20} />
                </HexagonIconBox>
              </div>
              <h3 className="text-slate-900 font-extrabold text-base mb-2 leading-snug" style={FONT_RALEWAY_900}>
                Planta Propia en Los Polígonos
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Infraestructura industrial propia con equipamiento de corte, plegado, soldadura y pintura horneada en Santa Fe Capital.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:border-[#FF5A1F]/50 hover:shadow-md transition-all group">
              <div className="mb-4">
                <HexagonIconBox size={46}>
                  <Sparkles size={20} />
                </HexagonIconBox>
              </div>
              <h3 className="text-slate-900 font-extrabold text-base mb-2 leading-snug" style={FONT_RALEWAY_900}>
                Tecnología Avery Dennison
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Convertidor oficial homologado con sistema de impresión TrafficJet™ Xpress de curado UV sobre láminas microprismáticas.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:border-[#FF5A1F]/50 hover:shadow-md transition-all group">
              <div className="mb-4">
                <HexagonIconBox size={46}>
                  <MapPin size={20} />
                </HexagonIconBox>
              </div>
              <h3 className="text-slate-900 font-extrabold text-base mb-2 leading-snug" style={FONT_RALEWAY_900}>
                Sede Central en Santa Fe &amp; Sucursal Rosario
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Atención comercial permanente, distribución regional y entrega directa a pie de obra en Santa Fe, Córdoba, Entre Ríos y Bs As.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Separador Hexagonal de Marca */}
      <HexagonDivider />



      {/* ========================================================================
          BLOQUE B: TECNOLOGÍA & IMPRESIÓN DIGITAL (TrafficJet™ Xpress)
          ======================================================================== */}
      <section id="tecnologia" className="bg-slate-900 bg-hex-pattern border-y border-slate-800 py-16 lg:py-24 px-4 relative scroll-mt-28">
        <div id="planta-tecnologia" className="absolute top-0 scroll-mt-28" />

        {/* Hexágono de fondo sutil */}
        <HexagonCluster
          className="absolute -bottom-16 -right-16 w-80 h-auto opacity-40 z-0"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span
              className="inline-block px-3.5 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold tracking-wider uppercase"
              style={FONT_ROBOTO_500}
            >
              Tecnología de Vanguardia · Certificación Oficial
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight" style={FONT_RALEWAY_900}>
              Impresión Digital Retrorreflectiva: <span className="text-[#FF5A1F]">Avery Dennison TrafficJet™ Xpress</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              Impresión digital directa sobre láminas retrorreflectivas microprismáticas (Grado Ingeniería, Alta Intensidad Prismática y Grado Diamante) con tintas eco-solventes de curado UV. Sobrelaminado protector Anti-Graffiti para remoción de aerosoles y pinturas sin pérdida de reflectividad. Rotulación gráfica de vehículos comerciales, transporte pesado y flotas corporativas.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
                Norma ASTM D4956
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
                Tintas Eco-solventes UV
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">
                Sobrelaminado Anti-Graffiti
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
            {/* Video en Planta con Marco Hexagonal */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-black shadow-2xl aspect-video group">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/images/trafficjet/video_poster.jpg"
                  className="w-full h-full object-cover pointer-events-none"
                >
                  <source src="/videos/trafficjet/video_home.mp4" type="video/mp4" />
                  Tu navegador no soporta la reproducción de video HTML5.
                </video>
                <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/10" />
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">
                    En planta: Impresión TrafficJet™ Xpress
                  </span>
                </div>
              </div>
            </div>

            {/* Credenciales y Tarjetas Técnicas */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="bg-white rounded-2xl p-6 shadow-2xl border border-white/20 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <img src="/images/avery-dennison-official.svg" alt="Avery Dennison" className="h-8 md:h-9 w-auto object-contain" />
                    <div className="h-6 w-px bg-slate-200" />
                    <img src="/images/trafficjet-xpress-official.svg" alt="TrafficJet™ Xpress" className="h-6 md:h-7 w-auto object-contain" />
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 uppercase tracking-wider"
                    style={FONT_ROBOTO_500}
                  >
                    <ShieldCheck size={14} className="text-emerald-600" /> Convertidor Oficial
                  </span>
                </div>
                <div className="pt-4">
                  <p className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1" style={FONT_ROBOTO_500}>
                    Garantía de Retrorreflectividad Homologada (DNV / IRAM 3952)
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                    Impresión digital directa sobre láminas microprismáticas Grado Ingeniería y Grado Diamante con tintas eco-solventes homologadas y curado UV. Durabilidad exterior certificada por Avery Dennison de 10 a 12 años.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-2 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 hover:border-orange-500/40 hover:bg-slate-800/80 transition-all">
                  <div className="flex items-center gap-2.5">
                    <HexagonIconBox size={36}>
                      <ShieldCheck size={16} />
                    </HexagonIconBox>
                    <h3 className="text-sm font-bold text-white tracking-wide" style={FONT_ROBOTO_500}>
                      Láminas Retrorreflectivas
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-normal">
                    Grado Ingeniería, Alta Intensidad Prismática (HIP) y Grado Diamante (DNV / DPV).
                  </p>
                </div>

                <div className="flex flex-col gap-2 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 hover:border-orange-500/40 hover:bg-slate-800/80 transition-all">
                  <div className="flex items-center gap-2.5">
                    <HexagonIconBox size={36}>
                      <Droplet size={16} />
                    </HexagonIconBox>
                    <h3 className="text-sm font-bold text-white tracking-wide" style={FONT_ROBOTO_500}>
                      Tintas Eco-solventes
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-normal">
                    Curado UV de alta penetración, estabilidad de color y uniformidad cromática reglamentaria.
                  </p>
                </div>

                <div className="flex flex-col gap-2 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 hover:border-orange-500/40 hover:bg-slate-800/80 transition-all">
                  <div className="flex items-center gap-2.5">
                    <HexagonIconBox size={36}>
                      <Sparkles size={16} />
                    </HexagonIconBox>
                    <h3 className="text-sm font-bold text-white tracking-wide" style={FONT_ROBOTO_500}>
                      Protección Anti-Graffiti
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-normal">
                    Blindaje repelente a pinturas sintéticas y aerosoles. Permite limpieza sin degradación.
                  </p>
                </div>

                <div className="flex flex-col gap-2 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 hover:border-orange-500/40 hover:bg-slate-800/80 transition-all">
                  <div className="flex items-center gap-2.5">
                    <HexagonIconBox size={36}>
                      <Clock size={16} />
                    </HexagonIconBox>
                    <h3 className="text-sm font-bold text-white tracking-wide" style={FONT_ROBOTO_500}>
                      Garantía de Fábrica
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-normal">
                    Durabilidad a la intemperie de hasta 10 a 12 años certificada por Avery Dennison.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Galería de Proceso con Modal */}
          <div className="border-t border-slate-800 pt-12">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-white text-lg font-bold uppercase tracking-widest" style={FONT_ROBOTO_500}>
                Galería de Proceso
              </h3>
              <div className="h-px bg-slate-800 flex-grow" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galeriaFotos.map((foto, idx) => (
                <div
                  key={idx}
                  onClick={() => setModalFoto(foto)}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-700 cursor-pointer group hover:border-[#FF5A1F]/70 transition-colors"
                >
                  <img
                    alt={foto.alt}
                    src={foto.src}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Separador Hexagonal de Marca */}
      <HexagonDivider />

      {/* ========================================================================
          PROCESO INDUSTRIAL DE FABRICACIÓN & INFRAESTRUCTURA
          ======================================================================== */}
      <section id="proceso" className="py-20 lg:py-28 bg-[#04060A] bg-hex-pattern relative z-10 scroll-mt-28 border-b border-white/5">
        <div id="infraestructura" className="absolute top-0 scroll-mt-28" />
        <div id="obras" className="absolute top-0 scroll-mt-28" />
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#FF5A1F] flex-shrink-0" />
              <span className="text-[#FF5A1F] text-[10px] tracking-[0.32em] uppercase font-bold" style={FONT_ROBOTO_500}>
                Capacidad Operativa e Infraestructura
              </span>
              <div className="h-px w-8 bg-[#FF5A1F] flex-shrink-0" />
            </div>
            <h2 className="text-white leading-none tracking-tight mb-6" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              PROCESO INDUSTRIAL DE FABRICACIÓN
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              Fabricación integral desde diseño hasta rotulado final. Proceso continuo en planta propia con equipamiento especializado y control de calidad en cada etapa.
            </p>
          </div>

          {/* 5 Pasos con Numeración Hexagonal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {[
              {
                step: '01',
                title: 'DISEÑO',
                desc: 'Elaboración de planos técnicos y diagramación conforme a pliegos DNV / DPV y normativas IRAM vigentes.',
              },
              {
                step: '02',
                title: 'CORTE',
                desc: 'Corte de chapas y perfiles metálicos mediante guillotina y pantógrafo industrial de alta precisión.',
              },
              {
                step: '03',
                title: 'SOLDADURA',
                desc: 'Ensamble y soldadura estructural de marcos, refuerzos y pescantes para cartelería de gran porte.',
              },
              {
                step: '04',
                title: 'PINTURA',
                desc: 'Tratamiento anticorrosivo y pintura horneada de alta durabilidad para exposición a la intemperie.',
              },
              {
                step: '05',
                title: 'ROTULADO',
                desc: 'Aplicación de láminas retrorreflectivas Avery Dennison grado Ingeniería, HIP y Diamante mediante sistema TrafficJet™ Xpress.',
              },
            ].map((st) => (
              <div
                key={st.title}
                className="bg-slate-900/60 p-5 sm:p-6 rounded-2xl border border-white/5 hover:border-[#FF5A1F]/50 transition-all duration-300 flex flex-col items-start hover:-translate-y-1 shadow-lg"
              >
                <div className="mb-4">
                  <HexagonIconBox size={44}>
                    <span className="text-xs font-black text-white" style={FONT_RALEWAY_900}>{st.step}</span>
                  </HexagonIconBox>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white mb-2" style={FONT_ROBOTO_500}>
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Estándares Técnicos y Garantía de Fabricación */}
          <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-5 sm:p-8 shadow-xl">
            <h3 className="text-white text-sm font-extrabold uppercase tracking-wider mb-6 pb-3 border-b border-white/10" style={FONT_RALEWAY_900}>
              Estándares Técnicos y Garantía de Producción
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                'Cumplimiento estricto de pliegos técnicos DNV y DPV',
                'Tolerancias de corte y plegado milimétrico en chapa galvanizada',
                'Tratamiento anticorrosivo y pintura horneada de alta resistencia',
                'Calibración colorimétrica bajo norma IRAM 3952',
                'Ensayos de retrorreflectividad diurna y nocturna (ASTM D4956)',
                'Capacidad de respuesta ágil ante urgencias y desvíos viales',
                'Trazabilidad de lote en láminas microprismáticas y sustratos',
                'Garantía oficial de durabilidad de 10 a 12 años a la intemperie',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <HexagonBullet />
                  <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Separador Hexagonal de Marca */}
      <HexagonDivider />

      {/* ========================================================================
          DIVISIÓN VIAL: SEÑALIZACIÓN Y CARTELERÍA
          ======================================================================== */}
      <section id="catalogo" className="py-24 lg:py-32 bg-[#0d0f14] bg-hex-pattern relative overflow-hidden border-b border-white/5 scroll-mt-28">
        {/* Hexágono Decorativo en esquina */}
        <HexagonCluster
          className="absolute -top-16 -right-16 md:-right-8 w-80 md:w-96 h-auto opacity-45 z-0"
        />

        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-10">
          <div className="mb-14">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <HexagonBadge variant="orange">DIVISIÓN VIAL — TECNO LIGHT</HexagonBadge>
                <span className="text-slate-400 text-[10px] tracking-[0.25em] uppercase font-bold" style={FONT_ROBOTO_500}>
                  Producción Industrial Propia
                </span>
              </div>
              <h2 className="text-white leading-none tracking-tight mb-6" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}>
                SEÑALIZACIÓN VIAL Y <span className="text-[#FF5A1F]">CARTELERÍA</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium mb-6">
                Producción propia de señalización vial reglamentaria, preventiva, informativa y transitoria conforme a pliegos DNV y DPV. Fabricamos sobre múltiples sustratos con láminas retrorreflectivas Avery Dennison homologadas. Proveemos a constructoras, municipios, organismos viales y distribuidores del sector.
              </p>
              <div className="flex flex-wrap gap-3 mt-4 mb-8 text-sm text-slate-300">
                <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs font-semibold tracking-wide" style={FONT_ROBOTO_500}>
                  <span className="text-[#FF5A1F]">DNV</span> — Dirección Nacional de Vialidad
                </span>
                <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs font-semibold tracking-wide" style={FONT_ROBOTO_500}>
                  <span className="text-[#FF5A1F]">DPV</span> — Dirección Provincial de Vialidad
                </span>
                <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs font-semibold tracking-wide" style={FONT_ROBOTO_500}>
                  <span className="text-[#FF5A1F]">IRAM 3952</span> — Señalización reglamentaria homologada
                </span>
                <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs font-semibold tracking-wide" style={FONT_ROBOTO_500}>
                  <span className="text-[#FF5A1F]">ASTM D4956</span> — Láminas retrorreflectivas tipo I–XI
                </span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-900/60 border border-white/8 rounded-2xl p-7 hover:border-[#FF5A1F]/30 transition-colors">
              <h3 className="text-white text-sm font-extrabold uppercase tracking-wider mb-5 pb-3 border-b border-white/10" style={FONT_RALEWAY_900}>
                Cartelería Reglamentaria, Preventiva e Informativa
              </h3>
              <ul className="space-y-3">
                {[
                  'Señales reglamentarias, preventivas e informativas bajo pliegos DNV / DPV',
                  'Cartelería transitoria de obra y desvíos viales',
                  'Pórticos, ménsulas pescantes y estructuras de gran porte en chapa galvanizada',
                  'Nomenclatura urbana y vial para municipios y comunas',
                  'Pasarelas peatonales y señalización de infraestructura pública',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <HexagonBullet />
                    <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/60 border border-white/8 rounded-2xl p-7 hover:border-[#FF5A1F]/30 transition-colors">
              <h3 className="text-white text-sm font-extrabold uppercase tracking-wider mb-5 pb-3 border-b border-white/10" style={FONT_RALEWAY_900}>
                Sustratos y Materiales de Producción
              </h3>
              <ul className="space-y-3">
                {[
                  'Fabricación sobre chapa de acero galvanizada y aluminio',
                  'Alto impacto, PVC espumado y acrílico para señalización interior/exterior',
                  'Plástico corrugado para cartelería transitoria de obra',
                  'Estructuras metálicas para instalación en banquina, mástil o pared',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <HexagonBullet />
                    <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/50 border border-slate-800 p-5 rounded-xl">
            <span className="text-slate-300 text-xs sm:text-sm font-medium">
              Consulte modelos específicos de señalética vial reglamentaria, nomencladores y estructuras metálicas.
            </span>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-[#FF5A1F] hover:bg-[#e54e18] text-white text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap shadow-md shadow-[#FF5A1F]/20"
            >
              Ver Catálogo Señalización
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Separador Hexagonal de Marca */}
      <HexagonDivider />

      {/* ========================================================================
          DIVISIÓN SERVICIOS: ALQUILER DE VALLAS Y DISPOSITIVOS DE SEGURIDAD VIAL
          ======================================================================== */}
      <section id="alquiler-vallas" className="py-20 lg:py-28 bg-[#080A0F] bg-hex-pattern-strong border-b border-white/5 scroll-mt-28 relative overflow-hidden">
        {/* Ancla para enlaces antiguos */}
        <div id="servicios" className="absolute top-0 scroll-mt-28" />

        {/* Hexágonos Decorativos en esquina */}
        <HexagonCluster
          className="absolute -top-16 -right-16 md:-right-8 w-80 md:w-96 h-auto opacity-60 z-0"
        />

        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-10">
          <div className="mb-14 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <HexagonBadge variant="orange">DISPOSITIVOS DE SEGURIDAD — TECNO LIGHT</HexagonBadge>
              <span className="text-slate-400 text-[10px] tracking-[0.25em] uppercase font-bold" style={FONT_ROBOTO_500}>
                Flota de Alquiler &amp; Logística en Obra
              </span>
            </div>
            <h2 className="text-white leading-none tracking-tight mb-6" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
              ALQUILER DE VALLAS Y <span className="text-[#FF5A1F]">DISPOSITIVOS DE SEGURIDAD</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              Servicio integral de provisión transitoria, cerramientos modulares, balizamiento nocturno y logística en traza para obras viales, civiles, zanjeos y eventos masivos en Santa Fe, Rosario y toda la región.
            </p>
          </div>

          {/* Catálogo de Equipos en Alquiler (Flota Oficial de 6 Equipos) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {EQUIPOS_ALQUILER_VALLAS.map((eq) => {
              return (
                <div
                  key={eq.id}
                  className="flex flex-col bg-slate-900/85 rounded-2xl border border-slate-800 hover:border-[#FF5A1F]/60 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden shadow-xl group"
                >
                  {/* Encabezado con Icono Hexagonal */}
                  <div className="aspect-[16/10] bg-[#06080D] p-4 flex flex-col justify-between border-b border-slate-800 relative">
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5A1F] bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 px-2 py-0.5 rounded-md">
                        {eq.badge}
                      </span>
                    </div>

                    <div className="flex-1 flex items-center justify-center my-2">
                      <HexagonIconBox size={52}>
                        <AlertTriangle size={24} />
                      </HexagonIconBox>
                    </div>

                    <div className="text-[10.5px] text-slate-400 font-semibold uppercase tracking-wider text-center">
                      {eq.norma}
                    </div>
                  </div>

                  {/* Cuerpo de la Tarjeta */}
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="text-white font-extrabold text-sm sm:text-base leading-snug mb-2" style={FONT_RALEWAY_900}>
                      {eq.nombre}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1">
                      {eq.desc}
                    </p>

                    {/* Especificaciones */}
                    <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-800">
                      {eq.specs.map((sp, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                          <HexagonBullet />
                          <span className="leading-snug">{sp}</span>
                        </div>
                      ))}
                    </div>

                    {/* Botón de Cotización Formal */}
                    <a
                      href="#contacto"
                      className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-[#FF5A1F] text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-xl transition-all duration-200 border border-slate-700 hover:border-[#FF5A1F] mt-auto"
                      style={FONT_ROBOTO_500}
                    >
                      <FileText size={14} />
                      Solicitar Cotización
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 my-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6 bg-[#FF5A1F] flex-shrink-0" />
              <span className="text-[#FF5A1F] text-[10px] tracking-[0.32em] uppercase font-bold" style={FONT_ROBOTO_500}>
                Servicio disponible en Santa Fe y Rosario
              </span>
            </div>
            <h3 className="text-white leading-tight tracking-tight mb-3" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}>
              CATEGORÍAS DE <span className="text-[#FF5A1F]">EQUIPAMIENTO EN ALQUILER</span>
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium mb-8 max-w-3xl">
              Disponibilidad inmediata para frentes de obra civil, intervenciones viales y eventos masivos en Santa Fe, Rosario y la región.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#080A0F]/70 border border-slate-700/60 rounded-xl p-5 hover:border-[#FF5A1F]/40 transition-colors">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-1 h-5 bg-[#FF5A1F] rounded-full shrink-0" />
                  <h4 className="text-white text-xs font-extrabold uppercase tracking-widest leading-snug" style={FONT_ROBOTO_500}>
                    Vallas de Seguridad y Cerramiento
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {[
                    'Vallas metálicas peatonales para canalización de flujos y contención de público.',
                    'Vallas de obra pesadas con elementos reflectivos homologados.',
                    'Pasarelas peatonales metálicas con barandas reglamentarias.',
                  ].map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <HexagonBullet />
                      <span className="text-slate-300 text-sm sm:text-base leading-snug">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#080A0F]/70 border border-slate-700/60 rounded-xl p-5 hover:border-[#FF5A1F]/40 transition-colors">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-1 h-5 bg-[#FF5A1F] rounded-full shrink-0" />
                  <h4 className="text-white text-xs font-extrabold uppercase tracking-widest leading-snug" style={FONT_ROBOTO_500}>
                    Balizamiento y Señalización Luminosa
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {[
                    'Balizas luminosas intermitentes / destellantes autónomas a LED (solar y eléctrica).',
                    'Semáforos viales portátiles para desvíos de tránsito en obra.',
                    'Flechas luminosas direccionales para esquemas de desvío.',
                  ].map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <HexagonBullet />
                      <span className="text-slate-300 text-sm sm:text-base leading-snug">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#080A0F]/70 border border-slate-700/60 rounded-xl p-5 hover:border-[#FF5A1F]/40 transition-colors">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-1 h-5 bg-[#FF5A1F] rounded-full shrink-0" />
                  <h4 className="text-white text-xs font-extrabold uppercase tracking-widest leading-snug" style={FONT_ROBOTO_500}>
                    Dispositivos de Delineación
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {[
                    'Tambores canalizadores viales plásticos retrorreflectivos.',
                    'Conos reflectivos y delineadores flexibles de PVC.',
                    'Chapones de acero reforzados para cruce y tapado de zanjas sobre pavimento.',
                    'Banderilleros mecánicos de aviso continuo para obras con tránsito activo.',
                  ].map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <HexagonBullet />
                      <span className="text-slate-300 text-sm sm:text-base leading-snug">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#080A0F]/70 border border-slate-700/60 rounded-xl p-5 hover:border-[#FF5A1F]/40 transition-colors">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-1 h-5 bg-[#FF5A1F] rounded-full shrink-0" />
                  <h4 className="text-white text-xs font-extrabold uppercase tracking-widest leading-snug" style={FONT_ROBOTO_500}>
                    Logística de Servicio
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {[
                    'Entrega y retiro directo en obrador, frente de avance o locación indicada por el contratista.',
                    'Montaje de esquemas de desvío conforme a normativa DNV / DPV.',
                    'Reposición y mantenimiento preventivo durante el plazo de ejecución del proyecto.',
                  ].map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <HexagonBullet />
                      <span className="text-slate-300 text-sm sm:text-base leading-snug">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-700/50 mb-7" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg">
                <span className="text-slate-200 font-semibold">Modalidad:</span> Alquiler por jornada, semana o plazo de obra. Cotización sin cargo para obras con pliego o por adjudicación directa.
              </p>
              <a
                id="btn-cotizar-vallas"
                href="#contacto"
                className="inline-flex items-center justify-center gap-2.5 bg-[#FF5A1F] hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#FF5A1F]/25 whitespace-nowrap shrink-0"
                style={FONT_ROBOTO_500}
              >
                <FileText size={18} />
                Solicitar Cotización de Alquiler
              </a>
            </div>
          </div>

          {/* Despliegue Operativo y Montaje en Traza */}
          <div id="instalacion" className="scroll-mt-28 mb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#FF5A1F] flex-shrink-0" />
              <span className="text-[#FF5A1F] text-[10px] tracking-[0.32em] uppercase font-bold" style={FONT_ROBOTO_500}>
                Despliegue Operativo &amp; Cuadrillas en Traza
              </span>
              <div className="h-px w-8 bg-[#FF5A1F] flex-shrink-0" />
            </div>
            <h3 className="text-white leading-none tracking-tight mb-8 text-center" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              INSTALACIÓN Y MONTAJE EN RUTA Y CIUDAD
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: 'Montaje de Señalización Vertical en Rutas y Autovías',
                  desc: 'Hincado de postes de acero, hormigonado de bases y fijación antivandálica de cartelería reglamentaria y preventiva en banquinas y zonas de camino.',
                },
                {
                  title: 'Cartelería de Gran Porte y Señalización Aérea',
                  desc: 'Fabricación y montaje de pescantes, ménsulas y pórticos viales con láminas microprismáticas Avery Dennison de alta retrorreflectividad.',
                },
                {
                  title: 'Vallado, Balizamiento y Demarcación Urbana',
                  desc: 'Delimitación de intervenciones en vía pública, zanjeos (servicios públicos ASSA), cerramientos modulares y demarcación con pintura termoplástica reflectiva.',
                },
              ].map((card, idx) => (
                <div key={idx} className="bg-slate-900/50 rounded-xl p-6 border border-white/5 hover:border-[#FF5A1F]/30 transition-colors flex flex-col">
                  <div className="mb-4">
                    <HexagonIconBox size={40}>
                      <Wrench size={18} />
                    </HexagonIconBox>
                  </div>
                  <h4 className="text-sm sm:text-base font-black tracking-wide text-white leading-snug mb-3" style={FONT_RALEWAY_900}>
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed flex-grow">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Credenciales operativas en traza */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-4 px-6 bg-slate-900/40 rounded-xl border border-white/5 text-slate-400 text-xs text-center">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                Cuadrillas propias especializadas en montaje vial
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                Flota para traslado directo a obrador o pie de obra
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                Mantenimiento y reposición durante la ejecución del proyecto
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Separador Hexagonal de Marca */}
      <HexagonDivider />

      {/* ========================================================================
          DIVISIÓN EPP: SEGURIDAD INDUSTRIAL & PROTECCIÓN PERSONAL
          Catálogo oficial de protección industrial y personal (Botines, chalecos, arneses, cascos, etc.)
          ======================================================================== */}
      <section id="seguridad" className="py-24 lg:py-32 bg-[#0B0F17] bg-hex-pattern-strong relative overflow-hidden border-b border-white/10 scroll-mt-28">
        <div id="seguridad-industrial" className="absolute top-0 scroll-mt-28" />

        {/* Hexágono Geométrico Decorativo de Marca */}
        <HexagonCluster
          className="absolute -top-16 -right-16 md:-right-6 w-80 md:w-[440px] h-auto opacity-75 z-0"
        />
        <HexagonCluster
          className="absolute -bottom-20 -left-16 md:-left-6 w-72 md:w-[400px] h-auto opacity-55 rotate-90 z-0"
        />

        <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
          <div className="mb-12 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <HexagonBadge variant="orange">SEGURIDAD INDUSTRIAL & EPP</HexagonBadge>
              <span className="text-slate-400 text-[10px] tracking-[0.25em] uppercase font-bold" style={FONT_ROBOTO_500}>
                Protección Homologada &amp; Catálogo EPP
              </span>
            </div>
            <h2 className="text-white leading-none tracking-tight mb-6" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              ELEMENTOS DE PROTECCIÓN PERSONAL <span className="text-[#FF5A1F]">E INDUMENTARIA</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium mb-8">
              Comercialización de indumentaria de trabajo homologada y equipamiento de protección personal (EPP) para obras civiles, viales e industriales. Provisión por unidad o por volumen con entrega en obra o centro logístico asignado.
            </p>

            {/* Buscador Interactivo de EPP */}
            <div className="relative max-w-lg">
              <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar botines, chalecos, fajas, arneses, camperas, cascos..."
                value={busquedaEpp}
                onChange={(e) => setBusquedaEpp(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F] transition-all"
              />
              {busquedaEpp && (
                <button
                  onClick={() => setBusquedaEpp('')}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white p-1"
                  title="Limpiar búsqueda"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Filtros por Categoría de Seguridad Industrial */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIAS_EPP.map((cat) => {
              const IconComp = cat.icon;
              const isActive = categoriaEpp === cat.id;
              const count =
                cat.id === 'todas'
                  ? PRODUCTOS_EPP.length
                  : PRODUCTOS_EPP.filter((p) => p.categoria === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaEpp(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FF5A1F] text-white shadow-lg shadow-[#FF5A1F]/30 scale-[1.02]'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                  style={FONT_ROBOTO_500}
                >
                  <IconComp size={15} className={isActive ? 'text-white' : 'text-[#FF5A1F]'} />
                  <span>{cat.label}</span>
                  <span
                    className={`ml-1 text-[11px] px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-black/25 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grilla de Productos EPP */}
          {productosEppFiltrados.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto mb-14">
              <p className="text-slate-300 text-base mb-4">No se encontraron productos coincidentes en el catálogo de EPP.</p>
              <button
                onClick={() => {
                  setBusquedaEpp('');
                  setCategoriaEpp('todas');
                }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded-lg transition-colors"
              >
                Ver todos los EPP
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
              {productosEppFiltrados.map((prod) => {
                return (
                  <div
                    key={prod.id}
                    className="flex flex-col bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-[#FF5A1F]/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden shadow-xl group"
                  >
                    {/* Header de la tarjeta con Isotipo Hexagonal */}
                    <div className="relative aspect-[16/10] bg-[#070A0F] p-4 flex flex-col justify-between overflow-hidden border-b border-slate-800">
                      <div className="flex items-center justify-between gap-2 z-10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5A1F] bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 px-2.5 py-1 rounded-md">
                          {prod.norma}
                        </span>
                      </div>

                      {/* Hexágono Visual Centrado */}
                      <div className="flex-1 flex items-center justify-center my-2">
                        <HexagonIconBox size={56}>
                          <ShieldCheck size={26} />
                        </HexagonIconBox>
                      </div>

                      <div className="z-10 text-[11px] text-slate-400 font-semibold uppercase tracking-wider text-center">
                        Tecno Light S.R.L. · EPP
                      </div>
                    </div>

                    {/* Cuerpo de la Tarjeta */}
                    <div className="flex flex-col flex-1 p-5">
                      <h3 className="text-white font-extrabold text-base leading-snug mb-2" style={FONT_RALEWAY_900}>
                        {prod.nombre}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1">
                        {prod.desc}
                      </p>

                      {/* Especificaciones Técnicas con viñetas hexagonales */}
                      <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-800">
                        {prod.specs.map((sp, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11.5px] text-slate-300">
                            <HexagonBullet />
                            <span className="leading-snug">{sp}</span>
                          </div>
                        ))}
                      </div>

                      {/* Botón de Cotización Formal */}
                      <a
                        href="#contacto"
                        className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-[#FF5A1F] text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-200 border border-slate-700 hover:border-[#FF5A1F] mt-auto"
                        style={FONT_ROBOTO_500}
                      >
                        <FileText size={14} />
                        Solicitar Cotización
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Cierre División EPP */}
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-white font-extrabold text-base sm:text-lg" style={FONT_RALEWAY_900}>
                ¿Necesita provisión de EPP e indumentaria para su personal?
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm">
                Cotizaciones formales por pliego, por lote o por proveedor único. Entrega directa en obrador o depósito asignado.
              </p>
            </div>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-[#FF5A1F] hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl transition-all uppercase tracking-wider text-xs shadow-lg shadow-[#FF5A1F]/25 shrink-0"
              style={FONT_ROBOTO_500}
            >
              <FileText size={16} />
              Solicitar Cotización Formal
            </a>
          </div>
        </div>
      </section>

      {/* Separador Hexagonal de Marca */}
      <HexagonDivider />

      {/* ========================================================================
          CANALES DE CONTACTO
          ======================================================================== */}
      <section id="contacto" className="py-24 lg:py-32 bg-slate-50 bg-hex-pattern border-t border-slate-200 shadow-sm text-slate-900 scroll-mt-28 relative overflow-hidden">
        {/* Hexágono Geométrico de fondo */}
        <HexagonCluster
          variant="white"
          className="absolute -top-16 -right-16 w-80 md:w-96 h-auto opacity-15 pointer-events-none z-0"
        />

        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-10">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#FF5A1F] flex-shrink-0" />
              <span className="text-[#FF5A1F] text-[10px] tracking-[0.32em] uppercase font-bold" style={FONT_ROBOTO_500}>
                Contacto
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
              <h2 className="text-black leading-none tracking-tight" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
                CANALES DE<br />
                <span style={{ color: '#F2650E' }}>CONTACTO</span>
              </h2>
              <p className="text-black/55 text-sm max-w-sm leading-relaxed font-medium">
                Atención comercial de Lunes a Viernes, 8:00 a 17:00 hs. Para pliegos y licitaciones, escribinos por email.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto gap-5 sm:gap-6 mb-10">
            {/* Sede Santa Fe */}
            <div className="flex flex-col gap-4 bg-white border border-slate-200/80 shadow-sm rounded-xl p-5 sm:p-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Suipacha+3243,+Santa+Fe,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center shrink-0 hover:text-orange-500 cursor-pointer transition-colors text-[#333]"
              >
                <HexagonIconBox size={42}>
                  <MapPin size={18} />
                </HexagonIconBox>
              </a>
              <div className="flex flex-col h-full">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#FF5A1F] mb-1" style={FONT_ROBOTO_500}>
                  Sede Comercial &amp; Casa Central
                </div>
                <div className="text-black font-bold text-sm sm:text-base mb-2">Santa Fe Capital</div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Suipacha+3243,+Santa+Fe,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/70 text-xs sm:text-sm mb-3 hover:text-orange-500 cursor-pointer transition-colors block"
                >
                  Suipacha 3243, Santa Fe Capital
                </a>
                <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-slate-100">
                  <a
                    href="tel:03424553582"
                    className="text-black font-semibold text-xs sm:text-sm hover:text-[#FF5A1F] transition-colors flex items-center gap-2"
                  >
                    <Phone size={14} className="shrink-0" /> (0342) 455-3582
                  </a>
                  <a
                    href="mailto:tecnolightsrl@arnet.com.ar"
                    className="text-black font-semibold text-xs sm:text-sm hover:text-[#FF5A1F] transition-colors flex items-center gap-2 break-all sm:break-normal"
                  >
                    <Mail size={14} className="shrink-0" /> <span>tecnolightsrl@arnet.com.ar</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Sede Rosario */}
            <div className="flex flex-col gap-4 bg-white border border-slate-200/80 shadow-sm rounded-xl p-5 sm:p-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Gutenberg+1122,+Rosario,+Santa+Fe,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center shrink-0 hover:text-orange-500 cursor-pointer transition-colors text-[#333]"
              >
                <HexagonIconBox size={42}>
                  <MapPin size={18} />
                </HexagonIconBox>
              </a>
              <div className="flex flex-col h-full">
                <div className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1" style={FONT_ROBOTO_500}>
                  Sucursal Rosario
                </div>
                <div className="text-black font-bold text-sm sm:text-base mb-2">Rosario</div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Gutenberg+1122,+Rosario,+Santa+Fe,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/70 text-xs sm:text-sm mb-3 hover:text-orange-500 cursor-pointer transition-colors block"
                >
                  Gutenberg 1122, Rosario, Santa Fe
                </a>
                <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-slate-100">
                  <a
                    href="tel:03414388444"
                    className="text-black font-semibold text-xs sm:text-sm hover:text-[#FF5A1F] transition-colors flex items-center gap-2"
                  >
                    <Phone size={14} className="shrink-0" /> (0341) 438-8444
                  </a>
                  <a
                    href="mailto:tecnolightrsr@arnet.com.ar"
                    className="text-black font-semibold text-xs sm:text-sm hover:text-[#FF5A1F] transition-colors flex items-center gap-2 break-all sm:break-normal"
                  >
                    <Mail size={14} className="shrink-0" /> <span>tecnolightrsr@arnet.com.ar</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Planta Los Polígonos */}
            <div className="flex flex-col gap-4 bg-white border border-slate-200/80 shadow-sm rounded-xl p-5 sm:p-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Parque+Industrial+Los+Poligonos,+Santa+Fe,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center shrink-0 hover:text-orange-500 cursor-pointer transition-colors text-[#333]"
              >
                <HexagonIconBox size={42}>
                  <MapPin size={18} />
                </HexagonIconBox>
              </a>
              <div className="flex flex-col h-full">
                <div className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1" style={FONT_ROBOTO_500}>
                  PLANTA FABRIL E INDUSTRIAL
                </div>
                <div className="text-black font-bold text-sm sm:text-base mb-2">Los Polígonos (Santa Fe)</div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Parque+Industrial+Los+Poligonos,+Santa+Fe,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/70 text-xs sm:text-sm mb-3 hover:text-orange-500 cursor-pointer transition-colors block"
                >
                  Área Industrial Los Polígonos, Santa Fe
                </a>
                <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-slate-100">
                  <a
                    href="tel:03424553582"
                    className="text-black font-semibold text-xs sm:text-sm hover:text-[#FF5A1F] transition-colors flex items-center gap-2"
                  >
                    <Phone size={14} className="shrink-0" /> (0342) 455-3582
                  </a>
                  <a
                    href="mailto:tecnolightsrl@arnet.com.ar"
                    className="text-black font-semibold text-xs sm:text-sm hover:text-[#FF5A1F] transition-colors flex items-center gap-2 break-all sm:break-normal"
                  >
                    <Mail size={14} className="shrink-0" /> <span>tecnolightsrl@arnet.com.ar</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Zona de Cobertura */}
          <div className="border border-slate-200/80 shadow-sm rounded-xl p-5 bg-white max-w-6xl mx-auto">
            <div className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-3" style={FONT_ROBOTO_500}>
              Zona de cobertura
            </div>
            <div className="flex flex-wrap gap-2">
              {['Santa Fe', 'Rosario', 'Gran Rosario', 'Córdoba', 'Entre Ríos', 'Buenos Aires', '+6 provincias'].map((prov) => (
                <span
                  key={prov}
                  className="bg-slate-50 border border-slate-200/80 text-black/80 font-medium text-xs px-3 py-1 rounded-md"
                >
                  {prov}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          MODAL DE ZOOM PARA GALERÍA DE PROCESO
          ======================================================================== */}
      <AnimatePresence>
        {modalFoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalFoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <button
                onClick={() => setModalFoto(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors"
                aria-label="Cerrar vista previa"
              >
                <X size={20} />
              </button>
              <img
                src={modalFoto.src}
                alt={modalFoto.alt}
                className="w-full max-h-[75vh] object-contain bg-black"
              />
              <div className="p-4 bg-slate-900 border-t border-white/10 text-center">
                <p className="text-white text-sm font-medium">{modalFoto.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
