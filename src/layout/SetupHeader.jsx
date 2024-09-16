import React from 'react';
import Logo from '../components/header/Logo';
import { MdClose } from 'react-icons/md';

function SetupHeader() {
    return (
        <>
            <header className='h-10 flex-shrink-0 flex items-center justify-between bg-gradient-to-b from-gray-950 to-gray-900'>
                <div className='drag-area flex-grow px-2 flex justify-start'>
                    <Logo />
                </div>
                <button
                    className={`h-full hover:bg-gradient-to-b hover:to-transparent hover:from-red-800`}
                    onClick={() => {
                        window.controls.close();
                    }}
                >
                    <MdClose className='w-10 h-5' />
                </button>
            </header>
            <div className='flex'>
                <div className='bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 w-full h-[2px]' />
                <div className='bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 w-full h-[2px]' />
                <div className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full h-[2px]' />
                <div className='bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 w-full h-[2px]' />
                <div className='bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 w-full h-[2px]' />
                <div className='bg-gradient-to-r from-orange-500 via-rose-600 to-transparent w-full h-[2px]' />
            </div>
        </>
    );
}

export default SetupHeader;
