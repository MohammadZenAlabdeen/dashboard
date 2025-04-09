import { z } from 'zod'

export const RegisterSchema = z
  .object({
    name: z
      .string({ message: 'name must be a string' })
      .min(4, 'name must be at least 4 letters long'),
    email: z
      .string({ message: 'email must be a string' })
      .email('must be a valid mail'),
    password: z
      .string({ message: 'password must be a string' })
      .min(8, 'passowrd must be at least 8 characters long'),
    confirmPassword: z.string({
      message: 'password confirmation must be a string',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export const LoignSchema = z.object({
  email: z
    .string({ message: 'email must be a string' })
    .email('must be a valid mail'),
  password: z
    .string({ message: 'password must be a string' })
    .min(8, 'password must be at least 8 characters long'),
})

export const RoleSchema = z.object({
  role: z.string({ message: 'Role must be string' }),
  permissions: z.array(z.string()).min(1, { message: 'Permissions array must contain at least one permission' }).max(10, { message: 'Permissions array cannot exceed 10 items' }),})
export const LoginSchema = z.object({
  email: z
    .string({ message: 'email must be a string' })
    .email('must be a valid mail'),
  password: z
    .string({ message: 'password must be a string' })
    .min(8, 'password must be at least 8 characters long'),
})
