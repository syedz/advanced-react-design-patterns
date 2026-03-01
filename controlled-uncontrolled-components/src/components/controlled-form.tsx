import React, { useState, useEffect } from "react";

export const ControlledForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | string>("");
  const [error, setError] = useState<string>("");

  // Real-time validation logic
  useEffect(() => {
    if (name.length < 1) {
      setError("The name cannot be empty");
    } else {
      setError("");
    }
  }, [name]); // Runs every time 'name' changes

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      
      <input
        name="age"
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
};