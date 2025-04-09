import { parse } from 'cookie';
import ValidateToken from './validate_token';

export default async function VerifyToken(req) {
    const cookies = req.headers.get('Cookie');
    if (!cookies) {
        throw new Error('No cookies found');
    }

    const parsedCookies = parse(cookies);
    const token = parsedCookies.jwtToken;
    if (!token) {
        throw new Error('Token not found in cookies');
    }

    let payload;
    try {
        payload = ValidateToken(token);
        if (!payload) {
            throw new Error('Invalid token');
        }
    } catch (error) {
        throw new Error('Token validation failed: ' + error.message);
    }

    return payload;
}
