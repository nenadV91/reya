import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { colors } from "@mui/material";

import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { Order } from "@/lib/state/orders/ordersSlice";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: null | Order;
  onDelete: () => void;
  onClose: () => void;
}

export function DeleteOrderModal(props: SimpleDialogProps) {
  const { onClose, open, onDelete } = props;

  return (
    <Dialog maxWidth={"xs"} onClose={onClose} open={open}>
      <DialogTitle>Are you sure you want to delete this position?</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
          eligendi quia porro distinctio facilis vero ea beatae minus culpa eius
          consequuntur? Quisquam, doloremque nostrum exercitationem officiis
          quas ut nam laudantium.
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          size="large"
          sx={{
            mb: 1,
            background: "white",
            color: "black",
            opacity: 0.8,
            transition: "all 0.2s ease-in",
            ":hover": {
              background: "white",
              opacity: 1,
            },
          }}
          fullWidth={true}
          variant="contained"
          onClick={onDelete}
          color="inherit"
        >
          DELETE
        </Button>

        <Button
          size="large"
          sx={{
            opacity: 0.8,

            margin: "0 !important",
            background: colors.grey[900],
            color: "white",
            transition: "all 0.2s ease-in",
            ":hover": {
              background: colors.grey[900],
              opacity: 1,
            },
          }}
          fullWidth={true}
          variant="contained"
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
