import React from 'react';
import { CgSpinner } from 'react-icons/cg';

function SearchBridge() {
    return (
        <div className='h-full flex flex-col items-center justify-center gap-4'>
            <CgSpinner className='animate-spin text-4xl' />
            <div className='text-gray-400 text-sm'>Searching bridge...</div>
        </div>
    );
}

export default SearchBridge;
