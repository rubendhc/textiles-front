import { Product } from '../../product.model';

export class BillProduct {

	   public id: number;
	   public total: number;
	   public amount: number;
	   public bill_id: number;
	   public product_id: number;

	   public product: Product;
	   
	   constructor(){}
}