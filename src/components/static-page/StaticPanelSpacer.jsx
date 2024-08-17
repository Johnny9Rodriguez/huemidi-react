import React from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

function StaticPanelSpacer() {
    return (
        <div className='flex items-center gap-2 text-gray-400'>
            <div className='h-[1px] w-7 bg-gray-700' />
            <MdKeyboardArrowDown className='text-2xl' />
            <div>Lights</div>
            <div className='h-[1px] w-full bg-gray-700' />
            <div>Scenes</div>
            <MdKeyboardArrowUp className='text-2xl' />
            <div className='h-[1px] w-7 bg-gray-700' />
        </div>
    );
}

export default StaticPanelSpacer;
