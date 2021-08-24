import { Product } from "./product";

export interface Category {
  idCategorie?: number;
  libelle?: string;
  products?: Product[];
}
