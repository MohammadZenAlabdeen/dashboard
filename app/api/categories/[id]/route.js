export async function GET(req) {
    await connectMongoDB();
    try {
        const cookies = req.headers.get("Cookie");
        if (!cookies) {
            return new Response(JSON.stringify({ message: "No cookies found" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const parsedCookies = parse(cookies);
        const token = parsedCookies.jwtToken;
        if (!token) {
            return new Response(JSON.stringify({ message: "Token not found in cookies" }), {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const payload = verifyToken(token);
        if (payload === null) {
            return new Response(JSON.stringify({ message: "Invalid token" }), {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    } catch (error) {

    }
}
export async function PUT(req) {
    await connectMongoDB();
    try {
        const cookies = req.headers.get("Cookie");
        if (!cookies) {
            return new Response(JSON.stringify({ message: "No cookies found" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const parsedCookies = parse(cookies);
        const token = parsedCookies.jwtToken;
        if (!token) {
            return new Response(JSON.stringify({ message: "Token not found in cookies" }), {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const payload = verifyToken(token);
        if (payload === null) {
            return new Response(JSON.stringify({ message: "Invalid token" }), {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    } catch (error) {

    }
}