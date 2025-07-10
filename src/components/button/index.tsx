import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "outline" | "disabled";
  size?: "full" | "fit";
}

export const Button = ({
  className,
  children,
  variant = "primary",
  size = "fit",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "rounded px-6 h-[3rem] text-xs uppercase font-medium transition-colors duration-150 cursor-pointer";

  const variantClasses = {
    primary:
      "bg-dark-blue border border-dark-blue text-white hover:bg-opacity-70",
    outline: "border border-dark-blue/50 text-dark-blue hover:bg-dark-blue/10",
    disabled:
      "bg-dark-blue/70 border border-transparent text-white hover:cursor-not-allowed",
  };

  const sizeClasses = {
    full: "w-full",
    fit: "w-fit",
  };

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
