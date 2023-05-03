import React from "react";
import GradientSVG from "../GradientSVG/GradientSVG";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircularProgress({ value }: { value: number }) {
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
      {svgGradient}
      <CircularProgressbar
        strokeWidth={8}
        value={value}
        maxValue={100}
        text={`${value}%`}
        styles={{
          path: {
            stroke: `url(#idCSS)`,
          },
          text: {
            fill: "var(--primarydark)",
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
