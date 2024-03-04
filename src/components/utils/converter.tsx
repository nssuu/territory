import CardData from "../CardContent/interface/CardData";
import GradientBarAttributes from "../GradientBar/interface/GradientBarAttributes";


function convertJsonToCardData(json: any[]): CardData[] { // eslint-disable-line @typescript-eslint/no-explicit-any
  return json.map((content: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    return {
      id: content.id,
      name: content.name,
      houseColours: content.houseColours,
      founder: content.founder,
      animal: content,
    };
  });
}

function convertCardDataToJson(cardData: CardData[]): any[] { // eslint-disable-line @typescript-eslint/no-explicit-any
  return cardData.map((content: CardData) => {
    return {
      id: content.id,
      name: content.name,
      houseColours: content.houseColours,
      founder: content.founder,
      animal: content.animal,
    };
  });
}

function convertInheritGradientBar(
  id: string,
  houseColours: string,
): GradientBarAttributes {
  return {
    id: id,
    startColor: houseColours.split(" and ")[0],
    endColor: houseColours.split(" and ")[1],
    width: "100%",
    height: "20px",
  };
}

const exports = {
  convertJsonToCardData,
  convertCardDataToJson,
  convertInheritGradientBar,
};

export default exports;
