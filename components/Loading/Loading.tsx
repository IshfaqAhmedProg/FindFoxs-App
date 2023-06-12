"use client";
import { CircularProgress, Stack } from "@mui/material";
import React from "react";
import styles from "@/styles/Home.module.css";

export default function Loading() {
  return (
    <div className={styles.dashboard}>
      <CircularProgress sx={{ color: "var(--graylight)" }} />
    </div>
  );
}
