import { Box, Dialog, DialogContent } from "@mui/material";
import VoiceOver from "../../components/VoiceOver";

export const VideoSliderDialog = ({ open, handleClose }) => {
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
        <VoiceOver />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
