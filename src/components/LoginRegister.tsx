'use client';

import React, { useState } from 'react';
import styles from './LoginRegister.module.css';

const LoginRegister: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email: loginEmail, password: loginPassword });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle register logic here
    console.log('Register:', { name: registerName, email: registerEmail, password: registerPassword });
  };

  return (
    <>
      {/* Add external CSS links */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.9/css/unicons.css" />
      <div className={styles.section}>
        <div className="container">
          <div className={`row ${styles['full-height']} justify-content-center`}>
            <div className="col-12 text-center align-self-center py-5">
              <div className={`${styles.section} pb-5 pt-5 pt-sm-2 text-center`}>
                <h6 className="mb-0 pb-3">
                  <span>Log In </span><span>Sign Up</span>
                </h6>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                  checked={isRegister}
                  onChange={() => setIsRegister(!isRegister)}
                />
                <label htmlFor="reg-log"></label>
                <div className={`${styles['card-3d-wrap']} mx-auto`}>
                  <div
                    className={styles['card-3d-wrapper']}
                    style={{ transform: isRegister ? 'rotateY(180deg)' : 'none' }}
                  >
                    <div className={styles['card-front']}>
                      <div className={styles['center-wrap']}>
                        <div className={`${styles.section} text-center`}>
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <form onSubmit={handleLoginSubmit}>
                            <div className={styles['form-group']}>
                              <input
                                type="email"
                                name="logemail"
                                className={styles['form-style']}
                                placeholder="Your Email"
                                id="logemail"
                                autoComplete="off"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                              />
                              <i className={`${styles['input-icon']} uil uil-at`}></i>
                            </div>
                            <div className={`${styles['form-group']} mt-2`}>
                              <input
                                type="password"
                                name="logpass"
                                className={styles['form-style']}
                                placeholder="Your Password"
                                id="logpass"
                                autoComplete="off"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                              />
                              <i className={`${styles['input-icon']} uil uil-lock-alt`}></i>
                            </div>
                            <button type="submit" className={`${styles.btn} mt-4`}>Submit</button>
                          </form>
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className={styles.link}>Forgot your password?</a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={styles['card-back']}>
                      <div className={styles['center-wrap']}>
                        <div className={`${styles.section} text-center`}>
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <form onSubmit={handleRegisterSubmit}>
                            <div className={styles['form-group']}>
                              <input
                                type="text"
                                name="logname"
                                className={styles['form-style']}
                                placeholder="Your Full Name"
                                id="logname"
                                autoComplete="off"
                                value={registerName}
                                onChange={(e) => setRegisterName(e.target.value)}
                              />
                              <i className={`${styles['input-icon']} uil uil-user`}></i>
                            </div>
                            <div className={`${styles['form-group']} mt-2`}>
                              <input
                                type="email"
                                name="logemail"
                                className={styles['form-style']}
                                placeholder="Your Email"
                                id="logemail"
                                autoComplete="off"
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                              />
                              <i className={`${styles['input-icon']} uil uil-at`}></i>
                            </div>
                            <div className={`${styles['form-group']} mt-2`}>
                              <input
                                type="password"
                                name="logpass"
                                className={styles['form-style']}
                                placeholder="Your Password"
                                id="logpass"
                                autoComplete="off"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                              />
                              <i className={`${styles['input-icon']} uil uil-lock-alt`}></i>
                            </div>
                            <button type="submit" className={`${styles.btn} mt-4`}>Submit</button>
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
    </>
  );
};

export default LoginRegister;