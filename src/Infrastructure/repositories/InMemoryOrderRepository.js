import { IOrderRepository } from "../../Domain/interfaces/IOrderRepository.js";

export class InMemoryOrderRepository extends IOrderRepository {
  #orders = new Map();
  async save(order) {
    this.#orders.set(order.id, order);
  }
  async findById(id) {
    return this.#orders.get(id) ?? null;
  }
}
