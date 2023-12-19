import React, { useRef } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useStyles } from "./Styles";
import QRCode from "qrcode.react";
import Button from "@material-ui/core/Button";

export default function QRmodal({ handleCloseQR, openQR, QRdata }) {
  const classes = useStyles();
  const qrCodeRef = useRef(null);

  const handleDownloadQR = () => {
    const canvas = qrCodeRef.current.getElementsByTagName("canvas")[0];
    const url = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openQR}
        onClose={handleCloseQR}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div>
          <div ref={qrCodeRef}>
            <QRCode value={JSON.stringify(QRdata)} size={400} />
          </div>
          <Button
            onClick={handleDownloadQR}
            color="primary"
            type="button"
            variant="contained"
            style={{ margin: "10px auto" }}
          >
            Download QR Code
          </Button>
        </div>
      </Modal>
    </div>
  );
}
