# Bruno API Testing for ToDo App

This folder contains automated API tests for the ToDo App using the Bruno API client. The tests cover CRUD operations and authentication endpoints, including both positive and negative test cases.

## Endpoints Covered

- `POST /login` — User authentication
- `GET /items` — Retrieve all todo items
- `POST /items` — Create a new todo item
- `PUT /items/:id` — Update an existing todo item
- `DELETE /items/:id` — Delete a todo item

## Test Coverage

For each endpoint, we have implemented:
- **Positive test cases:** Valid requests that should succeed (e.g., correct credentials, valid data, existing IDs)
- **Negative test cases:** Invalid requests that should fail (e.g., missing/invalid fields, unauthorized access, non-existent IDs)

## How to Use

1. Open the `bruno_api/ToDoApp` folder in the Bruno API client.
2. Run the requests individually or as a collection.
3. Review the test results for both positive and negative scenarios.

## Example Test Scenarios

- **POST /login**
  - Positive: Login with valid credentials
  - Negative: Login with invalid credentials
- **GET /items**
  - Positive: Retrieve items with valid token
  - Negative: Attempt without authentication
- **POST /items**
  - Positive: Create item with valid data
  - Negative: Create item with missing/invalid data
- **PUT /items/:id**
  - Positive: Update existing item
  - Negative: Update with invalid/non-existent ID
- **DELETE /items/:id**
  - Positive: Delete existing item
  - Negative: Delete with invalid/non-existent ID

## Notes
- All tests use dynamic variables for authentication and resource IDs where needed.
- Test scripts validate status codes, response structure, and error handling.

---

For more details, see the individual `.bru` files in this folder.
