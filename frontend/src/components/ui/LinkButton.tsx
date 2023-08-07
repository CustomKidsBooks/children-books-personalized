import { cva, type VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";

const LinkVariants = cva(
  ["font-sans-serif", "p-4", "rounded", "font-bold", "tracking-wide"],
  {
    variants: {
      intent: {
        pink: [
          "bg-pink",
          "text-white",
          "border-transparent",
          "hover:bg-pink-700",
        ],
        teal: ["bg-teal", "border-gray-400", "hover:bg-teal-400"],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-2", "px-4"],
        large: ["w-full", "text-2xl", "py-3", "px-10"],
      },
    },
    compoundVariants: [
      {
        intent: "pink",
        size: "medium",
        className: "uppercase",
      },
    ],
    defaultVariants: {
      intent: "pink",
      size: "medium",
    },
  }
);

export interface LinkButtonProps
  extends LinkProps,
    VariantProps<typeof LinkVariants> {
  children: React.ReactNode;
  className?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  intent,
  size,
  className,
  ...props
}) => (
  <Link
    {...props}
    className={twMerge(LinkVariants({ className, intent, size }))}
  />
);
