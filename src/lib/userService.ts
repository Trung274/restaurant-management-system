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
