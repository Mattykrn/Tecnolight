const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const crcPayload = Buffer.concat([typeBuf, data]);
  const crcVal = crc32(crcPayload);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crcVal, 0);

  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function encodePNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = createChunk('IHDR', ihdr);

  // Scanlines with filter byte 0 (None)
  const rawScanlines = Buffer.alloc(height * (1 + width * 4));
  let rawIdx = 0;
  for (let y = 0; y < height; y++) {
    rawScanlines[rawIdx++] = 0; // filter byte
    const rowOffset = y * width * 4;
    for (let x = 0; x < width * 4; x++) {
      rawScanlines[rawIdx++] = rgbaBuffer[rowOffset + x];
    }
  }

  const compressed = zlib.deflateSync(rawScanlines, { level: 9 });
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function renderEmblem(width, height, options = {}) {
  const {
    bgDark = false, // if true, add dark circular background
    orange = [236, 111, 54], // #EC6F36
    black = [10, 10, 10], // #0A0A0A
    darkBg = [11, 17, 30], // #0B111E
  } = options;

  const rgba = Buffer.alloc(width * height * 4);
  const SAMPLES = 4; // 4x4 supersampling = 16 samples per pixel

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let rSum = 0, gSum = 0, bSum = 0, aSum = 0;

      for (let sy = 0; sy < SAMPLES; sy++) {
        for (let sx = 0; sx < SAMPLES; sx++) {
          // Normalized coordinate in [-1, 1]
          const subX = (x + (sx + 0.5) / SAMPLES) / width * 2 - 1;
          const subY = (y + (sy + 0.5) / SAMPLES) / height * 2 - 1;

          const distCenter = Math.sqrt(subX * subX + subY * subY);

          // Outer circle
          const rCircle = bgDark ? 0.94 : 0.96;

          if (distCenter <= rCircle) {
            // Check if inside arrow
            const inShaft = subX >= -rCircle && subX <= 0.22 && Math.abs(subY) <= 0.29;
            const inHead = subX >= 0.22 && subX <= 0.78 && Math.abs(subY) <= 0.56 * (1 - (subX - 0.22) / (0.78 - 0.22));

            if (inShaft || inHead) {
              rSum += black[0];
              gSum += black[1];
              bSum += black[2];
              aSum += 255;
            } else {
              rSum += orange[0];
              gSum += orange[1];
              bSum += orange[2];
              aSum += 255;
            }
          } else if (bgDark && distCenter <= 1.0) {
            rSum += darkBg[0];
            gSum += darkBg[1];
            bSum += darkBg[2];
            aSum += 255;
          } else {
            // Transparent
            aSum += 0;
          }
        }
      }

      const totalSamples = SAMPLES * SAMPLES;
      const alpha = Math.round(aSum / totalSamples);
      const pixelIdx = (y * width + x) * 4;

      if (alpha === 0) {
        rgba[pixelIdx] = 0;
        rgba[pixelIdx + 1] = 0;
        rgba[pixelIdx + 2] = 0;
        rgba[pixelIdx + 3] = 0;
      } else {
        rgba[pixelIdx] = Math.round(rSum / totalSamples);
        rgba[pixelIdx + 1] = Math.round(gSum / totalSamples);
        rgba[pixelIdx + 2] = Math.round(bSum / totalSamples);
        rgba[pixelIdx + 3] = alpha;
      }
    }
  }

  return encodePNG(width, height, rgba);
}

// Build multi-size ICO file containing 16x16, 32x32 and 48x48 PNGs
function createIco(images) {
  // Header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(images.length, 4); // count

  let offset = 6 + images.length * 16;
  const dirEntries = [];
  const buffers = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry[0] = img.width >= 256 ? 0 : img.width;
    entry[1] = img.height >= 256 ? 0 : img.height;
    entry[2] = 0; // color count
    entry[3] = 0; // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.data.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset

    dirEntries.push(entry);
    buffers.push(img.data);
    offset += img.data.length;
  }

  return Buffer.concat([header, ...dirEntries, ...buffers]);
}

const publicDir = path.join(__dirname, '..', 'public');

console.log('Generating favicon icons...');

// 1. icon-192x192.png
const png192 = renderEmblem(192, 192);
fs.writeFileSync(path.join(publicDir, 'icon-192x192.png'), png192);
console.log('✓ Created icon-192x192.png (Black arrow on orange circle)');

// 2. icon-512x512.png
const png512 = renderEmblem(512, 512);
fs.writeFileSync(path.join(publicDir, 'icon-512x512.png'), png512);
console.log('✓ Created icon-512x512.png (Black arrow on orange circle)');

// 3. apple-touch-icon.png (180x180, dark circular background for iOS)
const appleIcon = renderEmblem(180, 180, { bgDark: true });
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);
console.log('✓ Created apple-touch-icon.png (Black arrow on orange circle with dark frame)');

// 4. favicon.ico with 16x16, 32x32, 48x48
const png16 = renderEmblem(16, 16);
const png32 = renderEmblem(32, 32);
const png48 = renderEmblem(48, 48);
const ico = createIco([
  { width: 16, height: 16, data: png16 },
  { width: 32, height: 32, data: png32 },
  { width: 48, height: 48, data: png48 }
]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);
console.log('✓ Created favicon.ico (Multi-size 16, 32, 48 with black arrow)');

// 5. favicon.svg (Vector SVG matching exact geometry)
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="15" fill="#EC6F36"/>
  <path d="M2 11.5h14.5v-4.5l10.5 9-10.5 9v-4.5h-14.5z" fill="#000000"/>
</svg>
`;
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
console.log('✓ Created favicon.svg with fill="#000000"');

console.log('All favicon assets successfully generated!');
