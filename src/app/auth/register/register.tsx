'use client';

import React, { useState } from 'react';
import '../auth.css';
import Link from 'next/link';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual register API call
      console.log('Register data:', { fullName, email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle successful registration
      // router.push('/auth/login');
      
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span>Sign Up</span>
              </h6>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <form onSubmit={handleSubmit}>
                          {error && (
                            <div className="alert alert-danger" role="alert" style={{ 
                              color: '#ff6b6b', 
                              fontSize: '12px', 
                              marginBottom: '15px' 
                            }}>
                              {error}
                            </div>
                          )}
                          <div className="form-group">
                            <input
                              type="text"
                              name="logname"
                              className="form-style"
                              placeholder="Your Full Name"
                              id="logname"
                              autoComplete="off"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              required
                              disabled={isLoading}
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="regemail"
                              className="form-style"
                              placeholder="Your Email"
                              id="regemail"
                              autoComplete="off"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              disabled={isLoading}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="regpass"
                              className="form-style"
                              placeholder="Your Password"
                              id="regpass"
                              autoComplete="off"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              disabled={isLoading}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="confirmpass"
                              className="form-style"
                              placeholder="Confirm Password"
                              id="confirmpass"
                              autoComplete="off"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                              disabled={isLoading}
                            />
                            <i className="input-icon uil uil-lock-access"></i>
                          </div>
                          <button 
                            type="submit" 
                            className="btn mt-4"
                            disabled={isLoading}
                          >
                            {isLoading ? 'Loading...' : 'Submit'}
                          </button>
                          <p className="mb-0 mt-4 text-center">
                            <span className="link">Already have an account? </span>
                            <Link href="/auth/login" className="link" style={{ fontWeight: 'bold' }}>
                              Log In
                            </Link>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
