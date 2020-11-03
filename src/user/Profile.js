import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";
import UserContext from "./UserContext";


const Profile = ({match}) => {
  const { token } = isAuthenticated();
  const userId = match.params.userId;
  
  
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { name, email, password } = userInfo;

  useEffect(() => {
    init(userId);
  }, []);

  const init = (userId) => {
    read(userId, token).then(data => {
      if (data.error) {
        setError(true)
      } else {
        setUserInfo({...userInfo,
          name: data.name,
          email: data.email
        })
      }
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(userId, token, {name, email, password}).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        updateUser(data, () => {
          setUserInfo({...userInfo, name: data.name, email: data.email });
          setSuccess(true);
        })
      }
    })
  }

  const redirectUser = success => {
    if(success) {
      return <Redirect to="/user/dashboard" />
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(false);
    setUserInfo({...userInfo, [name]: value})
  }

 

  const showError = () => (
    <Alert variant= "danger" style={{display: error ? "" : "none"}}>
      {error}
    </Alert>
  )
 
  const showSuccess = () => (
   <Alert variant="success" style={{display: success ? "" : "none"}}>
     <h5>{`Profile update successful!`}</h5>
   </Alert>
  )

  const profileUpdate = (name, email, password) => {
    return (

    <Form className="mb-3" onSubmit={clickSubmit}>
      
        <Form.Group >
          <Form.Label className="text-muted">Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Product Name"
            name="name"
            value={name}
            onChange={handleChange}
            autoFocus
          />
        </Form.Group>

        <Form.Group  >
          <Form.Label className="text-muted">Email</Form.Label>
          <Form.Control 
            type="text" 
            name="email"
            value={email}
            autoFocus
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group >
          <Form.Label className="text-muted">Password</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            autoFocus
             />
        </Form.Group>

      <Form.Row>
        <Button as={Col} variant="outline-warning" type="submit" onClick={clickSubmit}>
          Save Changes
        </Button> 

      </Form.Row>
  
    </Form>
    )
  }
  

  return (
    <Layout
      title="User Profile"
      description={`Hello ${name}! Update your Profile`}
      className="container-fluid col-md-8 offset-md-2 mt-5"
    >
      <h2>Profile Update</h2>
      {profileUpdate(name, email, password)}
      {redirectUser(success)}

      

    </Layout>
  )
}

export default Profile;