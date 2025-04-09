
"use server";
import Category from "@/models/Category";
import connectMongoDB from "@/utils/mongodb";
import verifyToken from "@/utils/validate_token";
import { parse } from "cookie";

export async function GET(req) {
    await connectMongoDB();
    try {
        const cookies = req.headers.get("Cookie");
        if (!cookies) {
            return new Response(JSON.stringify({ message: "No cookies found" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const parsedCookies = parse(cookies);
        const token = parsedCookies.jwtToken;
        if (!token) {
            return new Response(JSON.stringify({ message: "Token not found in cookies" }), {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const payload = verifyToken(token);
        if (payload === null) {
            return new Response(JSON.stringify({ message: "Invalid token" }), {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

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
        const cookies = req.headers.get("Cookie");
        if (!cookies) {
            return new Response(JSON.stringify({ message: "No cookies found" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const parsedCookies = parse(cookies);
        const token = parsedCookies.jwtToken;
        if (!token) {
            return new Response(JSON.stringify({ message: "Token not found in cookies" }), {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const payload = verifyToken(token);
        if (payload === null) {
            return new Response(JSON.stringify({ message: "Invalid token" }), {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    } catch (error) {

    }
}
