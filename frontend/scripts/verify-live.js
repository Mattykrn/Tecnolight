const https = require('https');

https.get('https://tecno-light-v3-irux.vercel.app', (res) => {
  console.log('STATUS:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTML length:', data.length);
    console.log('Has asesoramiento?:', data.includes('Ofrecemos asesoramiento y atención personalizada'));
    console.log('Has Mimaki?:', data.includes('Mimaki UCJV300-160'));
    console.log('Has traza?:', data.includes('traza'));
  });
}).on('error', (e) => {
  console.error('Fetch error:', e.message);
});
