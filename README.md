# Express.js RESTful API Assignment

This project is a RESTful API built with Express.js, featuring CRUD operations for a product resource, custom middleware, and error handling.

## Steps I Followed

### 1. Project Setup
- Initialized a new Node.js project:
  ```sh
  npm init -y
  ```
- Installed dependencies:
  ```sh
  npm install express body-parser uuid
  ```

### 2. Express Server
- Created `server.js` and set up a basic Express server listening on port 3000.
- Implemented a root route (`/`) that returns a welcome message.

### 3. Middleware
- Added middleware for:
  - **JSON body parsing** using `body-parser`
  - **Request logging** (logs method, URL, and timestamp)
  - **Authentication** (checks for `x-api-key: my-secret-api-key` in headers)

### 4. Product Resource & Routes
- Created an in-memory array to store products.
- Implemented the following RESTful routes:
  - `GET /api/products` - List all products
  - `GET /api/products/:id` - Get a product by ID
  - `POST /api/products` - Create a new product
  - `PUT /api/products/:id` - Update a product
  - `DELETE /api/products/:id` - Delete a product

### 5. Error Handling
- Added a global error handling middleware for consistent error responses.

### 6. Testing the API
- Used **curl** and **Postman** to test endpoints.
- All requests require the header:  
  `x-api-key: my-secret-api-key`

#### Example curl command:
```sh
curl -H "x-api-key: my-secret-api-key" http://localhost:3000/api/products
```

#### Example Postman setup:
- Set the request URL (e.g., `http://localhost:3000/api/products`)
- Add header: `x-api-key: my-secret-api-key`
- For POST/PUT, set Body to raw JSON.

#### Example POST body:
```json
{
  "name": "Tablet",
  "description": "10-inch Android tablet",
  "price": 300,
  "category": "electronics",
  "inStock": true
}
```

## Files Included

- `server.js`: Main Express.js server file
- `Week2-Assignment.md`: Assignment instructions
- `.gitignore`: Ignores `node_modules/` and `package-lock.json`

## Requirements

- Node.js (v18 or higher)
- npm
- Postman or curl for testing

## Notes

- The API key is hardcoded as `my-secret-api-key` for demonstration.
- Data is stored in-memory and will reset when the server restarts.

---