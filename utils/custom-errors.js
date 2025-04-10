import { ZodError } from "zod";

export function formatZodErrors(zodError) {
    return zodError.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
    }));
}
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
