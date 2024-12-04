import PropTypes from "prop-types";
import "./css/ED.css";
import { Form } from "react-bootstrap"; // Import React-Bootstrap Form components

const ED = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="education-details">
      <h3 className="ed-title">Education Details</h3>

      <Form className="ed-form">
        {/* Source */}
        <Form.Group controlId="source" className="ed-source">
          <Form.Control
            as="select"
            name="source"
            value={formData.source}
            onChange={handleChange}
            isInvalid={!!errors.source}
          >
            <option value="">Source</option>
            <option value="College">College</option>
            <option value="Friend">Friend</option>
            <option value="Internet">Internet</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.source}
          </Form.Control.Feedback>
        </Form.Group>

        {/* College Details */}
        <Form.Group controlId="collegeDetails" className="ed-college">
          <Form.Control
            placeholder="College Details"
            type="text"
            name="collegeDetails"
            value={formData.collegeDetails}
            onChange={handleChange}
            isInvalid={!!errors.collegeDetails}
          />
          <Form.Control.Feedback type="invalid">
            {errors.collegeDetails}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Qualifications */}
        <Form.Group controlId="qualifications" className="ed-qualification">
          <Form.Control
            as="select"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            isInvalid={!!errors.qualifications}
          >
            <option value="">Qualifications</option>
            <option value="Degree">Degree</option>
            <option value="Pre-University">Pre-University</option>
            <option value="10th">10th</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.qualifications}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Stream */}
        <Form.Group controlId="stream" className="ed-stream">
          <Form.Control
            as="select"
            name="stream"
            placeholder="Stream"
            value={formData.stream}
            onChange={handleChange}
            isInvalid={!!errors.stream}
          >
            <option value="">Select</option>
            <option value="CSE">CSE</option>
            <option value="ISE">ISE</option>
            <option value="AI">AI</option>
            <option value="AIDS">AIDS</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.stream}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Year of Passing */}
        <Form.Group controlId="yearOfPassing" className="ed-year">
          <Form.Control
            placeholder="Year of Passing"
            type="number"
            name="yearOfPassing"
            value={formData.yearOfPassing}
            onChange={handleChange}
            isInvalid={!!errors.yearOfPassing}
          />
          <Form.Control.Feedback type="invalid">
            {errors.yearOfPassing}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </div>
  );
};

// PropTypes (Remove if not needed)
ED.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default ED;
