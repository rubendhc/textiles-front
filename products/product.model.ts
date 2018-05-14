export class Product {
  public id: number;
	public code: string;
	public name: string;
	public amount: number;
	public price: number;
	public category_id: number;
  public description: string;
  public imagePath: string;

  public cantProduct: number;
  public totalPrice: number;

  //Sive para guardar los datos del Producto
  //llamado desde Shopping edit
 /* constructor(name: string,
              amount: number,
              price: number
            ){
            this.name = name;
            this.amount = amount;
            this.price = price;
  }
*/
  constructor(){};
}
