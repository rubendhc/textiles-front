import { Product  } from '../../product.model';
export class Bill {

	   public id: number;
	   public total: number;
	   public tmp: string;
	   public typePay: string;
	   public custom: string;
	   public custom_id:number;
	   public user_id: number;
	   public status: string;

	   public products: Product[];

	   constructor(){

	   	this.products = []

	   }
}