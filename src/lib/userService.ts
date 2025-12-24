import apiClient from './axios';
import type { ChangePasswordPayload, ChangePasswordResponse } from '@/types/auth.types';

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
