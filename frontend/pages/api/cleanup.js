import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'pages', 'sitemap.xml.jsx');
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return res.status(200).json({ removed: true });
  }
  return res.status(200).json({ removed: false });
}
