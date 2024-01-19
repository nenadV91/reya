import { AppBar, Box, Toolbar } from "@mui/material";
import { Dashboard } from "@mui/icons-material";
import { Links } from "./Links";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  return (
    <AppBar
      elevation={0}
      variant="outlined"
      position="fixed"
      sx={{ zIndex: 2000, borderRight: "none", borderLeft: "none" }}
    >
      <Toolbar sx={{ backgroundColor: "background.paper" }}>
        <Dashboard
          sx={{ color: "white", mr: 2, transform: "translateY(-2px)" }}
        />

        <Links />

        <Box ml={"auto"}>
          <ConnectButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
