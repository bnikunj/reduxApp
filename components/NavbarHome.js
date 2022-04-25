import React from 'react'
import { Container, Navbar, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAuthUser } from '../state/action-creaters';

function NavbarHome() {
  const dispatch = useDispatch();
  // const loginName = JSON.parse(localStorage.getItem('authToken'));
  // console.log(userAuth);
  const userData = useSelector((state) => state.auth.user);
  // console.log("_dp ",userData);

  const handleLogOutClick = () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('Are you sure, Do you want to Logout?');
    if (result === true) {
    localStorage.removeItem('authToken');
    dispatch(logoutAuthUser());
    }
  };
  
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {userData.length !== 0 ? (
                <div  style={{ cursor: "pointer", margin: '-10px auto'}}>  
                  <Dropdown>
                    <Dropdown.Toggle variant="dark">
                      {userData.userName.toUpperCase()}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleLogOutClick} style={{color: 'black'}}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    width: "10em",
                    margin: "auto 10px",
                  }}
                >
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Login
                  </Link>
                  <Link to="/registration" style={{ textDecoration: "none" }}>
                    Sign up
                  </Link>
                </div>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarHome