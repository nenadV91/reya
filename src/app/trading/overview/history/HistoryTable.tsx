import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Order } from "@/lib/state/orders/ordersSlice";
import {
  IconButton,
  Typography,
  lighten,
  styled,
  useTheme,
} from "@mui/material";
import { CloseSharp } from "@mui/icons-material";
import moment from "moment";

type Props = {
  orders: Order[];
};

const StyledTableCell = styled(TableCell)`
  border: none;
`;

const StyledTableRow = styled(TableRow)`
  background: ${({ theme }) => lighten(theme.palette.background.default, 0.03)};
  margin-top: 2px;
  margin-bottom: 2px;
`;

export function HistoryTable({ orders }: Props) {
  const theme = useTheme();

  return (
    <TableContainer sx={{ background: "none" }} component={Paper}>
      <Table
        sx={{
          minWidth: 650,
          borderCollapse: "separate",
          borderSpacing: "0 8px",
        }}
        aria-label="Order History table"
        size="small"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Market</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
            <StyledTableCell align="right">Order Type</StyledTableCell>
            <StyledTableCell align="right">Size (rUSD)</StyledTableCell>
            <StyledTableCell align="right">Execution Price</StyledTableCell>
            <StyledTableCell align="right">rPnL</StyledTableCell>
            <StyledTableCell align="right">Fees</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((row) => (
            <StyledTableRow sx={{ border: "none" }} key={row.id}>
              <StyledTableCell
                sx={{ display: "flex", alignItems: "center" }}
                component="th"
                scope="row"
              >
                <Typography mr={2} variant="body1">
                  {row.market}
                </Typography>
                <Typography sx={{ opacity: 0.6 }} fontSize={10} variant="body2">
                  {row.pool}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">{row.action}</StyledTableCell>
              <StyledTableCell align="right">{row.orderType}</StyledTableCell>
              <StyledTableCell align="right">{row.size}</StyledTableCell>
              <StyledTableCell align="right">
                {row.executionPrice}
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  color:
                    row.rpnl >= 0
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                }}
                align="right"
              >
                {row.rpnl}
              </StyledTableCell>
              <StyledTableCell align="right">{row.fees}</StyledTableCell>
              <StyledTableCell align="right">
                {moment(row.time).fromNow()}
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton size="small">
                  <CloseSharp sx={{ fontSize: "1rem" }} />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
