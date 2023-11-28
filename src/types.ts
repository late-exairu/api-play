export type CardData = {
  id: string;
  name: string;
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
};
