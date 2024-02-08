import * as z from "zod";

//singup validation
export const SignupValidation = z.object({
  name: z.string().min(3, { message: "Too short" }),
  username: z.string().min(4, { message: "Too short" }),
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 8 characters." }),
});
//signin validation
export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 8 characters." }),
});
// profile validation
export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  username: z.string().min(4, { message: "Name must be at least 4 characters." }),
  email: z.string().email(),
  bio: z.string(),
});
// post validation
export const PostValidation = z.object({
  caption: z.string().min(7, { message: "Minimum 7 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z.string().min(3, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});