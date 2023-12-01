import { ICardText } from "./types";
import StringParse from "./StringParse";

export default function CardInfo(card: ICardText) {
  const {
    oracle_text,
    type_line,
    flavor_text,
    artist,
    name,
    power,
    mana_cost,
    toughness,
  } = card;

  return (
    <>
      <div className="mb-4 flex justify-between text-lg font-medium">
        <p className="">{name}</p>
        {mana_cost && (
          <StringParse className="whitespace-nowrap" text={mana_cost} />
        )}
      </div>

      {type_line && <p className="font-md my-4">{type_line}</p>}

      {oracle_text && <StringParse text={oracle_text} className="my-4" />}
      {flavor_text && <p className="my-4 italic">{flavor_text}</p>}
      {artist && (
        <p className="mt-4">
          <span className="italic">Illustrated by:</span> {artist}
        </p>
      )}
      {power && toughness && (
        <p className="text-md mt-4 font-medium">
          {power}/{toughness}
        </p>
      )}
    </>
  );
}
