import React from 'react';

import CardData  from './interface/CardData';
import styles from './styles/CardContent.module.css';



const CardContent: React.FC<CardData> = ({ id, name, houseColours, founder, animal}) => {
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
                    {houseColours}
                </div>
                <div className='p-4'>
                    <p>{founder}</p>
                </div>
            </>
        </div>
    );
};

export default CardContent;
