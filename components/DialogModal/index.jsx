import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({isOpen}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
      setOpen(isOpen)
  },[isOpen])

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Làm ơn hãy tắt chặn quảng cáo!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Nhằm mang đến cho bạn một trang web chất lượng, chúng tôi cần thu thập một số thông tin vô ích với bạn nhưng có ích với chúng tôi.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Không quan tâm</Button>
          <Button onClick={handleClose}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}