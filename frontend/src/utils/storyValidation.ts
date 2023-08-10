import * as Yup from "yup";
export const createStoryValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(30, "Title is too Long!"),
  ageGroup: Yup.string()
    .required("Age group is required")
    .min(1, "Age group must be selected"),
  subject: Yup.string()
    .min(10, "Subject must be at least 10 characters long")
    .max(50, "Subject is too Long!"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters long")
    .max(50, "Description is too Long!"),
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .max(15, "Name is too Long!"),
  lesson: Yup.string().min(1, "lesson is optional"),
  characters: Yup.string()
    .min(1, "Character must be selected"),
});