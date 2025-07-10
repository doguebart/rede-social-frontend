import clsx from "clsx";
import React from "react";

export const Input = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <input
      className={clsx(
        "w-full px-4 h-[3rem] rounded border border-dark-blue/50 outline-none placeholder:text-dark-blue/50",
        className
      )}
      {...props}
    />
  );
};
