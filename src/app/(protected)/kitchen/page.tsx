'use client';

import { useState, useEffect } from 'react';
import { orders as mockOrders, Order, OrderItem } from '../orders/mockData';
import PageHeader from '@/components/ui/PageHeader';
import {
    FireIcon,
    CheckCircleIcon,
    ClockIcon,
    UserCircleIcon,
    EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    defaultDropAnimationSideEffects,
    DropAnimation,
    useDroppable,
} from '@dnd-kit/core';
import {
    sortableKeyboardCoordinates,
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates as defaultSortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function KitchenPage() {
    const [items, setItems] = useState<Order[]>(mockOrders);
    const [activeId, setActiveId] = useState<string | null>(null);

    // Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5 // drag after 5px movement
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const pendingOrders = items.filter(o => o.status === 'pending');
    const cookingOrders = items.filter(o => o.status === 'in-progress');
    const readyOrders = items.filter(o => o.status === 'ready');

    const findContainer = (id: string): string | undefined => {
        if (items.find(item => item.id === id)) {
            return items.find(item => item.id === id)?.status;
        }
        return undefined;
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id as string);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        const overId = over?.id;

        if (!overId || active.id === overId) return;

        // Find the containers
        const activeContainer = findContainer(active.id as string);
        // If over a container directly (e.g. empty column), use its id as status
        // If over an item, use its status
        const overOrder = items.find(item => item.id === overId);
        const overContainer = overOrder ? overOrder.status : (overId as string);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        // Move logic
        setItems((prev) => {
            const activeItems = prev.filter(item => item.id === active.id);
            const activeItemIndex = prev.findIndex(item => item.id === active.id);

            // Create a new array with the updated status
            const newItems = [...prev];
            // Map the container ID back to the status logic
            // Note: In our Kanban, the container IDs match the status strings perfectly or align with them
            let newStatus = overContainer;
            if (newStatus === 'pending' || newStatus === 'in-progress' || newStatus === 'ready') {
                newItems[activeItemIndex] = {
                    ...newItems[activeItemIndex],
                    status: newStatus as any
                };
            }

            return newItems;
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const overId = over?.id;

        if (!overId) {
            setActiveId(null);
            return;
        }

        const activeContainer = findContainer(active.id as string);
        const overOrder = items.find(item => item.id === overId);
        let overContainerStatus = overOrder ? overOrder.status : (overId as string);

        // Ensure status consistency
        if (activeContainer && overContainerStatus && activeContainer !== overContainerStatus) {
            if (overContainerStatus === 'pending' || overContainerStatus === 'in-progress' || overContainerStatus === 'ready') {
                setItems((prev) => {
                    const activeIndex = prev.findIndex((item) => item.id === active.id);
                    const newItems = [...prev];
                    newItems[activeIndex] = {
                        ...newItems[activeIndex],
                        status: overContainerStatus as any
                    };
                    return newItems;
                });
            }
        }

        setActiveId(null);
    };

    const dropAnimation: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
                <PageHeader
                    theme="red"
                    badgeText="Kitchen Display System"
                    titleVietnamese="Màn hình bếp"
                    titleEnglish="Kitchen Display"
                    description="Kéo thả để cập nhật trạng thái đơn hàng"
                />

                {/* Kanban Board */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    <KitchenColumn
                        id="pending" // Status matching mockData Order['status']
                        title="Mới / Chờ xác nhận"
                        orders={pendingOrders}
                        icon={ClockIcon}
                        color="blue"
                        badgeCount={pendingOrders.length}
                    />

                    <KitchenColumn
                        id="in-progress"
                        title="Đang chế biến"
                        orders={cookingOrders}
                        icon={FireIcon}
                        color="orange"
                        badgeCount={cookingOrders.length}
                    />

                    <KitchenColumn
                        id="ready"
                        title="Sẵn sàng phục vụ"
                        orders={readyOrders}
                        icon={CheckCircleIcon}
                        color="green"
                        badgeCount={readyOrders.length}
                    />
                </div>

                <DragOverlay dropAnimation={dropAnimation}>
                    {activeId ? (
                        <div className="transform rotate-3 cursor-grabbing">
                            <KitchenTicket
                                order={items.find(i => i.id === activeId)!}
                                color={
                                    items.find(i => i.id === activeId)?.status === 'pending' ? 'blue' :
                                        items.find(i => i.id === activeId)?.status === 'in-progress' ? 'orange' : 'green'
                                }
                                isOverlay
                            />
                        </div>
                    ) : null}
                </DragOverlay>
            </div>
        </DndContext>
    );
}

function KitchenColumn({
    id,
    title,
    orders,
    icon: Icon,
    color,
    badgeCount
}: {
    id: string;
    title: string;
    orders: Order[];
    icon: any;
    color: 'blue' | 'orange' | 'green';
    badgeCount: number;
}) {
    const colorStyles = {
        blue: {
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            text: 'text-blue-400',
            headerBg: 'from-blue-600/20 to-cyan-600/20',
        },
        orange: {
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20',
            text: 'text-orange-400',
            headerBg: 'from-orange-600/20 to-amber-600/20',
        },
        green: {
            bg: 'bg-green-500/10',
            border: 'border-green-500/20',
            text: 'text-green-400',
            headerBg: 'from-green-600/20 to-emerald-600/20',
        }
    };

    const style = colorStyles[color];
    const { setNodeRef } = useDroppable({ id });

    // Using SortableContext to allow sorting inside the column
    return (
        <div className="flex flex-col h-full">
            <div className={`p-4 rounded-t-2xl bg-gradient-to-r ${style.headerBg} border-t border-x ${style.border} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${style.text}`} />
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full ${style.bg} ${style.text} font-bold text-sm border ${style.border}`}>
                    {badgeCount}
                </span>
            </div>

            <SortableContext
                id={id} // This ID makes the column itself a container
                items={orders.map(o => o.id)}
            >
                <div
                    ref={setNodeRef}
                    className={`flex-1 p-4 bg-white/5 border-x border-b border-white/10 rounded-b-2xl space-y-4 min-h-[500px]`}
                >
                    {orders.map(order => (
                        <KitchenTicket key={order.id} order={order} color={color} />
                    ))}
                    {orders.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50 py-10">
                            <Icon className="w-12 h-12 mb-2" />
                            <p className="text-sm">Thả đơn hàng vào đây</p>
                        </div>
                    )}
                </div>
            </SortableContext>
        </div>
    );
}

function KitchenTicket({ order, color, isOverlay }: { order: Order, color: string, isOverlay?: boolean }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: order.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    // Helper to format time relative
    const getTimeAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        return `${mins} phút trước`;
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`bg-gray-800 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all group shadow-lg ${isOverlay ? 'shadow-2xl ring-2 ring-blue-500/50 cursor-grabbing' : 'cursor-grab hover:bg-gray-700/50'}`}
        >
            {/* Header Ticket */}
            <div className="flex justify-between items-start mb-3 pb-3 border-b border-white/5">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-white">{order.tableName}</span>
                        <span className="text-xs text-gray-400">#{order.id}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                        <UserCircleIcon className="w-3 h-3" />
                        {order.customerName}
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-yellow-400 font-medium bg-yellow-400/10 px-2 py-1 rounded-lg">
                        <ClockIcon className="w-3 h-3" />
                        {getTimeAgo(order.orderTime)}
                    </div>
                </div>
            </div>

            {/* Items List */}
            <div className="space-y-2 mb-4">
                {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start text-sm">
                        <div className="flex items-start gap-2">
                            <span className="font-bold text-white w-5 text-center bg-white/10 rounded">{item.quantity}</span>
                            <div className="flex flex-col">
                                <span className="text-gray-200">
                                    {item.name}
                                </span>
                                {item.note && (
                                    <span className="text-xs text-red-400 italic">Note: {item.note}</span>
                                )}
                            </div>
                        </div>
                        {/* Item status indicator removed */}
                    </div>
                ))}
            </div>

            {/* Actions Footer */}
            {!isOverlay && (
                <div className="pt-2 flex justify-end gap-2">
                    <button className="text-xs font-medium text-gray-400 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer">
                        Chi tiết
                    </button>
                </div>
            )}
        </div>
    );
}