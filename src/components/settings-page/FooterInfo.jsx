import React from 'react';
import { IoLogoGithub } from 'react-icons/io';
import { MdCopyright } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';

function FooterInfo() {
    const btnClasses = 'text-lg hover:cursor-pointer hover:text-white';

    return (
        <div className='flex gap-2 justify-end text-sm text-gray-400'>
            <div className='flex gap-1 items-center hover:cursor-pointer hover:text-white'>
                <MdCopyright className='text-base' />
                <div>Joe Pytlik, 2024</div>
            </div>
            <IoMdMail className={btnClasses} />
            <IoLogoGithub className={btnClasses} />
        </div>
    );
}

export default FooterInfo;
