import type { Order, OrderItem, KitchenStatus, Priority } from './order.types';
export type { Order, OrderItem, KitchenStatus, Priority };

export interface KitchenOrder {
    orderId: string;
    tableNumber: string;
    orderTime: string;
    items: OrderItem[];
}

export interface KitchenItemUpdate {
    itemId: string;
    orderId: string;
    priority?: Priority;
}

export interface KitchenStats {
    itemsByStatus: {
        queued: number;
        preparing: number;
        ready: number;
    };
    itemsByStation: Record<string, {
        queued: number;
        preparing: number;
    }>;
    averagePrepTime: number;
    completedToday: number;
}

// API Request/Response types
export interface KitchenQueueApiResponse {
    success: boolean;
    count: number;
    data: Order[];
}

export interface StartItemPayload {
    orderId: string;
}

export interface MarkItemReadyPayload {
    orderId: string;
}

export interface UpdatePriorityPayload {
    orderId: string;
    priority: Priority;
}

export interface ItemUpdateApiResponse {
    success: boolean;
    message: string;
    data: {
        item: OrderItem;
        order: {
            status: string;
            kitchenProgress: number;
        };
    };
}

export interface KitchenStatsApiResponse {
    success: boolean;
    data: KitchenStats;
}

export interface KitchenQueryParams {
    kitchenStatus?: KitchenStatus;
    priority?: Priority;
    sort?: string;
}
