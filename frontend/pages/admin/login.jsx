import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { LogIn, AlertTriangle, Shield, Info } from 'lucide-react';

const ADMIN_CREDENTIALS = {
  email: 'admin@tecnolight.com.ar',
  password: 'admin123',
  name: 'Administrador',
  role: 'admin'
};

const USERS = [
  { email: 'admin@tecnolight.com.ar', password: 'admin123', name: 'Administrador', role: 'admin' },
  { email: 'admin', password: 'admin123', name: 'Administrador', role: 'admin' }
];

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('local');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.push('/admin/dashboard');
  }, [router]);

  const generateToken = (user) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ id: user.email, email: user.email, name: user.name, role: user.role, iat: Date.now(), exp: Date.now() + 86400000 }));
    const signature = btoa('tecnolight-local-signature');
    return `${header}.${payload}.${signature}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const user = USERS.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('token', generateToken(user));
      localStorage.setItem('user', JSON.stringify({ name: user.name, role: user.role, email: user.email }));
      router.push('/admin/dashboard');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Credenciales inválidas.');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Error de conexión. Verificá que el backend esté corriendo o usá las credenciales locales (admin / admin123).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Head><title>Ingreso Administrador | Tecnolight</title><meta name="robots" content="noindex, nofollow" /></Head>
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-xl">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-16 h-16 bg-[#FF5A1F] flex items-center justify-center rotate-45 shadow-lg">
            <span className="-rotate-45 text-white font-black text-2xl">TL</span>
          </div>
          <span className="text-xl font-extrabold tracking-wider text-gray-900">TECNOLIGHT</span>
          <span className="text-sm text-[#FF5A1F] font-semibold">Panel de Control</span>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-700">
              <p className="font-semibold mb-1">Acceso Local (sin backend)</p>
              <p>Usuario: <strong>admin</strong> — Contraseña: <strong>admin123</strong></p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-2 text-sm">
            <AlertTriangle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900">Usuario</label>
            <input type="text" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="admin" autoComplete="username"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F] transition-colors" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-900">Contraseña</label>
            <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" autoComplete="current-password"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F] transition-colors" />
          </div>
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-[#FF5A1F] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:bg-[#E04E1A] hover:-translate-y-0.5" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar Sesión'} <LogIn size={18} />
          </button>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Shield size={12} /> ¿Cómo cambiar usuario/contraseña?
          </h4>
          <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
            <li>Abrí <code className="bg-gray-200 px-1 rounded text-[11px]">frontend/pages/admin/login.jsx</code></li>
            <li>Buscá el array <code className="bg-gray-200 px-1 rounded text-[11px]">USERS</code> (línea ~10)</li>
            <li>Cambiá <code className="bg-gray-200 px-1 rounded text-[11px]">email</code> y <code className="bg-gray-200 px-1 rounded text-[11px]">password</code></li>
            <li>Guardá el archivo — los cambios aplican al instante</li>
          </ol>
        </div>

        <p className="text-gray-400 text-xs text-center mt-6">Panel de administración de Tecnolight SRL</p>
      </div>
    </div>
  );
}
