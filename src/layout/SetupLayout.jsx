import React from 'react';
import SetupHeader from './SetupHeader';
import SetupPage from '../pages/SetupPage';

function SetupLayout() {
    return (
        <div className='flex flex-col h-screen font-kanit font-light bg-gray-950 text-white select-none border border-gray-700'>
            <SetupHeader />
            <SetupPage />
        </div>
    );
}

export default SetupLayout;
