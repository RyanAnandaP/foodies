import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ModalSuccess = ({ open, onClose }) => {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      onClose={onClose}
      className="modal success"
    >
      <div className="checklist-image-container">
        <CheckCircleOutlineIcon
          style={{ fontSize: "4rem", color: "white", fontWeight: "bold" }}
        />
        <h2>Your item has been added to cart!</h2>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
};

export default ModalSuccess;
