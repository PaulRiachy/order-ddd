export class OrderItem {
  constructor(productId, price, quantity) {
    if (typeof productId !== "string" || !productId.trim())
      throw new Error("Product ID is required");

    if (typeof price !== "number" || !Number.isFinite(price) || price < 0)
      throw new Error("Price must be non-negative");

    if (!Number.isInteger(quantity) || quantity <= 0)
      throw new Error("Quantity must be a positive integer");

    this.productId = productId;
    this.price = price;
    this.quantity = quantity;
  }
}
