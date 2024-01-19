"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LensBlurOutlinedIcon from "@mui/icons-material/LensBlurOutlined";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hidden } from "@mui/material";

const drawerWidth = 240;

const routes = [
  {
    name: "Random",
    route: "/trading/random",
    Icon: GridViewOutlinedIcon,
  },
  {
    name: "Overview",
    route: "/trading/overview",
    Icon: LensBlurOutlinedIcon,
    subroutes: [
      {
        name: "Positions",
        subroute: "/trading/overview/positions",
      },
      {
        name: "Collateral",
        subroute: "/trading/overview/collateral",
      },
      {
        name: "History",
        subroute: "/trading/overview/history",
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Hidden smDown>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {routes.map(({ name, route, Icon, subroutes }) => {
              return (
                <div key={route}>
                  <Link
                    key={route}
                    href={subroutes?.length ? "#" : route}
                    style={{
                      color: "white",
                      opacity: pathname.startsWith(route) ? 1 : 0.6,
                    }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                      </ListItemButton>
                    </ListItem>
                  </Link>

                  {subroutes && (
                    <List component="div" disablePadding>
                      {subroutes.map(({ name, subroute }) => {
                        return (
                          <Link
                            style={{
                              color: "white",
                              opacity: pathname.startsWith(subroute) ? 1 : 0.6,
                            }}
                            key={subroute}
                            href={subroute}
                          >
                            <ListItemButton>
                              <ListItemText sx={{ pl: 2 }} secondary={name} />
                            </ListItemButton>
                          </Link>
                        );
                      })}
                    </List>
                  )}
                </div>
              );
            })}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </Hidden>
  );
}
