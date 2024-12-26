const { z } = require('zod');

// Asynchronous middleware for validating request body against a Zod schema
const validateBody = (schema) => {
    return async (req, res, next) => {
        try {
            const result = schema.safeParse(req.body);
            if (!result.success) {                
                // return res.status(400).json({ errors: result.error.errors[0].message });
                next(result.error.errors[0].message);
            }
            req.body = result.data; // Optionally, replace req.body with the parsed data
            next();
        } catch (error) {
            // Handle any unexpected errors during the validation process
            return res.status(500).json({ error: "Internal server error during validation" });
        }
    };
};
module.exports = validateBody;