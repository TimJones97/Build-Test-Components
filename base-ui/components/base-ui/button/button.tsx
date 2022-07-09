import React, { ReactNode } from "react";
import classNames from "classnames";
import { ComponentLoader } from "@buildcities/base-ui.components.base-ui.component-loader";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  /**
   * a node to be rendered in the button component.
   */
  children?: ReactNode;
  /**
   * size of the button component
   */
  size?: "xlarge" | "large" | "medium" | "small";
  /**
   * variants of the button component (primary, secondary or text).
   */
  variant?: "primary" | "secondary" | "text";
  /**
   * displays a loader for the button if true.
   */
  loading?: boolean;
  /**
   * react component for displaying a right sided icon on button.
   */
  rightIcon?: React.ReactNode;
  /**
   * react component for displaying a left sided icon on button.
   */
  leftIcon?: React.ReactNode;
}

const Button = ({
  children,
  size,
  variant,
  rightIcon,
  leftIcon,
  loading,
  className,
  ...props
}: ButtonProps) => {
  const sizeStyles = (size?: "xlarge" | "large" | "medium" | "small") => {
    switch (size) {
      case "xlarge":
        return "py-[19px] px-12 paragraph-lg rounded-2xl w-[197px]";
      case "large":
        return "py-3 px-[30px] paragraph-md rounded-lg w-[161px]";
      case "medium":
        return "py-2 px-4 paragraph-sm font-light rounded-lg  w-[133px]  ";
      case "small":
        return "py-1 px-[14px] paragraph-sm font-light rounded-lg w-[88px] ";
      default:
        return "py-2 px-4 paragraph-sm font-light rounded-lg w-[133px] ";
    }
  };
  const variantStyles = (variant?: "primary" | "secondary" | "text") => {
    switch (variant) {
      case "primary":
        return "bg-brandYellow hover:bg-brandAccentStrong text-brandBackground ring-0 ring-opacity-0";
      case "secondary":
        return "ring-1 ring-brandYellow hover:ring-brandAccentStrong hover:text-brandAccentStrong bg-none text-brandYellow";
      case "text":
        return "text-brandYellow ring-0 ring-opacity-0";
      default:
        return "bg-brandYellow ring-0 ring-opacity-0";
    }
  };

  return (
    <button
      {...props}
      className={classNames(
        "flex justify-center items-center focus:font-semibold  ",
        variantStyles(variant),
        sizeStyles(size),
        className
      )}
    >
      {leftIcon && leftIcon}
      {loading ? <ComponentLoader /> : <div className="flex-grow">{children}</div>}
      {rightIcon && rightIcon}
    </button>
  );
};
Button.defaultProps = {
  variant: "primary",
  size: "medium",
};

export { Button };
