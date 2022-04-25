import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateUserDetail } from "../state/action-creaters";

function UpdateUserDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userDetail.editUserDetail);
  const [data, setData] = useState({
    id: userData[0].id,
    name: userData[0].name,
    username: userData[0].username,
    email: userData[0].email,
    phone: userData[0].phone,
  });
  const handleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;

    setData((prevState) => {
      return {
        ...prevState,
        [name]: val,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.name !== '' && data.username !== '' && data.email !== '' && data.password !== '') {
      console.log(data);
      dispatch(updateUserDetail(data));
      alert('Successfull Updated !');
      navigate('/userDetail');
    } else {
      alert('Fill required Input');
    }
    
  };

  return (
    <>
      <Container>
        <Form
          className="border border-dark rounded p-5 w-lg-50"
          style={{
            border: "1px",
            margin: "15% auto",
            backgroundColor: "white",
          }}
          onSubmit={handleSubmit}
        >
          <h1 className="text-center">Update User Detail Form</h1>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>
              Name<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type=" text"
              name="name"
              placeholder="Enter Your Name"
              value={data.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>
              UserName<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type=" text"
              name="username"
              placeholder="Enter UserName"
              value={data.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Email Address<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={data.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>
              Phone Number<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
              name="phone"
              value={data.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
          <br />
          <br />
          <div>
            <Link to="/userDetail">Show All User Detail</Link>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default UpdateUserDetail;
