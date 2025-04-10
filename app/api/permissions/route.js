import Permission from "@/models/Permission";
import connectMongoDB from "@/utils/mongodb";
import VerifyToken from "@/utils/verify-token";
import { TokenError, ValidationError, GenericError } from "@/utils/custom-errors";

export async function GET(req) {
    await connectMongoDB();
    try {
        const payload = await VerifyToken(req);

        if (payload.role === "admin") {
            const foundPermissions = await Permission.find().populate("Role");
            if (!foundPermissions || foundPermissions.length === 0) {
                throw new GenericError("Permissions Not Found", 404);
            }
            return new Response(
                JSON.stringify({ message: "Permissions Found Successfully", permissions: foundPermissions }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        } else {
            throw new TokenError("You are not authorised");
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ message: error.message || "Internal server error" }),
            {
                status: error.statusCode || 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
