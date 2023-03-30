import { createTheme } from "@mui/material";
const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: { color: "var(--primarylight)", fontSize: ".875rem" },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          width: "100%",
          color: "var(--primarylight)",
          ":hover:not(.Mui-disabled, .Mui-error)::before": {
            borderBottom: "2px solid var(--accent)",
          },
          "::before": {
            borderBottomColor: "var(--primarylight)",
          },
          "::after": {
            height: "2px",
            borderBottom: "none",
            background:
              "linear-gradient(90deg, var(--accent) 0%, var(--primary) 51%, var(--accent) 100%)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "var(--border-radius)",
          boxShadow: "var(--box-shadow)",
          paddingInline: "1.2em",
          paddingBlock: "0.65em",
          ":hover": {
            boxShadow: "var(--box-shadow-hover)",
          },
        },
      },
    },
  },
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
      '"Montserrat"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
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
