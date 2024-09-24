import React, { useEffect, useState, useRef } from 'react';

function BridgeLinked() {
    const [timer, setTimer] = useState(5);
    const timerInterval = useRef(null);

    useEffect(() => {
        timerInterval.current = setInterval(() => {
            setTimer((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerInterval.current);
    }, []);

    useEffect(() => {
        if (timer <= 0) {
            clearInterval(timerInterval.current);
            window.huemidi.setup.closeSetup();
        }
    }, [timer]);

    return (
        <div className='h-full p-4 flex flex-col'>
            <div className='text-3xl'>Success!</div>
            <div className='text-gray-400'>
                Hue Bridge linked! HueMIDI will start in {timer} seconds
            </div>
        </div>
    );
}

export default BridgeLinked;
