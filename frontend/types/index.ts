export interface IStorage {
  id: number;
  image: string;
  companyLogo: string;
  title: string;
  location: string;
  lastUpdated: string;
  units: {
    dimensions: string;
    price: number;
    special: string;
  }[];
}
