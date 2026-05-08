import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAdmin } from './src/context/AdminContext';
import Login from './src/pages/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddItem from './src/pages/AddItem';
import ListItems from './src/pages/ListItems';
import Orders from './src/pages/Orders';
import './App.css';

function App() {
    const { token } = useAdmin();

    if (!token) {
        return (
            <>
                <Login />
                <ToastContainer position="top-right" autoClose={3000} theme="colored" />
            </>
        );
    }

    return (
        <div className="admin-layout">
            <Navbar />
            <div className="admin-body">
                <Sidebar />
                <main className="admin-main">
                    <Routes>
                        <Route path="/" element={<Navigate to="/add" replace />} />
                        <Route path="/add" element={<AddItem />} />
                        <Route path="/list" element={<ListItems />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="*" element={<Navigate to="/add" replace />} />
                    </Routes>
                </main>
            </div>
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </div>
    );
}

export default App;
