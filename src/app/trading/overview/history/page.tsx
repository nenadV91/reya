"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, SyntheticEvent, useMemo, useCallback } from "react";
import { CustomTabPanel } from "./CustomTabpanel";
import { useAppSelector, useAppDispatch } from "@/lib/state/hooks";
import { HistoryTable } from "./HistoryTable";
import { TablePagination } from "@mui/material";
import { Order } from "@/lib/state/orders/ordersSlice";
import { DeleteOrderModal } from "./DeleteOrderModal";
import { removeOrder } from "@/lib/state/orders/ordersSlice";

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
        <Typography component={"span"} variant="body1">
          Trade History
        </Typography>

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
        <HistoryTable
          handleDeleteModalOpen={handleDeleteModalOpen}
          orders={visibleRows}
        />

        <TablePagination
          size="small"
          rowsPerPageOptions={[3, 6]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <DeleteOrderModal
          open={isModalOpen}
          selectedValue={selectedRow}
          onDelete={handleDeletePosition}
          onClose={handleDeleteModalClose}
        />
      </CustomTabPanel>

      <CustomTabPanel value={activeTab} index={1}>
        Deposits and Withdrawals
      </CustomTabPanel>
    </Box>
  );
}
