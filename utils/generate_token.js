import jwt from "jsonwebtoken"
import {JwtPayload} from "jsonwebtoken"

export default function generatetoken(name, role) {  
    const privateKey = process.env.JSON_SECRET_KEY;  
    const payload = {  
        name,  
        role,  
    };  
    const token = jwt.sign(payload, privateKey, { expiresIn: '30d' });  
    return token;  
} 