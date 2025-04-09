import Permission from '@/models/Permission'
import connectMongoDB from '@/utils/mongodb'

export async function GET() {
  await connectMongoDB()
  try {
    const payload=await VerifyToken(req);
    if(payload.role==="admin"){
    const foundPermissions = await Permission.find().populate('Role')
    if (!foundPermissions) {
      return new Response(
        JSON.stringify({ message: 'Permissions Not Found' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }
    return new Response(
      JSON.stringify({ message: 'Permissions Found Successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        permissions: foundPermissions,
      }
    )
  }else{
    return new Response(
      JSON.stringify({ message: 'You are not authorised' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )  } }catch {

      return new Response(JSON.stringify({ message: error.message||"Internal server error"}), {
        
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    
  }
}
