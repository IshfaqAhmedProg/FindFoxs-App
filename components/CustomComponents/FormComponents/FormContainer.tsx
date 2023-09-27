import React from "react";
export default function FormContainer({
  onSubmit,
  children,
  style,
}: {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        alignItems: "center",
        ...style,
      }}
    >
      {children}
    </form>
  );
}
