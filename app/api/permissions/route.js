import Permission from '@/models/Permission'
import connectMongoDB from '@/utils/mongodb'

export async function GET() {
  await connectMongoDB()
  try {
    const foundPermissions = await Permission.find()
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
  } catch {
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
    } else {
      return new Response(
        JSON.stringify({ message: 'Internal Server Error' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }
  }
}
