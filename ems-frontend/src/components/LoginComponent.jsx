import React, { useState } from 'react';
import { login } from '../service/AuthService.js';
import { setToken } from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    login({ email, password })
      .then((response) => {
        setToken(response.data.token);
        navigator('/employees');
      })
      .catch((error) => {
        setError('Invalid credentials. Please try again.');
        console.error('Login error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className='page-section'>
      <div className='page-header'>
        <div>
          <p className='subtitle'>Welcome back</p>
          <h1 className='title'>Sign in</h1>
          <p className='description'>Access your employee management dashboard.</p>
        </div>
      </div>

      <div className='card shadow-soft mt-4'>
        <div className='card-body p-4 p-md-5'>
          <form onSubmit={handleLogin}>
            <div className='form-group mb-4'>
              <label className='form-label' htmlFor='email'>Email</label>
              <input
                id='email'
                type='email'
                placeholder='company@example.com'
                name='email'
                value={email}
                className='form-control'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='form-group mb-4'>
              <label className='form-label' htmlFor='password'>Password</label>
              <input
                id='password'
                type='password'
                placeholder='Enter your password'
                name='password'
                value={password}
                className='form-control'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className='alert alert-danger mb-4'>
                {error}
              </div>
            )}

            <div className='form-actions'>
              <button type='submit' className='btn btn-gradient btn-pill' disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className='text-center mt-4'>
            <p className='text-muted'>
              Don't have an account? <a href='/signup' className='text-primary'>Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginComponent;
