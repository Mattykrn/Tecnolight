const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const repoRoot = path.join(__dirname, '../..');
const frontendDir = path.join(__dirname, '..');

function run(cmd, cwd = repoRoot) {
  console.log(`\n> [${path.basename(cwd)}] ${cmd}`);
  try {
    const out = execSync(cmd, { cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    console.log(out.trim());
    return { ok: true, out };
  } catch (err) {
    console.error(`ERROR (${cmd}):`, err.stderr ? err.stderr.trim() : (err.stdout ? err.stdout.trim() : err.message));
    return { ok: false, err };
  }
}

console.log('=== 1. Git Add & Status ===');
run('git add -A .', repoRoot);
run('git status --short', repoRoot);

console.log('=== 2. Git Commit ===');
const commitMsg = 'Feat: modal interactivo de Solicitud Formal y Pliegos para evitar redirecciones de mailto y optimizacion de conversion';
run(`git commit -m "${commitMsg}"`, repoRoot);

console.log('=== 3. Git Push to GitHub ===');
run('git push origin main', repoRoot);

console.log('=== 4. Vercel Project Check ===');
console.log('Root .vercel exists?:', fs.existsSync(path.join(repoRoot, '.vercel')));
console.log('Frontend .vercel exists?:', fs.existsSync(path.join(frontendDir, '.vercel')));

const vercelCwd = repoRoot;
console.log(`Running Vercel deploy in: ${vercelCwd}`);
run('npx vercel --prod --yes', vercelCwd);

console.log('=== Proceso de deploy finalizado ===');
