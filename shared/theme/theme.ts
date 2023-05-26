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
    MuiAlert: {
      styleOverrides: {
        root: {
          background: "white",
          borderRadius: "var(--border-radius-small)",
          "& .MuiAlertTitle-root": {
            fontWeight: 700,
          },
          maxWidth: "30rem",
          boxShadow: "var(--box-shadow)",
        },
        standardError: {
          color: "var(--error)",
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
          borderRadius: "var(--border-radius-small)",
          boxShadow: "var(--box-shadow)",
          paddingInline: "1.2em",
          paddingBlock: "0.65em",
          width: "max-content",
          ":hover": {
            boxShadow: "var(--box-shadow-hover)",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: 25,
          transition: "all 0.15s ease",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "var(--graydark)",
          fontSize: 14,
          borderRadius: "var(--border-radius-small)",
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
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius:
            "var(--border-radius-small) 0 0 var(--border-radius-small)",
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
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "var(--primarylight)",
          fontWeight: 700,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          "& .MuiListItemButton-root svg": {
            color: "var(--primarylight)",
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
      contrastText: "#ffffff",
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
      fontSize: "1.25rem",
      lineHeight: "124.5%",
      color: "var(--graylight)",
    },
    h5: {
      fontSize: "md",
      fontWeight: "bold",
      color: "var(--primarydark)",
    },
  },
});
export default theme;
