import React, { useState } from 'react';
import HeaderLink from '../components/header/HeaderLink';
import Logo from '../components/header/Logo';
import WindowControls from '../components/header/WindowControls';

function Header() {
    const [selected, setSelected] = useState('Static');

    const handleSelected = (value) => {
        setSelected(value);
    };

    return (
        <>
            <header className='h-10 flex-shrink-0 flex items-center justify-between bg-gradient-to-b from-gray-950 to-gray-900'>
                <nav className='h-full flex'>
                    <HeaderLink
                        name={'Static'}
                        route={'/'}
                        selected={selected}
                        setSelected={handleSelected}
                    />
                    <HeaderLink
                        name={'Ambient'}
                        route={'/ambient'}
                        selected={selected}
                        setSelected={handleSelected}
                    />
                    <HeaderLink
                        name={'MIDI'}
                        route={'/midi'}
                        selected={selected}
                        setSelected={handleSelected}
                    />
                    <HeaderLink
                        name={'Settings'}
                        route={'/settings'}
                        selected={selected}
                        setSelected={handleSelected}
                    />
                </nav>
                <div className='drag-area flex-grow flex justify-end'>
                    <Logo />
                </div>
                <WindowControls />
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

export default Header;
