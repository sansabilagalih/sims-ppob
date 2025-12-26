import { useState, useEffect } from 'react';
import './BannerSlider.css';
import { BannerData } from '../features/home/homeService';

interface BannerSliderProps {
  banners: BannerData[];
}

const BannerSlider = ({ banners }: BannerSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className="banner-section">
      <h3 className="banner-title">Temukan promo menarik</h3>
      <div className="banner-slider">
        <div 
          className="banner-track"
          style={{
            transform: `translateX(-${currentIndex * (300 + 16)}px)`, // 300px width + 16px gap
          }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="banner-item">
              <img 
                src={banner.banner_image} 
                alt={banner.banner_name}
                className="banner-image"
                onError={(e) => {
                  // Fallback to local banner images
                  const localBanners = [
                    '/src/assets/Banner 1.png',
                    '/src/assets/Banner 2.png',
                    '/src/assets/Banner 3.png',
                    '/src/assets/Banner 4.png',
                    '/src/assets/Banner 5.png',
                  ];
                  e.currentTarget.src = localBanners[index % localBanners.length];
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
