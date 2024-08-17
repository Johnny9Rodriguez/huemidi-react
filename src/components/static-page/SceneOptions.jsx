import React from 'react';
import useStaticDataStore from '../../stores/staticDataStore';
import { MODAL_TYPES } from '../../constants/modalTypes';
import { MdEdit, MdSave, MdDelete } from 'react-icons/md';

function SceneOptions({ setEditName, setFocus, setSaved }) {
    const { setActiveModal } = useStaticDataStore();

    const handleEdit = () => {
        setEditName(true);
        setFocus();
    };

    const handleSave = () => {
        setEditName(false);
        setSaved(true);
    };

    const handleDelete = () => {
        setActiveModal(MODAL_TYPES.DELETE);
    };

    return (
        <div
            className='absolute right-[-1px] top-full z-20 p-1.5 flex items-center gap-2 bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-700 box-content'
            onClick={(e) => e.stopPropagation()}
        >
            <MdEdit
                className='text-gray-500 hover:text-gray-200'
                onClick={handleEdit}
            />
            <MdSave
                className=' text-gray-500 hover:text-gray-200'
                onClick={handleSave}
            />
            <MdDelete
                className=' text-gray-500 hover:text-red-500'
                onClick={handleDelete}
            />
        </div>
    );
}

export default SceneOptions;
