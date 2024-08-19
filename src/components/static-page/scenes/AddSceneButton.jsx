import React from 'react';
import useStaticDataStore from '../../../stores/staticDataStore';
import { MODAL_TYPES } from '../../../constants/modalTypes';
import { BiPlus } from 'react-icons/bi';

function AddSceneButton() {
    const { setSelectedResource, setActiveModal } = useStaticDataStore();

    return (
        <button
            className='w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-200 bg-gray-900 border border-gray-700 hover:cursor-pointer hover:bg-gray-800'
            onClick={() => {
                setSelectedResource(null);
                setActiveModal(MODAL_TYPES.CREATE_SCENE);
            }}
        >
            <BiPlus />
        </button>
    );
}

export default AddSceneButton;
