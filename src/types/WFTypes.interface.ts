export interface ObjectOfCity {
  city: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  temperature: number;
  weather: {
    blizzard: boolean;
    cloudy: boolean;
    metorite: boolean;
    rainy: boolean;
    snowy: boolean;
    stormy: boolean;
    sunny: boolean;
  };
  wind: {
    direction: string;
    speed: string;
  };
}
