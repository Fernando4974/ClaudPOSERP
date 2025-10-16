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
