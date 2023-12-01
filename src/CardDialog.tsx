import * as Dialog from "@radix-ui/react-dialog";
import { ICardData, ICardText } from "./types";
import CardFaces from "./CardFaces";
import CardInfo from "./CardInfo";

export default function CardDialog(card: ICardData) {
  const { card_faces } = card;

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

              <div className="flex-1 text-sm">
                {card_faces && card_faces.length > 1 ? (
                  card_faces.map(
                    (face: ICardText, index: number): JSX.Element => (
                      <>
                        <CardInfo {...face} key={index} />

                        {index < card_faces.length - 1 ? (
                          <hr className="my-4" />
                        ) : null}
                      </>
                    ),
                  )
                ) : (
                  <CardInfo {...card} />
                )}
              </div>
            </div>

            <Dialog.Close asChild>
              <button
                className="absolute -right-2 -top-2 inline-flex h-8 w-8 appearance-none items-center justify-center rounded-full bg-white drop-shadow-md focus:outline-none"
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
