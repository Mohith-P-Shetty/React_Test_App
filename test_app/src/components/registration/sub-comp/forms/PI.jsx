import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import "./css/PI.css";

const PI = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="personal-info">
      <h3 className="register-title">Personal Information</h3>
      <Form className="pi-form">
        <Form.Group controlId="candidateName" className="register-name">
          <Form.Control
            placeholder="User Name"
            type="text"
            name="candidateName"
            value={formData.candidateName}
            onChange={handleChange}
            isInvalid={!!errors.candidateName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.candidateName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="gender" className="register-gender">
          <div className="d-flex justify-content-evenly">
            <p>Gender :</p>
            <Form.Check
              type="checkbox"
              label="Male"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              isInvalid={!!errors.gender}
            />
            <Form.Check
              type="checkbox"
              label="Female"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              isInvalid={!!errors.gender}
            />
            <Form.Control.Feedback type="invalid">
              {errors.gender}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group controlId="email" className="register-email">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="contactNo" className="register-contact">
          <Form.Control
            type="text"
            name="contactNo"
            placeholder="Contact No"
            value={formData.contactNo}
            onChange={handleChange}
            isInvalid={!!errors.contactNo}
          />
          <Form.Control.Feedback type="invalid">
            {errors.contactNo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="registrationDate" className="register-date">
          <Form.Control
            type="text"
            value={`Registration Date ${formData.registrationDate}`}
            readOnly
          />
        </Form.Group>
      </Form>
    </div>
  );
};

PI.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default PI;
