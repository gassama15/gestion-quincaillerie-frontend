import { Category } from "./category";

export interface Product {
  idProduit: number,
  nomProduit: string,
  description: string,
  photo: string,
  prix: number,
  qte: number,
  category: Category,
  categoryId?: number,
  categoryLibelle?: string,
  oldPhoto?: string;
}
