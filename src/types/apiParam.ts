export type APIPayload = {
  content?: string;
  language?: string;
  imageURL?: string;
  base64Image?: string;
  lowerBound?: number;
  upperBound?: number;
  chooseArr?: string[];
  wantTheatreMovie?: boolean | undefined;
  movieGenre: string;
};
