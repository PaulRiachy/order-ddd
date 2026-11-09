import { Router } from "express";
import { makeOrderController } from "../controllers/orderController.js";

const handle = (fn) => (req, res, next) =>
  Promise.resolve()
    .then(() => fn(req, res))
    .catch(next);

export function orderRoutes(repository) {
  const router = Router();
  const controller = makeOrderController(repository);
  router.post("/", handle(controller.create));
  router.post("/:id/items", handle(controller.addItem));
  router.patch("/:id/confirm", handle(controller.confirm));
  router.get("/:id", handle(controller.get));
  return router;
}
