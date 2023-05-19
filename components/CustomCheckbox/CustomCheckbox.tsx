import * as React from "react";
import { styled } from "@mui/material/styles";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

const Icon = styled("span")(({ theme }) => ({
  borderRadius: 5,
  width: 16,
  height: 16,

  backgroundColor:
    theme.palette.mode === "dark" ? "#394b59" : "var(--graylighter)",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,var(--graylighter),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor:
      theme.palette.mode === "dark" ? "#30404d" : "var(--graylight)",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const CheckedIcon = styled(Icon)({
  backgroundColor: "var(--primarylight)",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "var(--primary)",
  },
});
const IndeterminateIcon = styled(Icon)({
  backgroundColor: "var(--primarylight)",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14 8C14 8.55228 13.5523 9 13 9H3C2.44772 9 2 8.55228 2 8V8C2 7.44772 2.44772 7 3 7H13C13.5523 7 14 7.44772 14 8V8Z' fill='white'/%3E%3C/svg%3E  \")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "var(--primary)",
  },
});
//Custom checkbox cause material ui checkbox looks like trash
export default function CustomCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
      }}
      disableRipple
      color="default"
      checkedIcon={<CheckedIcon />}
      indeterminateIcon={<IndeterminateIcon />}
      icon={<Icon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}
