import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
    getTables,
    getTableStats,
    createTable,
    updateTable,
    deleteTable,
    checkInTable,
    reserveTable,
    checkoutTable,
    cleanTable,
} from '@/lib/tableService';
import { getTableErrorMessage } from '@/lib/tableHelpers';
import type {
    Table,
    TableStatsResponse,
    TablePayload,
    CheckInPayload,
    ReservePayload,
    TableQueryParams,
} from '@/types/table.types';

interface TablesState {
    tables: Table[];
    stats: TableStatsResponse | null;
    isLoading: boolean;
    error: string | null;
    lastFetched: number | null;

    // Actions
    fetchTables: (params?: TableQueryParams) => Promise<void>;
    fetchStats: () => Promise<void>;
    addTable: (payload: TablePayload) => Promise<Table>;
    editTable: (id: string, payload: Partial<TablePayload>) => Promise<Table>;
    removeTable: (id: string) => Promise<void>;
    checkIn: (id: string, payload: CheckInPayload) => Promise<Table>;
    reserve: (id: string, payload: ReservePayload) => Promise<Table>;
    checkout: (id: string) => Promise<Table>;
    clean: (id: string) => Promise<Table>;
    clearError: () => void;
    refreshData: () => Promise<void>;
}

export const useTablesStore = create<TablesState>()(
    devtools(
        (set, get) => ({
            // Initial state
            tables: [],
            stats: null,
            isLoading: false,
            error: null,
            lastFetched: null,

            // Fetch tables
            fetchTables: async (params?: TableQueryParams) => {
                set({ isLoading: true, error: null });

                try {
                    const { tables } = await getTables(params);
                    set({
                        tables,
                        isLoading: false,
                        lastFetched: Date.now(),
                    });
                } catch (error) {
                    const errorMessage = getTableErrorMessage(error);
                    set({
                        error: errorMessage,
                        isLoading: false,
                    });
                    throw error;
                }
            },

            // Fetch stats
            fetchStats: async () => {
                try {
                    const stats = await getTableStats();
                    set({ stats });
                } catch (error) {
                    console.error('Error fetching table stats:', error);
                    // Don't set error state for stats, just log it
                }
            },

            // Add new table
            addTable: async (payload: TablePayload) => {
                set({ isLoading: true, error: null });

                try {
                    const newTable = await createTable(payload);

                    // Add to tables array
                    set((state) => ({
                        tables: [...state.tables, newTable],
                        isLoading: false,
                    }));

                    // Refresh stats
                    await get().fetchStats();

                    return newTable;
                } catch (error) {
                    const errorMessage = getTableErrorMessage(error);
                    set({
                        error: errorMessage,
                        isLoading: false,
                    });
                    throw error;
                }
            },

            // Edit table
            editTable: async (id: string, payload: Partial<TablePayload>) => {
                set({ isLoading: true, error: null });

                try {
                    const updatedTable = await updateTable(id, payload);

                    // Update in tables array
                    set((state) => ({
                        tables: state.tables.map((table) =>
                            table.id === id ? updatedTable : table
                        ),
                        isLoading: false,
                    }));

                    // Refresh stats
                    await get().fetchStats();

                    return updatedTable;
                } catch (error) {
                    const errorMessage = getTableErrorMessage(error);
                    set({
                        error: errorMessage,
                        isLoading: false,
                    });
                    throw error;
                }
            },

            // Remove table
            removeTable: async (id: string) => {
                set({ isLoading: true, error: null });

                try {
                    await deleteTable(id);

                    // Remove from tables array
                    set((state) => ({
                        tables: state.tables.filter((table) => table.id !== id),
                        isLoading: false,
                    }));

                    // Refresh stats
                    await get().fetchStats();
                } catch (error) {
                    const errorMessage = getTableErrorMessage(error);
                    set({
                        error: errorMessage,
                        isLoading: false,
                    });
                    throw error;
                }
            },

            // Check-in table
            checkIn: async (id: string, payload: CheckInPayload) => {
                set({ isLoading: true, error: null });

                try {
                    const updatedTable = await checkInTable(id, payload);

                    // Update in tables array
                    set((state) => ({
                        tables: state.tables.map((table) =>
                            table.id === id ? updatedTable : table
                        ),
                        isLoading: false,
                    }));

                    // Refresh stats
                    await get().fetchStats();

                    return updatedTable;
                } catch (error) {
                    const errorMessage = getTableErrorMessage(error);
                    set({
                        error: errorMessage,
                        isLoading: false,
                    });
                    throw error;
                }
            },

            // Reserve table
            reserve: async (id: string, payload: ReservePayload) => {
                set({ isLoading: true, error: null });

                try {
                    const updatedTable = await reserveTable(id, payload);

                    // Update in tables array
                    set((state) => ({
                        tables: state.tables.map((table) =>
                            table.id === id ? updatedTable : table
                        ),
                        isLoading: false,
                    }));

                    // Refresh stats
                    await get().fetchStats();

                    return updatedTable;
                } catch (error) {
                    const errorMessage = getTableErrorMessage(error);
                    set({
                        error: errorMessage,
                        isLoading: false,
                    });
                    throw error;
                }
            },

            // Checkout table
            checkout: async (id: string) => {
                set({ isLoading: true, error: null });

                try {
                    const updatedTable = await checkoutTable(id);

                    // Update in tables array
                    set((state) => ({
                        tables: state.tables.map((table) =>
                            table.id === id ? updatedTable : table
                        ),
                        isLoading: false,
                    }));

                    // Refresh stats
                    await get().fetchStats();

                    return updatedTable;
                } catch (error) {
                    const errorMessage = getTableErrorMessage(error);
                    set({
                        error: errorMessage,
                        isLoading: false,
                    });
                    throw error;
                }
            },

            // Clean table
            clean: async (id: string) => {
                set({ isLoading: true, error: null });

                try {
                    const updatedTable = await cleanTable(id);

                    // Update in tables array
                    set((state) => ({
                        tables: state.tables.map((table) =>
                            table.id === id ? updatedTable : table
                        ),
                        isLoading: false,
                    }));

                    // Refresh stats
                    await get().fetchStats();

                    return updatedTable;
                } catch (error) {
                    const errorMessage = getTableErrorMessage(error);
                    set({
                        error: errorMessage,
                        isLoading: false,
                    });
                    throw error;
                }
            },

            // Clear error
            clearError: () => {
                set({ error: null });
            },

            // Refresh all data
            refreshData: async () => {
                await Promise.all([
                    get().fetchTables(),
                    get().fetchStats(),
                ]);
            },
        }),
        { name: 'tables-store' }
    )
);
