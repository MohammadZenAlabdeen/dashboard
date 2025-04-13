import Role from "@/models/Role";
import User from "@/models/User";
import { GenericError, TokenError } from "@/utils/custom-errors";
import { hashUserPassword } from "@/utils/hash";
import connectMongoDB from "@/utils/mongodb";
import { UserSchema } from "@/utils/validation";
import VerifyToken from "@/utils/verify-token";

export async function PUT(req, { params }) {
    await connectMongoDB();
    const {id}=await params;
    const data = await req.json();
    try {
        const payload = await VerifyToken(req);
        if (payload.role !== "admin") {
            throw new TokenError("Invalid token");
        }

        UserSchema.parse(data);

        const role = await Role.findById(data.role);
        if (!role) {
            throw new GenericError("The role entered does not exist", 404);
        }

        let user = await User.findById(id);
        if (!user) {
            throw new GenericError("This user does not exist", 404);
        }

        const password = hashUserPassword(data.password);
        user = await User.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    name: data.name,
                    email: data.email,
                    password: password,
                    token: "",
                    role: data.role,
                },
            },
            { new: true }
        ).select("name email role").populate("role","name");

        if (!user) {
            throw new GenericError("Failed to update user", 500);
        }

        return new Response(
            JSON.stringify({
                message: "User updated successfully",
                user,
            }),
            {
                status: 200,
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

export async function DELETE(req, { params }) {
    await connectMongoDB();
    const { id } = await params;
    try {
        const payload = await VerifyToken(req);
        if (payload.role !== "admin") {
            throw new TokenError("Invalid token");
        }

        const user = await User.findById(id);
        if (!user) {
            throw new GenericError("This user does not exist", 404);
        }

        await User.deleteOne({ _id: id });

        return new Response(
            JSON.stringify({ message: "User deleted successfully" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        if (error instanceof GenericError) {
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

export async function GET(req, { params }) {
    await connectMongoDB();
    const { id } =await params;
    try {
        const payload = await VerifyToken(req);
        if (payload.role !== "admin") {
            throw new TokenError("Invalid token");
        }

        const user = await User.findById(id).select("name email role").populate("role", "name");
        if (!user) {
            throw new GenericError("This user does not exist", 404);
        }

        return new Response(
            JSON.stringify({
                message: "User fetched successfully",
                user,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        if (error instanceof GenericError) {
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
