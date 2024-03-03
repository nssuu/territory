import React from 'react';

import GradientBarAttributes  from './interface/GradientBarAttributes';
import styles from './styles/CardContent.module.css';


const GradientBar: React.FC<GradientBarAttributes> = ({ id, direction, startColor, endColor, width, height}) => {
    
    const gradientStyle = {
        background: `linear-gradient(to ${direction}, ${startColor}, ${endColor})`
    };
    return (
        <div className={styles.houseColours} style={{...gradientStyle, width, height}} key={id}>
        </div>
    );
};

export default GradientBar;