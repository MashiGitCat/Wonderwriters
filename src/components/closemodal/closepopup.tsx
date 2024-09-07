// ClosePopup.tsx

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./closepopup.css";

interface ClosePopupProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ClosePopup: React.FC<ClosePopupProps> = ({
  open,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="popup__content">{"Delete Page ?"}</DialogTitle>
      <DialogContent>
        <DialogContentText className="popup__paragraph"></DialogContentText>
      </DialogContent>
      <DialogActions className="popup__button-container">
        <Button className="popup__buttons" onClick={handleClose}>
          No
        </Button>
        <Button className="popup__buttons" onClick={handleConfirm} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClosePopup;
