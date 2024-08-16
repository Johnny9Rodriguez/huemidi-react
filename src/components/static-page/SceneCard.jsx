import React, { useEffect, useState, useRef } from 'react';
import { MdEdit, MdSave, MdDelete } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import useOnClickOutside from '../../hooks/useCloseOnClickOutside';

function SceneCard({ scene }) {
    const [name, setName] = useState(scene.name);
    const [showOptions, setShowOptions] = useState(false);
    const [editName, setEditName] = useState(false);
    const [saved, setSaved] = useState(true);
    const cardRef = useRef(null);
    const inputRef = useRef(null);

    useOnClickOutside(cardRef.current, () => {
        setShowOptions(false);
        setEditName(false);
    });

    useEffect(() => {
        if (editName && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(name.length, name.length);
        }

        if (!editName) {
            // Trim whitespaces after user finished editing.
            const trimmedName = name.trim();
            setName(trimmedName);

            // Reset scene name to original name if user enters empty string.
            if (trimmedName === '') {
                setName(scene.name);
                setSaved(true);
            }
        }
    }, [editName, name, scene]);

    const bgColor = () => {
        if (scene.palette.length > 1) {
            return `linear-gradient(45deg, ${scene.palette})`;
        } else {
            return scene.palette[0];
        }
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);

        const state = newName.localeCompare(scene.name) === 0;
        setSaved(state);
    };

    const handleInputKeys = (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            setEditName(false);
        }
    };

    // const handleSave = () => {
    //     if (saved) return;

    //     // check name empty

    //     setSaved(true);
    // };

    const renderName = () => {
        if (editName) {
            return (
                <input
                    type='text'
                    className='scene-card-name'
                    value={name}
                    onChange={handleNameChange}
                    onKeyDown={handleInputKeys}
                    spellCheck={false}
                    ref={inputRef}
                />
            );
        } else {
            return (
                <div className='w-full flex gap-1'>
                    <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
                        {name}
                    </div>

                    {!saved && '*'}
                </div>
            );
        }
    };

    const renderOptions = () => {
        return (
            <div className='absolute right-[-1px] top-full z-20 p-1.5 flex items-center gap-2 bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-700 box-content'>
                <MdEdit
                    className='text-gray-500 hover:text-gray-200'
                    onClick={() => setEditName(true)}
                />
                <MdSave
                    className=' text-gray-500 hover:text-gray-200'
                    // onClick={handleSave}
                />
                <MdDelete className=' text-gray-500 hover:text-red-500' />
            </div>
        );
    };

    return (
        <div
            className='relative pl-2 pr-1 py-1 flex flex-row items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:cursor-pointer'
            ref={cardRef}
        >
            <div className='w-full overflow-hidden'>{renderName()}</div>
            <div className='flex items-center justify-end gap-2'>
                <div
                    className='w-6 h-6 rounded-full border border-gray-600'
                    style={{
                        background: bgColor(),
                    }}
                />
                <div
                    className='text-xl text-gray-500 hover:text-gray-200'
                    onClick={() => setShowOptions(!showOptions)}
                >
                    <MdKeyboardArrowDown
                        className={`${
                            showOptions && 'rotate-180'
                        } transition-transform`}
                    />
                </div>
            </div>
            {showOptions && renderOptions()}
        </div>
    );
}

export default SceneCard;
