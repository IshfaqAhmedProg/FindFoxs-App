import React from "react";
const useMousePosition = ({ includeTouch }: { includeTouch: Boolean }) => {
  const [mousePosition, setMousePosition] = React.useState({
    x: null,
    y: null,
  });
  React.useEffect(() => {
    const updateMousePosition = (ev: any) => {
      let x, y;
      if (ev.touches) {
        const touch = ev.touches[0];
        [x, y] = [touch.clientX, touch.clientY + window.pageYOffset];
      } else {
        [x, y] = [ev.clientX, ev.clientY + window.pageYOffset];
      }
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", updateMousePosition);
    if (includeTouch) {
      window.addEventListener("touchmove", updateMousePosition);
    }
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      if (includeTouch) {
        window.removeEventListener("touchmove", updateMousePosition);
      }
    };
  }, [includeTouch]);
  return mousePosition;
};
export default useMousePosition;
