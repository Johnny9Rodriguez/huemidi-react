import React from 'react';

const WheelPointer = ({ className, color, left, top, style, prefixCls }) => {
    const styleWarp = {
        ...style,
        position: 'absolute',
        top,
        left,
    };
    const cls = `${prefixCls}-pointer ${className || ''}`;
    return (
        <div className={cls} style={styleWarp}>
            <div
                className={`${prefixCls}-fill`}
                style={{
                    width: 18,
                    height: 18,
                    transform: 'translate(-8px, -8px)',
                    border: '1px solid black',
                    boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.2)',
                    borderRadius: '50%',
                    backgroundColor: color,
                }}
            />
        </div>
    );
};

export default WheelPointer;
