const  errorHandler = (err, req, res, next) =>{
    // Determine the status code based on the type of error
    const status = err.statusCode || 500; // Default to 500 if statusCode not provided
    const message = err.message || "BACKEND ERROR";
    const extraDetails = err.extraDetails || "Error from Backend";    
    res.status(status).json({
        message,extraDetails        
    });
}
module.exports = errorHandler;