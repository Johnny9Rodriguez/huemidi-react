import React from 'react';
import { MdOutlineSquare, MdClose } from 'react-icons/md';
import { VscDash } from 'react-icons/vsc';

function WindowControls() {
    const classes =
        'h-full hover:bg-gradient-to-b hover:from-gray-700 hover:to-transparent';

    return (
        <div className='h-full flex items-center'>
            <button
                className={classes}
                onClick={() => {
                    window.controls.minimize();
                }}
            >
                <VscDash className='w-10 h-7' />
            </button>
            <button
                className={classes}
                onClick={() => {
                    window.controls.maximize();
                }}
            >
                <MdOutlineSquare className='w-10 h-4' />
            </button>
            <button
                className={`${classes} hover:!from-red-800`}
                onClick={() => {
                    window.controls.close();
                }}
            >
                <MdClose className='w-10 h-5' />
            </button>
        </div>
    );
}

export default WindowControls;
