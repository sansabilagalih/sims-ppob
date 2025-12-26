import { useNavigate } from 'react-router-dom';
import './ServiceGrid.css';
import { ServiceData } from '../features/home/homeService';

interface ServiceGridProps {
  services: ServiceData[];
}

const ServiceGrid = ({ services }: ServiceGridProps) => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceCode: string) => {
    navigate(`/payment/${serviceCode}`);
  };

  const sortOrder = [
    'PAJAK', 'PLN', 'PULSA', 'PDAM', 
    'PGN', 'TV', 'MUSIK', 'VOUCHER_GAME', 'VOUCHER_MAKANAN', 
    'QURBAN', 'ZAKAT', 'PAKET_DATA', 
    
  ];

  const sortedServices = [...services].sort((a, b) => {
    return sortOrder.indexOf(a.service_code) - sortOrder.indexOf(b.service_code);
  });

  return (
    <div className="service-section">
      <div className="service-grid">
        {sortedServices.map((service) => (
          <div 
            key={service.service_code} 
            className="service-item"
            onClick={() => handleServiceClick(service.service_code)}
          >
            <img 
              src={service.service_icon} 
              alt={service.service_name}
              className="service-icon"
              onError={(e) => {
                // Fallback to local assets if API image fails
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
                e.currentTarget.src = iconMap[service.service_code] || '/src/assets/Logo.png';
              }}
            />
            <p className="service-name">{service.service_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;
