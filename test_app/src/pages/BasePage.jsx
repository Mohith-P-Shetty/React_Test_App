import { useState } from "react";
import RegistrationForm from "../components/registration/RegistrationForm";

function BasePage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, age };

    try {
      const response = await fetch("http://localhost:2000/add-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Data added successfully!");
      } else {
        alert("Failed to add data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlebutton = () => {
    fetch("http://localhost:2000") // Make a GET request to your backend server
      .then((data) => {
        console.log(data); // Should log "Server is running!" if successful
      })
      .catch((error) => {
        console.error("Error:", error); // Log any errors that occur
      });
  };

  return (
    <div className="base-wrapper">
      base
      <button onClick={handlebutton}>hey</button>
      <h2>Add Test Data</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Add Data</button>
      </form>
      <RegistrationForm />
    </div>
  );
}

export default BasePage;
