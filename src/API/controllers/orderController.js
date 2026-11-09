import { createOrder } from "../../Application/useCases/createOrder.js";
import { addOrderItem } from "../../Application/useCases/addOrderItem.js";
import { confirmOrder } from "../../Application/useCases/confirmOrder.js";
import { getOrder } from "../../Application/useCases/getOrder.js";
import {
  parseCreateOrderDTO,
  parseOrderItemDTO,
  toOrderResponseDTO,
} from "../dtos/createOrderDTO.js";

export function makeOrderController(repository) {
  return {
    create: async (req, res) => {
      const dto = parseCreateOrderDTO(req.body);
      res
        .status(201)
        .json(toOrderResponseDTO(await createOrder(repository, dto.items)));
    },
    addItem: async (req, res) => {
      const dto = parseOrderItemDTO(req.body);
      res.json(
        toOrderResponseDTO(await addOrderItem(repository, req.params.id, dto)),
      );
    },
    confirm: async (req, res) =>
      res.json(
        toOrderResponseDTO(await confirmOrder(repository, req.params.id)),
      ),
    get: async (req, res) =>
      res.json(toOrderResponseDTO(await getOrder(repository, req.params.id))),
  };
}
