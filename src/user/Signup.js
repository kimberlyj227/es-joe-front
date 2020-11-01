import React, {useState} from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signUp } from "../auth";
import { Form, Button, Alert } from "react-bootstrap"


const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  })

  const { name, email, password, error, success } = values;

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({...values, error: false, [name]: value });
  }

  const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false});
    signUp({name, email, password})
    .then(data => {
      if(data.error) {
        setValues({...values, error: data.error, success:false})
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        })
      }
    })
  }

  const signUpForm = () => {
    return (
      <Form>

        <Form.Group controlId="name">
          <Form.Label className="text-muted">Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            placeholder="Enter full name" 
            onChange={handleChange}
            value={name} />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label className="text-muted">Email address</Form.Label>
          <Form.Control 
            type="email" 
            name="email"
            placeholder="Enter email" 
            onChange={handleChange}
            value={email} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="text-muted">Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password"
            placeholder="Enter password" 
            onChange={handleChange}
            value={password} />
          <Form.Text className="text-muted">
        Password must be 6 characters or longer and contain a digit.
          </Form.Text>
        </Form.Group>

        <Button 
          onClick={clickSubmit}
          style={{ background: "#ddad49", color: "#fff", borderColor: "#ddad49", border: "none"}}
        > Submit </Button>
      </Form>
    )
  }

  const showError = () => {
    return (
      <Alert variant="danger" style={{ display: error ? "" : "none" }}>
        {error}
      </Alert>
    )
  }

  const showSuccess = () => {
    return (
      <Alert variant="success" style={{ display: success ? "" : "none" }}>
        Account created successfully! Please <Link to="/signin">Sign In</Link>
      </Alert>
    )
  }
 

  return (
    <Layout
      title="Sign Up Page"
      description="Sign up with Espresso Joe"
      className="container col-md-8 offset-md-2 mt-5"
    >
     {showError()}
     {showSuccess()}
     {signUpForm()}
     
    </Layout>
  )
}

export default Signup;