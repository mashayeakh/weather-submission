export interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export const CITIES: City[] = [
  { id: "dhaka", name: "Dhaka", country: "Bangladesh", lat: 23.8103, lon: 90.4125 },
  { id: "london", name: "London", country: "United Kingdom", lat: 51.5074, lon: -0.1278 },
  { id: "new-york", name: "New York", country: "United States", lat: 40.7128, lon: -74.006 },
  { id: "tokyo", name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
  { id: "nairobi", name: "Nairobi", country: "Kenya", lat: -1.2921, lon: 36.8219 },
  { id: "sydney", name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093 },
];
