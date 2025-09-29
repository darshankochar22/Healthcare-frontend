import React, { useState, useEffect } from 'react';
import { IconBrandGoogle, IconEye, IconEyeOff, IconMail, IconLock } from '@tabler/icons-react';
import { useAuth } from '../../context/AuthContext';
import { loginWithGoogle } from '../../config/api';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated()) {
      window.location.href = '/';
      return;
    }

    // No need to initialize Google Auth directly - we'll use backend redirect
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy function - will be replaced with actual auth
    console.log('Login attempt:', formData);
    alert('Normal login functionality will be implemented later');
  };

  const handleGoogleAuth = () => {
    // Redirect to backend Google OAuth endpoint
    loginWithGoogle();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo Section */}
        <div className="login-logo">
          <div className="logo-icon">⚕️</div>
          <div className="logo-text">
            <span className="logo-main">आरोग्य</span>
            <span className="logo-sub">Healthcare Portal</span>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="login-welcome">
          <h2>Welcome Back</h2>
          <p>Sign in to access your healthcare services</p>
        </div>

        {/* Google Auth Button */}
        <button className="google-auth-btn" onClick={handleGoogleAuth}>
          <IconBrandGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="login-divider">
          <span>or</span>
        </div>

        {/* Normal Auth Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <IconMail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <IconLock className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="signup-link">
          <p>Don't have an account? <a href="#">Sign up here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
