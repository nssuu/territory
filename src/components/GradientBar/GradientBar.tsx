'use client';

import React, { useEffect, useMemo, useRef } from 'react';

import GradientBarAttributes  from './interface/GradientBarAttributes';
import styles from './styles/GradientBar.module.css';


const GradientBar: React.FC<GradientBarAttributes> = ({ id, startColor, endColor, width, height}) => {
    const ref = useRef<HTMLDivElement>(null);
    
    const style = useMemo(
        () => {
            return `
            width: ${width};
            height: ${height};
            background: linear-gradient(to right, white, black); /* fallback color */
            background: linear-gradient(to right, ${startColor}, ${endColor});
            `
        },
        [startColor, endColor, width, height]
    )

    useEffect(
        () => {
            if (ref.current) {
                ref.current.style.cssText = style;
            }
        },
        [ref, style]
    )

    return (
        <div
            ref={ref}
            key={id}
            className={styles.houseColours}
        ></div>
    );
};

export default GradientBar;
