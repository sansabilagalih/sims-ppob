import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { AppDispatch, RootState } from '../app/store';
import { MdAlternateEmail, MdLockOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import './Login.css';
import Logo from '../assets/Logo.png';
import IllustrationLogin from '../assets/Illustrasi Login.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { token, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // Redirect if already logged in
    if (token) {
      navigate('/home');
    }

    if (isSuccess) {
      navigate('/home');
    }

    dispatch(reset());
  }, [token, isSuccess, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setValidationError('');
  };

  const validateForm = (): boolean => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setValidationError('Email harus diisi');
      return false;
    }
    if (!emailRegex.test(email)) {
      setValidationError('Format email tidak valid');
      return false;
    }

    // Password validation
    if (!password) {
      setValidationError('Password harus diisi');
      return false;
    }
    if (password.length < 8) {
      setValidationError('Password minimal 8 karakter');
      return false;
    }

    return true;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-form-wrapper">
          <div className="login-header">
            <img src={Logo} alt="SIMS PPOB Logo" className="login-logo" />
            <h1 className="login-title">SIMS PPOB</h1>
          </div>

          <h2 className="login-subtitle">Masuk atau buat akun untuk memulai</h2>

          <form onSubmit={onSubmit} className="login-form">
            <div className="form-group">
              <span className="input-icon"><MdAlternateEmail /></span>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="masukan email anda"
              />
            </div>

            <div className="form-group">
              <span className="input-icon"><MdLockOutline /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${(validationError || isError) && password ? 'error' : ''}`}
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="masukan password anda"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>

            {(validationError || isError) && (
              <div className="error-message">
                {validationError || message}
              </div>
            )}

            <button
              type="submit"
              className="btn-login"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Masuk'}
            </button>
          </form>

          <p className="register-link">
            belum punya akun? registrasi{' '}
            <Link to="/register" className="link-red">
              di sini
            </Link>
          </p>
        </div>
      </div>

      <div className="login-right">
        <img
          src={IllustrationLogin}
          alt="Illustration"
          className="login-illustration"
        />
      </div>
    </div>
  );
};

export default Login;
