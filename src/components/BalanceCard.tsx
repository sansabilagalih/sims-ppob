import { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import './BalanceCard.css';
import BackgroundSaldo from '../assets/Background Saldo.png';
import DefaultProfilePhoto from '../assets/Profile Photo.png';

interface BalanceCardProps {
  balance: number;
  firstName: string;
  lastName: string;
  profileImage: string;
}

const BalanceCard = ({ balance, firstName, lastName, profileImage }: BalanceCardProps) => {
  const [showBalance, setShowBalance] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Check if profile image is valid (not null URL or placeholder)
  const isValidProfileImage = profileImage && 
    !profileImage.includes('null') && 
    profileImage !== '';

  return (
    <div className="balance-section">
      <div className="profile-card">
        <img 
          src={imageError || !isValidProfileImage ? DefaultProfilePhoto : profileImage} 
          alt="Profile" 
          className="profile-image"
          onError={() => setImageError(true)}
        />
        <div className="profile-info">
          <p className="profile-greeting">Selamat datang,</p>
          <h2 className="profile-name">{firstName} {lastName}</h2>
        </div>
      </div>

      <div className="balance-card">
        <img src={BackgroundSaldo} alt="Background" className="balance-bg" />
        <div className="balance-content">
          <p className="balance-label">Saldo anda</p>
          <h1 className="balance-amount">
            {showBalance ? formatCurrency(balance) : 'Rp •••••••'}
          </h1>
          <button 
            className="balance-toggle"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? (
              <>
                Tutup Saldo <MdVisibilityOff className="balance-icon" />
              </>
            ) : (
              <>
                Lihat Saldo <MdVisibility className="balance-icon" />
              </>
            )} 
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
