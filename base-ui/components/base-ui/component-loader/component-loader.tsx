import React, { ReactNode } from "react";
import classNames from "classnames";

export type ComponentLoaderProps = {
  /**
   * class styles to for the loader component.
   */
  className?: string;
  /**
   * stroke color of the loader default is brandBackground.
   */
  strokeColor?: string;
};

const ComponentLoader = ({
  className,
  strokeColor,
}: ComponentLoaderProps) => {
  return (
    <svg  className={classNames(className)} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.5 3v3M21.5 12h-3M18.866 18.366l-2.119-2.119"
        className={classNames("stroke", strokeColor)}
        /*  stroke={strokeColor}
        stroke-width="2" */
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.5 21v-3M6.134 18.366l2.119-2.119M3.5 12h3M6.134 5.635l2.119 2.119"
        className={classNames("stroke-1", strokeColor)}
        /*  stroke={strokeColor}
        stroke-width="2" */
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
ComponentLoader.defaultProps = {
  className: "w-6 h-6 animate-spin",
  strokeColor: "stroke-brandBackground",
};
export { ComponentLoader };
