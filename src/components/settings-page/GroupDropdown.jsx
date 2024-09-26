import React, { useState, useRef } from 'react';
import useOnClickOutside from '../../hooks/useCloseOnClickOutside';
import { MdKeyboardArrowDown } from 'react-icons/md';

function GroupDropdown({ cachedLightGroups, preferredGroup, setPreferredGroup }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useOnClickOutside(dropdownRef, () => setIsOpen(false));

    const option = (name, type) => {
        return (
            <div className='w-full flex items-center justify-between'>
                <div className='w-36 overflow-hidden whitespace-nowrap text-ellipsis'>
                    {name}
                </div>
                {type !== 'bridge_home' && typeLabel(type)}
            </div>
        );
    };

    const typeLabel = (type) => {
        return (
            <div className='w-12 flex items-center justify-center font-kanit font-normal text-sm text-gray-950 bg-gray-300 rounded-md'>
                {type}
            </div>
        );
    };

    const renderOptions = () => {
        if (!isOpen) return null;

        return (
            <ul className='absolute w-full z-30 bg-gradient-to-b from-gray-700 to-gray-800 border border-t-0 border-gray-600'>
                {cachedLightGroups.map((group) => {
                    const id = group.id;
                    const name = group.name;
                    const type = group.type;

                    return (
                        <li
                            key={id}
                            className='px-2 h-8 flex items-center hover:bg-gray-600'
                            onClick={() => {
                                // Set preference
                            }}
                        >
                            {option(name, type)}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div
            className='relative flex-shrink-0 w-64 h-8 hover:cursor-pointer'
            ref={dropdownRef}
        >
            <div
                className='px-2 h-8 w-full flex flex-row items-center justify-between gap-2 bg-gray-700 border border-gray-600  hover:bg-gray-600'
                onClick={() => setIsOpen(!isOpen)}
            >
                {preferredGroup &&
                    option(preferredGroup.name, preferredGroup.type)}
                {!preferredGroup && <div>No Groups</div>}
                <MdKeyboardArrowDown
                    className={`${
                        isOpen && 'rotate-180'
                    } transition-transform text-2xl`}
                />
            </div>
            {renderOptions()}
        </div>
    );
}

export default GroupDropdown;
