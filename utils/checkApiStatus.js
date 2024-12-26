const ApiStatus = require('../models/ApiStatus');

const checkApiStatus = async (req, res, next) => {
    try {
        const apiStatus = await ApiStatus.findOne();
        if (apiStatus && !apiStatus.isActive) {
            return res.status(503).json({
                message: "The API is currently unavailable.",
                extraDetails: "API access has been disabled by the administrator.",
            });
        }
        next();
    } catch (error) {
        console.error("Error checking API status:", error);
        return res.status(500).json({
            message: "Server error while checking API status.",
            extraDetails: "Could not determine API availability.",
        });
    }
};

module.exports = checkApiStatus;
