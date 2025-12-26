import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { topUp, reset, getProfile, getBalance } from '../features/home/homeSlice';
import { MdCreditCard, MdCheckCircle, MdCancel } from 'react-icons/md';
import Navbar from '../components/Navbar';
import BalanceCard from '../components/BalanceCard';
import './TopUp.css';
import ProfilePhoto from '../assets/Profile Photo.png';
import Logo from '../assets/Logo.png';

const TopUp = () => {
  const [amount, setAmount] = useState('');
  const [topupAmount, setTopupAmount] = useState(0); // Store amount for modal display
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { profile, balance, isLoading } = useSelector(
    (state: RootState) => state.home
  );

  const presetAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

  // Fetch profile and balance on mount
  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
    dispatch(getBalance());
  }, [dispatch, profile]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only numbers
    setAmount(value);
  };

  const handlePresetClick = (presetAmount: number) => {
    setAmount(presetAmount.toString());
  };

  const isValidAmount = () => {
    const numAmount = parseInt(amount);
    return numAmount >= 10000 && numAmount <= 1000000;
  };

  const handleTopUpClick = () => {
    if (isValidAmount()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    const numAmount = parseInt(amount);
    setTopupAmount(numAmount); // Store for modal display
    
    try {
      await dispatch(topUp(numAmount)).unwrap();
      setIsSuccess(true);
      setShowResultModal(true);
      setAmount(''); // Clear after storing
    } catch (error) {
      setIsSuccess(false);
      setShowResultModal(true);
    }
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
    dispatch(reset());
  };

  return (
    <div className="topup-page">
      <Navbar />
      
      <BalanceCard 
        balance={balance}
        firstName={profile?.first_name || 'User'}
        lastName={profile?.last_name || ''}
        profileImage={profile?.profile_image || ProfilePhoto}
      />

      <div className="topup-content">
        <div className="topup-section">
          <p className="topup-label">Silahkan masukan</p>
          <h2 className="topup-title">Nominal Top Up</h2>

          <div className="topup-form">
            <div className="topup-input-section">
              <div className="input-group">
              <span className="input-icon"><MdCreditCard /></span>
                <input
                  type="text"
                  className="topup-input"
                  placeholder="masukan nominal Top Up"
                  value={amount ? formatCurrency(parseInt(amount)) : ''}
                  onChange={handleAmountChange}
                />
              </div>

              <button
                className="btn-topup"
                onClick={handleTopUpClick}
                disabled={!amount || !isValidAmount() || isLoading}
              >
                {isLoading ? 'Processing...' : 'Top Up'}
              </button>
            </div>

            <div className="preset-amounts">
              {presetAmounts.map((presetAmount) => (
                <button
                  key={presetAmount}
                  className="preset-btn"
                  onClick={() => handlePresetClick(presetAmount)}
                >
                  Rp{formatCurrency(presetAmount)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon modal-icon-confirm">
              <img src={Logo} alt="Logo" className="icon-logo-img" />
            </div>
            <p className="modal-text">Anda yakin untuk Top Up sebesar</p>
            <h3 className="modal-amount">Rp{formatCurrency(parseInt(amount))} ?</h3>
            <button className="modal-btn modal-btn-primary" onClick={handleConfirm}>
              Ya, lanjutkan Top Up
            </button>
            <button 
              className="modal-btn modal-btn-secondary" 
              onClick={() => setShowConfirmModal(false)}
            >
              Batalkan
            </button>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {showResultModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className={`modal-icon ${isSuccess ? 'modal-icon-success' : 'modal-icon-error'}`}>
              {isSuccess ? <MdCheckCircle className="icon-check" /> : <MdCancel className="icon-check" />}
            </div>
            <p className="modal-text">
              {isSuccess ? 'Top Up sebesar' : 'Top Up sebesar'}
            </p>
            <h3 className="modal-amount">
              Rp{formatCurrency(topupAmount)}
            </h3>
            <p className="modal-status">
              {isSuccess ? 'berhasil!' : 'gagal'}
            </p>
            <button 
              className="modal-btn modal-btn-primary" 
              onClick={handleCloseResultModal}
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopUp;
