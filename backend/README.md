````markdown
### 1. `package.json`

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "server": "nodemon backend/server.js" //We add this to use nodemon
},
```
````

### 2. File Structure Creation

-   Created `server.js` file.
-   Created `routes`, `controllers`, `models`, and `middlewares` folders.

### Working on Different Files:

#### `server.js`

This file sets up a Node.js application using Express for creating a server, Mongoose for MongoDB interactions, and middleware components for handling requests and errors.

1. **Imports**:

    - Imports necessary modules such as `express`, `mongoose`, `cors`, and `dotenv`.

2. **Middleware**:

    - Uses `errorHandler`, likely a custom middleware to handle errors within the application.

3. **Routes**:

    - Imports route handlers from separate files (`orderRoutes`, `productRoutes`, `userRoutes`) and associates them with specific URL paths using `app.use`.

4. **Express Setup**:

    - Configures Express application to use `cors`, `express.json()` for parsing JSON in requests, and `express.urlencoded()` for parsing URL-encoded data from the request body.

5. **MongoDB Connection**:

    - Connects to a MongoDB database using Mongoose's `connect` method, passing the MongoDB connection URL (`MONGO_URL` from the environment variables) and options (`useNewUrlParser`, `useUnifiedTopology`). Starts the Express server and listens on the specified port (`process.env.PORT` or default `5000`) if the connection is successful.

6. **Error Handling**:
    - Uses the `errorHandler` middleware to handle errors in the application.

#### 2. Routes Files

##### `userRoutes`

1. **Express Router Setup**:

    - Initializes an instance of Express Router specifically for user-related routes.

2. **Middleware**:

    - Imports an `authMiddleware` module likely containing functions for authentication and authorization. `protectRoute` secures routes requiring authentication, and `admin` restricts access to admin-only routes.

3. **User Controllers**:

    - Imports functions handling user-related actions like login, signup, updating profiles, getting all users, and deleting users, likely defined in the `userController` module.

4. **Route Definitions**:

    - **Public Routes**:

        - `POST /login`: Allows users to log in.
        - `POST /signup`: Allows users to sign up.

    - **Protected Routes**:

        - `PUT /profile/:userId`: Requires authentication (`protectRoute`) to update user profiles. `:userId` parameter allows updating a specific user's profile.

    - **Admin-Only Routes**:
        - `GET /`: Requires both authentication (`protectRoute`) and admin access (`admin`) to get all users.
        - `DELETE /:userId`: Requires authentication (`protectRoute`) and admin access (`admin`) to delete a specific user by their ID.

5. **Export**:
    - Exports the defined user routes configured using Express Router.

##### `productRoutes`

1. **Express Router Setup**:

    - Initializes an instance of Express Router specifically for managing product-related routes.

2. **Controllers Import**:

    - Imports functions from the `productsController` module responsible for handling product-related operations such as getting all products, getting a single product, creating, updating, and deleting products.

3. **Middleware for Authorization**:

    - Imports authentication and authorization middleware from `authMiddleware`. `protectRoute` ensures route protection and `admin` allows access only to admin users.

4. **Route Definitions**:

    - **Public Routes**:

        - `GET /`: Retrieves all products.
        - `GET /:productId`: Retrieves a specific product by its ID.

    - **Admin-Only Routes**:
        - `POST /`: Creates a new product. Requires authentication (`protectRoute`) and admin access (`admin`).
        - `PUT /:productId`: Updates a specific product by its ID. Requires authentication (`protectRoute`) and admin access (`admin`).
        - `DELETE /:productId`: Deletes a specific product by its ID. Requires authentication (`protectRoute`) and admin access (`admin`).

5. **Export**:
    - Exports the configured product routes using Express Router.

##### `orderRoutes`

1. **Express Router Setup**:

    - Initializes an instance of Express Router specifically for managing order-related routes.

2. **Controllers Import**:

    - Imports functions from the `orderControllers` module responsible for handling order-related operations such as creating orders, editing orders, deleting orders, and retrieving orders by various criteria.

3. **Middleware for Authorization**:

    - Imports authentication and authorization middleware from `authMiddleware`. `protectRoute` ensures route protection, and `admin` allows access only to admin users.

4. **Route Definitions**:

    - **User Routes**:

        - `GET /`: Retrieves orders for a specific user. Requires authentication (`protectRoute`).

        - `GET /:orderId`: Retrieves a specific order by its ID. Requires authentication (`protectRoute`).

        - `POST /`: Creates a new order. Requires authentication (`protectRoute`).

    - **Admin-Only Routes**:

        - `GET /admin/orders`: Retrieves all orders. Requires authentication (`protectRoute`) and admin access (`admin`).

        - `PUT /admin/:orderId`: Edits a specific order by its ID. Requires authentication (`protectRoute`) and admin access (`admin`).

        - `DELETE /admin/:orderId`: Deletes a specific order by its ID. Requires authentication (`protectRoute`) and admin access (`admin`).

5. **Export**:
    - Exports the configured order routes using Express Router.
