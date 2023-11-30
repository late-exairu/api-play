export interface ICardData {
  id: string;
  name: string;
  type_line?: string;
  oracle_text?: string;
  artist?: string;
  flavor_text?: string;
  power?: string;
  toughness?: string;
  image_uris?: {
    normal: string;
  };
  card_faces?: [
    {
      image_uris?: {
        normal: string;
      };
    },
    {
      image_uris?: {
        normal: string;
      };
    },
  ];
}
