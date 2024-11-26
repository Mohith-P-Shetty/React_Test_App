function AdminPage() {
  const handlebutton = () => {
    fetch("http://localhost:2000") // Make a GET request to your backend server
      .then((data) => {
        console.log(data); // Should log "Server is running!" if successful
      })
      .catch((error) => {
        console.error("Error:", error); // Log any errors that occur
      });
  };
  return (
    <div className="admin-wrapper">
      AdminPage
      <button onClick={handlebutton}>hey</button>
    </div>
  );
}

export default AdminPage;
