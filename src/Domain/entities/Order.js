import { OrderItem } from "./OrderItem.js";

// Aggregate root
export class Order {
  #items = [];
  constructor(id) {
    this.id = id;
    this.status = "PENDING";
  }

  addItem(productId, price, quantity) {
    if (this.status === "CONFIRMED")
      throw new Error("Cannot modify a confirmed order");
    this.#items.push(new OrderItem(productId, price, quantity));
  }

  confirm() {
    if (this.status === "CONFIRMED")
      throw new Error("Order is already confirmed");
    if (this.#items.length === 0)
      throw new Error("Cannot confirm an empty order");
    this.status = "CONFIRMED";
  }

  get items() {
    return this.#items.map((item) => ({ ...item }));
  }
  get total() {
    return this.#items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }
}
