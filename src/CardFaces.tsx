import { useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import { ICardData } from "./types";

export default function CardFaces(card: ICardData) {
  const [isFlipped, setIsFlipped] = useState(false);

  function toggleFlip() {
    setIsFlipped((prev) => !prev);
  }

  return (
    <div className="relative">
      {card?.card_faces?.[1] && (
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFlip();
          }}
          className="absolute -bottom-3 left-1/2 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-3xl bg-slate-900 transition-transform hover:rotate-45 lg:rounded-full"
        >
          <FaArrowsRotate className="fill-slate-200 text-xl" />
        </button>
      )}

      <div
        className={`${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        } preserve-3d relative aspect-[0.72] w-full transform-gpu transition-transform duration-500`}
      >
        <img
          className="backface-hidden absolute inset-0 z-[2] block w-full rounded-md lg:rounded-lg"
          title={card?.name}
          alt={card?.name}
          loading="lazy"
          src={
            card?.image_uris
              ? card?.image_uris?.normal
              : card?.card_faces[0]?.image_uris?.normal
          }
        ></img>

        {card?.card_faces?.[1] && (
          <img
            className="backface-hidden absolute inset-0 z-[1] block w-full rounded-md [transform:rotateY(180deg)] lg:rounded-lg"
            title={card?.name}
            alt={card?.name}
            loading="lazy"
            src={
              card?.image_uris
                ? card?.image_uris?.normal
                : card?.card_faces[1]?.image_uris?.normal
            }
          ></img>
        )}
      </div>
    </div>
  );
}
