const https = require('https');

https.get('https://tecno-light-v3-irux.vercel.app', (res) => {
  console.log('STATUS:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTML length:', data.length);
    console.log('Has asesoramiento?:', data.includes('Ofrecemos asesoramiento y atención personalizada'));
    console.log('Has Mimaki (should be false)?:', data.toLowerCase().includes('mimaki'));
    console.log('Has TrafficJet (should be true)?:', data.includes('TrafficJet'));
    console.log('Has Calibre 14 (should be true)?:', data.includes('Calibre 14'));
    console.log('Has Serie T-2500 (should be true)?:', data.includes('Serie T-2500'));
    console.log('Has Foto 1 (should be true)?:', data.includes('foto1.jpg'));
    console.log('Has Foto 2 (should be true)?:', data.includes('foto2.jpg'));
    console.log('Has Foto 3 (should be true)?:', data.includes('foto3.jpg'));
    console.log('Has traza (should be false)?:', data.includes('traza'));
    console.log('Has pestaña (should be false)?:', data.includes('pestaña'));
    console.log('Has Convertidores (should be false)?:', data.toLowerCase().includes('convertidores'));
  });
}).on('error', (e) => {
  console.error('Fetch error:', e.message);
});
