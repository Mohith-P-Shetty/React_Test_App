import { useState, useEffect } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./css/UserContent.css";

function UserContent() {
  const [users, setUsers] = useState([]); // To store the list of users
  const [selectedUser, setSelectedUser] = useState(null); // To store the user selected for the modal
  const [showModal, setShowModal] = useState(false); // Modal visibility

  // Fetch all users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:2000/api/users/all");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Open modal with user details
  const handleCardClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="user-content">
      {users.map((user) => (
        <Card
          className="user-card"
          key={user._id}
          onClick={() => handleCardClick(user)}
        >
          <Card.Body>
            <Card.Title>{user.candidateName}</Card.Title>
            <Card.Text>Email: {user.email}</Card.Text>
            <Card.Text>Job Applied For: {user.jobAppliedFor}</Card.Text>
          </Card.Body>
        </Card>
      ))}

      {/* Modal for User Details */}
      {selectedUser && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Name:</strong> {selectedUser.candidateName}
            </p>
            <p>
              <strong>Gender:</strong> {selectedUser.gender}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Contact Number:</strong> {selectedUser.contactNo}
            </p>
            <p>
              <strong>Registration Date:</strong>{" "}
              {new Date(selectedUser.registrationDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Source:</strong> {selectedUser.source}
            </p>
            <p>
              <strong>Qualifications:</strong> {selectedUser.qualifications}
            </p>
            <p>
              <strong>Stream:</strong> {selectedUser.stream}
            </p>
            <p>
              <strong>Year of Passing:</strong> {selectedUser.yearOfPassing}
            </p>
            <p>
              <strong>Job Applied For:</strong> {selectedUser.jobAppliedFor}
            </p>
            <p>
              <strong>Test:</strong> {selectedUser.test}
            </p>
            <p>
              <strong>Payment:</strong>{" "}
              {selectedUser.payment ? "Completed" : "Pending"}
            </p>
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

export default UserContent;
