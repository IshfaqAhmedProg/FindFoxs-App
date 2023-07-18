import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Router } from "next/router";
export default function RouteChangeIndicator() {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    Router.events.on("routeChangeComplete", (url) => {
      setLoading(false);
    });
  });
  const defaultStyle = {
    background: "linear-gradient(270deg, var(--accent), var(--primarylight))",
    transition: "opacity 0.3s ease",
    backgroundSize: "400% 400%",
  };
  return (
    <Box
      position={"absolute"}
      top={0}
      width={"100%"}
      height={"3px"}
      sx={
        loading
          ? {
              ...defaultStyle,
              animation: "gradientScroll 2s ease infinite",
              opacity: 1,
            }
          : { ...defaultStyle, opacity: 0 }
      }
    ></Box>
  );
}
