const { z } = require('zod');

const registrationSchema = z.object({
    username: z.string()
               .min(1, "Username cannot be empty.")
               .min(3, "Username must be at least 3 characters long."),
    email: z.string()
            .email("Invalid email format")
            .min(1, "Email cannot be empty.")
});
module.exports = registrationSchema;