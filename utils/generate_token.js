import jwt from "jsonwebtoken"
import {JwtPayload} from "jsonwebtoken"

export default function generatetoken(){
    const privateKey=process.env.JSON_SECRET_KEY.toString();
    const token=jwt.sign(JwtPayload,privateKey,{expiresIn:'30d'});
    return token;
}