import React from "react";

export const UncontrolledForm: React.FC = () => {
  // 1. Setup Refs to access the DOM directly
  const nameInputRef = React.createRef<HTMLInputElement>();
  const ageInputRef = React.createRef<HTMLInputElement>();

  const submitHandler = (e: React.SubmitEvent) => {
    e.preventDefault();

    // 2. Access the values via the .current property of the ref
    const name = nameInputRef.current?.value;
    const age = ageInputRef.current?.value;

    console.log("Submitted Name:", name);
    console.log("Submitted Age:", age);
  };

  return (
    // 3. The form state & features are not accessible by the parent component (this is a good thing)
    <form onSubmit={submitHandler}>
      <input 
        name="name" 
        type="text" 
        placeholder="Name" 
        ref={nameInputRef} 
      />
      <input 
        name="age" 
        type="number" 
        placeholder="Age" 
        ref={ageInputRef} 
      />
      <input type="submit" value="Submit" />
    </form>
  );
};