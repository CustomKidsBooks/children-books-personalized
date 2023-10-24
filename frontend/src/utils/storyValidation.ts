import * as Yup from "yup";
export const createStoryValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters long")
    .max(30, "Title is too Long!")
    .required("Title is required"),
  ageGroup: Yup.string()
    .required("Age group is required")
    .min(1, "Age group must be selected"),
  subject: Yup.string()
    .min(10, "Subject must be at least 10 characters long")
    .max(100, "Subject is too Long!")
    .required(),
  page: Yup.number()
    .min(3, "Page must be at least 3")
    .max(10, "Page cannot greater than 10")
    .required(),
  characters: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters long")
        .max(15, "Name is too Long!"),
      description: Yup.string()
        .min(5, "Description must be at least 5 characters long")
        .max(50, "Description is too Long!"),
    })
  ),
  lesson: Yup.string().min(1, "lesson is optional"),
});
