"use server"
import User from "@/models/User";
import connectMongoDB from "@/utils/mongodb";
import verifyToken from "@/utils/validate_token";
import { parse, serialize } from "cookie";
import Cookies from "cookies";
import { verify } from "jsonwebtoken";

export async function GET(req) {
    await connectMongoDB()
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
                    "Content-Type": "application/json"
                }
            })
        }
        const user = await User.updateOne({ email: payload.email }, { $set: { token: "" } });
        
        const cookie = serialize("jwtToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
            maxAge: 0,
        });
        return new Response(JSON.stringify({ message: "Logged out succesfully" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Set-Cookie":cookie
        }
        })

    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}