const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const downloadsDir = path.join(os.homedir(), 'Downloads');

function hashFile(p) {
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}
const h1 = hashFile(path.join(downloadsDir, 'laminado.mp4'));
const h2 = hashFile(path.join(downloadsDir, 'laminado2.mp4'));
console.log('laminado hash:', h1);
console.log('laminado2 hash:', h2);
const oldVideo = path.join(__dirname, '../public/videos/trafficjet/video_home.mp4');
if (fs.existsSync(oldVideo)) {
  fs.unlinkSync(oldVideo);
  console.log('Old video_home.mp4 successfully deleted and discarded!');
}







console.log('Video sync and cleanup complete.');

