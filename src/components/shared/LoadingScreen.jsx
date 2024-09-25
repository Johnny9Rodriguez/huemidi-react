import React from 'react';
import { CgSpinner } from 'react-icons/cg';

function LoadingScreen() {
    return (
        <div className='h-full flex items-center justify-center text-6xl'>
            <CgSpinner className='animate-spin' />
        </div>
    );
}

export default LoadingScreen;
