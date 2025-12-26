import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { getTransactionHistory, resetTransactions } from '../features/home/homeSlice';
import Navbar from '../components/Navbar';
import BalanceCard from '../components/BalanceCard';
import './TransactionHistory.css';
import ProfilePhoto from '../assets/Profile Photo.png';

const TransactionHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, balance, transactions, transactionOffset, hasMoreTransactions, isLoading } = useSelector(
    (state: RootState) => state.home
  );

  const hasFetched = useRef(false);

  useEffect(() => {
    // Prevent double fetch in React StrictMode
    if (hasFetched.current) return;
    hasFetched.current = true;
    
    // Reset transactions on mount to ensure clean state
    dispatch(resetTransactions());
    // Load initial transactions
    dispatch(getTransactionHistory({ offset: 0, limit: 5 }));
  }, [dispatch]);

  const handleShowMore = () => {
    dispatch(getTransactionHistory({ offset: transactionOffset, limit: 5 }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} ${year} ${hours}:${minutes} WIB`;
  };

  return (
    <div className="transaction-history-page">
      <Navbar />
      
      <BalanceCard 
        balance={balance}
        firstName={profile?.first_name || 'User'}
        lastName={profile?.last_name || ''}
        profileImage={profile?.profile_image || ProfilePhoto}
      />

      <div className="transaction-content">
        <h2 className="transaction-title">Semua Transaksi</h2>

        {transactions.length === 0 && !isLoading ? (
          <div className="empty-state">
            <p className="empty-text">Maaf tidak ada histori transaksi saat ini</p>
          </div>
        ) : (
          <>
            <div className="transaction-list">
              {transactions.map((transaction, index) => (
                <div key={`${transaction.invoice_number}-${index}`} className="transaction-item">
                  <div className="transaction-info">
                    <div className={`transaction-amount ${transaction.transaction_type === 'TOPUP' ? 'positive' : 'negative'}`}>
                      {transaction.transaction_type === 'TOPUP' ? '+' : '-'} Rp{formatCurrency(transaction.total_amount)}
                    </div>
                    <div className="transaction-date">{formatDate(transaction.created_on)}</div>
                  </div>
                  <div className="transaction-description">{transaction.description}</div>
                </div>
              ))}
            </div>

            {hasMoreTransactions && (
              <div className="show-more-container">
                <button 
                  className="btn-show-more" 
                  onClick={handleShowMore}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Show more'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
