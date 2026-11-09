export async function addOrderItem(repository, id, item) {
  const order = await repository.findById(id);
  if (!order) {
    const error = new Error("Order not found");
    error.status = 404;
    throw error;
  }
  order.addItem(item.productId, item.price, item.quantity);
  await repository.save(order);
  return order;
}
