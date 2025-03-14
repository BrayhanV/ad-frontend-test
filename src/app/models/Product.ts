export class Product {
  id: string;
  name: string;
  price: number;
  image: string;
  label: string;

  constructor(id: string, name: string, price: number, image: string, label: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.label = label;
  }
}