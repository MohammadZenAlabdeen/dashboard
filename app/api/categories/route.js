import Category from "@/models/Category";
import connectMongoDB from "@/utils/mongodb";
import VerifyToken from "@/utils/verify-token";
import { TokenError, ValidationError, GenericError } from "@/utils/custom-errors";

export async function GET(req) {
    await connectMongoDB();
    try {
        const payload = await VerifyToken(req);

        const categories = await Category.find();
        if (!categories || categories.length === 0) {
            throw new GenericError("No categories found", 404);
        }

        return new Response(
            JSON.stringify({ message: "Categories found successfully", categories }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: error.message || "Internal server error" }),
            {
                status: error.statusCode || 500,
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
    }
}

export async function POST(req) {
    await connectMongoDB();
    try {
        const payload = await VerifyToken(req);


        return new Response(JSON.stringify({ message: "Success" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: error.message || "Internal server error" }),
            {
                status: error.statusCode || 500,
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
    }
}
