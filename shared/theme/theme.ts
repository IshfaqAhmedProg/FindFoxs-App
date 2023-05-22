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

    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0,
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
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "var(--primarylight)",
          fontSize: 25,
          transition: "all 0.15s ease",
          ":hover": {
            color: "var(--accent)",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "var(--graydark)",
          fontSize: 14,
          "& .MuiSvgIcon-root": {
            fontSize: 20,
            color: "var(--graylight)",
          },
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        PaperProps: {
          elevation: 0,
          sx: {
            borderRadius: "var(--border-radius)",
            overflow: "visible",
            filter: "drop-shadow(var(--box-shadow))",
            py: 1.5,
            px: 1,
            "& .MuiAvatar-root": {
              width: 40,
              height: 40,
              // ml: -0.5,
              mr: 1,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "var(--border-radius)",
          overflowY: "auto",
          boxShadow: "var(--box-shadow)",
          display: "flex",
          flexDirection: "column",
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          sx: {
            fontSize: { xs: "0.875rem", sm: ".75rem", md: ".875rem" },
            fontWeight: "bold",
            color: "var(--primarydark)",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 35,
          height: 35,
          fontSize: 14,
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
    body1: {
      fontSize: 14, // replace with your desired font size
    },
    body2: {
      fontSize: 14, // replace with your desired font size
      color: "var(--primary)",
    },
    h3: {
      margin: "0",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "var(--h3)",
      lineHeight: "124.5%",
      color: "var(--primary)",
    },
    h4: {
      margin: "0",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "20px",
      lineHeight: "124.5%",
      color: "var(--graylight)",
    },
    h5: {
      fontSize: "0.875rem",
      fontWeight: "bold",
      color: "var(--primarydark)",
    },
  },
});
export default theme;
