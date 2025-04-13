import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  const btnCls = clsx(className);
  return (
    <button
      {...props}
      className={
        btnCls +
        " w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      }
    >
      {children}
    </button>
  );
};
