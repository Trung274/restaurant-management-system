import apiClient from './axios';
import type {
    ChangePasswordPayload,
    ChangePasswordResponse,
    UpdateUserProfilePayload,
    UpdateUserProfileResponse
} from '@/types/auth.types';

/**
 * Change user password
 * Requires authentication
 */
export const changePassword = async (
    payload: ChangePasswordPayload
): Promise<ChangePasswordResponse> => {
    const response = await apiClient.put<ChangePasswordResponse>(
        '/users/change-password',
        payload
    );
    return response.data;
};

/**
 * Update user profile
 * Requires authentication
 */
export const updateUserProfile = async (
    userId: string,
    payload: UpdateUserProfilePayload
): Promise<UpdateUserProfileResponse> => {
    const response = await apiClient.put<UpdateUserProfileResponse>(
        `/users/${userId}`,
        payload
    );
    return response.data;
};

/**
 * Get all users (Staff list)
 * Requires authentication
 */
export const getAllUsers = async (): Promise<{ success: boolean; data: import('@/types/auth.types').User[] }> => {
    const response = await apiClient.get('/users');
    return response.data;
};

/**
 * Get user statistics
 * Requires Admin/Manager role
 */
export const getUserStats = async (): Promise<import('@/types/auth.types').UserStatsResponse> => {
    const response = await apiClient.get('/users/stats');
    return response.data;
};

/**
 * Create new user (Staff)
 * Requires Admin/Manager role
 */
export const createUser = async (
    payload: import('@/types/auth.types').CreateUserPayload
): Promise<import('@/types/auth.types').CreateUserResponse> => {
    const response = await apiClient.post('/auth/create-user', payload);
    return response.data;
};

/**
 * Delete user (Admin only)
 */
export const deleteUser = async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
};

