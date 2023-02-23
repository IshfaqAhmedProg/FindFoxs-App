import { createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#303f9f",
      dark: "#212c6f",
      light: "#5965b2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#00e676",
      dark: "#00a152",
      light: "#33eb91",
      contrastText: "#212c6f",
    },
    action: {
      disabledBackground: "#d4dcf3",
      disabled: "#a0a7bc",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
export default theme;
