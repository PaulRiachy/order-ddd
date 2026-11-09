export async function getOrder(repository, id) {
  const order = await repository.findById(id);
  if (!order) {
    const error = new Error("Order not found");
    error.status = 404;
    throw error;
  }
  return order;
}
