import React from 'react';
import { IoLogoGithub } from 'react-icons/io';
import { MdCopyright } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';

function FooterInfo() {
    const btnClasses = 'text-lg hover:cursor-pointer hover:text-white';

    const openWebsite = () => {
        window.huemidi.settings.openWebsite();
    };

    const openMail = () => {
        window.huemidi.settings.openMail();
    };

    const openGithub = () => {
        window.huemidi.settings.openGithub();
    };

    return (
        <div className='flex gap-2 justify-end text-sm text-gray-400'>
            <div
                className='flex gap-1 items-center hover:cursor-pointer hover:text-white'
                onClick={openWebsite}
            >
                <MdCopyright className='text-base' />
                <div>Joe Pytlik, 2024</div>
            </div>
            <IoMdMail className={btnClasses} onClick={openMail} />
            <IoLogoGithub className={btnClasses} onClick={openGithub} />
        </div>
    );
}

export default FooterInfo;
