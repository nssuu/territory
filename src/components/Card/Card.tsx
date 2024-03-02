import React from 'react';
import styles from './styles/Card.module.css';


interface CardData {
    title: string;
    description: string;
}

const cardData: CardData[] = [
    {
        title: 'Card 1',
        description: 'This is the description for Card 1.',
    },
    {
        title: 'Card 2',
        description: 'This is the description for Card 2.',
    },
    {
        title: 'Card 3',
        description: 'This is the description for Card 3.',
    },
    {
        title: 'Card 4',
        description: 'This is the description for Card 4.',
    },
];
const Card: React.FC<CardData> = () => {
    return (
        <div className={styles.card}>
            {cardData.map((card, index) => (
                <div key={index}>
                    <div className={styles.cardTitle}>{card.title}</div>
                    <div className={styles.cardDescription}>{card.description}</div>
                </div>
            ))}
        </div>
    );
};

export default Card;
