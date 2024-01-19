"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, SyntheticEvent } from "react";
import { CustomTabPanel } from "./CustomTabpanel";
import { useAppSelector, useAppDispatch } from "@/lib/state/hooks";
import { HistoryTable } from "./HistoryTable";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function History() {
  const [selected, setSelected] = useState(0);

  const orders = useAppSelector((state) => state.ordersReducer);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setSelected(newValue);
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
          value={selected}
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
      <CustomTabPanel value={selected} index={0}>
        <HistoryTable orders={orders} />
      </CustomTabPanel>

      <CustomTabPanel value={selected} index={1}>
        Deposits and Withdrawals
      </CustomTabPanel>
    </Box>
  );
}
