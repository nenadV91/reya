import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreProvider } from "../components/StoreProvider";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./globals.css";
import theme from "@/theme";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider theme={theme}>
            <Box>
              <CssBaseline />
              <Navbar />
              <Sidebar />
              {children}
            </Box>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
