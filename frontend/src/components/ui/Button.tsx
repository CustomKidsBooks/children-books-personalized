import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const ButttonVariants = cva(["font-semibold", "border", "rounded", "font-sans-serif"],
  {
    variants: {
      intent: {
        primary: [
          "bg-blue-500",
          "text-white",
          "border-transparent",
          "hover:bg-blue-600",
        ],
        secondary: [
          "bg-white",
          "text-gray-800",
          "border-gray-400",
          "hover:bg-gray-100",
        ],
        pink: [
          "bg-pink",
          "text-white",
          "border-transparent",
          "shadow-xl",
          "tracking-wider",
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
  });

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof ButttonVariants> { }

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
