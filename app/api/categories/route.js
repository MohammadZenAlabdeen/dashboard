
"use server";
import Category from "@/models/Category";
import connectMongoDB from "@/utils/mongodb";
import verifyToken from "@/utils/validate_token";
import VerifyToken from "@/utils/verify-token";
import { parse } from "cookie";

export async function GET(req) {
    await connectMongoDB();
    try {
       const payload=await VerifyToken(req);

        const categories = await Category.find();
        if (!categories || categories.length === 0) {
            return new Response(JSON.stringify({ message: "No categories found" }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        return new Response(JSON.stringify({ message: "Categories found successfully", categories }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export async function POST(req) {
    await connectMongoDB();
    try {
        const payload=await VerifyToken(req);

    } catch (error) {

    }
}
