import useMousePosition from "@/shared/Hooks/mousePosition";
import React from "react";

export default function Cursor() {
  const mousePosition = useMousePosition({ includeTouch: true });
  return (
    <div
      style={{
        background:
          "radial-gradient(41.94% 82.95% at 50% 50%, #C8CDFE 0%, rgba(181, 231, 242, 0.1) 54.69%, rgba(255, 230, 230, 0) 100%)",
        filter: "blur(90px)",
        zIndex: "-1",
        position: "absolute",
        width: "33.75rem",
        height: "24rem",
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transform: "translate(-50%,-50%)",
      }}
    >
      ${mousePosition.x} ${mousePosition.y}
    </div>
  );
}
