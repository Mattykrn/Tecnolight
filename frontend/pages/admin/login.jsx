import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { LogIn, AlertTriangle, Shield } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState('credentials');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [tempToken, setTempToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.push('/admin/dashboard');
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let res;
      try {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } catch {
        throw new Error('No se pudo conectar con el servidor. Asegurate de que el backend esté corriendo en http://localhost:5000');
      }
      let data;
      try { data = await res.json(); } catch { throw new Error('El servidor respondió con un formato inválido.'); }
      if (!res.ok) throw new Error(data.error || 'Correo o contraseña incorrectos.');
      if (data.requiresTwoFactor) { setTempToken(data.tempToken); setStep('twoFactor'); return; }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Error during login:', err);
      setError(err.message || 'Error de conexión. Intente nuevamente.');
    } finally { setLoading(false); }
  };

  const handleTwoFactorSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/verify-2fa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempToken, code: twoFactorCode })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Código 2FA inválido.');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Error during 2FA:', err);
      setError(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
      <Head><title>Ingreso de Administrador | Tecnolight</title><meta name="robots" content="noindex, nofollow" /></Head>
      <div className="bg-bg-surface border border-border rounded-2xl p-10 w-full max-w-md">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="w-16 h-16 bg-primary flex items-center justify-center rotate-45 shadow-glow">
            <span className="-rotate-45 text-black font-black text-2xl">TL</span>
          </div>
          <span className="text-xl font-extrabold tracking-wider text-text-main mt-2">TECNOLIGHT</span>
          <span className="text-sm text-primary font-semibold">Panel de Control</span>
        </div>

        {error && (
          <div className="bg-error/10 border border-error text-error p-4 rounded-lg mb-6 flex items-center gap-2 text-sm">
            <AlertTriangle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {step === 'credentials' ? (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-text-main">Correo Electrónico</label>
              <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} autoComplete="email" className="w-full bg-bg-dark border border-border rounded-lg px-4 py-3 text-text-main placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
              <div className="text-error text-xs mt-1 hidden error-msg">Ingrese un correo electrónico válido.</div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-text-main">Contraseña</label>
              <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange} autoComplete="current-password" className="w-full bg-bg-dark border border-border rounded-lg px-4 py-3 text-text-main placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
              <div className="text-error text-xs mt-1 hidden error-msg">Ingrese su contraseña.</div>
            </div>
            <button type="submit" className="btn-primary w-full justify-center" disabled={loading}>
              {loading ? 'Ingresando...' : 'Iniciar Sesión'} <LogIn size={18} />
            </button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={handleTwoFactorSubmit}>
            <div className="text-center mb-2">
              <Shield size={40} className="text-primary mx-auto mb-2" />
              <p className="text-text-muted text-sm">Ingresá el código de 6 dígitos de tu app de autenticación.</p>
            </div>
            <div>
              <label htmlFor="2fa" className="block text-sm font-medium mb-2 text-text-main">Código de Verificación</label>
              <input type="text" id="2fa" name="2fa" required maxLength={6} placeholder="000000" value={twoFactorCode} onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))} autoComplete="one-time-code" inputMode="numeric" className="w-full bg-bg-dark border border-border rounded-lg px-4 py-3 text-text-main placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-center text-2xl tracking-[0.5em]" />
            </div>
            <button type="submit" className="btn-primary w-full justify-center" disabled={loading || twoFactorCode.length < 6}>
              {loading ? 'Verificando...' : 'Verificar Código'} <Shield size={18} />
            </button>
            <button type="button" className="btn-secondary w-full justify-center" onClick={() => { setStep('credentials'); setError(''); setTwoFactorCode(''); }}>
              Volver al inicio de sesión
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
