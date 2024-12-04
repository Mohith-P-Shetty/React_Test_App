import PropTypes from "prop-types";
import "./css/login.css";
import { Form } from "react-bootstrap";

function Login({ formData, setFormData, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="user-login">
      <h3 className="login-title">User Login</h3>
      <Form className="user-form">
        <Form.Group controlId="email" className="user-mail">
          <Form.Control
            type="email"
            name="email"
            placeholder="Registred Mail"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </div>
  );
}
Login.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default Login;
