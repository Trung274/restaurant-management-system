import apiClient from './axios';
import type {
    TableApiResponse,
    TablesApiResponse,
    TableStatsApiResponse,
    DeleteTableApiResponse,
    TableQueryParams,
    TablePayload,
    CheckInPayload,
    ReservePayload,
    UpdateLayoutPayload,
    Table,
    TableStatsResponse,
} from '@/types/table.types';
import { transformTable } from './tableHelpers';

/**
 * Get all tables with optional filters
 */
export const getTables = async (
    params?: TableQueryParams
): Promise<{ tables: Table[]; pagination?: any }> => {
    const response = await apiClient.get<TablesApiResponse>('/tables', {
        params,
    });

    const tables = response.data.data.map(transformTable);
    return {
        tables,
        pagination: response.data.pagination,
    };
};

/**
 * Get a single table by ID
 */
export const getTableById = async (id: string): Promise<Table> => {
    const response = await apiClient.get<TableApiResponse>(`/tables/${id}`);
    return transformTable(response.data.data);
};

/**
 * Get table statistics
 */
export const getTableStats = async (): Promise<TableStatsResponse> => {
    const response = await apiClient.get<TableStatsApiResponse>('/tables/stats');

    const apiData = response.data.data;
    return {
        summary: apiData.summary,
        byFloor: apiData.byFloor.map(floor => ({
            floor: floor._id,
            total: floor.total,
            available: floor.available,
            occupied: floor.occupied,
            reserved: floor.reserved,
            avgCapacity: floor.avgCapacity
        })),
        bySection: apiData.bySection.map(section => ({
            section: section._id,
            total: section.total,
            available: section.available,
            occupied: section.occupied
        }))
    };
};

/**
 * Create a new table (Admin/Manager only)
 */
export const createTable = async (payload: TablePayload): Promise<Table> => {
    const response = await apiClient.post<TableApiResponse>('/tables', payload);
    return transformTable(response.data.data);
};

/**
 * Update an existing table (Admin/Manager only)
 */
export const updateTable = async (
    id: string,
    payload: Partial<TablePayload>
): Promise<Table> => {
    const response = await apiClient.put<TableApiResponse>(`/tables/${id}`, payload);
    return transformTable(response.data.data);
};

/**
 * Delete a table (Admin/Manager only)
 */
export const deleteTable = async (id: string): Promise<void> => {
    await apiClient.delete<DeleteTableApiResponse>(`/tables/${id}`);
};

/**
 * Check-in table (create order and set status to occupied)
 */
export const checkInTable = async (
    id: string,
    payload: CheckInPayload
): Promise<Table> => {
    const response = await apiClient.post<any>(`/tables/${id}/check-in`, payload);
    // Backend returns { success, message, data: { table, order } }
    const tableData = response.data.data?.table || response.data.data;
    return transformTable(tableData);
};

/**
 * Reserve table (set status to reserved with customer info)
 */
export const reserveTable = async (
    id: string,
    payload: ReservePayload
): Promise<Table> => {
    const response = await apiClient.post<any>(`/tables/${id}/reserve`, payload);
    // Backend may return nested structure
    const tableData = response.data.data?.table || response.data.data;
    return transformTable(tableData);
};

/**
 * Checkout table (complete order and set status to cleaning)
 */
export const checkoutTable = async (id: string): Promise<Table> => {
    const response = await apiClient.post<any>(`/tables/${id}/checkout`);
    // Backend returns { success, message, data: { table, order } }
    const tableData = response.data.data?.table || response.data.data;
    return transformTable(tableData);
};

/**
 * Clean table (set status to available)
 */
export const cleanTable = async (id: string): Promise<Table> => {
    const response = await apiClient.post<any>(`/tables/${id}/clean`);
    // Backend may return nested structure
    const tableData = response.data.data?.table || response.data.data;
    return transformTable(tableData);
};

/**
 * Update table layout (bulk update positions for floor plan)
 */
export const updateTableLayout = async (
    updates: UpdateLayoutPayload[]
): Promise<void> => {
    await apiClient.put('/tables/layout', { updates });
};
