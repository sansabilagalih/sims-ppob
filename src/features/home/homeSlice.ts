import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import homeService, { ProfileData, ServiceData, BannerData, TransactionRecord } from './homeService';

interface HomeState {
  profile: ProfileData | null;
  balance: number;
  services: ServiceData[];
  banners: BannerData[];
  transactions: TransactionRecord[];
  transactionOffset: number;
  hasMoreTransactions: boolean;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: HomeState = {
  profile: null,
  balance: 0,
  services: [],
  banners: [],
  transactions: [],
  transactionOffset: 0,
  hasMoreTransactions: true,
  isLoading: false,
  isError: false,
  message: '',
};

// Get profile
export const getProfile = createAsyncThunk(
  'home/getProfile',
  async (_, thunkAPI) => {
    try {
      const response = await homeService.getProfile();
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat mengambil profile';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get balance
export const getBalance = createAsyncThunk(
  'home/getBalance',
  async (_, thunkAPI) => {
    try {
      const response = await homeService.getBalance();
      return response.data.balance;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat mengambil saldo';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get services
export const getServices = createAsyncThunk(
  'home/getServices',
  async (_, thunkAPI) => {
    try {
      const response = await homeService.getServices();
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat mengambil layanan';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get banners
export const getBanners = createAsyncThunk(
  'home/getBanners',
  async (_, thunkAPI) => {
    try {
      const response = await homeService.getBanners();
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat mengambil banner';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Top up balance
export const topUp = createAsyncThunk(
  'home/topUp',
  async (amount: number, thunkAPI) => {
    try {
      const response = await homeService.topUp(amount);
      return response.data.balance;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat top up';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Make transaction
export const makeTransaction = createAsyncThunk(
  'home/makeTransaction',
  async (serviceCode: string, thunkAPI) => {
    try {
      const response = await homeService.makeTransaction(serviceCode);
      // Also get updated balance
      const balanceResponse = await homeService.getBalance();
      return {
        transaction: response.data,
        balance: balanceResponse.data.balance,
      };
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat transaksi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get transaction history
export const getTransactionHistory = createAsyncThunk(
  'home/getTransactionHistory',
  async ({ offset, limit }: { offset: number; limit: number }, thunkAPI) => {
    try {
      const response = await homeService.getTransactionHistory(offset, limit);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat mengambil riwayat transaksi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  'home/updateProfile',
  async ({ first_name, last_name }: { first_name: string; last_name: string }, thunkAPI) => {
    try {
      const response = await homeService.updateProfile({ first_name, last_name });
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat update profile';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Upload profile image
export const uploadProfileImage = createAsyncThunk(
  'home/uploadProfileImage',
  async (file: File, thunkAPI) => {
    try {
      const response = await homeService.uploadProfileImage(file);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat upload gambar';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
    resetTransactions: (state) => {
      state.transactions = [];
      state.transactionOffset = 0;
      state.hasMoreTransactions = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Get Balance
      .addCase(getBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Get Services
      .addCase(getServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Get Banners
      .addCase(getBanners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.banners = action.payload;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Top Up
      .addCase(topUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(topUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload;
        state.message = 'Top Up berhasil';
      })
      .addCase(topUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Make Transaction
      .addCase(makeTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload.balance;
        state.message = 'Transaksi berhasil';
      })
      .addCase(makeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Get Transaction History
      .addCase(getTransactionHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactionHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.offset === 0) {
          // Initial load
          state.transactions = action.payload.records;
        } else {
          // Load more
          state.transactions = [...state.transactions, ...action.payload.records];
        }
        state.transactionOffset = action.payload.offset + action.payload.records.length;
        // Show "Show more" button only if we received exactly the limit amount
        // This means there might be more data
        state.hasMoreTransactions = action.payload.records.length >= action.payload.limit;
      })
      .addCase(getTransactionHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.message = 'Update Profile berhasil';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Upload Profile Image
      .addCase(uploadProfileImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.message = 'Update Profile Image berhasil';
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset, resetTransactions } = homeSlice.actions;
export default homeSlice.reducer;
