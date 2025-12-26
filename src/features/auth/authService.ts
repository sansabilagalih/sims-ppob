import axiosInstance from '../../api/axiosInstance';

interface RegisterData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

interface RegisterResponse {
  status: number;
  message: string;
  data: null;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
  };
}

// Register user
const register = async (userData: RegisterData): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>('/registration', userData);
  return response.data;
};

// Login user
const login = async (userData: LoginData): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/login', userData);
  
  if (response.data.data && response.data.data.token) {
    localStorage.setItem('token', response.data.data.token);
  }
  
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
