import { Button } from "react-bootstrap";
import React from "react";
import { Container } from "react-bootstrap";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();
  // const userData = useSelector((state) => state.auth.data);
  const authToken = localStorage.getItem('authToken');
  return (
    <>
      <Container style={{ margin: "25% auto", textAlign: "center" }}>
        <h1>Welcome To Home</h1>
        {authToken !== null && <div><Button onClick={() => navigate('/userDetail')}>User Detail</Button></div>}
      </Container>
    </>
  );
}

export default Dashboard;
