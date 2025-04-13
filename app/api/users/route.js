import Role from "@/models/Role";
import User from "@/models/User";
import { formatZodErrors, GenericError, TokenError } from "@/utils/custom-errors";
import { hashUserPassword } from "@/utils/hash";
import connectMongoDB from "@/utils/mongodb";
import { UserSchema } from "@/utils/validation";
import VerifyToken from "@/utils/verify-token";
import { ZodError } from "zod";

export async function POST(req) {
    const data = await req.body;
    await connectMongoDB();
    try {
        const payload = await VerifyToken(req);
        if (payload.role !== "admin") {
            throw new TokenError("Invalid token");
        }
        UserSchema.parse(data);
        const role = await Role.findById(data.role);
        if (!role) {
            throw new GenericError("This role does not exist", 404);
        }
        let user = await User.findOne({ email: data.email });
        if (user) {
            throw new GenericError("The email is already in use", 409);
        }
        const password = hashUserPassword(data.password);
        user = await User.create({
            name: data.name,
            email: data.email,
            password,
            token: "",
            role: role._id,
        });
        return new Response(
            JSON.stringify({
                message: "User created successfully",
            }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
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
        } else if (error instanceof GenericError) {
            return new Response(
                JSON.stringify(error.toJSON()),
                {
                    status: error.statusCode,
                    headers: { "Content-Type": "application/json" },
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
export async function GET(req) {
    await connectMongoDB();
    try {
        const payload = await VerifyToken(req);
        if (payload.role !== "admin") {
            throw new TokenError("Invalid token");
        }
        const users = await User.find().select("name email role").populate("role", "name");;
        if (users.length === 0) {
            throw new GenericError("No users found", 404);
        }
        return new Response(
            JSON.stringify({
                message: "Users fetched successfully",
                users,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        if (error instanceof GenericError) {
            return new Response(
                JSON.stringify(error.toJSON(),
                {
                    status: error.statusCode,
                    headers: { "Content-Type": "application/json" },
                })
            );
        } else if (error instanceof TokenError) {
            return new Response(
                JSON.stringify(error.toJSON(),
                {
                    status: error.statusCode,
                    headers: { "Content-Type": "application/json" },
                })
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
