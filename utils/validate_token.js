import jwt from "jsonwebtoken"
export default async function verify(token) {
    try {
        const payload = jwt.verify(token, process.env.JSON_SECRET_KEY)
        return payload;
    } catch (error) {
        return null;
    }
}