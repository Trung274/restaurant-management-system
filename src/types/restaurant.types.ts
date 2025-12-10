export interface Restaurant {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  openTime: string; // Format: "HH:MM"
  closeTime: string; // Format: "HH:MM"
  description?: string;
  logo?: string;
  isActive: boolean;
  isOpen: boolean; // Virtual field from backend
  createdAt: string;
  updatedAt: string;
  updatedBy?: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface RestaurantResponse {
  success: boolean;
  message?: string;
  data: Restaurant;
}

export interface UpdateRestaurantData {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  openTime?: string;
  closeTime?: string;
  description?: string;
  logo?: string;
  isActive?: boolean;
}

export interface RestaurantState {
  restaurant: Restaurant | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchRestaurant: () => Promise<void>;
  updateRestaurant: (data: UpdateRestaurantData) => Promise<void>;
  clearError: () => void;
}