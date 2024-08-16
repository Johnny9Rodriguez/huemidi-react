import React, { useEffect, useState, useRef } from 'react';
import useStaticDataStore from '../../stores/staticDataStore';
import useLightUpdater from '../../hooks/useLightUpdater';
import ToggleButton from '../shared/ToggleButton';
import CopyPasteButton from './CopyPasteButton';
import { makeRequest } from '../../utils/updateLightResource';

function LightCard({ light, updateCachedLights }) {
    const { setSelectedResource, setShowColorPicker, clipboard, setClipboard } =
        useStaticDataStore();

    const handleLightUpdate = useLightUpdater(updateCachedLights, {
        type: 'single',
        resource: light,
    });

    const [name, setName] = useState('');
    const [isOn, setIsOn] = useState(false);
    const [color, setColor] = useState('#000000');
    const [bri, setBri] = useState(100);
    const pendingRequest = useRef(false);

    useEffect(() => {
        setName(light.name);
        setIsOn(light.state.on);
        setColor(light.state.color.hex);
        setBri(light.state.bri);
    }, [light]);

    const handleToggle = async (value) => {
        if (pendingRequest.current) return;
        pendingRequest.current = true;

        const id = light.id;

        await makeRequest(id, { on: value });

        updateCachedLights(id, { ...light.state, on: value });
        pendingRequest.current = false;
    };

    const handleColorClick = () => {
        setSelectedResource({ type: 'single', resource: light });
        setShowColorPicker(true);
    };

    const handleBrightnessChange = (e) => {
        const brightness = e.target.value / 10;
        setBri(brightness);
        handleLightUpdate({ on: true, bri: brightness });
    };

    const handleCopy = () => {
        setClipboard({
            on: isOn,
            bri: bri,
            color: { hex: color, mode: light.state.color.mode },
        });
    };

    const handlePaste = () => {
        handleLightUpdate(clipboard);
    };

    return (
        <div className='flex flex-col border border-gray-800'>
            <div className='p-3 flex flex-row items-center justify-between bg-gray-950 hover:bg-gray-900'>
                <div
                    className={`${isOn ? 'text-white' : 'text-white/50'} overflow-hidden whitespace-nowrap text-ellipsis`}
                    style={{
                        transition: 'color 0.1s ease-out',
                    }}
                >
                    {name}
                </div>
                <div className='flex flex-row items-center gap-2 text-xs'>
                    <CopyPasteButton symbol={'C'} onClick={handleCopy} />
                    <CopyPasteButton symbol={'P'} onClick={handlePaste} />
                    <ToggleButton state={isOn} onToggle={handleToggle} />
                    <div
                        className={`w-6 h-6 border border-gray-600 hover:cursor-pointer hover:border-gray-200 ${
                            !isOn && 'opacity-50'
                        }`}
                        style={{
                            background: color,
                            transition:
                                'opacity 0.1s ease-out, background 0.07s linear',
                        }}
                        onClick={handleColorClick}
                    ></div>
                </div>
            </div>
            <input
                type='range'
                value={bri * 10}
                onChange={handleBrightnessChange}
                className='bri-slider'
                min='0'
                max='1000'
                style={{ '--value': `${bri}%` }}
            />
        </div>
    );
}

export default LightCard;
