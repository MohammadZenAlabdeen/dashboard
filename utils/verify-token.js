import { parse } from "cookie";
import { TokenError } from "./custom-errors";
import ValidateToken from "./validate_token";

export default async function VerifyToken(req) {
    const cookies = req.headers.get("Cookie");
    if (!cookies) {
        throw new TokenError("No cookies found");
    }

    const parsedCookies = parse(cookies);
    const token = parsedCookies.jwtToken;
    if (!token) {
        throw new TokenError("Token not found in cookies");
    }

    let payload;
    try {
        payload = await ValidateToken(token);
        if (!payload) {
            throw new TokenError("Invalid token");
        }
    } catch (error) {

        throw new TokenError("Token validation failed: " + error.message);
    }

    return payload;
}
