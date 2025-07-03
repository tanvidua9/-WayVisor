import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signin.css';

function Signin() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/'); // Redirect if already logged in
    }
  }, [navigate]);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());

    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!re.test(email)) return 'Invalid email format';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Include at least one uppercase letter';
    if (!/[0-9]/.test(password)) return 'Include at least one number';
    return '';
  };

  const loginApiCall = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/user/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log('API Response:', data);
  
      if (response.ok && data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userName', data.name); // Store the name
        navigate('/');
      } else {
        setErrors({ email: 'Invalid email or password', password: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error calling API:', error);
      setErrors({ email: 'Network error, please try again later', password: '' });
    }
    setLoading(false);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      loginApiCall(); // Only call API after user clicks login button
    }
  };

  return (
    <div className={`signin-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="theme-toggle">
        <button onClick={toggleDarkMode} className="theme-toggle-btn">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="signin-form-container">
        <h1>Login</h1>
        <p className="welcome-text">Hi, Welcome back 👋</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="E.g. johndoe@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
              }}
              required
              className={errors.email ? 'invalid' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
                }}
                required
                className={errors.password ? 'invalid' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-footer">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="signup-prompt">
          Not registered yet? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
