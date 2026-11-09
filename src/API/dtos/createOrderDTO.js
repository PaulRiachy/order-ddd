// DTOs define the input/output shape, domain validation stays in the domain.
export function parseCreateOrderDTO(body) {
  if (!body || !Array.isArray(body.items))
    throw new Error("items must be an array");
  return { items: body.items.map(parseOrderItemDTO) };
}

export function parseOrderItemDTO(item) {
  if (!item || typeof item !== "object" || Array.isArray(item))
    throw new Error("Invalid order item");
  return {
    productId: item.productId,
    price: item.price,
    quantity: item.quantity,
  };
}

export function toOrderResponseDTO(order) {
  return {
    id: order.id,
    status: order.status,
    items: order.items,
    total: order.total,
  };
}
