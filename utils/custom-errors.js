
export class TokenError extends Error {
    constructor(message) {
        super(message);
        this.name = "TokenError";
        this.statusCode = 403;
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
        };
    }
}

import { ZodError } from "zod";

export class ValidationError extends Error {
    constructor(message, details = []) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
        this.details = Array.isArray(details) ? details : [];
    }

    static fromZodError(zodError) {
        if (zodError instanceof ZodError) {
            const formattedDetails = zodError.errors.map((err) => ({
                code: err.code,
                path: err.path.join("."),
                message: err.message,
            }));

            return new ValidationError("Validation failed", formattedDetails);
        }
        return new ValidationError("Unknown validation error");
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
            details: this.details,
        };
    }
}


export class GenericError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = "GenericError";
        this.statusCode = statusCode;
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
        };
    }
}
