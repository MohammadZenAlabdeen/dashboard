"use server";
import User from "@/models/User";
import { LoginSchema } from "@/utils/validation";
import { ZodError } from "zod";
import generatetoken from "@/utils/generate_token";
import { serialize } from "cookie";
import connectMongoDB from "@/utils/mongodb";
import { ValidationError, GenericError, formatZodErrors } from "@/utils/custom-errors";
import { hashUserPassword } from "@/utils/hash";

export async function POST(req) {
    const data = await req.json();
    await connectMongoDB();
    try {
        LoginSchema.parse({ email: data.email, password: data.password });
        console.log(data.email)
        const user = await User.findOne({ email: data.email }).populate("role");
        if (!user) {
            throw new GenericError("Invalid email or password", 401);
        }

        const isPasswordValid = hashUserPassword(data.password, user.password);
        if (!isPasswordValid) {
            throw new GenericError("Invalid email or password", 401);
        }

        const token = generatetoken(user.name, user.role.name);
        const cookie = serialize("jwtToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
        });

        return new Response(
            JSON.stringify({
                message: "Login successful",
            }),
            {
                status: 200,
                headers: {
                    "Set-Cookie": cookie,
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
