'use client';

import React, { useMemo } from 'react';

import CardData  from './interface/CardData';
import styles from './styles/CardContent.module.css';
import GradientBar from '../GradientBar/GradientBar';
import converters from '../utils/converter';


const CardContent: React.FC<CardData> = ({ id, name, houseColours, founder, animal}) => {
    const gradientBarProps = useMemo(
        () => {
            return converters.convertInheritGradientBar(id, houseColours);
        },
        [id, houseColours]
    )

    return (
        <div className={styles.cardBorder} key={id}>
            <>
                <div className='flex justify-between p-4'>
                    <div>
                        <h1>{name}</h1>
                    </div>
                    <div>
                        <h2>{animal}</h2>
                    </div>
                </div>
                <div className='p-4'>
                    {GradientBar(gradientBarProps)}
                </div>
                <div className='p-4'>
                    <p>{founder}</p>
                </div>
            </>
        </div>
    );
};

export default CardContent;
