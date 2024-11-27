import { useState } from "react";
import { Button } from "react-bootstrap";
import "./User.css";
import PI from "./PI";
import ED from "./ED";
import TnP from "./TnP";

const User = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    candidateName: "",
    gender: "",
    email: "",
    contactNo: "",
    registrationDate: new Date().toISOString().slice(0, 10),
    source: "",
    collegeDetails: "",
    qualifications: "",
    stream: "",
    yearOfPassing: "",
    jobAppliedFor: "",
    test: "",
    payment: false,
  });

  const [errors, setErrors] = useState({});
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    const isValid = validateFields();
    if (!isValid) return;
    try {
      const response = await fetch("http://localhost:2000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("User registered successfully!");
        setFormData({ ...formData, payment: false });
        setStep(1);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const validateFields = () => {
    let currentErrors = {};

    if (step === 1) {
      if (!formData.candidateName.trim())
        currentErrors.candidateName = "Candidate Name is required.";
      if (!formData.gender) currentErrors.gender = "Gender is required.";
      if (!/^\S+@\S+\.\S+$/.test(formData.email))
        currentErrors.email = "Invalid email address.";
      if (!/^[0-9]{10}$/.test(formData.contactNo))
        currentErrors.contactNo = "Invalid contact number.";
    } else if (step === 2) {
      if (!formData.source) currentErrors.source = "Source is required.";
      if (!formData.collegeDetails)
        currentErrors.collegeDetails = "College Details are required.";
      if (!formData.qualifications)
        currentErrors.qualifications = "Qualifications are required.";
      if (!formData.stream) currentErrors.stream = "Stream is required.";
    } else if (step === 3) {
      if (!formData.jobAppliedFor)
        currentErrors.jobAppliedFor = "Job Applied For is required.";
      if (!formData.test) currentErrors.test = "Test selection is required.";
    }
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PI formData={formData} setFormData={setFormData} errors={errors} />
        );
      case 2:
        return (
          <ED formData={formData} setFormData={setFormData} errors={errors} />
        );
      case 3:
        return (
          <TnP formData={formData} setFormData={setFormData} errors={errors} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="user-registration">
      <div className="render-step">{renderStep()}</div>
      <div className="navigation-buttons">
        <div className="userlogin">
          <p>
            Do not have an account? <Button variant="dark">login</Button>
          </p>
        </div>
        <div className="nav-button">
          {step > 1 && (
            <Button variant="outline-dark" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step < 3 && (
            <Button
              variant="outline-dark"
              onClick={() => validateFields() && nextStep()}
            >
              Next
            </Button>
          )}
          {step === 3 && (
            <Button variant="outline-dark" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
