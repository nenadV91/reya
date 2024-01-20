import { useAccount, useConnect } from "wagmi";
import CircularProgress from "@mui/material/CircularProgress";
import { HistoryTable } from "./HistoryTable";
import { DeleteOrderModal } from "./DeleteOrderModal";
import { Box, TablePagination, Typography } from "@mui/material";
import { Order } from "@/lib/state/orders/ordersSlice";

type Props = {
  handleDeleteModalOpen: (order: Order) => void;
  orders: Order[];
  page: number;
  visibleRows: Order[];
  rowsPerPage: number;
  isModalOpen: boolean;
  selectedRow: Order | null;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeletePosition: () => void;
  handleDeleteModalClose: () => void;
};

export default function HistoryTabContent({
  handleDeleteModalOpen,
  visibleRows,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  isModalOpen,
  handleDeletePosition,
  handleDeleteModalClose,
  selectedRow,
  orders,
}: Props) {
  const { isConnected, isConnecting } = useAccount();
  const { isLoading } = useConnect();

  return (
    <Box>
      {isLoading || isConnecting ? (
        <CircularProgress size={14} />
      ) : isConnected ? (
        <>
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
        </>
      ) : (
        <Typography variant="body1">Please connect your wallet</Typography>
      )}
    </Box>
  );
}
