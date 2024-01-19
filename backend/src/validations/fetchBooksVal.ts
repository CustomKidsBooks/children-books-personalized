import * as Yup from "yup";
import { ValidationSchema } from "../validations/interface";

export const fetchBooksVal: ValidationSchema = Yup.object().shape(
  {
    limit: Yup.number().required("limit is required").min(1, "limit must be 4"),
    page: Yup.number()
      .min(1, "Page must be at least 1")
      .required("page is required"),
    search: Yup.string().when(["search"], (search: string[], schema) => {
      return search && search[0] && search[0] !== ""
        ? (schema
            .min(0, "search must be at least 1 characters long")
            .max(
              20,
              "search must be less than 20 characters long"
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
  [["search", "search"]]
);
