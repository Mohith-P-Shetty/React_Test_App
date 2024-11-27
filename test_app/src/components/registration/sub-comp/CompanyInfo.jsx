import { Container, Row, Col, Button, Image } from "react-bootstrap";
import Logo from "../../../assets/logo.png";

function CompanyInfo() {
  return (
    <Container className="my-5">
      {/* Company Logo */}
      <Row className="text-center mb-4">
        <Col>
          <Image src={Logo} alt="Company Logo" rounded />
        </Col>
      </Row>

      {/* Company Details */}
      <Row className="text-center mb-4">
        <Col>
          <h2>Company Name</h2>
          <p>
            Quest Informatics is an aftermarket digital transformation
            specialist. We help companies transform their aftermarket operations
            and their customer experience, rewire their legacy business models
            to stay relevant and competitive in the digital age.
          </p>
        </Col>
      </Row>

      {/* Visit Website Button */}
      <Row className="text-center mb-4">
        <Col>
          <Button
            href="https://www.questinformatics.com/"
            target="_blank"
            variant="outline-dark"
          >
            Visit Website
          </Button>
        </Col>
      </Row>

      {/* Footer */}
      <Row className="text-center mt-5">
        <Col>
          <footer>
            <p>
              &copy; {new Date().getFullYear()} Company Name. All Rights
              Reserved.
            </p>
          </footer>
        </Col>
      </Row>
    </Container>
  );
}

export default CompanyInfo;
