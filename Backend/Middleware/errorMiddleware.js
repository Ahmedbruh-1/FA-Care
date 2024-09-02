class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // This error is for uniqueness and 11000 is the error code from the database
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // Handle invalid token error
    if (err.name === 'JsonWebTokenError') {
        const message = "Json Web Token is Invalid, Try Again!";
        err = new ErrorHandler(message, 400);
    }

    // Handle expired token error
    if (err.name === 'TokenExpiredError') {
        const message = "Json Web Token is Expired, Try Again!";
        err = new ErrorHandler(message, 400);
    }

    // Handle invalid object ID error
    if (err.name === 'CastError') {
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    const errorMessage = err.errors ? Object.values(err.errors).map(error => error.message).join(" ") : err.message

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage
    });
};

export default ErrorHandler;
