import React from "react";

export const Input = ({ ...props }: React.ComponentProps<"input">) => {
  return (
    <input
      className="w-full px-4 h-[3rem] rounded border border-dark-blue/50 outline-none placeholder:text-dark-blue/50"
      {...props}
    />
  );
};
