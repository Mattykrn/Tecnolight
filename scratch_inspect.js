const fs = require('fs');
const path = require('path');

const dir = '/tmp/vercel_chunks';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const hasTrafficJet = content.includes('TrafficJet');
  const hasNosotros = content.includes('QUIÉNES SOMOS') || content.includes('quienes-somos') || content.includes('QUIENES SOMOS');
  const hasContact = content.includes('ventas@tecnolight.com.ar');
  const hasSitemap = content.includes('sitemap');
  const hasLayout = content.includes('header') && content.includes('footer');

  if (hasTrafficJet || hasNosotros || hasContact || hasSitemap) {
    console.log(`File: ${f} (${content.length} bytes) - TrafficJet:${hasTrafficJet}, Nosotros:${hasNosotros}, Contact:${hasContact}, Sitemap:${hasSitemap}`);
  }
}
