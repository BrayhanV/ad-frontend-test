export class Product {
  id: string;
  name: string;
  price: number;
  image: string;
  label: string;
  isNew: boolean = false;

  constructor(id: string, name: string, price: number, image: string, label: string, isNew: boolean) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.label = label;
    this.isNew = isNew;
  }
}