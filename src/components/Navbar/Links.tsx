"use client";

import Link from "next/link";
import { Box, Button } from "@mui/material";
import { usePathname } from "next/navigation";

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

export function Links() {
  const pathname = usePathname();

  return (
    <Box sx={{ flexGrow: 1, display: { md: "none", lg: "flex" } }}>
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
  );
}
