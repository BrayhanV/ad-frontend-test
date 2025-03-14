export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  label: string;
  isNew: boolean = false;

  constructor(id: string, name: string, description: string, price: number, image: string, label: string, isNew: boolean) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.label = label;
    this.isNew = isNew;
  }
}