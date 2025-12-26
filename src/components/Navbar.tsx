import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import Logo from '../assets/Logo.png';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-brand">
          <img src={Logo} alt="SIMS PPOB Logo" className="navbar-logo" />
          <span className="navbar-title">SIMS PPOB</span>
        </Link>
        
        <div className="navbar-menu">
          <Link 
            to="/topup" 
            className={`navbar-link ${location.pathname === '/topup' ? 'active' : ''}`}
          >
            Top Up
          </Link>
          <Link 
            to="/transaction" 
            className={`navbar-link ${location.pathname === '/transaction' ? 'active' : ''}`}
          >
            Transaction
          </Link>
          <Link 
            to="/profile" 
            className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}
          >
            Akun
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
