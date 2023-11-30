import * as Dialog from "@radix-ui/react-dialog";
import { ICardData } from "./types";
import CardFaces from "./CardFaces";

export default function CardDialog(card: ICardData) {
  const {
    oracle_text,
    type_line,
    flavor_text,
    artist,
    name,
    power,
    toughness,
  } = card;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="absolute inset-0 text-white"></button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 z-10 grid place-items-center overflow-y-auto bg-slate-100/80 py-5 backdrop-blur-[2px]">
          <Dialog.Content className="data-[state=open]:animate-contentShow relative z-20 w-[90vw] max-w-[600px] rounded-[6px] bg-white p-[25px] text-slate-800 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-5">
              <div className="max-w-[400px] flex-1">
                <CardFaces {...card} />
              </div>

              <div className="flex-1">
                <p className="text-md mb-4 font-medium">{name}</p>

                {type_line && (
                  <p className="font-md my-4 text-sm">{type_line}</p>
                )}

                {oracle_text && (
                  <p className="font-md text-md my-4 text-sm">{oracle_text}</p>
                )}
                {flavor_text && (
                  <p className="my-4 text-sm italic">{flavor_text}</p>
                )}
                {artist && (
                  <p className="mt-4 text-sm">
                    <span className="italic">Illustrated by:</span> {artist}
                  </p>
                )}
                {power && toughness && (
                  <p className="text-md mt-4 font-medium">
                    {power}/{toughness}
                  </p>
                )}
              </div>
            </div>

            <Dialog.Close asChild>
              <button
                className="text-violet hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                X
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
