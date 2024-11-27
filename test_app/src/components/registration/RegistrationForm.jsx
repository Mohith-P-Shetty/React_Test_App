import "react-bootstrap";
import "./RegistrationForm.css";
import { useState } from "react";
import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import User from "./sub-comp/User";
import Admin from "./sub-comp/Admin";
import CompanyInfo from "./sub-comp/CompanyInfo";
import Gif from "./Gif/Gif";
function RegistrationForm() {
  const [tabKey, setTabKey] = useState("user");
  return (
    <div className="register-form">
      <Card className="register-card">
        <Container className="register-container">
          <Row className="register-row">
            <Col className="register-col-1">
              <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)} fill>
                <Tab eventKey="user" title="User">
                  <User />
                </Tab>
                <Tab eventKey="admin" title="Admin">
                  <Admin />
                </Tab>
              </Tabs>
            </Col>
            <Col className="register-col-2">
              <CompanyInfo />
            </Col>
          </Row>
        </Container>
      </Card>
      <div className="gif-pos">
        <Gif />
      </div>
    </div>
  );
}

export default RegistrationForm;
