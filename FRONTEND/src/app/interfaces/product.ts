export interface Product{
  idProduct:string,
  nameProduct:string,
  descriptionProduct:string,
  barcode:string,
  priceProduct:number,
  statusProduct:string
}
export interface ProductFilter{
  name?:string,
  price?:number,
  description?:string,
  barcode?:string,
  status?:string
}
export interface newProduct {
  title: string;          // Coincide con @IsString()
  description?: string;   // Coincide con @IsOptional()
  barcode?: string;
  price: number;
  stock: number;
  slug?: string;
  tags?: string[];
  numberKey?: number;
  posAvalible?: boolean;
  categorie: string;
  imgProduct?: string;
}
export interface GetAllProduct{
  title:string,
  description:string,
  barcode?:string,
  price:number,
  slug:string,
  numberKey?: number,
  count?:number,
}
