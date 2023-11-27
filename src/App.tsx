import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";

function App() {
  const [cardSet, setCardSet] = useState<string>("one");
  const [cardRarity, setCardRarity] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");

  const debouncedCardName = useDebouncedCallback((value) => {
    setCardName(value);
  }, 500);

  interface CardData {
    id: string;
    name: string;
    next_page: string;
    image_uris: {
      normal: string;
    };
    card_faces: [
      image_uris: {
        normal: string;
      },
    ];
  }

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["cardData", cardSet, cardRarity, cardName],
    staleTime: 120000,
    queryFn: () =>
      axios
        .get(
          `https://api.scryfall.com/cards/search?q=set%3A${cardSet}+${cardName}${
            cardRarity ? "+rarity%3A" + cardRarity : ""
          }&unique=cards&order=set`,
        )
        .then((res) => res.data),
  });

  return (
    <div className="py-1">
      <h1 className="mt-5 text-3xl font-bold">MTG Standard cards search</h1>

      <div className="my-10 flex flex-wrap gap-2">
        <div className="flex flex-col">
          <label className="text-sm">Card name</label>
          <input
            className="flex-0 h-10 rounded-md border-2 border-gray-500 px-2"
            type="text"
            defaultValue={cardName}
            onChange={(e) => debouncedCardName(e.target.value)}
            placeholder="e.g. 'Goblin'"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Set</label>
          <select
            className="flex-0 h-10 rounded-md border-2 border-gray-500 px-2"
            value={cardSet}
            onChange={(e) => setCardSet(e.target.value)}
          >
            <option value="dmu">Dominaria United</option>
            <option value="bro">The Brothers' War</option>
            <option value="one">Phyrexia: All Will Be One </option>
            <option value="mom">March of the Machine</option>
            <option value="mat">March of the Machine: The Aftermath</option>
            <option value="woe">Wilds of Eldraine</option>
            <option value="lci">The Lost Caverns of Ixalan</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Rarity</label>
          <select
            className="flex-0 h-10 rounded-md border-2 border-gray-500 px-2"
            value={cardRarity}
            onChange={(e) => setCardRarity(e.target.value)}
          >
            <option value=""></option>
            <option value="c">Common</option>
            <option value="u">Uncommon</option>
            <option value="r">Rare</option>
            <option value="m">Mythic</option>
          </select>
        </div>
      </div>

      {/* <div className="my-10">
        {cardName}
        <br />
        {cardSet}
        <br />
        {cardRarity}
      </div> */}

      {isLoading && <div>Loading...</div>}
      {error && <div>{`An error has occurred: ${error.message}`}</div>}
      {isFetching && <div>Fetching...</div>}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5">
        {data?.data.map((card: CardData) => (
          <div key={card?.id} className="aspect-square w-full">
            <img
              className="block w-full rounded-md lg:rounded-lg"
              title={card?.name}
              alt={card?.name}
              loading="lazy"
              src={
                card?.image_uris
                  ? card?.image_uris?.normal
                  : card?.card_faces[0]?.image_uris?.normal
              }
            ></img>
            {/* <p>{card?.card_faces ? "true" : "false"}</p> */}
          </div>
        ))}
      </div>

      <a href={data?.next_page}>Next Page</a>

      <ReactQueryDevtools initialIsOpen={true} />

      {/* {data && JSON.stringify(data)} */}
    </div>
  );
}

export default App;
