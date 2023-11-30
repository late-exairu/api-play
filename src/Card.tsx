import { ICardData } from "./types";
import CardDialog from "./CardDialog";
import CardFaces from "./CardFaces";

export default function Card({ card }: { card: ICardData }) {
  return (
    <div key={card?.id} className="relative aspect-[0.72] w-full">
      <div className="absolute inset-0 rounded-md border border-slate-300 bg-slate-200 lg:rounded-lg" />

      <CardFaces {...card} />

      <CardDialog className="absolute left-0 top-0 z-50 bg-sky-100" {...card} />
    </div>
  );
}
