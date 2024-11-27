import PropTypes from "prop-types";
import { Form } from "react-bootstrap"; // Import React-Bootstrap Form components

const TnP = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="test-and-payment">
      <h3>Test Info & Payment</h3>
      <Form>
        {/* Job Applied For */}
        <Form.Group controlId="jobAppliedFor">
          <Form.Label>Job Applied For</Form.Label>
          <Form.Control
            as="select"
            name="jobAppliedFor"
            value={formData.jobAppliedFor}
            onChange={handleChange}
            isInvalid={!!errors.jobAppliedFor}
          >
            <option value="">Select</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Product Manager">Product Manager</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.jobAppliedFor}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Test */}
        <Form.Group controlId="test">
          <Form.Label>Test</Form.Label>
          <Form.Control
            as="select"
            name="test"
            value={formData.test}
            onChange={handleChange}
            isInvalid={!!errors.test}
          >
            <option value="">Select</option>
            <option value="T1 2020">T1 2020</option>
            <option value="T2 2022">T2 2022</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.test}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Payment */}
        <Form.Group controlId="payment">
          <Form.Check
            type="checkbox"
            name="payment"
            checked={formData.payment}
            onChange={handleChange}
            label="Mark as Paid"
            isInvalid={!!errors.payment}
          />
          <Form.Control.Feedback type="invalid">
            {errors.payment}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </div>
  );
};

// PropTypes (Remove if not needed)
TnP.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default TnP;
