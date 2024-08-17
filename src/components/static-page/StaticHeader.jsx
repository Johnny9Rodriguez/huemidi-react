import React, { useEffect, useState, useRef } from 'react';
import useStaticDataStore from '../../stores/staticDataStore';
import useLightUpdater from '../../hooks/useLightUpdater';
import LightGroupDropdown from './LightGroupDropdown';
import { updateLightResource } from '../../utils/updateLightResource';
import { HiLightBulb } from 'react-icons/hi';
import { MdOutlineBrightness1 } from 'react-icons/md';

function StaticHeader({
    cachedLightGroups,
    cachedLights,
    updateCachedLights,
}) {
    const { setSelectedResource, setShowColorPicker } = useStaticDataStore();

    const handleLightUpdate = useLightUpdater(updateCachedLights, {
        type: 'multi',
        resource: cachedLights,
    });

    const [colors, setColors] = useState([]);
    const [bri, setBri] = useState(50);
    const pendingRequest = useRef(false);

    useEffect(() => {
        // Load unique light colors as array for color box.
        const lightColors = [];
        for (const light of cachedLights) {
            if (!light.state.on) continue;
            const hex = light.state.color.hex;
            if (!lightColors.includes(hex)) {
                lightColors.push(hex);
            }
        }
        if (lightColors.length === 0) lightColors.push('#000000');
        setColors(lightColors);
    }, [cachedLights]);

    const handleToggle = async (state) => {
        if (pendingRequest.current) return;
        pendingRequest.current = true;

        for (const light of cachedLights) {
            if (light.state.on === state) continue;
            const id = light.id;

            await updateLightResource(id, { on: state });
            updateCachedLights(id, { ...light.state, on: state });
        }

        pendingRequest.current = false;
    };

    const handleColorPickerClick = () => {
        // Selects first light that is turned on or first light in group.
        setSelectedResource({ type: 'multi', resource: cachedLights });
        setShowColorPicker(true);
    };

    const handleBrightnessChange = (e) => {
        const brightness = e.target.value / 10;
        setBri(brightness);
        handleLightUpdate({ bri: brightness });
    };

    const btnClasses =
        'w-8 h-8 flex items-center justify-center text-sm bg-gray-700 border border-gray-600';

    return (
        <>
            <div className='px-2 py-2 flex flex-col gap-2 bg-gradient-to-t from-gray-900 to-gray-950'>
                <div className='flex justify-between gap-2'>
                    <div className='flex gap-2'>
                        <button
                            className={`${btnClasses} hover:bg-gray-600`}
                            onClick={() => handleToggle(true)}
                        >
                            <HiLightBulb className='text-xl' />
                        </button>
                        <button
                            className={`${btnClasses} hover:bg-gray-600`}
                            onClick={() => handleToggle(false)}
                        >
                            <MdOutlineBrightness1 className='text-lg' />
                        </button>
                    </div>
                    <div
                        className='flex-grow h-8 border border-gray-600 hover:cursor-pointer hover:border-gray-200'
                        style={{
                            background:
                                colors.length > 1
                                    ? `linear-gradient(90deg, ${colors.join(
                                          ', '
                                      )})`
                                    : colors[0],
                        }}
                        onClick={handleColorPickerClick}
                    />
                    <LightGroupDropdown cachedLightGroups={cachedLightGroups} />
                </div>

                <input
                    type='range'
                    value={bri * 10}
                    onChange={handleBrightnessChange}
                    className='bri-slider flex-grow opacity-50'
                    min='0'
                    max='1000'
                    style={{ '--value': `${bri}%` }}
                />
            </div>
            <div className='flex'>
                <div className='bg-gray-700 w-full h-[1px]' />
            </div>
        </>
    );
}

export default StaticHeader;
