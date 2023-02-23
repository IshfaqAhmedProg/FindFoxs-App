import { Button, CircularProgress } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function LoadingButton(props: any) {
  const { loading, children, ...buttonProps } = props;
  return (
    <Button {...buttonProps}>
      {loading ? (
        <CircularProgress size={24} color="secondary" />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
