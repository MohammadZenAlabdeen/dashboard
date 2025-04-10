import Permission from "@/models/Permission";
import connectMongoDB from "@/utils/mongodb";
import VerifyToken from "@/utils/verify-token";
import { TokenError, GenericError } from "@/utils/custom-errors";

export async function GET(req) {
    await connectMongoDB();
    try {
        const payload = await VerifyToken(req);

        if (payload.role !== "admin") {
            throw new TokenError("Unauthorized access");
        }

        const foundPermissions = await Permission.find().populate("Role");
        if (!foundPermissions || foundPermissions.length === 0) {
            throw new GenericError("Permissions not found", 404);
        }

        return new Response(
            JSON.stringify({
                message: "Permissions retrieved successfully",
                permissions: foundPermissions,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        if (error instanceof TokenError) {
            return new Response(
                JSON.stringify(error.toJSON()),
                {
                    status: error.statusCode,
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
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
