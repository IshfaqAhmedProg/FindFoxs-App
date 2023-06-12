"use client";
import { CircularProgress, Stack } from "@mui/material";
import React from "react";
import styles from "@/styles/Home.module.css";

export default function LoadingComponent() {
  return (
    <CircularProgress
      sx={{
        color: "var(--graylight)",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,0)",
      }}
    />
  );
}
