import { useState } from "react";
import "./Admin.css";
import "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    email: "",
    passcode: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      // Make an API call to fetch admin details
      const response = await axios.post(
        `http://localhost:2000/api/admins/find?email=${adminData.email}`,
        adminData
      );
      setSuccess(response.data.message || "Login successful!");
      console.log(success);
      navigate("/admin");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Invalid email or passcode. Please try again."
      );
    }
    if (success === "Login successful!") {
      navigate("/admin");
    }
  };

  return (
    <div className="admin-login">
      <h3 className="admin-title">Admin Login</h3>
      <Form onSubmit={handleSubmit} className="admin-form">
        <Form.Group controlId="adminemail" className="admin-name">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Admin email"
            value={adminData.email}
            onChange={handleChange}
            isInvalid={!!error && !adminData.email}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="passcode" className="admin-code">
          <Form.Control
            type="password"
            name="passcode"
            placeholder="Enter passcode"
            value={adminData.passcode}
            onChange={handleChange}
            isInvalid={!!error && !adminData.passcode}
          />
          <Form.Control.Feedback type="invalid">
            Passcode is required.
          </Form.Control.Feedback>
        </Form.Group>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" className="mt-3">
            {success}
          </Alert>
        )}

        <Button variant="outline-dark" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Admin;
