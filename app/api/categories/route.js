import Category from "@/models/Category";
import connectMongoDB from "@/utils/mongodb";
import VerifyToken from "@/utils/verify-token";
import { TokenError, ValidationError, GenericError, formatZodErrors } from "@/utils/custom-errors";
import { CategorySchema } from "@/utils/validation";
import { ZodError } from "zod";

export async function GET(req) {
    await connectMongoDB();
    try {
        const payload=await VerifyToken(req);
        const categories = await Category.find();
        if (!categories || categories.length === 0) {
            throw new GenericError("No categories found", 404);
        }

        return new Response(
            JSON.stringify({
                message: "Categories found successfully",
                categories,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        if (error instanceof GenericError) {
            return new Response(
                JSON.stringify(error.toJSON()),
                {
                    status: error.statusCode,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }else if(error instanceof TokenError){
            return new Response(
                JSON.stringify(error.toJSON()),
                {
                    status: error.statusCode,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        return new Response(
            JSON.stringify({
                message: error.message || "Internal server error",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

export async function POST(req) {
    await connectMongoDB();
    const data = await req.json();
    try {
        const payload = await VerifyToken(req);

        if (payload.role !== "admin") {
            throw new TokenError("Unauthorized access");
        }

        CategorySchema.parse({ name: data.name });

        const category = await Category.findOne({ name: data.name });
        if (category) {
            throw new GenericError("Category already exists", 409);
        }

        await Category.create({ name: data.name });

        return new Response(
            JSON.stringify({ message: "Category created successfully" }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
          if (error instanceof ZodError) {
            const formattedErrors = formatZodErrors(error);
            return new Response(
                JSON.stringify({
                    message: "Validation failed",
                    errors: formattedErrors,
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }  else if (error instanceof TokenError) {
            return new Response(
                JSON.stringify(error.toJSON()),
                {
                    status: error.statusCode,
                    headers: { "Content-Type": "application/json" },
                }
            );
        } else if (error instanceof GenericError) {
            return new Response(
                JSON.stringify(error.toJSON()),
                {
                    status: error.statusCode,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        return new Response(
            JSON.stringify({
                message: error.message || "Internal server error",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
