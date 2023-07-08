import { cva, type VariantProps } from "class-variance-authority";

export type ButtonProps = VariantProps<typeof ButttonVariants>;
export const ButttonVariants = cva(["font-semibold", "border", "rounded"], {
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
      black: [
        "bg-black",
        "text-white",
        "transition-all",
        "hover:bg-white",
        "hover:text-black",
      ],
      gradiant: [
        "bg-gradient-to-r",
        "from-green-400",
        "to-blue-500",
        "hover:from-pink-500",
        "hover:to-yellow-500",
      ],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
      large: ["w-full", "text-lg", "py-3", "px-6"],
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      size: "medium",
      className: "uppercase",
    },
    {
      intent: "black",
      size: "medium",
      className: "border-black",
    },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});
