"use server";
import User from "@/models/User";
import connectMongoDB from "@/utils/mongodb";
import VerifyToken from "@/utils/verify-token";
import { serialize } from "cookie";
import { LoginSchema, ValidationError, TokenError, GenericError, formatZodErrors } from "@/utils/custom-errors";
import { ZodError } from "zod";

export async function GET(req) {
    await connectMongoDB();
    try {
        const data = await req.body();
        LoginSchema.parse(data);

        const payload = await VerifyToken(req);

        if (!payload.email) {
            throw new TokenError("Invalid token");
        }

        await User.updateOne({ email: payload.email }, { $set: { token: "" } });

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
            JSON.stringify({ message: error.message || "Internal server error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
