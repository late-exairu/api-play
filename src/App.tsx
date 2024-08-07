import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import Card from "./Card";
import { ICardData } from "./types";

const sets = [
  {
    code: "blb",
    name: "Bloomburrow",
  },
  {
    code: "big",
    name: "The Big Score",
  },
  {
    code: "otj",
    name: "Outlaws of Thunder Junction",
  },
  {
    code: "mkm",
    name: "Murders at Karlov Manor",
  },
  {
    code: "lci",
    name: "The Lost Caverns of Ixalan",
  },
  {
    code: "woe",
    name: "Wilds of Eldraine",
  },
  {
    code: "mat",
    name: "March of the Machine: The Aftermath",
  },
  {
    code: "mom",
    name: "March of the Machine",
  },
  {
    code: "one",
    name: "Phyrexia: All Will Be One",
  },
  {
    code: "bro",
    name: "The Brothers' War",
  },
  {
    code: "dmu",
    name: "Dominaria United",
  },
];

function App() {
  const [cardSet, setCardSet] = useState<string>(sets[0].code);
  const [cardRarity, setCardRarity] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [cardsPage, setCardsPage] = useState<number>(1);

  const debouncedCardName = useDebouncedCallback((value) => {
    setCardName(value);
    setCardsPage(1);
  }, 500);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["cardData", cardSet, cardRarity, cardName, cardsPage],
    queryFn: () =>
      axios
        .get(
          `https://api.scryfall.com/cards/search?q=set%3A${cardSet}+${cardName}${
            cardRarity ? "+rarity%3A" + cardRarity : ""
          }&unique=cards&order=set&page=${cardsPage}`,
        )
        .then((res) => res.data),
    staleTime: 600000, // 10 minutes
  });

  return (
    <div className="py-1">
      <h1 className="mt-10 text-3xl font-bold">MTG Standard cards search</h1>
      <div className="my-6 flex flex-wrap gap-2">
        <div className="flex flex-col">
          <label className="text-sm">Card name</label>
          <input
            className="flex-0 h-10 rounded-md border-2 border-gray-500 px-2"
            type="text"
            defaultValue={cardName}
            onChange={(e) => {
              debouncedCardName(e.target.value);
            }}
            placeholder="e.g. 'Goblin'"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Set</label>
          <select
            className="flex-0 h-10 rounded-md border-2 border-gray-500 px-2"
            value={cardSet}
            onChange={(e) => {
              setCardSet(e.target.value);
              setCardsPage(1);
            }}
          >
            {sets.map((set) => (
              <option key={set.code} value={set.code}>
                {set.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Rarity</label>
          <select
            className="flex-0 h-10 rounded-md border-2 border-gray-500 px-2"
            value={cardRarity}
            onChange={(e) => {
              setCardRarity(e.target.value);
              setCardsPage(1);
            }}
          >
            <option value="">Any</option>
            <option value="c">Common</option>
            <option value="u">Uncommon</option>
            <option value="r">Rare</option>
            <option value="m">Mythic</option>
          </select>
        </div>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>{`An error has occurred: ${error.message}`}</div>}
      {isFetching && <div>Fetching...</div>}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5">
        {data?.data.map((card: ICardData) => (
          <Card key={card?.id} card={card} />
        ))}
      </div>

      <div className="my-10">
        {cardsPage != 1 && (
          <a
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-white px-4 shadow-md"
            href={data?.next_page}
            onClick={(e) => {
              e.preventDefault();
              setCardsPage((prev) => prev - 1);
            }}
          >
            Previous Page
          </a>
        )}

        {data?.has_more && (
          <a
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-white px-4 shadow-md"
            onClick={(e) => {
              e.preventDefault();
              setCardsPage((prev) => prev + 1);
            }}
          >
            Next Page
          </a>
        )}
      </div>

      <ReactQueryDevtools initialIsOpen={true} />
    </div>
  );
}

export default App;
