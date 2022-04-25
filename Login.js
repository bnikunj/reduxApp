/* eslint-disable array-callback-return */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userDetailTable, loginAuthUser } from "../state/action-creaters";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [errors, setErrors] = useState({});
  const [userAllData, setUserAllData] = useState([]);
  const [radio, setRadio] = useState("userName");
  const [checkedRadio, setCheckedRadio] = useState(true);
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const validate = (e, name, val) => {
    switch (name) {
      case "userName":
        if (val.length < 3) {
          setErrors({
            ...errors,
            userName: "UserName atleast have 3 characters.",
          });
        } else {
          setErrors({
            ...errors,
            userName: "",
          });
        }
        break;

      case "email":
        const emailValid = val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (emailValid === null) {
          setErrors({
            ...errors,
            email: "Please enter valid email Address.",
          });
        } else {
          setErrors({
            ...errors,
            email: "",
          });
        }
        break;

      case "password":
        const passwordValid = val.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/
        );
        if (passwordValid === null) {
          setErrors({
            ...errors,
            password:
              "password atleast have 8 character, special character, Lowercase & Uppercase character.",
          });
        } else {
          setErrors({
            ...errors,
            password: "",
          });
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    validate(e, name, val);

    setData((prevState) => {
      return {
        ...prevState,
        [name]: val,
      };
    });
  };

  const handleClickRadio = (e) => {
    let name = e.target.value;
    setRadio(name);
    if (name === "email") {
      setCheckedRadio(false);
    } else {
      setCheckedRadio(true);
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/users`
      )
      .then((res) => {
        console.log(res.data);

        const userDetail = res.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            username: item.username,
            email: item.email,
            phone: item.phone
          }
        })
        setUserAllData(res.data);
        localStorage.setItem('userAllDetail', JSON.stringify(userDetail));
      });
  }, []);
  // submit form function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.password === "") {
      const localData = JSON.parse(localStorage.getItem("registrationData"));
      const result = localData.find((item) => {
      let token= "jsdbkjabffqjqkwne&**#@axccxdcxzcczxvnw22842^#3j4nnkvcv#4m423"
      if (item.password === data.password) {
          if (radio === "userName") {
            dispatch(loginAuthUser(token, item));
            dispatch(userDetailTable(userAllData));
            localStorage.setItem('authToken', token);
            if (item.userName === data.userName && errors.userName === "") {
              return item;
            }
          } else {
            dispatch(loginAuthUser(item));
            if (item.email === data.email && errors.email === "") {
              return item;
            }
          }
        }
      });
      if (result === undefined) {
        clearform(e);
        alert("User does not exists");
      } else {
        alert("login successfull !");
        navigate("/");
      }
    } else {
      alert("Fill required all Inputs");
    }
  };

  // clear form after submitting
  const clearform = (e) => {
    if (radio === "userName") {
      e.target.userName.value = "";
    } else {
      e.target.email.value = "";
    }
    e.target.password.value = "";
  };
  
  return (
    <>
      <Container>
        <Form
          className="border border-dark rounded p-5 w-lg-50"
          style={{ border: "1px", margin: "15% auto", backgroundColor: 'white' }}
          onSubmit={handleSubmit}
        >
          <h1 className="text-center">Login Form</h1>
          <div className="mb-3">
            <Form.Check
              inline
              label="UserName"
              name="group1"
              type="radio"
              id="UserName"
              value="userName"
              checked={checkedRadio}
              onClick={handleClickRadio}
            />
            <Form.Check
              inline
              label="email"
              name="group1"
              type="radio"
              id="email"
              value="email"
              onClick={handleClickRadio}
            />
          </div>
          {radio === "userName" && (
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label>
                UserName<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type=" text"
                placeholder="Enter UserName"
                name="userName"
                onChange={handleChange}
              />
              <Form.Text className="text-muted s-0">
                {errors.userName && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.userName}
                  </div>
                )}
              </Form.Text>
            </Form.Group>
          )}
          {radio === "email" && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Email Address<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                name="email"
                onChange={handleChange}
              />
              <Form.Text className="text-muted s-0">
                {errors.email && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.email}
                  </div>
                )}
              </Form.Text>
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Password<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleChange}
            />
            <Form.Text className="text-muted s-0">
              {errors.password && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {errors.password}
                </div>
              )}
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
          <br />
          <br />
          <div>
            <Link to="/registration">Sign up</Link> Create an Account
          </div>
        </Form>
      </Container>
    </>
  );
}

export default Login;
