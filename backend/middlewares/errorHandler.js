const errorHandler = (err, req, res, next) => {
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode,
        name: err.name
    });
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server Error';
    
    res.status(statusCode).json({
        success: false,
        message: message
    });
};

module.exports = errorHandler;