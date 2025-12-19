import type { TableApiData, Table } from '@/types/table.types';

/**
 * Transform API table response to frontend Table format
 */
export const transformTable = (apiTable: TableApiData): Table => {
    const table: Table = {
        id: apiTable._id,
        number: apiTable.number,
        capacity: apiTable.capacity,
        floor: apiTable.floor,
        section: apiTable.section,
        position: apiTable.position,
        status: apiTable.status,
        activeSession: apiTable.activeSession ? {
            currentGuests: apiTable.activeSession.currentGuests,
            orderId: apiTable.activeSession.orderId,
            checkInTime: apiTable.activeSession.checkInTime ? new Date(apiTable.activeSession.checkInTime) : undefined,
            reservationTime: apiTable.activeSession.reservationTime,
            reservedTime: apiTable.activeSession.reservationTime, // Alias
            customerName: apiTable.activeSession.customerName,
            customerPhone: apiTable.activeSession.customerPhone,
        } : null,
    };

    // Add compatibility fields for existing components
    if (apiTable.activeSession) {
        table.currentGuests = apiTable.activeSession.currentGuests;
        table.orderId = apiTable.activeSession.orderId || null;
        table.reservedTime = apiTable.activeSession.reservationTime;

        // Calculate duration if check-in time exists
        if (apiTable.activeSession.checkInTime) {
            const checkInTime = new Date(apiTable.activeSession.checkInTime);
            const now = new Date();
            const diffMs = now.getTime() - checkInTime.getTime();
            const diffMins = Math.floor(diffMs / 60000);

            if (diffMins < 60) {
                table.duration = `${diffMins} phút`;
                if (table.activeSession) {
                    table.activeSession.duration = `${diffMins} phút`;
                }
            } else {
                const hours = Math.floor(diffMins / 60);
                const mins = diffMins % 60;
                table.duration = `${hours} giờ ${mins} phút`;
                if (table.activeSession) {
                    table.activeSession.duration = `${hours} giờ ${mins} phút`;
                }
            }
        }
    } else {
        table.currentGuests = 0;
        table.orderId = null;
        table.duration = null;
    }

    return table;
};

/**
 * Extract error message from API error response
 */
export const getTableErrorMessage = (error: any): string => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.response?.data?.error) {
        return error.response.data.error;
    }

    if (error.message) {
        return error.message;
    }

    return 'Đã xảy ra lỗi không xác định';
};
