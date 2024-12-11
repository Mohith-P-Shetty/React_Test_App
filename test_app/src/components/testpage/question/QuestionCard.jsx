import { Card, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./QuestionCard.css";

const QuestionCard = ({
  question,
  options,
  questionNo,
  selectedOption,
  onOptionSelect,
  onNext,
  onPrevious,
  timer: initialTimer,
  type,
}) => {
  const [totalSeconds, setTotalSeconds] = useState(initialTimer * 60);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    if (totalSeconds <= 0) return;

    const interval = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [totalSeconds]);

  return (
    <Card className="card-wrapper">
      <Card.Header className="card-header">
        <span className="card-span">
          <div className={`span-color ${type}`}>{type}</div>
        </span>
        <div className="timer">
          <span>{formatTime(totalSeconds)}</span>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title className="card-title">
          {`Q.${questionNo} ${question}`}
        </Card.Title>
        <Form className="question-card-form">
          <div className="option-group-1">
            {options.slice(0, 2).map((option, index) => (
              <Form.Check
                className="card-options"
                type="radio"
                id={`option-${index + 1}`}
                name={`question-options-${questionNo}`}
                label={option}
                key={index}
                checked={selectedOption === option} // Ensures only one is selected
                onChange={() => onOptionSelect(option)} // Updates state to selected option
              />
            ))}
          </div>
          <div className="option-group-2">
            {options.slice(2).map((option, index) => (
              <Form.Check
                className="card-options"
                type="radio"
                id={`option-${index + 3}`}
                name={`question-options-${questionNo}`}
                label={option}
                key={index + 2}
                checked={selectedOption === option} // Ensures only one is selected
                onChange={() => onOptionSelect(option)} // Updates state to selected option
              />
            ))}
          </div>
        </Form>
      </Card.Body>
      <Card.Footer className="card-footer">
        <div id="previous-button">
          <Button
            variant="secondary"
            onClick={onPrevious}
            disabled={questionNo === 1}
          >
            Previous
          </Button>
        </div>
        <div id="next-button">
          <Button variant="outline-dark" onClick={onNext}>
            Next
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  questionNo: PropTypes.number.isRequired,
  selectedOption: PropTypes.string, // Only one string for radio buttons
  onOptionSelect: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired, // timer in minutes
  type: PropTypes.string.isRequired,
};

export default QuestionCard;
