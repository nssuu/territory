import CardData from "../CardContent/interface/CardData";
import GradientBarAttributes from "../GradientBar/interface/GradientBarAttributes";

function convertJsonToCardData(json: Record<string, unknown>[]): CardData[] {
  return json.map((content: Record<string, unknown>): CardData => {
    return {
      id: content.id as string,
      name: content.name as string,
      houseColours: content.houseColours as string,
      founder: content.founder as string,
      animal: content.animal as string,
    };
  });
}

function convertCardDataToJson(
  cardData: CardData[],
): Record<string, unknown>[] {
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
