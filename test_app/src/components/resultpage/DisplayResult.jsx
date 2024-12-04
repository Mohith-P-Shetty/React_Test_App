import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Automatically imports Chart.js elements

function DisplayResult() {
  const { testid, userid, username } = useSelector((state) => state.globalData);
  const [result, setResult] = useState(null); // State for the result data
  const [questions, setQuestions] = useState([]); // State for fetched questions
  const [chartData, setChartData] = useState(null); // State for chart data
  const Resultid = `${userid}_${testid}`; // Result ID based on user and test IDs

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
  console.log(`${result} ${questions}`);

  // Prepare chart data
  useEffect(() => {
    if (result && questions.length > 0) {
      const questionTypes = [...new Set(questions.map((q) => q.type))];

      // Initialize scores for each type
      const typeScores = {};
      const typeMaxScores = {};

      questionTypes.forEach((type) => {
        typeScores[type] = 0; // Start with 0 points scored
        typeMaxScores[type] = questions.filter((q) => q.type === type).length; // Count total questions of this type
      });

      // Calculate points scored
      result.attendedQuestions.forEach((attendedQuestion) => {
        const correspondingQuestion = questions.find(
          (q) => q._id === attendedQuestion.questionId
        );

        if (correspondingQuestion) {
          const { type, correctOption } = correspondingQuestion;
          const { selectedOption } = attendedQuestion;

          // Compare options (Single or Multiple)
          const isCorrect =
            Array.isArray(correctOption) && Array.isArray(selectedOption)
              ? correctOption.sort().join() === selectedOption.sort().join()
              : correctOption === selectedOption;

          if (isCorrect) {
            typeScores[type] += 1; // Increment score for the type
          }
        }
      });

      // Prepare chart data
      const chartLabels = Object.keys(typeScores);
      const maxScores = chartLabels.map((type) => typeMaxScores[type]);
      const actualScores = chartLabels.map((type) => typeScores[type]);

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: "Total Points",
            data: maxScores,
            borderColor: "rgba(75,192,192,1)",
            fill: false,
          },
          {
            label: "Points Scored",
            data: actualScores,
            borderColor: "rgba(255,99,132,1)",
            fill: false,
          },
        ],
      });
    }
  }, [result, questions]);

  if (!result || questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="result-display-wrapper">
      <h1>Result Details</h1>
      <div className="user-info">
        <p>
          <strong>User Name:</strong> {username}
        </p>
        <p>
          <strong>User ID:</strong> {userid}
        </p>
        <p>
          <strong>Job Applied For:</strong> {testid}
        </p>
      </div>
      <div className="score-info">
        <h2>Score: {result.score}</h2>
      </div>
      <div className="chart-wrapper">
        {chartData && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Performance Analysis",
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default DisplayResult;
