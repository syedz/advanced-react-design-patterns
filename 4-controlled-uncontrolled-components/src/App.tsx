import { useState } from "react";
import { ControlledModal } from "./components/controlled-modal";
import { ControlledForm } from "./components/controlled-form";
import { UncontrolledFlow } from "./components/uncontrolled-flow";
import { ControlledFlow } from "./components/controlled-flow";
import { UncontrolledModal } from "./components/uncontrolled-modal";
import { UncontrolledForm } from "./components/uncontrolled-form";

// Step components receive 'next' from the ControlledFlow wrapper
const StepOne = ({ next }: { next?: (data: any) => void }) => (
  <>
    <h1>Step #1: Name</h1>
    <button onClick={() => next?.({ name: "Sarah Waters" })}>Next</button>
  </>
);

const StepTwo = ({ next }: { next?: (data: any) => void }) => (
  <>
    <h1>Step #2: Age</h1>
    <button onClick={() => next?.({ age: 24 })}>Next</button>
  </>
);

const StepThree = ({ next }: { next?: (data: any) => void }) => (
  <>
    <h1>Step #3: Country</h1>
    <button onClick={() => next?.({ country: "United Kingdom" })}>Finish</button>
  </>
);

const StepFour = ({ next }: { next?: (data: any) => void }) => (
  <>
    <h1>Step #4: Finalize</h1>
    <button onClick={() => next?.({ city: "London" })}>Finish</button>
  </>
);

function App() {
  // const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (dataFromStep: any) => {
    setData((prevData: any) => ({ ...prevData, ...dataFromStep }));
    setCurrentIndex((prevIndex: number) => prevIndex + 1);
  };

  const handleDone = () => {
    console.log("Flow Complete:", data);
    alert("Onboarding Finished!");
  };

  return (
    <>
      {/* <UncontrolledModal>
        <h3>I am an Uncontrolled Modal!</h3>
        <p>The child component decides when I appear.</p>
      </UncontrolledModal> */}

      {/* <button onClick={() => setShouldShowModal(!shouldShowModal)}>
        {shouldShowModal ? "Hide Modal" : "Show Modal"}
      </button> */} 

      {/* <ControlledModal 
        shouldShow={shouldShowModal} 
        onClose={() => setShouldShowModal(false)}
      >
        <h3>I am a Controlled Modal!</h3>
        <p>The parent component decides when I appear.</p>
      </ControlledModal> */}

      {/* <UncontrolledForm /> */}
      {/* <ControlledForm /> */}

      {/* Uncontrolled Flow */}
      {/* <UncontrolledFlow onDone={(finalData) => {
        console.log("Flow Complete:", finalData);
        alert("Onboarding Finished!");
      }}>
        <StepOne />
        <StepTwo />
        <StepThree />
      </UncontrolledFlow> */}

      <ControlledFlow 
        currentIndex={currentIndex} 
        onNext={handleNext} 
        onDone={handleDone}
      >
        <StepOne />
        <StepTwo />
        {/* CONDITIONAL STEP: Only included in the flow if age > 25 */}
        {data.age > 25 && <StepThree />}
        <StepFour />
      </ControlledFlow>
    </>
  );
}

export default App;