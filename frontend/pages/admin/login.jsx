import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { LogIn, AlertTriangle, Shield } from 'lucide-react';
import styles from '../../styles/Login.module.css';

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
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  useEffect(() => {
    const syncAria = (el) => {
      if (!el || !el.matches) return;
      el.setAttribute('aria-invalid', el.matches(':user-invalid') ? 'true' : 'false');
    };

    const handleBlur = (e) => {
      if (e.target.tagName === 'INPUT') {
        syncAria(e.target);
      }
    };

    const handleInput = (e) => {
      if (e.target.tagName === 'INPUT' && e.target.hasAttribute('aria-invalid')) {
        syncAria(e.target);
      }
    };

    document.addEventListener('blur', handleBlur, true);
    document.addEventListener('input', handleInput);

    return () => {
      document.removeEventListener('blur', handleBlur, true);
      document.removeEventListener('input', handleInput);
    };
  }, []);

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
      try {
        data = await res.json();
      } catch {
        throw new Error('El servidor respondió con un formato inválido.');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Correo o contraseña incorrectos.');
      }

      if (data.requiresTwoFactor) {
        setTempToken(data.tempToken);
        setStep('twoFactor');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Error during login:', err);
      setError(err.message || 'Error de conexión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
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

      if (!res.ok) {
        throw new Error(data.error || 'Código 2FA inválido.');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Error during 2FA:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ingreso de Administrador | Tecnolight</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={styles.loginCard}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <span className={styles.logoText}>TL</span>
          </div>
          <span className={styles.title}>TECNOLIGHT</span>
          <span className={styles.subtitle}>Panel de Control</span>
        </div>

        {error && (
          <div className={styles.alert}>
            <AlertTriangle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {step === 'credentials' ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email" id="email" name="email"
                className={styles.input} required
                value={formData.email} onChange={handleChange}
                autoComplete="email"
              />
              <div className={`${styles.errorMsg} error-msg`}>
                Ingrese un correo electrónico válido.
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password" id="password" name="password"
                className={styles.input} required
                value={formData.password} onChange={handleChange}
                autoComplete="current-password"
              />
              <div className={`${styles.errorMsg} error-msg`}>
                Ingrese su contraseña.
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ justifyContent: 'center', marginTop: '1rem', width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Iniciar Sesión'} <LogIn size={18} />
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleTwoFactorSubmit}>
            <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              <Shield size={40} style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }} />
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Ingresá el código de 6 dígitos de tu app de autenticación.
              </p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="2fa">Código de Verificación</label>
              <input
                type="text" id="2fa" name="2fa"
                className={styles.input}
                required maxLength={6}
                placeholder="000000"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                autoComplete="one-time-code"
                inputMode="numeric"
                style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5em' }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ justifyContent: 'center', marginTop: '1rem', width: '100%' }}
              disabled={loading || twoFactorCode.length < 6}
            >
              {loading ? 'Verificando...' : 'Verificar Código'} <Shield size={18} />
            </button>

            <button
              type="button"
              className="btn-secondary"
              style={{ justifyContent: 'center', width: '100%' }}
              onClick={() => { setStep('credentials'); setError(''); setTwoFactorCode(''); }}
            >
              Volver al inicio de sesión
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
