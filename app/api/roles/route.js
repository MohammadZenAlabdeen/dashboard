import Role from '@/models/Role'
import { cookies } from 'next/headers'
import { ZodError } from 'zod'
import verify from '@/utils/validate_token'
import connectMongoDB from '@/utils/mongodb'

export async function POST(req) {
  const data = await req.json()
  await connectMongoDB()
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwtToken')?.value
    const verifiedToken = await verify(token)

    if (!verifiedToken) {
      return new Response(
        JSON.stringify({ message: 'Token not found in cookies' }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    if (!data?.name) {
      return new Response(
        JSON.stringify({ message: 'Role name is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    const newRole = await Role.create({
      name: data.name,
      // permissions: data.permissions
    })

    return new Response(
      JSON.stringify({ message: 'Role added successfully' }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
        role: newRole,
      }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify({ message: 'Validation error' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else {
      console.error('Role creation error:', error)
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

export async function GET() {
  await connectMongoDB()
  try {
    const foundRoles = await Role.find()
    return new Response(
      JSON.stringify({ message: 'Roles Found Successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        roles: foundRoles,
      }
    )
  } catch {
    if (!foundRoles) {
      return new Response(JSON.stringify({ message: 'Roles Not Found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      })
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

export async function DELETE(id) {
  await connectMongoDB()
  const roleId = new ObjectId(id)
  const role = await Role.findByIdAndDelete(roleId)
  try {
    return new Response(
      JSON.stringify({ message: 'Role is Deleted Successfully' }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
        role: role,
      }
    )
  } catch {
    if (!role) {
      return new Response(JSON.stringify({ message: 'Role id Not Found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      })
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
