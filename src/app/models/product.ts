export interface Product {
  idProduit: number,
  nomProduit: string,
  description: string,
  photo: string,
  prix: number,
  qte: number,
  categoryId?: number,
  categoryLibelle?: string
}
