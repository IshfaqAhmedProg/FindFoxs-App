import { styled } from "@mui/material/styles";
//this component is to allow the use of @container queries in css
const CustomContainer = styled("div")(() => ({
  containerType: "size",
  height: "100%",
  overflowY: "auto",
}));
export default CustomContainer;
