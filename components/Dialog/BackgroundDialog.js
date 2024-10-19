import { Box, Dialog, DialogContent, Typography } from "@mui/material";
import VoiceOver from "../VoiceOver";
import BackgroundMusic from "../BackgroundMusic";

export const BackgroundDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogContent className="md:p-3 p-1">
      <Box p={2}> 
          <BackgroundMusic/>
          </Box>
      </DialogContent>
    </Dialog>
  );
};
