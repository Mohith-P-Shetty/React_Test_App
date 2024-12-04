import "./TestInfo.css";
import PropTypes from "prop-types";
import { Accordion, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentdate } from "../../../slices/globalDataSlice";
import { useNavigate } from "react-router-dom";

function TestInfo({ trace, setCurrentQuestionIndex, setQuestionNo }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userid, testid } = useSelector((state) => state.globalData); // Get userid and testid from Redux store
  const [result, setResult] = useState(null); // State to store the test result
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility

  const groupQuestionsByType = () => {
    const groups = {};
    trace.forEach((entry) => {
      if (!groups[entry.type]) {
        groups[entry.type] = [];
      }
      groups[entry.type].push(entry);
    });
    return groups;
  };

  const questionGroups = groupQuestionsByType();

  // Handle button click to navigate to a specific question
  const handleQuestionClick = (globalIndex) => {
    setCurrentQuestionIndex(globalIndex);
    setQuestionNo(globalIndex + 1);
  };

  // Get button class dynamically based on question state
  const getButtonClass = (entry) => {
    if (entry.selectedOption && entry.selectedOption !== "review") {
      return "question-button answered"; // Green if answered
    } else if (entry.selectedOption === null) {
      return "question-button not-answered"; // Red if not answered
    } else if (entry.selectedOption === "review") {
      return "question-button to-review"; // Purple if marked for review
    } else {
      return "question-button not-viewed"; // Gray if not viewed
    }
  };

  // Calculate score based on trace
  const calculateScore = () => {
    let score = 0;
    trace.forEach((entry) => {
      const { selectedOption, correctOption } = entry;

      if (selectedOption && correctOption) {
        // Normalize and compare values
        if (
          String(selectedOption).trim().toLowerCase() ===
          String(correctOption).trim().toLowerCase()
        ) {
          score += 1;
        }
      }
    });

    return score;
  };

  // Handle Submit button click
  const handleSubmit = () => {
    const score = calculateScore(); // Calculate the score
    const currentDate = new Date();
    const resultData = {
      userid,
      testid,
      date: currentDate.toISOString().split("T")[0], // Extract date in YYYY-MM-DD format
      time: currentDate.toTimeString().split(" ")[0], // Extract time in HH:MM:SS format
      attendedQuestions: trace.map((entry) => ({
        questionId: entry.questionId,
        type: entry.type,
        selectedOption: entry.selectedOption,
      })),
      score, // Add the calculated score
    };
    setResult(resultData); // Set the result state
    setShowModal(true); // Show confirmation modal
  };

  // Handle Confirm and Cancel actions in the modal
  const handleConfirmSubmit = async () => {
    const currentDate = new Date();
    dispatch(setCurrentdate(currentDate.toISOString().split("T")[0]));
    setShowModal(false);
    try {
      const response = await axios.post(
        "http://localhost:2000/api/results/create",
        result
      );
      console.log("Result submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting result:", error);
    }
    navigate("/result");
  };

  const handleCancelSubmit = () => {
    setShowModal(false); // Close the modal
  };

  let globalIndex = 0; // Initialize a global question index

  return (
    <div className="test-info-wrapper">
      <div className="test-info-accordian">
        <Accordion defaultActiveKey={Object.keys(questionGroups)[0]}>
          {Object.entries(questionGroups).map(([type, questions]) => (
            <Accordion.Item eventKey={type} key={type}>
              <Accordion.Header>{type} Questions</Accordion.Header>
              <Accordion.Body>
                <div className="question-grid">
                  {questions.map((entry) => {
                    const currentIndex = globalIndex; // Capture the current global index
                    globalIndex++; // Increment the global index
                    return (
                      <button
                        key={entry.questionId}
                        className={getButtonClass(entry)}
                        onClick={() => handleQuestionClick(currentIndex)}
                      >
                        {currentIndex + 1}
                      </button>
                    );
                  })}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      <div className="test-info-button">
        <Button
          className="submit-button"
          variant="outline-dark"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <Modal show={showModal} onHide={handleCancelSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to submit the test? Once submitted, changes
          cannot be made.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelSubmit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmSubmit}>
            Confirm Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

TestInfo.propTypes = {
  trace: PropTypes.arrayOf(
    PropTypes.shape({
      questionId: PropTypes.string.isRequired, // Ensure questionId is a string and required
      selectedOption: PropTypes.oneOfType([
        PropTypes.string, // For single-choice questions
        PropTypes.array, // For multiple-choice questions
        PropTypes.oneOf([null]), // When no option is selected
      ]).isRequired,
      type: PropTypes.string, // Question type
      correctOption: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // Correct option(s)
    })
  ).isRequired,
  setCurrentQuestionIndex: PropTypes.func.isRequired, // Function to update question index
  setQuestionNo: PropTypes.func.isRequired, // Function to update question number
};
export default TestInfo;
