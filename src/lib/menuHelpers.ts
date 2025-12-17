import type { MenuItemResponse, MenuItem, MenuItemPayload } from '@/types/menuItem.types';

/**
 * Transform API response to frontend MenuItem
 */
export const transformMenuItem = (apiItem: MenuItemResponse): MenuItem => {
    return {
        id: apiItem._id,
        name: apiItem.name,
        category: apiItem.category,
        price: apiItem.price,
        image: apiItem.image,
        description: apiItem.description,
        rating: apiItem.rating,
        reviews: apiItem.reviews,
        // Map 'discontinued' to 'out_of_stock' for frontend
        status: apiItem.status === 'discontinued' ? 'out_of_stock' : apiItem.status,
        popular: apiItem.popular,
        spicy: apiItem.spicy,
        vegetarian: apiItem.vegetarian,
    };
};

/**
 * Transform frontend form data to API payload
 */
export const transformMenuItemPayload = (formData: any): MenuItemPayload => {
    return {
        name: formData.name.trim(),
        category: formData.category,
        price: typeof formData.price === 'string' ? parseFloat(formData.price) : formData.price,
        image: formData.image.trim(),
        description: formData.description.trim(),
        status: formData.status || 'available', // Include status field
        popular: formData.popular || false,
        spicy: formData.spicy || false,
        vegetarian: formData.vegetarian || false,
    };
};

/**
 * Get user-friendly error message from API error
 */
export const getMenuErrorMessage = (error: any): string => {
    if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;

        switch (status) {
            case 400:
                return message || 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.';
            case 401:
                return 'Bạn cần đăng nhập để thực hiện thao tác này.';
            case 403:
                return 'Bạn không có quyền thực hiện thao tác này.';
            case 404:
                return 'Không tìm thấy món ăn.';
            case 500:
                return 'Lỗi server. Vui lòng thử lại sau.';
            default:
                return message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
        }
    }

    if (error.request) {
        return 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.';
    }

    return error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
};
