import React, { useEffect, useState } from 'react';
import { getWhiteColor } from '../../utils/colorConvert';

function ColorTempSlider({ value, onChange }) {
    const [thumbColor, setThumbColor] = useState('#ffd98d');

    useEffect(() => {
        setThumbColor(getWhiteColor(value));
    }, [value]);

    return (
        <input
            value={value}
            onChange={onChange}
            type='range'
            min='153'
            max='500'
            className='ct-slider'
            style={{ '--thumb-color': thumbColor }}
        />
    );
}

export default ColorTempSlider;
