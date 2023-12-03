import * as Yup from "yup";
import { ValidationSchema } from "../validations/interface";

export const createBookValSchema: ValidationSchema = Yup.object().shape(
  {
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
        name: Yup.string().when(
          ["characters"],
          (characters: string[], schema) =>
            characters && characters.length > 0
              ? (schema
                  .min(3, "Name must be at least 3 characters long")
                  .max(15, "Name is too Long!") as Yup.StringSchema<string>)
              : (schema
                  .transform((value, originalValue) => {
                    if (value === "") {
                      return null;
                    }
                    return originalValue;
                  })
                  .nullable()
                  .notRequired() as Yup.StringSchema<string | null>)
        ),
        description: Yup.string().when(
          ["characters"],
          (characters: any[], schema) =>
            characters && characters.length > 0
              ? (schema
                  .min(5, "Description must be at least 5 characters long")
                  .max(
                    30,
                    "Description is too Long!"
                  ) as Yup.StringSchema<string>)
              : (schema
                  .transform((value, originalValue) => {
                    if (value === "") {
                      return null;
                    }
                    return originalValue;
                  })
                  .nullable()
                  .notRequired() as Yup.StringSchema<string | null>)
        ),
      })
    ),
    lesson: Yup.string().when(["lesson"], (lesson: string[], schema) => {
      return lesson && lesson[0] && lesson[0] !== ""
        ? (schema
            .min(3, "Lesson must be at least 3 characters long")
            .max(
              20,
              "Lesson must be less than 20 characters long"
            ) as Yup.StringSchema<string>)
        : (schema
            .transform((value, originalValue) => {
              if (value === "") {
                return null;
              }
              return originalValue;
            })
            .nullable()
            .notRequired() as Yup.StringSchema<string | null>);
    }),
  },
  [["lesson", "lesson"]]
);
