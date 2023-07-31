import * as Yup from "yup";
export const createStoryValidationSchema = Yup.object().shape({
  subject: Yup.string()
    .required("Subject is required")
    .min(10, "Subject must be at least 10 characters long")
    .max(50, "Subject is too Long!"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long")
    .max(50, "Description is too Long!"),
  message: Yup.string()
    .required("Message is required")
    .min(5, "Message must be at least 5 characters long")
    .max(25, "Message is too Long!"),
  ageGroup: Yup.number()
    .required("Age group is required")
    .min(1, "Age group must be selected"),
  specialNeeds: Yup.string().min(1, "specialNeeds is optional"),
  language: Yup.string()
    .required("Language is required")
    .min(1, "language is selected"),
  character: Yup.string()
    .required("Character is required")
    .min(1, "Character must be selected"),
});
