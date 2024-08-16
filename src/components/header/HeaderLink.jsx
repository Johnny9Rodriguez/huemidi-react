import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

function HeaderLink({ name, route, selected, setSelected }) {
    const linkClasses = classNames(
        'w-24 flex items-center justify-center font-normal hover:bg-gradient-to-b hover:from-gray-700 hover:to-gray-600',
        {
            'bg-gradient-to-b from-gray-800 to-gray-700': selected === name,
            'bg-gradient-to-b from-gray-950 to-gray-900': selected !== name,
        }
    );

    return (
        <Link
            to={route}
            className={linkClasses}
            onClick={() => setSelected(name)}
            draggable='false'
        >
            {name}
        </Link>
    );
}

export default HeaderLink;
