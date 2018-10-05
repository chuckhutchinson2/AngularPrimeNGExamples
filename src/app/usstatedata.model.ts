export interface USStateData {
  name: string;
  code: string;
  color: string;
  coordinates: Coordinate[];
}

export interface Coordinate {
	lat: number;
	lng: number;
}