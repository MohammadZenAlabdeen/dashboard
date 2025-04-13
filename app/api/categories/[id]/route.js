import Category from "@/models/Category";
import { GenericError, ValidationError, TokenError, formatZodErrors } from "@/utils/custom-errors";
import connectMongoDB from "@/utils/mongodb";
import { CategorySchema } from "@/utils/validation";
import VerifyToken from "@/utils/verify-token";
import { ZodError } from "zod";

export async function GET(req, { params }) {
    await connectMongoDB();
    const { id } = await params;
    try {
        const payload = await VerifyToken(req);
        if (!id) {
            throw new GenericError("ID is required to fetch category", 400);
        }

        const category = await Category.findById(id);
        if (!category) {
            throw new GenericError("Category not found", 404);
        }

        return new Response(
            JSON.stringify({
                message: "Category fetched successfully",
                category: category,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
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
        }

        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

export async function PUT(req, { params }) {
    await connectMongoDB();
    const { id } = await params;
    try {
        const data = await req.body;
        const payload = await VerifyToken(req);

        if (payload.role !== "admin") {
            throw new TokenError("Unauthorized access");
        }

        if (!id) {
            throw new GenericError("ID is required to update category", 400);
        }

        CategorySchema.parse({ name: data.name });

        const category = await Category.findById(id);
        if (!category) {
            throw new GenericError("Category not found", 404);
        }

        category.name = data.name;
        await category.save();

        return new Response(
            JSON.stringify({
                message: "Category updated successfully",
                category: category,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
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
        } else if (error instanceof TokenError) {
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
            JSON.stringify({ message: "Internal server error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

export async function DELETE(req, { params }) {
    await connectMongoDB();
    const { id } = await params;
    try {
        const payload = await VerifyToken(req);

        if (payload.role !== "admin") {
            throw new TokenError("Unauthorized access");
        }

        if (!id) {
            throw new GenericError("ID is required to delete category", 400);
        }

        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            throw new GenericError("Category not found", 404);
        }

        return new Response(
            JSON.stringify({
                message: "Category deleted successfully",
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        if (error instanceof TokenError) {
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
            JSON.stringify({ message: "Internal server error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
