import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(3, { message: "Too short" }),
  username: z.string().min(4, { message: "Too short" }),
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 8 characters." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});