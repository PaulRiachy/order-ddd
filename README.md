# Mini Order API — DDD exercise

A small **JavaScript + Express** example of the four DDD layers. No database or authentication. Data resets when the server restarts.

## Run

```bash
npm install
npm start
```

Server: `http://localhost:3000`

## Test the API

Use Postman

1. **POST** `http://localhost:3000/orders`

```json
{ "items": [{ "productId": "P001", "price": 10, "quantity": 2 }] }
```

Copy the returned `id`.

2. **GET** `http://localhost:3000/orders/<id>`
3. **POST** `http://localhost:3000/orders/<id>/items` with JSON body:

```json
{ "productId": "P002", "price": 5, "quantity": 1 }
```

4. **PATCH** `http://localhost:3000/orders/<id>/confirm`
5. Try step 3 again: it should reject modifications after confirmation.

## Layers and responsibilities

- **API**: routes/controllers receive HTTP requests, parse DTOs, return response DTOs.
- **Application**: use cases coordinate loading, changing and saving orders.
- **Domain**: `Order` is the **aggregate root**. It controls its `OrderItem` objects and enforces rules. `IOrderRepository` is the storage contract.
- **Infrastructure**: `InMemoryOrderRepository` implements that contract using a Map.

### Request flow (confirm order)

`Client -> Route -> Controller -> confirmOrder use case -> Repository.findById -> Order.confirm() -> Repository.save -> response DTO -> Client`

The repository interface is defined in Domain, while the implementation lives in Infrastructure. The Domain does **not** call the database.

### Rules

- Quantity must be a positive integer.
- Price must be non-negative.
- Confirming an empty order is forbidden.
- A confirmed order cannot be modified.
- Total is calculated from items.

### DTO vs entity

A **DTO** is a plain data shape for requests/responses. An **entity** has identity and domain behavior. `Order` is the aggregate root because all changes to items are controlled through it.
