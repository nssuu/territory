"use client";

import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import CircleLoader from "react-spinners/CircleLoader";
import CardContent from "@/components/CardContent/CardContent";
import CardData from "@/components/CardContent/interface/CardData";
import converters from "@/components/utils/converter";

const BASE_API_URL = "http://localhost:4000";
const HOUSES_API_ENDPOINT = "/houses";

async function fetchGaleryData(url: string): Promise<CardData[]> {
  try {
    const response = await axios.get<Record<string, unknown>[]>(url);
    if (response.status === 200) {
      return converters.convertJsonToCardData(response.data);
    }
  } catch (error) {
    console.error("Error fetching card data:", error);
    throw error;
  }
  return [];
}

function buildEndpointURL(baseURL: string, endpoint: string): string {
  try {
    const url = new URL(endpoint, baseURL);
    return url.toString();
  } catch (error) {
    console.error("Error creating URL:", error);
  }

  return "";
}

export default function Page() {
  const savedBaseAPIURL = useMemo(() => {
    const savedURL = localStorage.getItem("baseAPIURL");
    if (savedURL != null) {
      return savedURL;
    }
    return "";
  }, []);

  const saveBaseAPIURL = useCallback((url: string) => {
    localStorage.setItem("baseAPIURL", url);
  }, []);

  const [baseAPIURL, setBaseAPIURL] = useState(
    savedBaseAPIURL.length > 0 ? savedBaseAPIURL : BASE_API_URL,
  );

  const [baseAPIURLBuffer, setBaseAPIURLBuffer] = useState(baseAPIURL);

  const housesEndpointURL = useMemo(() => {
    const endpointURL = buildEndpointURL(baseAPIURL, HOUSES_API_ENDPOINT);
    if (endpointURL.length > 0) {
      return endpointURL;
    }

    return buildEndpointURL(BASE_API_URL, HOUSES_API_ENDPOINT);
  }, [baseAPIURL]);

  const {
    data: galeryData,
    error,
    isLoading,
    mutate,
  } = useSWR(housesEndpointURL, fetchGaleryData);

  const onBaseAPIURLBufferChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setBaseAPIURLBuffer(ev.target.value);
    },
    [setBaseAPIURLBuffer],
  );

  const onSubmitForm = useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      setBaseAPIURL(baseAPIURLBuffer);
      saveBaseAPIURL(baseAPIURLBuffer);
      mutate();
    },
    [baseAPIURLBuffer, setBaseAPIURL, saveBaseAPIURL, mutate],
  );

  const onClickResetBaseAPIURL = useCallback(() => {
    setBaseAPIURLBuffer(BASE_API_URL);
    setBaseAPIURL(BASE_API_URL);
    saveBaseAPIURL(BASE_API_URL);
    mutate();
  }, [setBaseAPIURLBuffer, setBaseAPIURL, saveBaseAPIURL, mutate]);

  return (
    <>
      <div className="grid place-items-center h-screen p-4">
        <CircleLoader
          color="black"
          loading={isLoading}
          size={150}
          speedMultiplier={1}
        />

        {isLoading ? (
          <div></div>
        ) : error ? (
          <div>
            <h1 className="text-3xl font-bold text-red-500">
              Error Fetching Data
            </h1>
            <p className="text-xl text-red-500">{error.message}</p>
          </div>
        ) : galeryData != null ? (
          galeryData.map((cardData) => {
            return <CardContent key={cardData.id} data={cardData} />;
          })
        ) : null}
      </div>

      <div className="fixed bottom-0 right-0 p-4 border-t border-l border-slate-300 rounded overflow-x-auto">
        <form className="flex flex-row flex-none gap-2" onSubmit={onSubmitForm}>
          <label
            htmlFor="baseAPIURLInput"
            className="flex flex-row flex-none items-center whitespace-nowrap py-2 font-medium text-sm"
          >
            Base API URL:
          </label>
          <div className="group flex flex-col flex-none border border-slate-300 rounded">
            <span className="h-px invisible whitespace-nowrap select-none pointer-events-none">
              {baseAPIURLBuffer}
            </span>
            <input
              id="baseAPIURLInput"
              type="text"
              placeholder="Base API URL"
              value={baseAPIURLBuffer}
              className="outline-none p-2"
              onChange={onBaseAPIURLBufferChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
          <div>
            <button
              type="button"
              className="bg-zinc-200 hover:bg-zinc-300 text-black font-medium py-2 px-4 rounded"
              onClick={onClickResetBaseAPIURL}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
