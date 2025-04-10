"use server";
import User from "@/models/User";
import generatetoken from "@/utils/generate_token";
import { verifyPassword } from "@/utils/hash";
import connectMongoDB from "@/utils/mongodb";
import { LoginSchema } from "@/utils/validation";
import { serialize } from "cookie";
import { ZodError } from "zod";
import { ValidationError, GenericError } from "@/utils/custom-errors";

export async function POST(req) {
    const data = await req.json();
    await connectMongoDB();

    try {
        LoginSchema.parse({ email: data.email, password: data.password });

        const user = await User.findOne({ email: data.email }).populate("role");
        if (!user) {
            throw new GenericError("The email doesn't exist", 404);
        }

        const match = verifyPassword(user.password, data.password);
        if (!match) {
            throw new GenericError("The password isn't correct", 403);
        }

        const token = generatetoken(user.name, user.role.name);

        await User.updateOne({ _id: user._id }, { $set: { token: token } });

        const cookie = serialize("jwtToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
        });

        return new Response(JSON.stringify({ message: "User logged in successfully" }), {
            status: 200,
            headers: {
                "Set-Cookie": cookie,
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        if (error instanceof ZodError) {
            const validationError = ValidationError.fromZodError(error);
            return new Response(JSON.stringify(validationError.toJSON()), {
                status: validationError.statusCode,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(
            JSON.stringify({
                message: error.message || "Internal server error",
            }),
            {
                status: error.statusCode || 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
