import { RegisterSchema } from "@/utils/validation";

export default async function Post(req,res){
    const data=req.body;
    RegisterSchema.parse({name:data.name,email:data.email,password:data.password,confirmPassword:data.confirmPassword})
}