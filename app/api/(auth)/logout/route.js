"use server"
import User from "@/models/User";
import connectMongoDB from "@/utils/mongodb";
import ValidateToken from "@/utils/validate_token";
import VerifyToken from "@/utils/verify-token";
import { parse, serialize } from "cookie";


export async function GET(req) {
    await connectMongoDB()
    try {
        const payload=await VerifyToken(req);
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
        return new Response(JSON.stringify({ message: error.message||"Internal server error"}), {
            status: error.message? 403:500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}