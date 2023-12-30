export interface IProductInteractor {
  createProduct(input: any);
  updateStock(id: number, stock: number);
  getProducts(limit: number, offset: number);
}
