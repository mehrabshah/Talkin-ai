import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export const StoryIdea = ({
  idea,
  setIdea,
  setActiveStep,
  numPanels,
  setNumPanels,
  handleSubmit,
}) => {
  return (
    <>
      <h2 className="font-semibold mb-4">Story Idea</h2>
      <input
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        className="block w-full rounded-md bg-transparent border border-gray-400 shadow-sm focus:outline-none   sm:text-sm px-4 py-3.5 placeholder-gray-500 my-2 text-white"
        placeholder="Idea"
        type="text"
        name="idea"
        id="idea"
      />
      <h2 className="font-semibold my-4">Number of Panels</h2>
      <FormControl>
        <RadioGroup
          column
          className="gap-3"
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e) => setNumPanels(e?.target?.value)}
        >
          <FormControlLabel
            value="four"
            control={<Radio className="text-gray-400" />}
            label="Four"
            className="border border-gray-400 rounded-md m-0"
          />
          <FormControlLabel
            value="five"
            control={<Radio className="text-gray-400" />}
            label="Five"
            className="border border-gray-400 rounded-md m-0"
          />
          <FormControlLabel
            value="six"
            control={<Radio className="text-gray-400" />}
            label="Six"
            className="border border-gray-400 rounded-md m-0"
          />
          <FormControlLabel
            value="seven"
            control={<Radio className="text-gray-400" />}
            label="Seven"
            className="border border-gray-400 rounded-md m-0"
          />
          <FormControlLabel
            value="eight"
            control={<Radio className="text-gray-400" />}
            label="Eight"
            className="border border-gray-400 rounded-md m-0"
          />
          <FormControlLabel
            value="nine"
            control={<Radio className="text-gray-400" />}
            label="Nine"
            className="border border-gray-400 rounded-md m-0"
          />
        </RadioGroup>
      </FormControl>
      <div className="flex items-center gap-2 mt-4 justify-between">
        <Button variant="outlined" onClick={() => setActiveStep(3)}>
          Back
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => {
            handleSubmit(e);
            setActiveStep(5);
          }}
          disabled={!idea?.length || !numPanels?.length}
          className="disabled:bg-gray-600 disabled:!text-white"
        >
          Next
        </Button>
      </div>
    </>
  );
};
