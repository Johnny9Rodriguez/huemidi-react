// src/components/Layout.jsx
import React from 'react';
import SetupHeader from './SetupHeader';

function SetupLayout() {
    return (
        <div className='flex flex-col h-screen font-kanit font-light bg-gray-950 text-white select-none border border-gray-700'>
            <SetupHeader />
            <main className='flex-grow overflow-hidden'>Setup</main>
        </div>
    );
}

export default SetupLayout;
