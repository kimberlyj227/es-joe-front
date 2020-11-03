import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Col, Row, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createCategory} from "./apiAdmin";
import styled from "styled-components";

const DivWrapper = styled.div`
  margin-bottom: 30px;

  .btn {
    background-color: transparent;
    border: 1px solid #ddad49;
    color: #4a494a;
   
    font-size: 18px;
    margin-left: 15px;
    width: 175px;
  }
  
  .btn:hover {
    background-color: #ddad49;
    color: #ffffff;
    border: none;
  }
  
  
`  

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError(false);
    setName(e.target.value)
  }

  const clickSubmit = e => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    // make request to API to create category
    createCategory(user._id, token, {name})
      .then(data => {
        if(data.error) {
          setError(true)
        } else {
          setError("");
          setSuccess(true);
        }
      })
    setName("");
  }

  const showSuccess = () => {
    if(success) {
      return (
        <Alert variant="success">
          <h3> Category created successfully!</h3>
        </Alert>
      )
    }
  }

  const showError = () => {
    if(error) {
      return (
        <Alert variant="danger">
          <h3> Category should be unique.</h3>
        </Alert>
      )
    }
  };

  const goBack = () => {
    return (
        <Link to="/admin/dashboard" >
          <Button variant="outline-warning" className="ml-5">
              Back to Dashboard
          </Button>
        </Link>
    )
  };

  const newCategoryForm = () => (
    <Form onSubmit={clickSubmit}>

        <Form.Group controlId="name">
          <Form.Label className="text-muted">Category Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            placeholder="Category name" 
            onChange={handleChange}
            value={name}
            autoFocus
            required
           />
        </Form.Group>
        <Form.Row>
          <Button onClick={clickSubmit} variant="outline-dark"  >
            Create Category
          </Button >
          {goBack()}
        </Form.Row>
    </Form>
  )

  return (
    <Layout
      title="Create Category"
      description="Add a new category"
      className="container mt-5"
    >
      <DivWrapper>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            {showSuccess()}
            {showError()}
            {newCategoryForm()}
            
          </Col>
        </Row>

      </DivWrapper>


    </Layout>
  )
}

export default CreateCategory;