"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, SyntheticEvent, useMemo, useCallback } from "react";
import { CustomTabPanel } from "./CustomTabpanel";
import { useAppSelector, useAppDispatch } from "@/lib/state/hooks";
import { Hidden } from "@mui/material";
import { Order } from "@/lib/state/orders/ordersSlice";
import { removeOrder } from "@/lib/state/orders/ordersSlice";
import dynamic from "next/dynamic";

const HistoryTabContent = dynamic(() => import("./HistoryTabContent"), {
  ssr: false,
});

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function History() {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [selectedRow, setSelectedRow] = useState<null | Order>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleDeleteModalOpen = (order: Order) => {
    setSelectedRow(order);
    setIsModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
  };

  const orders = useAppSelector((state) => state.ordersReducer);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () => orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [orders, page, rowsPerPage]
  );

  const handleDeletePosition = useCallback(() => {
    if (selectedRow) {
      dispatch(removeOrder(selectedRow));
      handleDeleteModalClose();
    }
  }, [dispatch, selectedRow]);

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
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
        <Hidden mdDown>
          <Typography component={"span"} variant="body1">
            Trade History
          </Typography>
        </Hidden>

        <Tabs
          value={activeTab}
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
      <CustomTabPanel value={activeTab} index={0}>
        <HistoryTabContent
          handleDeleteModalOpen={handleDeleteModalOpen}
          orders={orders}
          page={page}
          visibleRows={visibleRows}
          rowsPerPage={rowsPerPage}
          isModalOpen={isModalOpen}
          selectedRow={selectedRow}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleDeletePosition={handleDeletePosition}
          handleDeleteModalClose={handleDeleteModalClose}
        />
      </CustomTabPanel>

      <CustomTabPanel value={activeTab} index={1}>
        Deposits and Withdrawals
      </CustomTabPanel>
    </Box>
  );
}
