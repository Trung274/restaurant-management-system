export interface TableApiData {
    _id: string;
    number: string;
    capacity: number;
    floor: string;
    section: string;
    position: {
        x: number;
        y: number;
        rotation?: number;
    };
    status: 'available' | 'occupied' | 'reserved' | 'cleaning';
    activeSession?: {
        currentGuests: number;
        orderId?: string;
        checkInTime?: string;
        reservationTime?: string;
        customerName?: string;
        customerPhone?: string;
    } | null;
    createdAt: string;
    updatedAt: string;
}

export interface TableApiResponse {
    success: boolean;
    data: TableApiData;
}

export interface TablesApiResponse {
    success: boolean;
    data: TableApiData[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}

export interface TableStatsApiResponse {
    success: boolean;
    data: {
        summary: {
            totalTables: number;
            availableTables: number;
            occupiedTables: number;
            reservedTables: number;
            cleaningTables: number;
            occupancyRate: string;
        };
        byFloor: Array<{
            _id: string;
            total: number;
            available: number;
            occupied: number;
            reserved: number;
            avgCapacity: number;
        }>;
        bySection: Array<{
            _id: string;
            total: number;
            available: number;
            occupied: number;
        }>;
    };
}

export interface DeleteTableApiResponse {
    success: boolean;
    message: string;
}

// ============================================
// Frontend Types (Transformed)
// ============================================

export type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning';

export interface Table {
    id: string;
    number: string;
    capacity: number;
    floor: string;
    section: string;
    position: {
        x: number;
        y: number;
        rotation?: number;
    };
    status: TableStatus;
    activeSession?: {
        currentGuests: number;
        orderId?: string;
        checkInTime?: Date;
        duration?: string;
        reservationTime?: string;
        reservedTime?: string; // Alias for compatibility
        customerName?: string;
        customerPhone?: string;
    } | null;
    // Compatibility fields for existing components
    currentGuests?: number;
    orderId?: string | null;
    duration?: string | null;
    reservedTime?: string;
}

export interface TableStatsResponse {
    summary: {
        totalTables: number;
        availableTables: number;
        occupiedTables: number;
        reservedTables: number;
        cleaningTables: number;
        occupancyRate: string;
    };
    byFloor: Array<{
        floor: string;
        total: number;
        available: number;
        occupied: number;
        reserved: number;
        avgCapacity: number;
    }>;
    bySection: Array<{
        section: string;
        total: number;
        available: number;
        occupied: number;
    }>;
}

// ============================================
// Request Payload Types
// ============================================

export interface TablePayload {
    number: string;
    capacity: number;
    floor: string;
    section: string;
    position?: {
        x: number;
        y: number;
        rotation?: number;
    };
}

export interface CheckInPayload {
    guests: number;
    note?: string;
}

export interface ReservePayload {
    guests: number;
    reservationTime: string;
    customerName: string;
    customerPhone: string;
    note?: string;
}

export interface TableQueryParams {
    floor?: string;
    section?: string;
    status?: TableStatus;
    capacity?: number;
    page?: number;
    limit?: number;
}

export interface UpdateLayoutPayload {
    tableId: string;
    x: number;
    y: number;
    rotation?: number;
}
