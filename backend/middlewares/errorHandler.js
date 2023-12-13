const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Determine the status code for the error
    const status = err.status ? err.status : 500;

    // Create the response object with an error property
    const response = { error: {} };

    // Customize the error response structure based on your needs
    if (err.message) {
        // If the error object has a message, assign it to the response
        response.error.message = err.message;
    } else {
        // If the error object doesn't have a message, set a default error message
        response.error.message = "An error occurred.";
    }

    // Include stack trace only in non-production environments
    if (process.env.NODE_ENV !== "production") {
        // Add stack trace to the error response in non-production environments
        response.error.stack = err.stack;
    }

    // Send the error response as JSON with the determined status code
    res.status(status).json(response);
};

module.exports = errorHandler;
