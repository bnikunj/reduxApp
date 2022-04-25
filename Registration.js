import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Registration() {
  const dataArray = [];
  const [errors, setErrors] = useState({});
  // const [disabled, setDisabled] = useState(true);
  // const [passwordData, setPasswordData] = useState(null);
  const [data, setData] = useState({
    "userName": "",
    "email": "",
    "password": "",
  });


  const validate = (e, name, val) => {
    switch (name) {
      case 'userName':
          if (val.length < 3) {
            setErrors({
              ...errors,
              userName: 'UserName atleast have 3 characters.'
            })
          } else {
            setErrors({
              ...errors,
              userName: ''
            });
          }
        break;

      case 'email':
        const emailValid = val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (emailValid === null) {
          setErrors({
            ...errors,
            email: 'Please enter valid email Address.'
          })
        } else {
          setErrors({
            ...errors,
            email: ''
          });
        }
      break;
    
      case 'password':
        const passwordValid = val.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/);
        if (passwordValid === null) {
          setErrors({
            ...errors,
            password: 'password atleast have 8 character, special character, Lowercase & Uppercase character.'
          })
        } else {
          // setPasswordData(passwordValid.input);
          setErrors({
            ...errors,
            password: ''
          });
        }
      break;

      // case 'confirmPassword':
      //   const confirmPasswordValid = val.match(passwordData);
      //   if (confirmPasswordValid === null) {
      //     setErrors({
      //       ...errors,
      //       confirmPassword: `Password don't match.`
      //     })
      //   } else {
      //     setErrors({
      //       ...errors,
      //       confirmPassword: ''
      //     });
      //   }
      // break;
      
      default:
        break;
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
        
    validate(e,name,val);

    setData((prevState) => {
      return {
        ...prevState,
        [name]: val,
      };
    });
  }

  // submit form function 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.userName === '' && errors.email === '' && errors.password === '') {
      // insert data into empty array
      dataArray.push(data);
      // concat array object with localstorage data
      const tempData = dataArray.concat(JSON.parse(localStorage.getItem('registrationData')||'[]'));
      const result = JSON.stringify(tempData);
      // store data into localstorage
      localStorage.setItem('registrationData', result);
      alert('Registration Successfull !');
      clearform(e);

    } else {
      alert('Fill required Input');
    }
    
  };

  // clear form after submitting
  const clearform = (e) => {
    e.target.userName.value = "";
    e.target.email.value = "";
    e.target.password.value = "";
    // e.target.confirmPassword.value = "";
  }


  return (
    <>
      <Container>
        <Form
          className="border border-dark rounded p-5 w-lg-50"
          style={{ border: "1px", margin: "15% auto", backgroundColor: 'white'}}
          onSubmit={handleSubmit}
        >
          <h1 className="text-center">Registration Form</h1>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>UserName<span style={{color: 'red'}}>*</span></Form.Label>
            <Form.Control
              type=" text"
              name="userName"
              placeholder="Enter UserName"
              onChange={handleChange}
            />
            <Form.Text className="text-muted s-0">
            {
              errors.userName && <div style={{color: "red", marginTop: '5px'}}>{errors.userName}</div>
            }
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address<span style={{color: 'red'}}>*</span></Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email Address"
              onChange={handleChange}
            />
            <Form.Text className="text-muted s-0">
            {
              errors.email && <div style={{color: "red", marginTop: '5px'}}>{errors.email}</div>
            }
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password<span style={{color: 'red'}}>*</span></Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleChange}
            />
            <Form.Text className="text-muted s-0">
            {
              errors.password && <div style={{color: "red", marginTop: '5px'}}>{errors.password}</div>
            }
            </Form.Text>
          </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password<span style={{color: 'red'}}>*</span></Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
              name="confirmPassword"
            />
            <Form.Text className="text-muted s-0">
            {
              errors.confirmPassword && <div style={{color: "red", marginTop: '5px'}}>{errors.confirmPassword}</div>
            }
            </Form.Text>
          </Form.Group> */}
          <Button variant="primary" type="submit">
            Register
          </Button><br /><br />
          <div>Already have an account? <Link to="/login">Sign in</Link></div>
        </Form>
      </Container>
    </>
  );
}

export default Registration;
