import { useState, useEffect } from "react";
import { Card, Modal, Button, Form, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import "./css/ResultContent.css";

function ResultContent() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filters, setFilters] = useState({ date: "", testid: "", userid: "" });
  const [selectedResult, setSelectedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState({
    dates: [],
    testIds: [],
    userIds: [],
  });

  // Fetch results and populate dropdown options
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/results/fetch"
        );
        setResults(response.data);
        setFilteredResults(response.data);

        // Extract unique options for dropdowns
        const uniqueDates = [
          ...new Set(response.data.map((result) => result.date)),
        ];
        const uniqueTestIds = [
          ...new Set(response.data.map((result) => result.testid)),
        ];
        const uniqueUserIds = [
          ...new Set(response.data.map((result) => result.userid)),
        ];
        setDropdownOptions({
          dates: uniqueDates,
          testIds: uniqueTestIds,
          userIds: uniqueUserIds,
        });
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Apply filters on search
  const handleSearch = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await axios.get(
        `http://localhost:2000/api/results/fetch?${query}`
      );
      setFilteredResults(response.data);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  // Fetch detailed questions for a result
  const handleCardClick = async (result) => {
    const { testid } = result;
    console.log("Clicked test ID:", testid);

    if (!testid) {
      console.error("No testid provided");
      return;
    }
    const encodedValue = encodeURIComponent(testid);
    try {
      const response = await fetch(
        `http://localhost:2000/api/questions/${encodedValue}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching question: ${response.statusText}`);
      }
      const questionData = await response.json();
      console.log("Fetched question:", questionData);

      // Ensure that detailedResults exists and is an array
      const detailedResults = Array.isArray(result.detailedResults)
        ? result.detailedResults
        : [];

      // Merge detailed questions with selectedOption and questionId from the result
      const mergedQuestions = questionData.map((q) => {
        // Find the selected option based on questionId
        const selectedOption =
          detailedResults.find((detail) => detail.questionId === q.questionId)
            ?.selectedOption || "N/A"; // Default to "N/A" if no selected option found

        return {
          ...q, // Spread question data
          selectedOption, // Add selected option
        };
      });

      // Set the merged result with detailed questions
      setSelectedResult({
        ...result,
        detailedQuestions: mergedQuestions, // Include the merged question data
      });
      setShowModal(true); // Show the modal after setting the selected result
    } catch (error) {
      console.error("Error in handleCardClick:", error.message);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResult(null);
  };

  return (
    <div className="result-content">
      <div className="filter-section">
        <Form>
          <Row className="align-items-center">
            <Col>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Select
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  {dropdownOptions.dates.map((date, index) => (
                    <option key={index} value={date}>
                      {date}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Test ID</Form.Label>
                <Form.Select
                  name="testid"
                  value={filters.testid}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  {dropdownOptions.testIds.map((testid, index) => (
                    <option key={index} value={testid}>
                      {testid}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>User ID</Form.Label>
                <Form.Select
                  name="userid"
                  value={filters.userid}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  {dropdownOptions.userIds.map((userid, index) => (
                    <option key={index} value={userid}>
                      {userid}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Button variant="primary" onClick={handleSearch} className="mt-4">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      {/* Results Display Section */}
      <div className="results-section">
        {filteredResults.map((result) => (
          <Card
            className="result-card"
            key={result.resultid}
            onClick={() => handleCardClick(result)}
          >
            <Card.Body>
              <Card.Title>User: {result.userid}</Card.Title>
              <Card.Text>Test: {result.testid}</Card.Text>
              <Card.Text>Score: {result.score}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal for Result Details */}
      {selectedResult && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Result Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>User ID:</strong> {selectedResult.userid}
            </p>
            <p>
              <strong>Test ID:</strong> {selectedResult.testid}
            </p>
            <p>
              <strong>Date:</strong> {selectedResult.date}
            </p>
            <p>
              <strong>Time:</strong> {selectedResult.time}
            </p>
            <p>
              <strong>Score:</strong> {selectedResult.score}
            </p>

            <h5>Questions:</h5>
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Type</th>
                  <th>Selected Option</th>
                  <th>Correct Option</th>
                </tr>
              </thead>
              <tbody>
                {selectedResult.detailedQuestions.map((q, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{q.question}</td>
                    <td>{q.type}</td>
                    <td>{q.selectedOption}</td>
                    <td>{q.correctOption}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default ResultContent;
