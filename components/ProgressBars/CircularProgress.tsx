import React from "react";
import GradientSVG from "../GradientSVG/GradientSVG";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Typography } from "@mui/material";

export default function CircularProgress({
  title,
  value,
}: {
  title?: string;
  value: number;
}) {
  const svgGradient = (
    <GradientSVG
      startColor="var(--accent)"
      endColor="var(--primarylight)"
      idCSS="idCSS"
      rotation={90}
    />
  );
  return (
    <div
      style={{
        width: 150,
        height: 150,
        position: "relative",
        color: "var(--accent)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%,-25%)",
          fontSize: "12px",
        }}
      >
        {title}
      </Typography>
      {svgGradient}
      <CircularProgressbar
        strokeWidth={15}
        value={value}
        maxValue={100}
        text={`${value}%`}
        styles={{
          path: {
            stroke: `url(#idCSS)`,
          },
          text: {
            fill: value == 0 ? "var(--graylight)" : "var(--primarydark)",
            fontWeight: "bold",
          },
          trail: {
            stroke: "var(--graylighter)",
          },
        }}
      />
    </div>
  );
}
