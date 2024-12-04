import { useState } from "react";
import "./Dashboard.css";
import {
  FaUser,
  FaClipboardList,
  FaQuestionCircle,
  FaCog,
} from "react-icons/fa";
import UserContent from "./content/UserContent";
import ResultContent from "./content/ResultContent";
import QuestionContent from "./content/QuestionContent";
import AdminSettings from "./content/AdminSettings";

// Placeholder for admin details and sample users
const adminDetails = {
  name: "Admin Name",
  email: "admin@example.com",
  picture: "https://via.placeholder.com/150", // Placeholder image
};

function Dashboard() {
  const [activeTab, setActiveTab] = useState("users"); // Default tab: users

  // Tab content renderer
  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <div className="users-container">
            <UserContent />
          </div>
        );
      case "results":
        return (
          <div className="results-container">
            <ResultContent />
          </div>
        );
      case "questions":
        return <QuestionContent />;
      case "settings":
        return <AdminSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="admin-info">
          <img src={adminDetails.picture} alt="Admin" />
          <h3>{adminDetails.name}</h3>
          <p>{adminDetails.email}</p>
        </div>
        <ul className="nav-links">
          <li
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            <FaUser /> Users
          </li>
          <li
            className={activeTab === "results" ? "active" : ""}
            onClick={() => setActiveTab("results")}
          >
            <FaClipboardList /> Results
          </li>
          <li
            className={activeTab === "questions" ? "active" : ""}
            onClick={() => setActiveTab("questions")}
          >
            <FaQuestionCircle /> Questions
          </li>
          <li
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => setActiveTab("settings")}
          >
            <FaCog /> Settings
          </li>
        </ul>
      </div>
      <div className="dashboard-main">
        {renderContent()} {/* Render content based on the active tab */}
      </div>
    </div>
  );
}

export default Dashboard;
