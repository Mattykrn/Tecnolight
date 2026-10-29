import fs from 'fs';
import path from 'path';

const ASSETS_TO_SYNC = [
  '/images/logo-tecnolight-white.png',
  '/images/contacto/contact-hero.jpg',
  '/images/nuevas/historia_general.jpg',
  '/videos/proceso/proceso-laminado-poster.jpg',
  '/videos/proceso/proceso-laminado-unificado.mp4',
  '/images/trafficjet/gallery/proceso-1-impresion.jpg',
  '/images/carteleria/4f20f2f2-398d-44ca-9061-e3ce6b69e98b.jpg',
  '/images/trafficjet/impresion-microprismatica-detalle.jpg',
  '/images/carteleria/efed8a3c-6e4d-4d5f-9e20-20d38467c75a.jpg',
  '/images/instagram-seleccionadas/nosotros-1b.jpg',
  '/images/instagram-seleccionadas/nosotros-3.jpg',
  '/images/og-share.jpg',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png'
];

export default async function handler(req, res) {
  const results = [];
  const baseRemoteUrl = 'https://tecno-light-v3-irux.vercel.app';
  const publicDir = path.join(process.cwd(), 'public');

  for (const assetPath of ASSETS_TO_SYNC) {
    const localFilePath = path.join(publicDir, assetPath);
    const localFileDir = path.dirname(localFilePath);

    try {
      if (!fs.existsSync(localFileDir)) {
        fs.mkdirSync(localFileDir, { recursive: true });
      }

      const remoteUrl = `${baseRemoteUrl}${assetPath}`;
      const response = await fetch(remoteUrl);

      if (!response.ok) {
        results.push({ path: assetPath, status: 'failed', code: response.status });
        continue;
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(localFilePath, buffer);

      results.push({ path: assetPath, status: 'success', bytes: buffer.length });
    } catch (err) {
      results.push({ path: assetPath, status: 'error', error: err.message });
    }
  }

  res.status(200).json({ success: true, results });
}
