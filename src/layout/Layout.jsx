// src/components/Layout.jsx
import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className='flex flex-col h-screen font-kanit font-light bg-gray-950 text-white select-none border border-gray-700'>
            <Header />
            <main className='flex-grow overflow-hidden'>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
