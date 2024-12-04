import PropTypes from "prop-types";
import "./css/TnP.css";
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
      <h3 className="tnp-title">Test Info & Payment</h3>
      <Form className="tnp-form">
        <Form.Group controlId="jobAppliedFor" className="tnp-job">
          <Form.Control
            as="select"
            placeholder="Job Applied For"
            name="jobAppliedFor"
            value={formData.jobAppliedFor}
            onChange={handleChange}
            isInvalid={!!errors.jobAppliedFor}
          >
            <option value="">Job Applied For</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Product Manager">Product Manager</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.jobAppliedFor}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Test */}
        <Form.Group controlId="test" className="tnp-test">
          <Form.Control
            as="select"
            name="test"
            value={formData.test}
            onChange={handleChange}
            isInvalid={!!errors.test}
          >
            <option value="">Test</option>
            <option value="T1 2020">T1 2020</option>
            <option value="T2 2022">T2 2022</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.test}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Payment */}
        <Form.Group controlId="payment" className="tnp-payment">
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
