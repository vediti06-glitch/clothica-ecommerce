import React from 'react';
import { toast } from 'react-toastify';
import { useAdmin } from '../context/AdminContext';
import './Orders.css';

const ORDER_STATUSES = [
    'Order Placed',
    'Packing',
    'Shipped',
    'Out for Delivery',
    'Delivered',
];

const statusConfig = {
    'Order Placed': { color: 'badge-info', icon: '📋' },
    'Packing': { color: 'badge-warning', icon: '📦' },
    'Shipped': { color: 'badge-purple', icon: '🚚' },
    'Out for Delivery': { color: 'badge-pink', icon: '🏍️' },
    'Delivered': { color: 'badge-success', icon: '✅' },
};

const paymentConfig = {
    'UPI': { bg: '#e0f2fe', color: '#0369a1' },
    'Credit Card': { bg: '#ede9fe', color: '#7c3aed' },
    'COD': { bg: '#fef3c7', color: '#d97706' },
    'Net Banking': { bg: '#d1fae5', color: '#059669' },
};

const Orders = () => {
    const { orders, setOrders } = useAdmin();

    const updateStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        toast.success(`Order ${orderId} status updated to "${newStatus}"`);
    };

    return (
        <div className="orders-page">
            <div className="page-header">
                <h1>Orders</h1>
                <p>{orders.length} order{orders.length !== 1 ? 's' : ''} total</p>
            </div>

            {orders.length === 0 ? (
                <div className="empty-state card">
                    <div className="empty-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </div>
                    <h3>No Orders Yet</h3>
                    <p>Customer orders will appear here once they start shopping</p>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order, index) => {
                        const cfg = statusConfig[order.status] || statusConfig['Order Placed'];
                        const pm = paymentConfig[order.paymentMethod] || { bg: '#f3f4f6', color: '#6b7280' };
                        return (
                            <div key={order.id} className="order-card card" style={{ animationDelay: `${index * 0.06}s` }}>

                                {/* Order Header */}
                                <div className="order-header">
                                    <div className="order-id-wrap">
                                        <span className="order-icon">🛍️</span>
                                        <div>
                                            <div className="order-id">{order.id}</div>
                                            <div className="order-date">📅 {order.date}</div>
                                        </div>
                                    </div>
                                    <div className="order-header-right">
                                        <span style={{ background: pm.bg, color: pm.color }} className="payment-badge">
                                            💳 {order.paymentMethod}
                                        </span>
                                        <span className="order-total">₹{order.total.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                <div className="order-body">
                                    {/* Customer Info */}
                                    <div className="order-section">
                                        <h4 className="order-section-title">Customer Details</h4>
                                        <div className="customer-info">
                                            <div className="customer-avatar">{order.customer.name.charAt(0)}</div>
                                            <div className="customer-data">
                                                <div className="customer-name">{order.customer.name}</div>
                                                <div className="customer-contact">
                                                    <span>✉️ {order.customer.email}</span>
                                                    <span>📞 {order.customer.phone}</span>
                                                </div>
                                                <div className="customer-address">
                                                    📍 {order.address.street}, {order.address.city}, {order.address.state} – {order.address.zip}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Items */}
                                    <div className="order-section">
                                        <h4 className="order-section-title">Items Ordered ({order.items.reduce((a, i) => a + i.qty, 0)} items)</h4>
                                        <div className="items-list">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="order-item">
                                                    <div className="item-thumb">{item.name.charAt(0)}</div>
                                                    <div className="item-details">
                                                        <div className="item-name">{item.name}</div>
                                                        <div className="item-meta">
                                                            <span className="size-chip">Size: {item.size}</span>
                                                            <span className="item-qty">Qty: {item.qty}</span>
                                                        </div>
                                                    </div>
                                                    <div className="item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="order-section order-status-section">
                                        <h4 className="order-section-title">Order Status</h4>
                                        <div className="status-row">
                                            {/* Progress Track */}
                                            <div className="status-track">
                                                {ORDER_STATUSES.map((s, i) => {
                                                    const currentIdx = ORDER_STATUSES.indexOf(order.status);
                                                    const isActive = i === currentIdx;
                                                    const isDone = i < currentIdx;
                                                    return (
                                                        <div key={s} className={`track-step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}>
                                                            <div className="track-dot" />
                                                            <div className="track-label">{s}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Status Dropdown */}
                                            <div className="status-dropdown-wrap">
                                                <label className="status-dropdown-label">Update Status</label>
                                                <select
                                                    className="status-dropdown"
                                                    value={order.status}
                                                    onChange={(e) => updateStatus(order.id, e.target.value)}
                                                >
                                                    {ORDER_STATUSES.map(s => (
                                                        <option key={s} value={s}>{statusConfig[s]?.icon} {s}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Orders;
