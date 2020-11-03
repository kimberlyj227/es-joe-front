import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Col, Row, Form, Button, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { getProduct, updateProduct, getCategories } from "./apiAdmin";
import styled from "styled-components";

const FormWrapper = styled.div`
  .btn {
    background-color: transparent;
    border: 2px solid #ddad49;
    color: #4a494a;
    padding: 15px;
    font-size: 18px;
    margin-right: 15px;

  }
  

  .btn:hover {
    background-color: #ddad49;
    color: #ffffff;
    border: none;
  }

  a {
    text-decoration: none;
    color: #4a494a
  }

  a:hover {
    color:white;
  }
`

const UpdateProduct = ({ match }) => {
 const { user, token } = isAuthenticated();
 const [values, setValues] = useState({
   name: "",
   description: "",
   price: "",
   category: "",
   shipping: "",
   quantity: "",
   photo: "",
   createdProduct: "",
   redirectToProfile: false,
   formData:""
 });
 const [error, setError] = useState("");
 const [loading, setLoading] = useState("");
 const [categories, setCategories] = useState([])


 const { name, description, price, category, shipping, quantity, createdProduct, redirectToProfile, link, tagline, formData} = values;

  useEffect(() => {
    init(match.params.productId);
  }, []);

 // load categories and set form data
 const initCategories = () => {
   getCategories().then(data => {
     if(data.error) {
       setError(data.error)
     } else {
       setCategories(data)
     }
   })
 }

 const init = productId => {
   getProduct(productId).then(data => {
     if(data.error) {
       setError(data.error)
     } else {
       console.log(data)
        // populate state
        setValues({...values,
          name: data.name,
          description: data.description,
          category: data.category._id,
          price: data.price,
          shipping: data.shipping ? 1 : 0,
          quantity: data.quantity,
          formData: new FormData() 
        })
        // load categories
        initCategories()

     }
   })
 }

 const handleChange = e => {
  const { name } = e.target;
  const value = name === "photo" ? e.target.files[0] : e.target.value; 
  formData.set(name, value)
  setValues({...values, [name]: value});
};

const clickSubmit = e => {
  e.preventDefault();
  setError("");
  setLoading(true);

  updateProduct(match.params.productId, token, user._id, formData)
    .then(data=> {
      if(data.error) {
        setError(data.error)
      } else {
        setValues({
          name: "",
          description: "",
          price: "",
          category: "",
          shipping: "",
          quantity: "",
          photo: "",
          link: "",
          tagline: "",
          createdProduct: data.name,
          redirectToProfile: true
        })
        setLoading(false)
        setError(false)
      }
    })
}

const redirectUser = () => {
  if (redirectToProfile) {
    if (!error) {
      return <Redirect to="/admin/products"/>
    }
  }
}

 const newPostForm = () => {
   return (
    <FormWrapper>

    <Form className="mb-3" onSubmit={clickSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="name">
          <Form.Label className="text-muted">Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Shirt Name"
            name="name"
            value={name}
            onChange={handleChange}
            autoFocus
            required />
        </Form.Group>

        <Form.Group as={Col}  controlId="categories">
          <Form.Label className="text-muted">Categories</Form.Label>
          <Form.Control 
            as="select" 
            name="category"
            value={category}
            autoFocus
            required
            onChange={handleChange}
            >
              <option>Choose Category...</option>
              
              {categories && categories.map((category, i) => (
                <option key={i} value={category._id}>{category.name}</option>
              ))}
            
        </Form.Control>
      </Form.Group>

      </Form.Row>
        <Form.Group controlId="description">
          <Form.Label className="text-muted">Shirt Description</Form.Label>
          <Form.Control 
            as="textarea" 
            placeholder="Description"
            name="description"
            value={description}
            onChange={handleChange}
            autoFocus
            required />
        </Form.Group>

        <Form.Group  controlId="tagline">
          <Form.Label className="text-muted">Shirt  Tagline</Form.Label>
          <Form.Control 
            as="textarea" 
            placeholder="Tagline"
            name="tagline"
            value={tagline}
            onChange={handleChange}
            autoFocus
            required />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="price">
            <Form.Label className="text-muted">Price</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Shirt Price"
              name="price"
              value={price}
              onChange={handleChange}
              autoFocus
              required />
          </Form.Group>

          <Form.Group as={Col} controlId="link">
            <Form.Label className="text-muted">link</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Product Link"
              name="link"
              value={link}
              onChange={handleChange}
              autoFocus
              required />
          </Form.Group>
        </Form.Row>
      

      <Form.Row>
        <Form.Group as={Col} controlId="quantity">
          <Form.Label className="text-muted">Quantity</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Product Quantity"
            name="quantity"
            value={quantity}
            onChange={handleChange}
            autoFocus
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="shipping">
          <Form.Label className="text-muted">Shipping</Form.Label>
          <Form.Control 
            as="select" 
            defaultValue="Choose..."
            name="shipping"
            value={shipping}
            onChange={handleChange}
            autoFocus
            required
          >
            <option>Choose...</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="photo">
          <Form.File
              required
              type="file"
              name="photo"
              label="Photo"
              className="text-muted"
              accept="image/*"
              onChange={handleChange}
            />
        </Form.Group>
      </Form.Row>
      
      <Form.Row>
        <Button as={Col}  type="submit" onClick={clickSubmit}>
          Update Shirt
        </Button> 

        <Button as={Col} >
          <Link to="/admin/dashboard" >
            Back to Dashboard
          </Link>
        </Button>

      </Form.Row>
  
    </Form>
    </FormWrapper>
  )
 }
 
 const showError = () => (
   <Alert variant= "danger" style={{display: error ? "" : "none"}}>
     {error}
   </Alert>
 )

 const showSuccess = () => (
  <Alert variant="success" style={{display: createdProduct ? "" : "none"}}>
    <h5>{`${createdProduct} updated successfully!`}</h5>
  </Alert>
 )
 
 const showLoading = () => {
   if(loading) {
    <Alert variant="warning">
      <h2>Loading...</h2>
    </Alert>
   }

 }

  return (
    <Layout
      title="Update Shirts"
      description="Update Shirts Here"
      className="container mt-5"
    >
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          {showLoading()}
          {showError()}
          {showSuccess()}
          {newPostForm()}
          {redirectUser()}
      
        </Col>
      </Row>

    </Layout>
  )
}

export default UpdateProduct;