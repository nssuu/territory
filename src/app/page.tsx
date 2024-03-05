import CardContent from "../components/CardContent/CardContent";
import CardData from "@/components/CardContent/interface/CardData";
import converters from "@/components/utils/converter";
import axios from "axios";

async function fetchGaleryData(): Promise<CardData[]> {
  try {
    const response = await axios.get<Record<string, unknown>[]>(
      "http://localhost:4000/houses",
    );
    if (response.status === 200) {
      return converters.convertJsonToCardData(response.data);
    }
  } catch (error) {
    console.error("Error fetching card data:", error);
  }
  return [];
}

export default async function Page() {
  const galeryData = await fetchGaleryData();

  return (
    <div className="grid place-items-center h-screen p-4">
      {galeryData.map((cardData) => {
        return <CardContent key={cardData.id} data={cardData} />;
      })}
    </div>
  );
}
