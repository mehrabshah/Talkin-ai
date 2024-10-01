import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Slider from "@mui/material/Slider";

export const VideoSliderSettingDialog = ({
  open,
  handleClose,
  handleRegenerateVideo,
  setNumInferenceSteps,
  setMotion,
}) => {
  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth={true}>
      <DialogTitle>Setting</DialogTitle>
      <DialogContent>
        <Container className="mx-3 py-2" maxwidth="lg">
          <Box sx={{ bgcolor: "#fffcf2", height: "flex", borderRadius: 1 }}>
            <div className="flex flex-col">
              <label className="px-2 py-3 text-sm  text-black">
                Motion (Required)
              </label>
              <Slider
                defaultValue={80}
                valueLabelDisplay="on"
                color="primary"
                step={10}
                marks
                min={10}
                max={100}
                onChange={(e) => setMotion(e.target.value)}
                name="motion"
              />
            </div>
            <div className="flex flex-col">
              <label className="px-2 py-3 text-sm  text-black">
                Num Inference Steps (Required)
              </label>
              <Slider
                defaultValue={9}
                valueLabelDisplay="on"
                color="primary"
                step={1}
                marks
                min={5}
                max={15}
                onChange={(e) => setNumInferenceSteps(e.target.value)}
                name="numInferenceSteps"
              />
            </div>
          </Box>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className="disabled:bg-gray-600 disabled:!text-white bg-[#5bbcff]"
          onClick={() => {
            handleRegenerateVideo();
            handleClose();
          }}
        >
          Regenerate
        </Button>
      </DialogActions>
    </Dialog>
  );
};
