import CardData from '../components/CardContent/interface/CardData';

export function convertJsonToCardData(json: any[]): CardData[] {
    return json.map((content: any) => {
        return {
            id: content.id,
            name: content.name,
            houseColours: content.houseColours,
            founder: content.founder,
            animal: content.animal,
        };
    });
}