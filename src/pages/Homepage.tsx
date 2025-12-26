import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { getProfile, getBalance, getServices, getBanners } from '../features/home/homeSlice';
import Navbar from '../components/Navbar';
import BalanceCard from '../components/BalanceCard';
import ServiceGrid from '../components/ServiceGrid';
import BannerSlider from '../components/BannerSlider';
import './Homepage.css';
import ProfilePhoto from '../assets/Profile Photo.png';

const Homepage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, balance, services, banners, isLoading } = useSelector(
    (state: RootState) => state.home
  );

  useEffect(() => {
    // Fetch all data on component mount
    dispatch(getProfile());
    dispatch(getBalance());
    dispatch(getServices());
    dispatch(getBanners());
  }, [dispatch]);

  if (isLoading && !profile) {
    return (
      <div className="homepage">
        <Navbar />
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      <Navbar />
      
      <BalanceCard 
        balance={balance}
        firstName={profile?.first_name || 'User'}
        lastName={profile?.last_name || ''}
        profileImage={profile?.profile_image || ProfilePhoto}
      />

      <ServiceGrid services={services} />

      <BannerSlider banners={banners} />
    </div>
  );
};

export default Homepage;
