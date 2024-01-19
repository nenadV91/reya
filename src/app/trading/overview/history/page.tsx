"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, SyntheticEvent } from "react";
import { CustomTabPanel } from "./CustomTabpanel";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function History() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
        }}
      >
        <Typography variant="body1">Trade History</Typography>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Trade history tabs"
          sx={{ marginLeft: "auto", textTransform: "unset" }}
        >
          <Tab
            sx={{ textTransform: "unset" }}
            label="Trade history"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ textTransform: "unset" }}
            label="Deposits and Withdrawals"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
}
