import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function App() {
  const [cardSet, setCardSet] = useState<string>("");
  const [cardRarity, setCardRarity] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get("https://api.github.com/users/late-exairu")
        .then((res) => res.data),
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Hello World</h1>

      <div className="flex">
        <div>
          <input
            className="rounded-md border-2 border-gray-500"
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Card Name"
          />
        </div>
        <div>
          <select value={cardSet} onChange={(e) => setCardSet(e.target.value)}>
            <option value="core">Core</option>
            <option value="darkmoon-faire">Darkmoon Faire</option>
            <option value="forged-in-the-barrens">Forged in the Barrens</option>
            <option value="scholomance-academy">Scholomance Academy</option>
            <option value="the-barrens">The Barrens</option>
            <option value="the-darkmoon-faire">The Darkmoon Faire</option>
            <option value="the-wailing-caers">The Wailing Caers</option>
            <option value="united-in-stormwind">United in Stormwind</option>
          </select>
        </div>
        <div>
          <select
            value={cardRarity}
            onChange={(e) => setCardRarity(e.target.value)}
          >
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
            <option value="mythic">Mythic</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-10">
        <div className="">
          <img
            className="block rounded-xl"
            title="Monstrous Rage (Wilds of Eldraine #142)"
            alt="Monstrous Rage (Wilds of Eldraine #142)"
            loading="eager"
            src="https://cards.scryfall.io/large/front/e/e/eef5a0ae-5907-42c9-a097-3f973737e392.jpg?1692938394"
          ></img>
        </div>
        <div className="">
          <img
            className=""
            title="Monstrous Rage (Wilds of Eldraine #142)"
            alt="Monstrous Rage (Wilds of Eldraine #142)"
            loading="eager"
            src="https://cards.scryfall.io/large/front/e/e/eef5a0ae-5907-42c9-a097-3f973737e392.jpg?1692938394"
          ></img>
        </div>
        <div className="">
          <img
            className=""
            title="Monstrous Rage (Wilds of Eldraine #142)"
            alt="Monstrous Rage (Wilds of Eldraine #142)"
            loading="eager"
            src="https://cards.scryfall.io/large/front/e/e/eef5a0ae-5907-42c9-a097-3f973737e392.jpg?1692938394"
          ></img>
        </div>
        <div className="">
          <img
            className=""
            title="Monstrous Rage (Wilds of Eldraine #142)"
            alt="Monstrous Rage (Wilds of Eldraine #142)"
            loading="eager"
            src="https://cards.scryfall.io/large/front/e/e/eef5a0ae-5907-42c9-a097-3f973737e392.jpg?1692938394"
          ></img>
        </div>
      </div>

      <p>
        {cardName}
        <br />
        {cardSet}
        <br />
        {cardRarity}
      </p>

      <p>
        {data?.login} {data?.stargazers_count} <br />
        <img
          className="aspect-auto w-[300px] rounded-full"
          src={data?.avatar_url}
          alt="avatar"
        />
        {data?.name} {data?.url} {isFetching ? "Updating..." : ""}
      </p>
    </div>
  );
}

export default App;
