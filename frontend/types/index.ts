export interface IStorage {
  id: number;
  image: string;
  companyLogo: string;
  title: string;
  address: string;
  lastUpdated: string;
  units: {
    dimensions: string;
    price: number;
    special: string;
  }[];
  location: {
    lat: number;
    lng: number;
  };
}
