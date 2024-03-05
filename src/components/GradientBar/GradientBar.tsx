"use client";

import React, { ComponentProps, useEffect, useMemo, useRef } from "react";

import GradientBarAttributes from "./interface/GradientBarAttributes";
import styles from "./styles/GradientBar.module.css";

type GradientBarProps = ComponentProps<"div"> & {
  data: GradientBarAttributes;
};

const GradientBar = (props: GradientBarProps) => {
  const { data, ...attrs } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const style = useMemo(() => {
    return `
            width: ${data.width};
            height: ${data.height};
            background: linear-gradient(to right, white, black); /* fallback color */
            background: linear-gradient(to right, ${data.startColor}, ${data.endColor});
            `;
  }, [data]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.cssText = style;
    }
  }, [ref, style]);

  return (
    <div
      ref={ref}
      key={data.id}
      className={styles.houseColours}
      {...attrs}
    ></div>
  );
};

export default GradientBar;
