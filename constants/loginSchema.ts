import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter a valid email"),

  password: Yup.string().min(8).required("Please enter your password"),
});

export const signUpSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter a valid email"),

  password: Yup.string().min(8).required("Please enter your password"),

  confirmation_password: Yup.string()
    .min(8)
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
