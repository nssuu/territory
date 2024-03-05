import React from "react";

import CardData from "./interface/CardData";
import styles from "./styles/CardContent.module.css";
import GradientBar from "../GradientBar/GradientBar";
import converters from "../utils/converter";

type CardContentProps = {
  data: CardData;
};

const CardContent: React.FC<CardContentProps> = (props) => {
  const { data } = props;

  const gradientBarProps = converters.convertInheritGradientBar(
    data.id,
    data.houseColours,
  );

  return (
    <div className={styles.cardBorder} key={data.id}>
      <>
        <div className="flex justify-between p-4">
          <div>
            <h1 className="font-extrabold text-2xl">{data.name}</h1>
          </div>
          <div>
            <h2>{data.animal}</h2>
          </div>
        </div>
        <div className="p-4">
          <GradientBar data={gradientBarProps} />
        </div>
        <div className="p-4">
          <div className="flex flex-row">
            <h2>Founder: </h2>
            <p className="font-extrabold pl-1">{data.founder}</p>
          </div>
        </div>
      </>
    </div>
  );
};

export default CardContent;
