import * as z from "zod";

export const SignupValidation = z.object({
  name:z.string().min(3, {message:'Too short'}),
    username: z.string().min(4, {message:'Too short'}),
    email:z.string().email(),
    password:z.string().min(6,{message:'Password must be at least 8 characters.'})
  })