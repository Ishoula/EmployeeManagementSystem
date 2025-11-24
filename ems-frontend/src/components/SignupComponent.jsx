import React, { useState } from 'react';
import { signup } from '../service/AuthService.js';
import { setToken } from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';

const SignupComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    signup({ name, email, password })
      .then((response) => {
        setToken(response.data.token);
        navigator('/employees');
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          setError('Email already registered. Please use a different email.');
        } else {
          setError('Registration failed. Please try again.');
        }
        console.error('Signup error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className='page-section'>
      <div className='page-header'>
        <div>
          <p className='subtitle'>Get started</p>
          <h1 className='title'>Create account</h1>
          <p className='description'>Register your company to start managing employees.</p>
        </div>
      </div>

      <div className='card shadow-soft mt-4'>
        <div className='card-body p-4 p-md-5'>
          <form onSubmit={handleSignup}>
            <div className='form-group mb-4'>
              <label className='form-label' htmlFor='name'>Company name</label>
              <input
                id='name'
                type='text'
                placeholder='Your company name'
                name='name'
                value={name}
                className='form-control'
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder='Create a password (min. 6 characters)'
                name='password'
                value={password}
                className='form-control'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className='form-group mb-4'>
              <label className='form-label' htmlFor='confirmPassword'>Confirm password</label>
              <input
                id='confirmPassword'
                type='password'
                placeholder='Confirm your password'
                name='confirmPassword'
                value={confirmPassword}
                className='form-control'
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className='alert alert-danger mb-4'>
                {error}
              </div>
            )}

            <div className='form-actions'>
              <button type='button' className='btn btn-light-soft btn-pill' onClick={() => navigator('/login')}>
                Cancel
              </button>
              <button type='submit' className='btn btn-gradient btn-pill' disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <div className='text-center mt-4'>
            <p className='text-muted'>
              Already have an account? <a href='/login' className='text-primary'>Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupComponent;
