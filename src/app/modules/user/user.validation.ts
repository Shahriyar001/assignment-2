import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const addressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number().min(1),
  username: z.string().trim().min(1),
  password: z.string().min(6), // You may adjust the minimum length as needed
  fullName: fullNameValidationSchema,
  age: z.number().positive().int().min(1),
  email: z.string().email().min(1),
  isActive: z.enum(['active', 'blocked']).default('active'),
  hobbies: z.array(z.string()).min(1),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).default([]),
  isDeleted: z.boolean().optional(),
});

export default userValidationSchema;
