import express from "express";
import { orderRoutes } from "./src/API/routes/orderRoutes.js";
import { InMemoryOrderRepository } from "./src/Infrastructure/repositories/InMemoryOrderRepository.js";

const app = express();
const repository = new InMemoryOrderRepository(); // dependency injection
app.use(express.json());
app.use("/orders", orderRoutes(repository));
app.use((error, _req, res, _next) => {
  res
    .status(error.status || (error instanceof SyntaxError ? 400 : 400))
    .json({ error: error.message });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => console.log("API running at http://localhost:3000"));
}
export { app };
