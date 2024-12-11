import "react-bootstrap";
import "./RegistrationForm.css";
import { useState } from "react";
import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import User from "./sub-comp/tabs/User";
import Admin from "./sub-comp/tabs/Admin";
import Gif1 from "../../assets/gif1.gif";
import Gif2 from "../../assets/gif2.gif";

import { useDispatch, useSelector } from "react-redux";
import { setIsAdmin } from "../../slices/globalDataSlice";

function RegistrationForm() {
  const { isAdmin } = useSelector((state) => state.globalData);
  const dispatch = useDispatch();
  const [tabKey, setTabKey] = useState("user");

  return (
    <div className="register-form">
      <Card className="register-card">
        <Container className="register-container">
          <Row className="register-row d-flex">
            <Col className="register-col-1">
              <Tabs
                className="register-tabs"
                activeKey={tabKey}
                onSelect={(k) => {
                  setTabKey(k);
                  if (k === "admin") {
                    dispatch(setIsAdmin(true));
                  } else {
                    dispatch(setIsAdmin(false));
                  }
                }}
                fill
              >
                <Tab eventKey="user" title="User" className="home-tab">
                  <User />
                </Tab>
                <Tab eventKey="admin" title="Admin">
                  <Admin />
                </Tab>
              </Tabs>
            </Col>

            <Col className="register-col-2">
              <img
                src={isAdmin ? Gif2 : Gif1}
                alt="Animated GIF"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
}

export default RegistrationForm;
