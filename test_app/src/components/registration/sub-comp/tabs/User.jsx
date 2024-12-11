import { useState } from "react";
import "react-router-dom";
import { Button } from "react-bootstrap";
import "./User.css";

import { useDispatch } from "react-redux";
import {
  setUserid,
  setTestid,
  setUsername,
  setTimer,
} from "../../../../slices/globalDataSlice";

import PI from "../forms/PI";
import ED from "../forms/ED";
import TnP from "../forms/TnP";
import Login from "../forms/Login";
import { useNavigate } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [islogin, setIsLogin] = useState(false);
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

  const nextStep = (islogin) => {
    if (islogin === true) {
      setStep(3);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (islogin === true) {
      setStep(1);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handlelogin = () => {
    if (islogin === false) {
      setIsLogin(true);
      setStep(1);
    } else {
      setIsLogin(false);
      setStep(1);
    }
  };

  const handleSubmit = async () => {
    const isValid = validateFields();
    if (!isValid) return;
    dispatch(setUserid(formData.email));
    dispatch(setUsername(formData.candidateName));
    dispatch(setTestid(formData.jobAppliedFor));
    dispatch(setTimer(600));
    if (islogin === true) {
      try {
        const response = await fetch(
          `http://localhost:2000/api/users/find?email=${formData.email}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        dispatch(setUsername(data.candidateName));
        if (response.ok) {
          setFormData({ ...formData, payment: false });
          navigate("/user");
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    } else {
      try {
        const response = await fetch(
          "http://localhost:2000/api/users/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setFormData({ ...formData, payment: false });
          setStep(1);
          navigate("/user");
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
  };

  const validateFields = (islogin) => {
    let currentErrors = {};
    if (islogin === true) {
      if (step === 1) {
        if (!/^\S+@\S+\.\S+$/.test(formData.email))
          currentErrors.email = "Invalid email address.";
      }
    } else {
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
    }
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const renderStep = () => {
    const animations = {
      initial: { x: 100, opacity: 0 }, // Starts from the right
      animate: { x: 0, opacity: 1 }, // Moves to its position
      exit: { x: -100, opacity: 0 }, // Moves to the left
      transition: { type: "ease-out", stiffness: 40, damping: 20 }, // Adjust for feel
    };

    return (
      <motion.div layout>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="PI" {...animations}>
              <PI
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="ED" {...animations}>
              <ED
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="TnP" {...animations}>
              <TnP
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };
  const renderLogin = () => {
    const animations = {
      initial: { x: 100, opacity: 0 }, // Starts off-screen to the right
      animate: { x: 0, opacity: 1 }, // Moves to its position
      exit: { x: -100, opacity: 0 }, // Moves off-screen to the left
      transition: { type: "ease-out", stiffness: 50, damping: 20 }, // Smooth spring animation
    };

    return (
      <motion.div layout>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="Login" {...animations}>
              <Login
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="TnP" {...animations}>
              <TnP
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };
  return (
    <motion.div layout className="user-registration">
      <div className="render-step">
        {islogin ? renderLogin() : renderStep()}
      </div>
      <div className="navigation-buttons">
        <div className="nav-button">
          {step > 1 && (
            <Button variant="outline-dark" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step < 3 && (
            <Button
              variant="outline-dark"
              onClick={() => validateFields(islogin) && nextStep(islogin)}
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
      <div className="userlogin">
        <p>
          {islogin
            ? "New user, Register here....."
            : "Do you have an account?....."}
        </p>
        <div className="login-button">
          <Button variant="light" onClick={handlelogin}>
            {islogin ? "register" : "login"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default User;
