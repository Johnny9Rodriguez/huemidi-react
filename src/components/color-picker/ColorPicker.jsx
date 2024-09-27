import React, { useEffect, useState, useRef } from 'react';
import useOnClickOutside from '../../hooks/useCloseOnClickOutside';
import useStaticDataStore from '../../stores/staticDataStore';
import useLightUpdater from '../../hooks/useLightUpdater';
import ColorModeButton from './ColorModeButton';
import Wheel from '@uiw/react-color-wheel';
import WheelPointer from './WheelPointer';
import ColorTempSlider from './ColorTempSlider';
import { getWhiteColor } from '../../utils/colorConvert';

function ColorPicker({ updateCachedLights }) {
    const { selectedResource, setShowColorPicker } = useStaticDataStore();
    // prettier-ignore
    const handleLightUpdate = useLightUpdater(updateCachedLights, selectedResource);

    const [wheelColor, setWheelColor] = useState('#ffffff');
    const [colorTemp, setColorTemp] = useState(326); // Math.floor((500 - 153) / 2) + 153
    const [colorMode, setColorMode] = useState(null);
    const colorPicker = useRef(null);

    useOnClickOutside(colorPicker, () => setShowColorPicker(false));

    // Init color picker.
    useEffect(() => {
        if (!selectedResource) return;

        const initColorPicker = (light) => {
            const mode = light.state.color.mode;
            setColorMode(mode);
            if (mode === 'rgb') {
                setWheelColor(light.state.color.hex);
            } else {
                const mirek = light.state.color.mirek;
                setColorTemp(mirek);
                setWheelColor(getWhiteColor(mirek));
            }
        };

        const { type, resource } = selectedResource;
        const light =
            type === 'single'
                ? resource
                : resource.find((light) => light.state.on || resource[0]);
        initColorPicker(light);
    }, [selectedResource]);

    const handleColorChange = async (value) => {
        const hex = value.hex;
        setWheelColor(hex);
        setColorTemp(326); // Reset on selecting RGB color.

        await handleLightUpdate({
            on: true,
            color: { hex, mirek: null, mode: 'rgb' },
        });
    };

    const handleColorTempChange = async (e) => {
        const mirek = e.target.value;
        const hex = getWhiteColor(mirek);
        setWheelColor(hex);
        setColorTemp(mirek);

        await handleLightUpdate({
            on: true,
            color: { hex, mirek, mode: 'white' },
        });
    };

    return (
        <div
            className='px-4 pt-2 pb-4 mx-auto mt-20 w-min flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 shadow-lg'
            ref={colorPicker}
        >
            <div className='flex flex-row justify-center'>
                <ColorModeButton
                    name='RGB'
                    colorMode={colorMode}
                    setColorMode={setColorMode}
                />
                <ColorModeButton
                    name='White'
                    colorMode={colorMode}
                    setColorMode={setColorMode}
                />
            </div>
            {colorMode === 'rgb' && (
                <Wheel
                    color={wheelColor}
                    onChange={handleColorChange}
                    pointer={WheelPointer}
                    width={180}
                    height={180}
                />
            )}
            {colorMode === 'white' && (
                <ColorTempSlider
                    value={colorTemp}
                    onChange={handleColorTempChange}
                />
            )}
            <button
                className='px-2 w-min text-white border bg-gray-900 border-gray-700 hover:bg-gray-700 hover:cursor-pointer'
                onClick={() => setShowColorPicker(false)}
            >
                Close
            </button>
        </div>
    );
}

export default ColorPicker;
