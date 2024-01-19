"use client";

import {
  AppBar,
  Box,
  Divider,
  List,
  ListItem,
  SwipeableDrawer,
  Toolbar,
  Button,
  Hidden,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Dashboard } from "@mui/icons-material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { colors } from "@mui/material";

const pages = [
  {
    name: "Trading",
    route: "/trading",
  },
  {
    name: "LP Pool",
    route: "/pools",
  },
  {
    name: "Dashboard",
    route: "/dashboard",
  },
  {
    name: "Leaderboard",
    route: "/leaderboard",
  },
  {
    name: "Profile",
    route: "/profile",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

        <Hidden lgDown>
          <Box sx={{ flexGrow: 1, display: "flex", mr: "auto" }}>
            {pages.map(({ name, route }) => (
              <Link key={route} href={route} passHref>
                <Button
                  size="small"
                  sx={{
                    m: 2,
                    color: "white",
                    display: "block",
                    borderRadius: "4px",
                    textTransform: "unset",
                    fontWeight: 300,
                    opacity: pathname.startsWith(route) ? 1 : 0.6,
                    backgroundColor: (theme) =>
                      pathname.startsWith(route)
                        ? theme.palette.grey["900"]
                        : undefined,
                    ":hover": {
                      opacity: 1,
                    },
                  }}
                >
                  {name}
                </Button>
              </Link>
            ))}
          </Box>
        </Hidden>

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
          <ConnectButton />

          <Hidden lgUp>
            <IconButton sx={{ ml: 3 }}>
              <MenuIcon onClick={() => setOpen(true)} />
            </IconButton>
          </Hidden>
        </Box>
      </Toolbar>

      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        sx={{
          width: 200,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            marginTop: "64px",
            width: 200,
            boxSizing: "border-box",
            background: colors.grey[900],
          },
        }}
      >
        <List>
          {pages.map(({ route, name }) => (
            <Link style={{ color: "white" }} key={route} href={route} passHref>
              <ListItem>
                <ListItemButton>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </SwipeableDrawer>
    </AppBar>
  );
}
