import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Button, Modal, Table } from "react-bootstrap";
import "./DisplayResult.css";
import { useNavigate } from "react-router-dom";

function DisplayResult() {
  const { testid, userid, username } = useSelector((state) => state.globalData);
  const [result, setResult] = useState(null); // State for the result data
  const [questions, setQuestions] = useState([]); // State for fetched questions
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const Resultid = `${userid}_${testid}`; // Result ID based on user and test IDs
  const navigate = useNavigate();
  // Fetch result data
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/results/${Resultid}`
        );
        setResult(response.data);
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };
    fetchResult();
  }, [Resultid]);

  // Fetch questions data
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const encodedValue = encodeURIComponent(testid);
        const response = await axios.get(
          `http://localhost:2000/api/questions/${encodedValue}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [testid]);

  if (!result || questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="result-display-wrapper">
      <Card className="result-card">
        <Card.Header as="h5" className="text-center">
          Result Details
        </Card.Header>
        <Card.Body>
          <Card.Title>User Information</Card.Title>
          <Card.Text>
            <strong>Name:</strong> {username}
          </Card.Text>
          <Card.Text>
            <strong>User ID:</strong> {userid}
          </Card.Text>
          <Card.Text>
            <strong>Job Applied For:</strong> {testid}
          </Card.Text>
          <hr />
          <Card.Title>Performance</Card.Title>
          <Card.Text>
            <strong>Score:</strong> {result.score}
          </Card.Text>
          <Card.Text>
            <strong>Total Questions:</strong> {questions.length}
          </Card.Text>
          <Card.Text>
            <strong>Questions Attempted:</strong>{" "}
            {result.attendedQuestions.length}
          </Card.Text>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Show Details
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          Test Date: {result.date} | Time: {result.time}
        </Card.Footer>
      </Card>
      <Button variant="outline-dark" onClick={() => navigate("/")}>
        Done
      </Button>

      {/* Modal for Detailed Results */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="details-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Detailed Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Question ID</th>
                <th>Type</th>
                <th>Selected Option</th>
              </tr>
            </thead>
            <tbody>
              {result.attendedQuestions.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.questionId}</td>
                  <td>{item.type}</td>
                  <td>
                    {/* {item.selectedOption
                      ? item.selectedOption.join(", ")
                      : "Not Attempted"} */}
                    N/A
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DisplayResult;
