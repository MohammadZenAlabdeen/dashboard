import jwt from "jsonwebtoken"
export default async function ValidateToken(token) {
    try {
        const payload = jwt.verify(token, process.env.JSON_SECRET_KEY.toString())
        return payload;
    } catch (error) {
        return null;
    }
}