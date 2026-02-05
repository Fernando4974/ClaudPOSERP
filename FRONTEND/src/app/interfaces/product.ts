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
export interface newProduct{

  nameProduct:string,
  priceProduct:number,
  descriptionProduct:string,
  statusProduct:string,
  imgProduct?:string,
  barcode?:string,
  posAvalible:boolean,
  categorie:string

}
export interface GetAllProduct{
  title:string,
  description:string,
  barcode?:string,
  price:number,
  slug:string,
  keyNumber?: number,
  count?:number,
}
