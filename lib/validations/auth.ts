// File: E:\quintos_ai\lib\validations\auth.ts

import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address.")
    .max(255, "Email is too long.")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, "Password is required.")
    .max(128, "Password is too long."),
});

export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(2, "Full name must be at least 2 characters.")
      .max(100, "Full name must not exceed 100 characters.")
      .trim(),
    email: z
      .string()
      .email("Please provide a valid email address.")
      .max(255, "Email is too long.")
      .toLowerCase()
      .trim(),
    organization: z
      .string()
      .min(2, "Organization name must be at least 2 characters.")
      .max(100, "Organization name must not exceed 100 characters.")
      .trim(),
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters.")
      .max(128, "Password must not exceed 128 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address.")
    .max(255, "Email is too long.")
    .toLowerCase()
    .trim(),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters.")
      .max(128, "Password must not exceed 128 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof LoginSchema>;
export type SignupFormData = z.infer<typeof SignupSchema>;
export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;
