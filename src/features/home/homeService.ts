import axiosInstance from '../../api/axiosInstance';

// Profile interfaces
export interface ProfileData {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

interface ProfileResponse {
  status: number;
  message: string;
  data: ProfileData;
}

// Balance interfaces
interface BalanceData {
  balance: number;
}

interface BalanceResponse {
  status: number;
  message: string;
  data: BalanceData;
}

// Services interfaces
export interface ServiceData {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

interface ServicesResponse {
  status: number;
  message: string;
  data: ServiceData[];
}

// Banner interfaces
export interface BannerData {
  banner_name: string;
  banner_image: string;
  description: string;
}

interface BannerResponse {
  status: number;
  message: string;
  data: BannerData[];
}

// Get profile
const getProfile = async (): Promise<ProfileResponse> => {
  const response = await axiosInstance.get<ProfileResponse>('/profile');
  return response.data;
};

// Get balance
const getBalance = async (): Promise<BalanceResponse> => {
  const response = await axiosInstance.get<BalanceResponse>('/balance');
  return response.data;
};

// Get services
const getServices = async (): Promise<ServicesResponse> => {
  const response = await axiosInstance.get<ServicesResponse>('/services');
  return response.data;
};

// Get banners
const getBanners = async (): Promise<BannerResponse> => {
  const response = await axiosInstance.get<BannerResponse>('/banner');
  return response.data;
};

// TopUp response interface
interface TopUpResponse {
  status: number;
  message: string;
  data: {
    balance: number;
  };
}

// Top up balance
const topUp = async (amount: number): Promise<TopUpResponse> => {
  const response = await axiosInstance.post<TopUpResponse>('/topup', {
    top_up_amount: amount,
  });
  return response.data;
};

// Transaction interfaces
interface TransactionResponse {
  status: number;
  message: string;
  data: {
    invoice_number: string;
    service_code: string;
    service_name: string;
    transaction_type: string;
    total_amount: number;
    created_on: string;
  };
}

// Make transaction
const makeTransaction = async (serviceCode: string): Promise<TransactionResponse> => {
  const response = await axiosInstance.post<TransactionResponse>('/transaction', {
    service_code: serviceCode,
  });
  return response.data;
};

// Transaction history interfaces
export interface TransactionRecord {
  invoice_number: string;
  transaction_type: 'TOPUP' | 'PAYMENT';
  description: string;
  total_amount: number;
  created_on: string;
}

interface TransactionHistoryResponse {
  status: number;
  message: string;
  data: {
    offset: number;
    limit: number;
    records: TransactionRecord[];
  };
}

// Get transaction history
const getTransactionHistory = async (offset: number = 0, limit: number = 5): Promise<TransactionHistoryResponse> => {
  const response = await axiosInstance.get<TransactionHistoryResponse>('/transaction/history', {
    params: { offset, limit },
  });
  return response.data;
};

// Update profile interfaces
interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
}

interface UpdateProfileResponse {
  status: number;
  message: string;
  data: ProfileData;
}

// Update profile
const updateProfile = async (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
  const response = await axiosInstance.put<UpdateProfileResponse>('/profile/update', data);
  return response.data;
};

// Upload profile image
const uploadProfileImage = async (file: File): Promise<UpdateProfileResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axiosInstance.put<UpdateProfileResponse>('/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const homeService = {
  getProfile,
  getBalance,
  getServices,
  getBanners,
  topUp,
  makeTransaction,
  getTransactionHistory,
  updateProfile,
  uploadProfileImage,
};

export default homeService;

