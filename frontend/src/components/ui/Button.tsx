import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const ButttonVariants = cva(
  [
    "font-semibold",
    "p-4",
    "border",
    "rounded",
    "font-quicksand",
    "tracking-widest",
    "shadow-3xl",
    "gap-2",
  ],
  {
    variants: {
      intent: {
        primary: ["bg-teal", "text-black", "hover:bg-teal-400"],
        secondary: ["bg-bright-turquoise", "text-black", "hover:bg-teal-400"],
        pink: [
          "bg-pink",
          "text-white",
          "border-transparent",
          "hover:bg-pink-700",
        ],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-2", "px-4"],
        large: ["w-full", "text-lg", "py-3", "px-6"],
        xl: ["w-full", "text-xl", "py-3", "px-6"],
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        size: "medium",
        className: "uppercase",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButttonVariants> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  ...props
}) => (
  <button
    className={twMerge(ButttonVariants({ className, intent, size }))}
    {...props}
  />
);
