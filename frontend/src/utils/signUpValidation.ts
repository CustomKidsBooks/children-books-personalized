import * as Yup from "yup";

const PASSWORD_REGEX = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
export const signUpValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("name is required")
    .min(3, "name must be at least 3 characters long")
    .max(20, "name is too Long!"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password is too Short!")
    .max(10, "Password is too Long!")
    .matches(
      PASSWORD_REGEX,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is required"),
});
