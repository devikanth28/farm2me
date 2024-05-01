export interface ProductsModel {
    categoryID: number,
    categoryName: string,
    subCategoryID: number,
    subCategoryName: string,
    id : number,
    name : string,
    description : string,
    unitPrice? : number,
    date : string,
    weight : string,
    quantity: number,
    inventoryStatus : string,
    rating : number,
    media: string[]
}