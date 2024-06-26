import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  testId?: string;
}

export function Button(props: Readonly<ButtonProps>) {
  return (
    <button
      data-testid={props.testId}
      onClick={props.onClick}
      className={styles.button}
    >
      <span>{props.children}</span>
    </button>
  );
}
