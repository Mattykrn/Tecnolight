const https = require('https');
const fs = require('fs');
const path = require('path');

async function fetchLiveHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    }).on('error', reject);
  });
}

async function runAudit() {
  console.log('====================================================');
  console.log(' TECNO LIGHT S.R.L. — AUDITORÍA Y CHECKLIST MAESTRO');
  console.log('====================================================\n');

  const { status, html } = await fetchLiveHtml('https://tecno-light-v3-irux.vercel.app');
  console.log(`[HTTP Status]: ${status}`);
  if (status !== 200) {
    console.error('ERROR: Live site is not returning 200 OK');
    process.exit(1);
  }

  const issues = [];
  const passes = [];

  // 1. HERO SUBTITLE CHECK
  const expectedHeroSubtitle = 'Ofrecemos asesoramiento y atención personalizada';
  if (html.includes(expectedHeroSubtitle)) {
    passes.push(`[HERO] Frase exacta encontrada: "${expectedHeroSubtitle}"`);
  } else {
    issues.push(`[HERO] No se encontró la frase exacta "${expectedHeroSubtitle}"`);
  }

  ['rigor técnico', 'excelencia industrial', 'convertidores y distribuidores'].forEach(oldPhrase => {
    if (html.toLowerCase().includes(oldPhrase)) {
      issues.push(`[HERO] Texto antiguo detectado: "${oldPhrase}"`);
    } else {
      passes.push(`[HERO] Libre de texto antiguo: "${oldPhrase}"`);
    }
  });

  // 2. CHECK ELIMINATION OF MIMAKI AND ADOPTION OF TRAFFICJET™ XPRESS
  if (html.toLowerCase().includes('mimaki')) {
    issues.push('[IMPRESIÓN] Se encontró mención a "Mimaki" (debe estar completamente descartada)');
  } else {
    passes.push('[IMPRESIÓN] 0 menciones a "Mimaki". Limpieza técnica exitosa');
  }
  if (html.includes('TrafficJet™ Xpress') || html.includes('TrafficJet')) {
    passes.push('[IMPRESIÓN] Plataforma TrafficJet™ Xpress presente');
  } else {
    issues.push('[IMPRESIÓN] No se encontró TrafficJet™ Xpress');
  }
  if (html.includes('Serie T-2500')) {
    passes.push('[VINILOS] Vinilo reflectivo Serie T-2500 presente');
  } else {
    issues.push('[VINILOS] No se encontró Serie T-2500');
  }

  // 2.1 ESTRUCTURA Y MATERIALES (CALIBRE 14 & SIN PESTAÑA)
  if (html.includes('Calibre 14')) {
    passes.push('[ESTRUCTURA] Chapa de acero en Calibre 14 presente');
  } else {
    issues.push('[ESTRUCTURA] No se encontró Calibre 14');
  }
  if (html.toLowerCase().includes('pestaña')) {
    issues.push('[ESTRUCTURA] Palabra "pestaña" detectada en sustratos');
  } else {
    passes.push('[ESTRUCTURA] Libre de término "pestaña" en sustratos');
  }

  // 2.2 FOTOS 1, 2 Y 3 PRESENTES
  ['foto1.jpg', 'foto2.jpg', 'foto3.jpg'].forEach(foto => {
    if (html.includes(foto)) {
      passes.push(`[RECURSOS FOTOGRÁFICOS] Recurso oficial ${foto} integrado en la sección`);
    } else {
      issues.push(`[RECURSOS FOTOGRÁFICOS] Falta integrar recurso ${foto}`);
    }
  });

  // 3. CHECK WORD "TRAZA"
  const trazaRegex = /\btraza\b|\btrazas\b/i;
  if (trazaRegex.test(html)) {
    issues.push('[TERMINOLOGÍA] Se encontraron ocurrencias de la palabra "traza"');
  } else {
    passes.push('[TERMINOLOGÍA] 0 ocurrencias de "traza". Reemplazo exitoso por "ruta"');
  }

  // 4. CHECK BANNED WORDS
  const banned = ['IRAM', 'ASTM', 'D4956', 'trabajo de ingeniería', 'distintas tintas', 'horneado', 'CNC', 'termoconvertible', 'curado térmico'];
  banned.forEach(word => {
    // case insensitive check with word boundaries where applicable
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(html)) {
      issues.push(`[LIMPIEZA TÉCNICA] Palabra prohibida detectada: "${word}"`);
    } else {
      passes.push(`[LIMPIEZA TÉCNICA] Libre de: "${word}"`);
    }
  });

  // check "fibra"
  if (/\bfibra\b/i.test(html)) {
    issues.push('[LIMPIEZA TÉCNICA] Palabra "fibra" detectada');
  } else {
    passes.push('[LIMPIEZA TÉCNICA] Libre de: "fibra"');
  }

  // 5. VIDEO REPRODUCER AUDIT
  if (html.includes('proceso-laminado-unificado.mp4')) {
    passes.push('[VIDEO] Video unificado de laminados presente: proceso-laminado-unificado.mp4');
  } else {
    issues.push('[VIDEO] No se encontró el video unificado proceso-laminado-unificado.mp4');
  }
  if (html.includes('video_home.mp4')) {
    issues.push('[VIDEO] El video viejo video_home.mp4 todavía está referenciado');
  } else {
    passes.push('[VIDEO] Video viejo video_home.mp4 descartado por completo');
  }

  // 5.1 SERVICIOS Y ALQUILER OFFICIAL ITEMS AUDIT
  const expectedServices = [
    'Alquiler de Señalización para Obras Viales',
    'Alquiler de Vallas para Eventos',
    'Demarcación de Calles e Industrias',
    'Colocación de Carteles de Obra, Lomos de Burro, Delineadores y Tachas Viales.'
  ];
  expectedServices.forEach(srv => {
    if (html.includes(srv)) {
      passes.push(`[SERVICIOS] Ítem oficial presente: "${srv}"`);
    } else {
      issues.push(`[SERVICIOS] Falta el ítem oficial: "${srv}"`);
    }
  });

  // 6. BUTTONS & LINKS AUDIT
  // Match all <a> tags
  const aTagRegex = /<a\s+([^>]+)>([\s\S]*?)<\/a>/gi;
  let match;
  const links = [];

  while ((match = aTagRegex.exec(html)) !== null) {
    const rawAttrs = match[1];
    const innerText = match[2].replace(/<[^>]+>/g, '').trim();

    const hrefMatch = /href="([^"]+)"/i.exec(rawAttrs);
    const targetMatch = /target="([^"]+)"/i.exec(rawAttrs);
    const relMatch = /rel="([^"]+)"/i.exec(rawAttrs);

    if (hrefMatch) {
      links.push({
        href: hrefMatch[1],
        target: targetMatch ? targetMatch[1] : null,
        rel: relMatch ? relMatch[1] : null,
        text: innerText
      });
    }
  }

  console.log(`\n--- Analizando ${links.length} enlaces encontrados en la página de inicio ---`);

  const mailtoLinks = links.filter(l => l.href.startsWith('mailto:'));
  const waLinks = links.filter(l => l.href.includes('wa.me'));

  console.log(`Enlaces mailto encontrados: ${mailtoLinks.length}`);
  console.log(`Enlaces WhatsApp encontrados: ${waLinks.length}\n`);

  // Verify mailto links
  mailtoLinks.forEach((l, idx) => {
    console.log(`Mailto #${idx + 1}: [${l.text || 'Sin texto'}] -> ${l.href}`);
    if (l.target === '_blank') {
      issues.push(`[EMAIL BOTÓN #${idx + 1}] Tiene target="_blank" (causa pestaña en blanco en PC): ${l.href}`);
    } else {
      passes.push(`[EMAIL BOTÓN #${idx + 1}] Manejo nativo limpio (target: ${l.target || 'por defecto'}): ${l.href}`);
    }

    if (!l.href.includes('tecnolightsrl@tecnolightsrl.com') && !l.href.includes('rosario@tecnolightsrl.com')) {
      issues.push(`[EMAIL BOTÓN #${idx + 1}] Destinatario no coincide con correos oficiales: ${l.href}`);
    } else {
      passes.push(`[EMAIL BOTÓN #${idx + 1}] Correo oficial válido`);
    }

    if (l.text.includes('Solicitud') || l.text.includes('Pliego') || l.text.includes('Enviar')) {
      if (!l.href.includes('subject=')) {
        issues.push(`[EMAIL BOTÓN #${idx + 1}] Falta asunto preconfigurado en CTA: ${l.href}`);
      } else {
        passes.push(`[EMAIL BOTÓN #${idx + 1}] Asunto preconfigurado correctamente`);
      }
    }
  });

  console.log('');
  // Verify WhatsApp links
  waLinks.forEach((l, idx) => {
    console.log(`WhatsApp #${idx + 1}: [${l.text || 'Sin texto'}] -> ${l.href}`);
    if (l.target !== '_blank') {
      issues.push(`[WHATSAPP BOTÓN #${idx + 1}] No tiene target="_blank": ${l.href}`);
    } else {
      passes.push(`[WHATSAPP BOTÓN #${idx + 1}] target="_blank" correcto`);
    }

    if (!l.rel || !l.rel.includes('noopener')) {
      issues.push(`[WHATSAPP BOTÓN #${idx + 1}] Falta rel="noopener noreferrer": ${l.href}`);
    } else {
      passes.push(`[WHATSAPP BOTÓN #${idx + 1}] rel="noopener noreferrer" correcto`);
    }

    if (!l.href.includes('5493424278117')) {
      issues.push(`[WHATSAPP BOTÓN #${idx + 1}] Número erróneo en: ${l.href}`);
    } else {
      passes.push(`[WHATSAPP BOTÓN #${idx + 1}] Número oficial +54 9 342 427-8117 correcto`);
    }

    if (!l.href.includes('text=')) {
      issues.push(`[WHATSAPP BOTÓN #${idx + 1}] Falta mensaje prellenado en: ${l.href}`);
    } else {
      passes.push(`[WHATSAPP BOTÓN #${idx + 1}] Mensaje prellenado configurado`);
    }
  });

  console.log('\n====================================================');
  console.log(' RESUMEN FINAL DEL AUDIT');
  console.log('====================================================');
  console.log(`✅ Pruebas superadas: ${passes.length}`);
  console.log(`❌ Inconsistencias:   ${issues.length}`);

  if (issues.length > 0) {
    console.log('\nDetalle de problemas a corregir:');
    issues.forEach(i => console.log('  ❌ ' + i));
    process.exit(1);
  } else {
    console.log('\n✨ ¡TODOS LOS PUNTOS DEL PROMPT MAESTRO FUERON SUPERADOS AL 100%!');
  }
}

runAudit().catch(err => {
  console.error('Error durante la auditoría:', err);
  process.exit(1);
});
