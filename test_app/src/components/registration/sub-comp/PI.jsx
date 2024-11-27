import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const PI = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="personal-info">
      <h3>Personal Information</h3>
      <Form>
        <Form.Group controlId="candidateName">
          <Form.Label>Candidate Name</Form.Label>
          <Form.Control
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

        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <div className="d-flex justify-content-evenly">
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

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="contactNo">
          <Form.Label>Contact No</Form.Label>
          <Form.Control
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            isInvalid={!!errors.contactNo}
          />
          <Form.Control.Feedback type="invalid">
            {errors.contactNo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="registrationDate">
          <Form.Label>Registration Date</Form.Label>
          <Form.Control
            type="text"
            value={formData.registrationDate}
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
