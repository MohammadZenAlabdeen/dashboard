"use server";
import User from "@/models/User";
import generatetoken from "@/utils/generate_token";
import { hashUserPassword } from "@/utils/hash";
import { RegisterSchema } from "@/utils/validation";
import { ZodError } from "zod";
import { serialize } from "cookie";
import connectMongoDB from "@/utils/mongodb";
import Role from "@/models/Role";
import Permission from "@/models/Permission";

export async function POST(req) {
    const data = await req.json();
    await connectMongoDB();
    try {
        RegisterSchema.parse({ name: data.name, email: data.email, password: data.password, confirmPassword: data.confirmPassword });
        const password = hashUserPassword(data.password);
        const token = generatetoken(data.name, "user");

        let role = await Role.findOne({ name: "user" });
        if (!role) {
            role = await Role.create({ name: "user" });
        }

        let permission = await Permission.findOne({ name: "categories_table" });
        if (!permission) {
            permission = await Permission.create({ name: "categories_table" });
        }
        if (!permission.roles.includes(role._id)) {
            permission.roles.push(role._id);
            await permission.save();
        }

        if (!role.permissions.includes(permission._id)) {
            role.permissions.push(permission._id);
            await role.save();
        }

        let user = await User.findOne({ email: data.email });
        if (user) {
            return new Response(JSON.stringify({ message: "The email is already in use" }), {
                status: 409,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        await User.create({
            name: data.name,
            email: data.email,
            password: password,
            token: token,
            role: role._id,
        });

        const cookie = serialize("jwtToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
        });

        return new Response(JSON.stringify({ message: "User registered successfully" }), {
            status: 201,
            headers: {
                "Set-Cookie": cookie,
                "Content-Type": "application/json"
            }
        });

    } catch (error) {
        if (error instanceof ZodError) {
            return new Response(
                JSON.stringify({
                    name: "ValidationError",
                    message: "Validation failed",
                    statusCode: 400,
                    details: error.errors.map(err => ({
                        code: err.code,
                        path: err.path.join("."),
                        message: err.message
                    })),
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        } else {
            return new Response(JSON.stringify({ message: error.message || "Internal server error" }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    }
}
