import React, { useState, useMemo } from "react";
import VoiceOverDescription from "../components/VoiceOverDescription"
import Voices from "../components/Voices"
import AiVoiceOver from "../components/AiVoiceOver"

function VoiceOver() {
  const [activeStep, setActiveStep] = useState(1);

  const stepMemo = useMemo(() => {
    switch (activeStep) {
      case 1:
        return <VoiceOverDescription setActiveStep={setActiveStep}/>;
      case 2:
        return <Voices setActiveStep={setActiveStep}/>;
      case 3:
        return <AiVoiceOver/>;
      default:
        break;
    }
  }, [activeStep]);

  return (
    <>
       {stepMemo}
    </>
  );
}

export default VoiceOver;
