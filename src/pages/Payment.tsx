import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { makeTransaction, reset, getServices, getProfile, getBalance } from '../features/home/homeSlice';
import { MdCreditCard, MdCheckCircle, MdCancel } from 'react-icons/md';
import Navbar from '../components/Navbar';
import BalanceCard from '../components/BalanceCard';
import './Payment.css';
import ProfilePhoto from '../assets/Profile Photo.png';
import Logo from '../assets/Logo.png';

const Payment = () => {
  const { serviceCode } = useParams<{ serviceCode: string }>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { profile, balance, services, isLoading } = useSelector(
    (state: RootState) => state.home
  );

  // Find the selected service
  const selectedService = services.find(s => s.service_code === serviceCode);

  useEffect(() => {
    // Fetch profile and balance if not loaded
    if (!profile) {
      dispatch(getProfile());
    }
    dispatch(getBalance());
    
    // Fetch services if not loaded
    if (services.length === 0) {
      dispatch(getServices());
    }
  }, [dispatch, services.length, profile]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  const handlePaymentClick = () => {
    if (selectedService) {
      setTransactionAmount(selectedService.service_tariff);
      setShowConfirmModal(true);
    }
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    
    if (!serviceCode) return;

    try {
      await dispatch(makeTransaction(serviceCode)).unwrap();
      setIsSuccess(true);
      setShowResultModal(true);
    } catch (error) {
      setIsSuccess(false);
      setShowResultModal(true);
    }
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
    dispatch(reset());
    navigate('/home');
  };

  if (!selectedService && services.length > 0) {
    return (
      <div className="payment-page">
        <Navbar />
        <div className="payment-content">
          <p>Service tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <Navbar />
      
      <BalanceCard 
        balance={balance}
        firstName={profile?.first_name || 'User'}
        lastName={profile?.last_name || ''}
        profileImage={profile?.profile_image || ProfilePhoto}
      />

      <div className="payment-content">
        <div className="payment-section">
          <p className="payment-label">PemBayaran</p>
          
          {selectedService && (
            <div className="service-info">
              <img 
                src={selectedService.service_icon} 
                alt={selectedService.service_name}
                className="service-icon-large"
                onError={(e) => {
                  const iconMap: Record<string, string> = {
                    'PAJAK': '/src/assets/PBB.png',
                    'PLN': '/src/assets/Listrik.png',
                    'PDAM': '/src/assets/PDAM.png',
                    'PULSA': '/src/assets/Pulsa.png',
                    'PGN': '/src/assets/PGN.png',
                    'MUSIK': '/src/assets/Musik.png',
                    'TV': '/src/assets/Televisi.png',
                    'PAKET_DATA': '/src/assets/Paket Data.png',
                    'VOUCHER_GAME': '/src/assets/Game.png',
                    'VOUCHER_MAKANAN': '/src/assets/Voucher Makanan.png',
                    'QURBAN': '/src/assets/Kurban.png',
                    'ZAKAT': '/src/assets/Zakat.png',
                  };
                  e.currentTarget.src = iconMap[selectedService.service_code] || '/src/assets/Logo.png';
                }}
              />
              <h3 className="service-name-large">{selectedService.service_name}</h3>
            </div>
          )}

          <div className="payment-form">
            <div className="input-group">
              <span className="input-icon"><MdCreditCard /></span>
              <input
                type="text"
                className="payment-input"
                value={selectedService ? formatCurrency(selectedService.service_tariff) : ''}
                readOnly
                disabled
              />
            </div>

            <button
              className="btn-payment"
              onClick={handlePaymentClick}
              disabled={isLoading || !selectedService}
            >
              {isLoading ? 'Processing...' : 'Bayar'}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedService && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon modal-icon-confirm">
              <img src={Logo} alt="Logo" className="icon-logo-img" />
            </div>
            <p className="modal-text">Beli {selectedService.service_name} senilai</p>
            <h3 className="modal-amount">Rp{formatCurrency(selectedService.service_tariff)} ?</h3>
            <button className="modal-btn modal-btn-primary" onClick={handleConfirm}>
              Ya, lanjutkan Bayar
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
              {isSuccess ? `Pembayaran ${selectedService?.service_name} sebesar` : `Pembayaran ${selectedService?.service_name} sebesar`}
            </p>
            <h3 className="modal-amount">
              Rp{formatCurrency(transactionAmount)}
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

export default Payment;
