import { cva } from "class-variance-authority";

export const Heading = cva(
  ["mt-5", "font-extrabold", "text-5xl", "leading-[1.15]", "text-black"],
  {
    variants: {
      size: {
        small: "text-6xl",
      },
    },
    defaultVariants: {
      size: "small",
    },
  }
);
