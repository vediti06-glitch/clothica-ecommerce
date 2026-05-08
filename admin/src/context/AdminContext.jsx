import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

// Mock products data
const initialProducts = [
    {
        id: 1,
        name: 'Classic Oxford Shirt',
        description: 'Premium cotton oxford shirt for everyday wear',
        category: 'Men',
        subCategory: 'Topwear',
        price: 1299,
        sizes: ['S', 'M', 'L', 'XL'],
        bestseller: true,
        images: [],
        date: Date.now(),
    },
    {
        id: 2,
        name: 'Floral Summer Dress',
        description: 'Light floral dress perfect for summer outings',
        category: 'Women',
        subCategory: 'Bottomwear',
        price: 1799,
        sizes: ['S', 'M', 'L'],
        bestseller: true,
        images: [],
        date: Date.now(),
    },
    {
        id: 3,
        name: 'Kids Winter Jacket',
        description: 'Cozy and warm jacket for kids in winter',
        category: 'Kids',
        subCategory: 'Winterwear',
        price: 2199,
        sizes: ['S', 'M'],
        bestseller: false,
        images: [],
        date: Date.now(),
    },
];

// Mock orders data
const initialOrders = [
    {
        id: 'ORD-001',
        customer: { name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 9876543210' },
        address: { street: '12 MG Road', city: 'Bengaluru', state: 'Karnataka', zip: '560001' },
        items: [
            { name: 'Classic Oxford Shirt', size: 'L', qty: 2, price: 1299 },
            { name: 'Floral Summer Dress', size: 'M', qty: 1, price: 1799 },
        ],
        total: 4397,
        paymentMethod: 'UPI',
        date: '2026-02-18',
        status: 'Order Placed',
    },
    {
        id: 'ORD-002',
        customer: { name: 'Priya Mehta', email: 'priya@example.com', phone: '+91 9123456780' },
        address: { street: '45 Connaught Place', city: 'New Delhi', state: 'Delhi', zip: '110001' },
        items: [
            { name: 'Kids Winter Jacket', size: 'S', qty: 1, price: 2199 },
        ],
        total: 2199,
        paymentMethod: 'Credit Card',
        date: '2026-02-19',
        status: 'Packing',
    },
    {
        id: 'ORD-003',
        customer: { name: 'Amit Verma', email: 'amit@example.com', phone: '+91 9988776655' },
        address: { street: '78 Park Street', city: 'Kolkata', state: 'West Bengal', zip: '700016' },
        items: [
            { name: 'Classic Oxford Shirt', size: 'M', qty: 3, price: 1299 },
        ],
        total: 3897,
        paymentMethod: 'COD',
        date: '2026-02-17',
        status: 'Shipped',
    },
    {
        id: 'ORD-004',
        customer: { name: 'Sneha Patel', email: 'sneha@example.com', phone: '+91 9000112233' },
        address: { street: '22 SG Highway', city: 'Ahmedabad', state: 'Gujarat', zip: '380015' },
        items: [
            { name: 'Floral Summer Dress', size: 'S', qty: 2, price: 1799 },
            { name: 'Kids Winter Jacket', size: 'M', qty: 1, price: 2199 },
        ],
        total: 5797,
        paymentMethod: 'Net Banking',
        date: '2026-02-15',
        status: 'Delivered',
    },
];

export const AdminProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
    const [products, setProducts] = useState(initialProducts);
    const [orders, setOrders] = useState(initialOrders);

    const logout = () => {
        setToken('');
        localStorage.removeItem('adminToken');
    };

    const login = (t) => {
        setToken(t);
        localStorage.setItem('adminToken', t);
    };

    return (
        <AdminContext.Provider value={{ token, login, logout, products, setProducts, orders, setOrders }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
