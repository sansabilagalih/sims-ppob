import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import TopUp from './pages/TopUp';
import Payment from './pages/Payment';
import TransactionHistory from './pages/TransactionHistory';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route path="/topup" element={<ProtectedRoute><TopUp /></ProtectedRoute>} />
          <Route path="/payment/:serviceCode" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/transaction" element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
