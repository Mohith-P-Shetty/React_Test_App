import "./TestPage.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import QuestionCard from "./question/QuestionCard";
import axios from "axios";
import TestInfo from "./test-info/TestInfo";
import { FaRegCircleUser } from "react-icons/fa6";

function TestPage() {
  const { testid, username } = useSelector((state) => state.globalData);
  const [questionNo, setQuestionNo] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [trace, setTrace] = useState([]);

  // Fetch questions based on testid
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const encodedValue = encodeURIComponent(testid);
        console.log("Encoded Test ID:", encodedValue);

        const response = await axios.get(
          `http://localhost:2000/api/questions/${encodedValue}`
        );

        setQuestions(response.data);
        console.log("Fetched Questions:", response.data);

        setTrace(
          response.data.map((q) => ({
            questionId: q.questionId,
            selectedOption: q.type === "MCQ" ? [] : null, // Adjusted for type
            type: q.type,
            correctOption: q.correctOption,
          }))
        );
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (testid) {
      fetchQuestions();
    }
  }, [testid]);

  // Get current question data
  const currentQuestion = questions[currentQuestionIndex] || {};
  const { question, options, questionId, type } = currentQuestion;

  // Handle option selection
  const handleOptionSelect = (selectedOption) => {
    setTrace((prevTrace) =>
      prevTrace.map((entry) =>
        entry.questionId === questionId ? { ...entry, selectedOption } : entry
      )
    );
  };

  // Handle next and previous buttons
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionNo(questionNo + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionNo(questionNo - 1);
    }
  };

  // Get the selected option for the current question
  const currentTraceEntry =
    trace.find((entry) => entry.questionId === questionId) || {};
  const selectedOption = currentTraceEntry.selectedOption;

  return (
    <div className="testpage-wrapper">
      <div className="test-header">
        <p className="header-title">
          {testid}
          {" Test"}
        </p>
        <div className="username">
          {username || "username"} <FaRegCircleUser />
        </div>
      </div>
      <div className="test-content">
        {question && options ? (
          <div className="question-card">
            <QuestionCard
              question={question}
              options={options}
              questionNo={questionNo}
              selectedOption={selectedOption}
              onOptionSelect={handleOptionSelect}
              onNext={handleNext}
              onPrevious={handlePrevious}
              timer={3000}
              type={type}
            />
          </div>
        ) : (
          <div>Loading questions...</div>
        )}
        <div className="test-info">
          <TestInfo
            trace={trace}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setQuestionNo={setQuestionNo}
          />
        </div>
      </div>
      <div className="test-footer">test footer</div>
    </div>
  );
}

export default TestPage;
