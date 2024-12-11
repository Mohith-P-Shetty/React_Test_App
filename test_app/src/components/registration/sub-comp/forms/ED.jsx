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
            <option value="">Select Qualifications</option>
            <option value="Bachelor of Arts (BA)">Bachelor of Arts (BA)</option>
            <option value="Bachelor of Science (BSc)">
              Bachelor of Science (BSc)
            </option>
            <option value="Bachelor of Engineering (BE)">
              Bachelor of Engineering (BE)
            </option>
            <option value="Bachelor of Technology (BTech)">
              Bachelor of Technology (BTech)
            </option>
            <option value="Bachelor of Business Administration (BBA)">
              Bachelor of Business Administration (BBA)
            </option>
            <option value="Bachelor of Computer Applications (BCA)">
              Bachelor of Computer Applications (BCA)
            </option>
            <option value="Master of Science (MSc)">
              Master of Science (MSc)
            </option>
            <option value="Master of Business Administration (MBA)">
              Master of Business Administration (MBA)
            </option>
            <option value="Master of Technology (MTech)">
              Master of Technology (MTech)
            </option>
            <option value="Master of Computer Applications (MCA)">
              Master of Computer Applications (MCA)
            </option>
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
