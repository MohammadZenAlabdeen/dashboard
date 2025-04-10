import Role from '@/models/Role';
import { ZodError } from 'zod';
import verify from '@/utils/validate_token';
import connectMongoDB from '@/utils/mongodb';
import Permission from '@/models/Permission';
import { RoleSchema } from '@/utils/validation';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  const data = await req.json();
  await connectMongoDB();
  try {
    const payload = await verify(req);
    if (payload.role !== 'admin') {
      return new Response(
        JSON.stringify({ message: 'Unauthorized access' }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    RoleSchema.parse({ role: data.role, permissions: data.permissions });

    const existingPermissions = await Permission.find({
      _id: { $in: data.permissions },
    });
    if (existingPermissions.length !== data.permissions.length) {
      return new Response(
        JSON.stringify({ message: 'One or more permissions not found' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const newRole = await Role.create({
      name: data.name,
      permissions: data.permissions || [],
    });

    if (data.permissions && data.permissions.length > 0) {
      await Permission.updateMany(
        { _id: { $in: data.permissions } },
        { $addToSet: { roles: newRole._id } }
      );
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
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response( JSON.stringify({ message: 'Validation error', details: error.errors }),{
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      return new Response(JSON.stringify({ message: error.message||"Internal server error"}), {
        status: error.message? 403:500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }
}

export async function DELETE(req) {
  await connectMongoDB();
  try {
    const payload = await verify(req);
    if (payload.role !== 'admin') {
      return new Response(
        JSON.stringify({ message: 'Unauthorized access' }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const { id } = await req.json();
    const roleId = new ObjectId(id);
    const role = await Role.findByIdAndDelete(roleId);

    if (!role) {
      return new Response(
        JSON.stringify({ message: 'Role ID not found' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Role is deleted successfully',
        role: role,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message||"Internal server error"}), {
      status: error.message? 403:500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
