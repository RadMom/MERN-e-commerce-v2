const errorHandler = (err, req, res, next) => {
    // Log the error for tracking purposes (if logging system is available)
    console.error(err);

    // Determine the status code for the error
    const status = err.status ? err.status : 500;

    // Customize the error response structure based on your needs
    const response = {
        error: {
            message: err.message,
        },
    };

    // Include stack trace only in non-production environments
    if (process.env.NODE_ENV !== "production") {
        response.error.stack = err.stack;
    }

    // Send the error response
    res.status(status).json(response);
};

module.exports = errorHandler;
