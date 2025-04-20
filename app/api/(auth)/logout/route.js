"use server";
import User from "@/models/User";
import connectMongoDB from "@/utils/mongodb";
import VerifyToken from "@/utils/verify-token";
import { serialize } from "cookie";
import { TokenError, GenericError } from "@/utils/custom-errors";

export async function GET(req) {
    await connectMongoDB();
    try {
        const payload = await VerifyToken(req);
        console.log(payload)

        if (!payload.email||!payload.name||!payload.id||!payload.role) {
            throw new TokenError("Invalid token");
        }

        const user = await User.updateOne({ _id:payload.id }, { $set: { token: "" } });
        if (!user) {
            throw new GenericError("Failed to log out user", 500);
        }

        const cookie = serialize("jwtToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
            maxAge: 0,
        });

        return new Response(
            JSON.stringify({ message: "Logged out successfully" }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Set-Cookie": cookie,
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
            JSON.stringify({ message: error.message || "Internal server error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
