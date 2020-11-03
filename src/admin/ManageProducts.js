import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import ProductCard from "../core/Card";
import { isAuthenticated } from "../auth";
import { Col, Row, Badge, Button, Alert, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
import styled from "styled-components";

const FormWrapper = styled.div`
  .btn {
    background-color: transparent;
    border: 1px solid #ddad49;
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
`


const ManageProduct = () => {
 const { user, token } = isAuthenticated();
 const [products, setProducts] = useState([]);
 const [error, setError] = useState("");
 const [loading, setLoading] = useState("");



 useEffect(() => {
  loadProducts();
  }, [])

 // load products and set form data
 const loadProducts = () => {
   getProducts().then(data => {
     if(data.error) {
       setError(data.error)
     } else {
       setProducts(data);
     }
   })
 }



 const destroy = ( productId ) => {
   deleteProduct(productId, user._id, token).then(data => {
     if(data.error) {
       console.log(data.error)
     } else {
       loadProducts();
     }
   })
 };



  return (
    <Layout
      title="Manage Shirts"
      description="Manage Shirts"
      className="container mt-5 mb-5"
    >
      <FormWrapper>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h2 className="text-center">Total Products: {products.length}</h2>
            <hr/>
              <ListGroup>
                {products.map((product, i) => (
                    <ListGroup.Item 
                      key={i}
                      className="d-flex justify-content-between align-items-center">
                        <strong>
                          {product.name}
                        </strong>
                        <Link to={`/admin/product/update/${product._id}`}>
                          <Badge pill style={{background: "#ddad49", color: "#fff"}}>Update</Badge>
                        </Link>
                          <Badge onClick={() => destroy(product._id)} pill variant="danger">Delete</Badge>
                    </ListGroup.Item>
                ))}
              </ListGroup>
        
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="mt-3">
            <Button block>
                <Link to="/admin/dashboard" >
                  Back to Dashboard
                </Link>
              </Button>
          </Col>
        </Row>
      </FormWrapper>

    </Layout>
  )
}

export default ManageProduct;