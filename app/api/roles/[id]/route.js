import Permission from '@/models/Permission'
import Role from '@/models/Role'
import { formatZodErrors, GenericError, TokenError } from '@/utils/custom-errors'
import connectMongoDB from '@/utils/mongodb'
import { RoleSchema } from '@/utils/validation'
import VerifyToken from '@/utils/verify-token'
import { ZodError } from 'zod'

export async function GET(req, { params }) {
  await connectMongoDB()
  const { id } = await params;
  try {
    await VerifyToken(req)
    if (!id) {
      throw new GenericError('Role id not found!', 404)
    }
    const foundedRole = await Role.findById(id).populate('permissions')
    if (!foundedRole) {
      throw new GenericError('Role not found!', 404)
    }
    return new Response(
      JSON.stringify({
        message: 'Role fetched successfully!',
        role: foundedRole,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    if (error instanceof GenericError) {
      return new Response(JSON.stringify(error.toJSON()), {
        status: error.statusCode,
        headers: { 'Content-Type': 'application/json' },
      })
    } else if (error instanceof TokenError) {
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

export async function PUT(req, { params }) {
  const { id } = await params
  await connectMongoDB()
  try {
    const data = await req.body
    const existingRole = await Role.findById(id).populate('permissions')
    const payload = await VerifyToken(req)
    if (payload.role !== 'admin') {
      throw new TokenError('Unauthorized access')
    }

    if (!existingRole) {
      throw new GenericError("role does'nt exist!", 400)
    }

    if (!id) {
      throw new GenericError('ID is required to update role', 400)
    }
    RoleSchema.parse({ role: data.role, permissions: data.permissions })

    if (data.permissions && data.permissions.length > 0) {
      const existingPermissions = await Permission.find({
        _id: { $in: data.permissions },
      })

      if (existingPermissions.length !== data.permissions.length) {
        throw new GenericError('One or more permissions not found', 400)
      }
    }

    const currentPermissionIds = existingRole.permissions.map((p) =>
      p._id.toString()
    )

    existingRole.name = data.role || existingRole.name
    existingRole.permissions = data.permissions || existingRole.permissions

    await existingRole.save()

    const newPermissionIds = data.permissions
      ? data.permissions.map((p) => p.toString())
      : currentPermissionIds
    await Permission.updateMany(
      { _id: { $in: newPermissionIds } },
      { $addToSet: { roles: existingRole._id } }
    )

    const permissionsRemove = await currentPermissionIds.filter(
      (id) => !newPermissionIds.includes(id)
    )

    if (permissionsRemove.length > 0) {
      await Permission.updateMany(
        { _id: { $in: permissionsRemove } },
        { $pull: { roles: existingRole._id } }
      )
    }

    return new Response(
      JSON.stringify({
        message: 'Role Updated successfully',
        role: existingRole,
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

export async function DELETE(req, { params }) {
  await connectMongoDB()
  const { id } = await params

  try {
    const payload = await VerifyToken(req)
    if (payload.role !== 'admin') {
      throw new TokenError('Unauthorized access')
    }

    if (!id) {
      throw new GenericError('ID is required to delete Role', 400)
    }

    const role = await Role.findByIdAndDelete(id)
    if (!role) {
      throw new GenericError('Role not found', 404)
    }

    return new Response(
      JSON.stringify({
        message: 'Role deleted successfully',
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
