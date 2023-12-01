export interface ICardData {
  id: string;
  name: string;
  mana_cost?: string;
  type_line?: string;
  oracle_text?: string;
  flavor_text?: string;
  artist?: string;
  power?: string;
  toughness?: string;
  image_uris?: {
    normal: string;
  };
  card_faces: ICardText[] | undefined;
}

export interface ICardText {
  name?: string;
  mana_cost?: string;
  type_line?: string;
  oracle_text?: string;
  flavor_text?: string;
  artist?: string;
  power?: string;
  toughness?: string;
  image_uris?: {
    normal: string | undefined;
  };
}
