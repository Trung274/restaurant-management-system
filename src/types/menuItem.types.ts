export interface MenuItemResponse {
    _id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    rating: number;
    reviews: number;
    status: 'available' | 'out_of_stock' | 'discontinued';
    popular: boolean;
    spicy: boolean;
    vegetarian: boolean;

    estimatedTime?: number;
    createdAt: string;
    updatedAt: string;
}

// Frontend MenuItem (transform từ API response)
export interface MenuItem {
    id: string; // Map từ _id
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    rating: number;
    reviews: number;
    status: 'available' | 'out_of_stock';
    popular: boolean;
    spicy: boolean;
    vegetarian: boolean;

    estimatedTime?: number; // Estimated preparation time in minutes
}

// Create/Update payload
export interface MenuItemPayload {
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    status?: 'available' | 'out_of_stock'; // Optional status field
    popular: boolean;
    spicy: boolean;
    vegetarian: boolean;
}

// Query params
export interface MenuItemQueryParams {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    popular?: boolean;
    vegetarian?: boolean;
    spicy?: boolean;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sort?: string;
}

// Stats response
export interface MenuStatsResponse {
    total: number;
    available: number;
    popular: number;
    out_of_stock: number;
}

// Pagination
export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

// API Response wrappers
export interface MenuItemsApiResponse {
    success: boolean;
    data: MenuItemResponse[];
    pagination?: Pagination;
}

export interface MenuItemApiResponse {
    success: boolean;
    data: MenuItemResponse;
}

export interface MenuStatsApiResponse {
    success: boolean;
    data: MenuStatsResponse;
}

export interface DeleteMenuItemApiResponse {
    success: boolean;
    message: string;
}
