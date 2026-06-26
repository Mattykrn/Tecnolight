const fs = require('fs');
const path = require('path');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e"/>
      <stop offset="100%" style="stop-color:#0f3460"/>
    </linearGradient>
    <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#833AB4"/>
      <stop offset="50%" style="stop-color:#E1306C"/>
      <stop offset="100%" style="stop-color:#F77737"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFB703"/>
      <stop offset="100%" style="stop-color:#e0a300"/>
    </linearGradient>
    <clipPath id="circle">
      <circle cx="150" cy="150" r="140"/>
    </clipPath>
  </defs>
  <!-- Background -->
  <rect width="300" height="300" rx="150" fill="url(#bg)"/>
  <!-- Ring -->
  <circle cx="150" cy="150" r="145" fill="none" stroke="url(#ring)" stroke-width="6"/>
  <!-- Shield icon -->
  <g transform="translate(75,60)">
    <path d="M75 0C75 0 150 30 150 90c0 90-75 135-75 135S0 180 0 90C0 30 75 0 75 0Z" fill="url(#accent)" opacity="0.15"/>
    <path d="M75 10c0 10-8 18-18 18H48c-10 0-18 8-18 18v44c0 55 45 82 45 82s45-27 45-82V46c0-10-8-18-18-18h-9c-10 0-18-8-18-18Z" fill="none" stroke="url(#accent)" stroke-width="3"/>
    <path d="M60 85l10 10 20-20" fill="none" stroke="url(#accent)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <!-- TL text -->
  <text x="150" y="220" font-family="Arial,sans-serif" font-size="28" font-weight="800" fill="#FFB703" text-anchor="middle" letter-spacing="3">TL</text>
  <text x="150" y="248" font-family="Arial,sans-serif" font-size="11" fill="#666680" text-anchor="middle" letter-spacing="2">TECNOLIGHT</text>
</svg>`;

const outPath = path.join(__dirname, '..', 'frontend', 'public', 'images', 'instagram', 'profile-avatar.jpg');
fs.writeFileSync(outPath, svg);
console.log('✅ Profile avatar generated:', outPath);
