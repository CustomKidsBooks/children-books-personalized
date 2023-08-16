import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const HeadingVariants = cva(
  [
    "mt-5",
    "font-extrabold",
    "text-5xl",
    "leading-[1.15]",
    "text-black",
    "font-sans-serif",
  ],
  {
    variants: {
      align: {
        right: "text-right",
        left: "text-left",
        center: "text-center",
      },
      size: {
        small: "text-6xl",
        medium: "text-9xl",
      },
    },
    defaultVariants: {
      size: "small",
    },
  }
);

export type HeadingProps = VariantProps<typeof HeadingVariants>;

export const Heading = ({ align, size }: HeadingProps) =>
  twMerge(HeadingVariants({ align, size }));
