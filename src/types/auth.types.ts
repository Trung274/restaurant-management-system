export interface User {
  _id: string;
  name: string;
  email: string;
  role: {
    _id: string;
    name: string;
    permissions: Permission[];
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  _id: string;
  resource: string;
  action: string;
  description: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
}

export interface RefreshTokenResponse {
  success: boolean;
  data: {
    token: string;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  setUser: (user: User) => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}