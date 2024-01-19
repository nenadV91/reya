"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { colors, darken } from "@mui/material";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    body1: {
      fontWeight: 300,
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: darken(colors.grey[900], 0.3),
          border: `1px solid ${colors.grey[600]}`,
          borderRadius: "20px",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default theme;
