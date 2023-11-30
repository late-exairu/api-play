import * as Dialog from "@radix-ui/react-dialog";
import { ICardData } from "./types";
import CardFaces from "./CardFaces";

export default function CardDialog(card: ICardData) {
  const { oracle_text, flavor_text, artist, name } = card;

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
                Name:{name}
                <br />
                Oracle:{oracle_text}
                <br />
                Flavor text: {flavor_text}
                <br />
                Artist:{artist}
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
