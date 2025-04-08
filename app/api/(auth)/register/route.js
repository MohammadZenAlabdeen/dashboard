import User from "@/models/User";
import generatetoken from "@/utils/generate_token";
import { hashUserPassword } from "@/utils/hash";
import { RegisterSchema } from "@/utils/validation";
import { ZodError } from "zod";
import { serialize } from "cookie";

export async function POST(req,res){
    const data=req.body;
    try{
    RegisterSchema.parse({name:data.name,email:data.email,password:data.password,confirmPassword:data.confirmPassword})
    const passowrd=hashUserPassword(data.password);
    const token=generatetoken(data.name,"user");
    User.create({
        name:data.name,
        email:data.email,
        password:passowrd,
        token:token,
    })

    const cookie=serialize({
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 60 * 60 * 24,
        path: '/',  
    })
    res.setHeader('Set-Cookie', cookie);  
    return res.status(201).json({ message: 'User registered successfully' });  
}catch(error){
    if (error instanceof ZodError) {  
        return res.status(400).json({ errors: error.errors });  
    } else {  
       return res.status(500).json({ message: 'Internal server error' });  
    }   
}}