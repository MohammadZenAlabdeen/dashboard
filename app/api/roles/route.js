import Role from '@/models/Role'
import { cookies } from 'next/headers'
import { ZodError } from 'zod'
import verify from '@/utils/validate_token'
import connectMongoDB from '@/utils/mongodb'

export default async function POST(req, res) {
  await connectMongoDB()
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    const verifiedToken = await verify(token)

    if (!verifiedToken) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const data = await req.json()

    if (!data?.name) {
      return res.status(400).json({ message: 'Role name is required' })
    }

    const newRole = await Role.create({
      name: data.name,
      // permissions: data.permissions
    })

    return res.status(201).json({
      message: 'Role added successfully',
      role: newRole,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      })
    } else {
      console.error('Role creation error:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}
