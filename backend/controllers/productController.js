const Product = require("../models/Product");
const { validateObjectId } = require("../middlewares/validateObjectId");

//PUBLIC ROUTES:

const getProducts = async (req, res, next) => {
    try {
        // Destructuring query parameters from the request object
        const { page, limit, category, sortBy, search } = req.query;

        // Parse 'page' and 'limit' to integers, default to 1 and 10 respectively if undefined or NaN
        const pageInt = parseInt(page, 10) || 1;
        const limitInt = parseInt(limit, 10) || 10;

        // Initializing query and sortOptions objects
        let query = {};
        let sortOptions = {};

        // Building the query based on provided parameters

        // If 'category' is provided and not 'all', include it in the query
        if (category && category.toLowerCase() !== "all") {
            query.category = category;
        }

        // If 'sortBy' is provided, determine the sorting direction based on the value
        if (sortBy) {
            const sortByInt = Number(sortBy);
            sortByInt === 1 ? (sortOptions.price = 1) : (sortOptions.price = -1);
        }

        // If 'search' term is provided, include it in the query for 'name'
        if (search) {
            query.name = { $regex: new RegExp(search, "i") };
        }

        // Fetch products based on the constructed query, applying sorting, pagination
        const products = await Product.find(query)
            .sort(sortOptions)
            .skip((pageInt - 1) * limitInt)
            .limit(limitInt);

        // Count total products that match the query for pagination
        const totalProducts = await Product.countDocuments(query);

        // Handling scenario where no products are found based on the query
        if (products.length === 0) {
            const error = new Error("No products");
            error.status = 404;
            throw error;
        }

        // Sending successful response with products, pagination details
        res.status(200).json({
            products,
            totalPages: Math.ceil(totalProducts / limitInt),
            currentPage: pageInt,
        });
    } catch (error) {
        console.error("Error getting products:", error);
        // Pass the error to the error handling middleware
        next(error);
    }
};

//getOneProduct
const getOneProduct = async (req, res, next) => {
    try {
        const _id = req.params.productId; // Extract the product ID from the request parameters
        validateObjectId(_id); // Assuming this function validates if _id is a valid ObjectId

        // Find the product by its unique ID (_id)
        const product = await Product.findById(_id);

        // If no product is found, throw a 404 error
        if (!product) {
            const error = new Error("Can't find this product");
            error.status = 404;
            throw error;
        }

        // Respond with the found product in JSON format
        res.status(200).json({ product }); // Shorthand for { product: product }
    } catch (error) {
        console.error("Error get product:", error);
        next(error); // Forward any errors to the error handling middleware
    }
};

//ADMIN ONLY ROUTES:

//createProduct
const createProduct = async (req, res, next) => {
    const { title, image, category, description, price, stock, productIsNew } = req.body;

    try {
        if (title && image && category && description && price && stock) {
            const newProduct = await Product.create({
                creator: req.user._id,
                title,
                image,
                category,
                description,
                price,
                stock,
                productIsNew,
            });

            if (newProduct) {
                res.status(200).json(newProduct);
            }
        } else {
            const error = new Error("Provide all required details.");
            error.status = 400;
            throw error;
        }
    } catch (error) {
        console.error("Error creating product:", error);
        next(error);
    }
};

//updateProduct
const updateProduct = async (req, res, next) => {
    const { title, image, category, description, price, stock, productIsNew } = req.body;

    try {
        const _id = req.params.productId;
        validateObjectId(_id); // Assuming this function validates if _id is a valid ObjectId

        // Find the product by its ID
        const product = await Product.findById(_id);

        if (product) {
            // Check if all required fields are present for updating
            if (title && image && category && description && price && stock) {
                // Update product properties with new values
                product.title = title;
                product.image = image;
                product.category = category;
                product.description = description;
                product.price = price;
                product.stock = stock;
                product.productIsNew = productIsNew;

                // Save the updated product
                const updatedProduct = await product.save();
                res.json(updatedProduct); // Respond with the updated product
            } else {
                const error = new Error("Fill all fields!!!");
                error.status = 400;
                throw error;
            }
        } else {
            const error = new Error("Product not found.");
            error.status = 404;
            throw error;
        }
    } catch (error) {
        console.error("Error updating product:", error);
        next(error);
    }
};

//deleteProduct
const deleteProduct = async (req, res, next) => {
    console.log(req.params.productId);
    try {
        const _id = req.params.productId;
        validateObjectId(_id); // Assuming this function validates if _id is a valid ObjectId

        const product = await Product.findByIdAndDelete(_id);

        if (!product) {
            const error = new Error("Product not found");
            error.status = 404;
            throw error;
        } else {
            res.status(200).json({ message: "Product deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        next(error);
    }
};

module.exports = { getProducts, getOneProduct, createProduct, updateProduct, deleteProduct };
