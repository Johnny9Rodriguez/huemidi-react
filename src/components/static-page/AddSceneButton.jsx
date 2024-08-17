import React from 'react';
import { BiPlus } from 'react-icons/bi';

function AddSceneButton() {
    return (
        <div className='w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-200 bg-gray-900 border border-gray-700 hover:cursor-pointer hover:bg-gray-800'>
            <BiPlus />
        </div>
    );
}

export default AddSceneButton;
