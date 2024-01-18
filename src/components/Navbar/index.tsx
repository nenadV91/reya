import { AppBar, Toolbar, Typography } from "@mui/material";
import { Dashboard } from "@mui/icons-material";

export function Navbar() {
  return (
    <AppBar
      variant="outlined"
      position="fixed"
      sx={{ zIndex: 2000, borderRight: "none", borderLeft: "none" }}
    >
      <Toolbar sx={{ backgroundColor: "background.paper" }}>
        <Dashboard
          sx={{ color: "white", mr: 2, transform: "translateY(-2px)" }}
        />
        <Typography variant="h6" color="text.primary">
          Next.js App Router
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
