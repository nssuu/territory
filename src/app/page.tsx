"use client";

import axios from "axios";
import useSWR from "swr";
import CardContent from "@/components/CardContent/CardContent";
import CardData from "@/components/CardContent/interface/CardData";
import converters from "@/components/utils/converter";

const BASE_API_URL = "http://localhost:4000";
const HOUSES_API_URL = `${BASE_API_URL}/houses`;

async function fetchGaleryData(url: string): Promise<CardData[]> {
  try {
    const response = await axios.get<Record<string, unknown>[]>(url);
    if (response.status === 200) {
      return converters.convertJsonToCardData(response.data);
    }
  } catch (error) {
    console.error("Error fetching card data:", error);
  }
  return [];
}

export default function Page() {
  const {
    data: galeryData,
    error,
    isLoading,
  } = useSWR(HOUSES_API_URL, fetchGaleryData);

  return (
    <div className="grid place-items-center h-screen p-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading data</div>
      ) : galeryData != null ? (
        galeryData.map((cardData) => {
          return <CardContent key={cardData.id} data={cardData} />;
        })
      ) : null}
    </div>
  );
}
