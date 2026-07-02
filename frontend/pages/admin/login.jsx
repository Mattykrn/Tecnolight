import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { LogIn, AlertTriangle, Shield, Info } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.push('/admin/dashboard');
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const loginEmail = email.includes('@') ? email : 'admin@tecnolight.com.ar';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/admin/dashboard');
        return;
      }
    } catch {
      // Backend unreachable — continuar con fallback local
    }

    // Fallback local (backend offline)
    const USERS = [
      { email: 'admin@tecnolight.com.ar', password: 'admin123', name: 'Administrador', role: 'admin' },
      { email: 'admin', password: 'admin123', name: 'Administrador', role: 'admin' }
    ];
    const user = USERS.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('token', 'local-session');
      localStorage.setItem('user', JSON.stringify({ name: user.name, role: user.role, email: user.email }));
      localStorage.setItem('local_login', 'true');
      router.push('/admin/dashboard');
      return;
    }

    setError('Credenciales inválidas. Verificá que el backend esté corriendo o usá admin / admin123.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,90,31,1)_0%,transparent_60%)]" />
      <Head><title>Ingreso Administrador | Tecnolight</title><meta name="robots" content="noindex, nofollow" /></Head>
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF5A1F] to-[#FF8A50] rounded-3xl blur-xl opacity-20" />
        <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-2xl relative">
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF5A1F] to-[#E04E1A] flex items-center justify-center rotate-45 shadow-lg shadow-[#FF5A1F]/20">
              <span className="-rotate-45 text-white font-black text-2xl">TL</span>
            </div>
            <span className="text-xl font-extrabold tracking-wider text-gray-900">TECNOLIGHT</span>
            <span className="text-sm text-[#FF5A1F] font-semibold">Panel de Control</span>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-700">
                <p className="font-semibold mb-1">Acceso Local</p>
                <p>Usuario: <strong>admin</strong> — Contraseña: <strong>admin123</strong></p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-2 text-sm animate-[fadeSlideUp_0.3s_ease-out]">
              <AlertTriangle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900">Usuario</label>
              <input type="text" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin" autoComplete="username"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#FF5A1F] focus:ring-2 focus:ring-[#FF5A1F]/10 transition-all" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-900">Contraseña</label>
              <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" autoComplete="current-password"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#FF5A1F] focus:ring-2 focus:ring-[#FF5A1F]/10 transition-all" />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5A1F] to-[#E04E1A] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#FF5A1F]/25 disabled:opacity-50" disabled={loading}>
              {loading ? 'Ingresando...' : 'Iniciar Sesión'} <LogIn size={18} />
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-50/80 rounded-lg border border-gray-100">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Shield size={12} /> ¿Cómo cambiar usuario/contraseña?
            </h4>
            <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
              <li>Abrí <code className="bg-gray-200 px-1.5 rounded text-[11px] font-mono">backend/.env</code></li>
              <li>Cambiá <code className="bg-gray-200 px-1.5 rounded text-[11px] font-mono">ADMIN_EMAIL</code> y <code className="bg-gray-200 px-1.5 rounded text-[11px] font-mono">ADMIN_PASSWORD</code></li>
              <li>Ejecutá <code className="bg-gray-200 px-1.5 rounded text-[11px] font-mono">node database/seeds/seed.js</code></li>
              <li>Los cambios aplican al reiniciar el backend</li>
            </ol>
          </div>

          <p className="text-gray-400 text-xs text-center mt-6">Panel de administración de Tecnolight SRL</p>
        </div>
      </div>
    </div>
  );
}
