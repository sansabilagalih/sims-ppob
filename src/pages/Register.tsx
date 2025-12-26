import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { AppDispatch, RootState } from '../app/store';
import { MdAlternateEmail, MdLockOutline, MdVisibility, MdVisibilityOff, MdPerson } from 'react-icons/md';
import './Register.css';
import Logo from '../assets/Logo.png';
import IllustrationLogin from '../assets/Illustrasi Login.png';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const { email, first_name, last_name, password, confirm_password } = formData;

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
      navigate('/login');
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

    // First name validation
    if (!first_name) {
      setValidationError('Nama depan harus diisi');
      return false;
    }

    // Last name validation
    if (!last_name) {
      setValidationError('Nama belakang harus diisi');
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

    // Confirm password validation
    if (!confirm_password) {
      setValidationError('Konfirmasi password harus diisi');
      return false;
    }
    if (password !== confirm_password) {
      setValidationError('Password tidak sama');
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
      first_name,
      last_name,
      password,
    };

    dispatch(register(userData));
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="register-form-wrapper">
          <div className="register-header">
            <img src={Logo} alt="SIMS PPOB Logo" className="register-logo" />
            <h1 className="register-title">SIMS PPOB</h1>
          </div>

          <h2 className="register-subtitle">Lengkapi data untuk membuat akun</h2>

          <form onSubmit={onSubmit} className="register-form">
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
              <span className="input-icon"><MdPerson /></span>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={first_name}
                onChange={onChange}
                placeholder="nama depan"
              />
            </div>

            <div className="form-group">
              <span className="input-icon"><MdPerson /></span>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={last_name}
                onChange={onChange}
                placeholder="nama belakang"
              />
            </div>

            <div className="form-group">
              <span className="input-icon"><MdLockOutline /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="buat password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>

            <div className="form-group">
              <span className="input-icon"><MdLockOutline /></span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className={`form-control ${validationError && confirm_password ? 'error' : ''}`}
                id="confirm_password"
                name="confirm_password"
                value={confirm_password}
                onChange={onChange}
                placeholder="konfirmasi password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>

            {(validationError || isError) && (
              <div className="error-message">
                {validationError || message}
              </div>
            )}

            <button
              type="submit"
              className="btn-register"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Registrasi'}
            </button>
          </form>

          <p className="login-link">
            sudah punya akun? login{' '}
            <Link to="/login" className="link-red">
              di sini
            </Link>
          </p>
        </div>
      </div>

      <div className="register-right">
        <img
          src={IllustrationLogin}
          alt="Illustration"
          className="register-illustration"
        />
      </div>
    </div>
  );
};

export default Register;
