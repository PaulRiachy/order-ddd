import { randomUUID } from "node:crypto";
import { Order } from "../../Domain/entities/Order.js";

export async function createOrder(repository, items) {
  const order = new Order(randomUUID());
  for (const item of items)
    order.addItem(item.productId, item.price, item.quantity);
  await repository.save(order);
  return order;
}
