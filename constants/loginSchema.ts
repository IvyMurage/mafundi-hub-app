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

export const handymanSchema = Yup.object({
  first_name: Yup.string().required("Please enter your first name"),
  last_name: Yup.string().required("Please enter your last name"),
  title: Yup.string().required("Please enter your title"),
  description: Yup.string().required("Please enter your bio description"),
  phone_number: Yup.string().required("Please enter your phone number"),
});
