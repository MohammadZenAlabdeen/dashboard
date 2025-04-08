"use server"
import User from "@/models/User";
import generatetoken from "@/utils/generate_token";
import { verifyPassword } from "@/utils/hash";
import connectMongoDB from "@/utils/mongodb";
import { LoginSchema } from "@/utils/validation";

export default async function Post(req) {
    const data = await req.json();
    await connectMongoDB();
    try {
        await LoginSchema.parse({ email: data.email, password: data.password });
        const user = await User.find({ email: data.email });
        if (!user) {
            return new Response(JSON.stringify({ message: "The email doesn't exist" }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
        const match = verifyPassword(user.password, data.password);
        if (!match) {
            return new Response(JSON.stringify({ message: "The password isn't correct" }), {
                status: 403,
                headers: {
                    "Content-type": "application/json"
                }
            })
        }
        const token = generatetoken(user.name, user.role);

        await User.updateOne({ _id: user._id }, { $set: { token: token } })
        const cookie = serialize("jwtToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
        });
        return new Response(JSON.stringify({ message: "user logged in succesfully" }), {
            status: 200,
            headers: {
                "Set-Cookie": cookie,
                "Content-Type": "application/json",
            }
        })
    } catch (error) {
        if (error instanceof ZodError) {
            return new Response(JSON.stringify({ errors: error.errors }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else {
            return new Response(JSON.stringify({ message: "Internal server error" }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    }

}