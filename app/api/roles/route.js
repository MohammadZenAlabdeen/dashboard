import Role from '@/models/Role'
import { ZodError } from 'zod'
import connectMongoDB from '@/utils/mongodb'
import Permission from '@/models/Permission'
import { RoleSchema } from '@/utils/validation'
import { ObjectId } from 'mongodb'
import {
  TokenError,
  ValidationError,
  GenericError,
  formatZodErrors,
} from '@/utils/custom-errors'
import VerifyToken from '@/utils/verify-token'

export async function POST(req) {
  const data = await req.json()
  await connectMongoDB()
  try {
    const payload = await VerifyToken(req)

    if (payload.role !== 'admin') {
      throw new TokenError('Unauthorized access')
    }

    RoleSchema.parse({ role: data.role, permissions: data.permissions })

    const existingPermissions = await Permission.find({
      _id: { $in: data.permissions },
    })
    if (existingPermissions.length !== data.permissions.length) {
      throw new ValidationError('One or more permissions not found')
    }

    const newRole = await Role.create({
      name: data.role,
      permissions: data.permissions || [],
    })

    if (data.permissions && data.permissions.length > 0) {
      await Permission.updateMany(
        { _id: { $in: data.permissions } },
        { $addToSet: { roles: newRole._id } }
      )
    }

    return new Response(
      JSON.stringify({
        message: 'Role added successfully',
        role: newRole,
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = formatZodErrors(error)
      return new Response(
        JSON.stringify({
          message: 'Validation failed',
          errors: formattedErrors,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    } else if (error instanceof TokenError) {
      return new Response(JSON.stringify(error.toJSON()), {
        status: error.statusCode,
        headers: { 'Content-Type': 'application/json' },
      })
    } else if (error instanceof GenericError) {
      return new Response(JSON.stringify(error.toJSON()), {
        status: error.statusCode,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function GET(req) {
  await connectMongoDB()
  try {
    const foundedRoles = await Role.find()

    if (!foundedRoles || foundedRoles.length === 0) {
      throw new GenericError('Roles not found', 404)
    }

    const payload = await VerifyToken(req)
    if (payload.role !== 'admin') {
      throw new TokenError('Unauthorized access')
    }

    return new Response(
      JSON.stringify({
        message: 'Roles found successfully',
        role: foundedRoles,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch {
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function DELETE(req) {
  await connectMongoDB()

  try {
    const payload = await VerifyToken(req)

    if (payload.role !== 'admin') {
      throw new TokenError('Unauthorized access')
    }

    const data = await req.json()
    const roleId = new ObjectId(data.id)
    const role = await Role.findByIdAndDelete(roleId)

    if (!role) {
      throw new GenericError('Role ID not found', 404)
    }

    return new Response(
      JSON.stringify({
        message: 'Role is deleted successfully',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    if (error instanceof TokenError) {
      return new Response(JSON.stringify(error.toJSON()), {
        status: error.statusCode,
        headers: { 'Content-Type': 'application/json' },
      })
    } else if (error instanceof GenericError) {
      return new Response(JSON.stringify(error.toJSON()), {
        status: error.statusCode,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
