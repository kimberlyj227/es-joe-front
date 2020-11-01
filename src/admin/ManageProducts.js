import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import ProductCard from "../core/Card";
import { isAuthenticated } from "../auth";
import { Col, Row, Badge, Button, Alert, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

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

// const clickSubmit = e => {
//   e.preventDefault();
//   setError("");
//   setLoading(true);

//   createProduct(user._id, token, formData)
//     .then(data=> {
//       if(data.error) {
//         setError(data.error)
//       } else {
//         setValues({
//           name: "",
//           description: "",
//           price: "",
//           category: "",
//           shipping: "",
//           quantity: "",
//           photo: "",
//           createdProduct: data.name
//         })
//         setLoading(false)
//       }
//     })
// }



 
      
      // <Form.Row>
      //   <Button as={Col} variant="outline-info" type="submit" onClick={clickSubmit}>
      //     Create Product
      //   </Button> 

      //   <Button as={Col} variant="outline-warning">
      //     <Link to="/admin/dashboard" style={{ color: "#ffc107"}}>
      //       Back to Dashboard
      //     </Link>
      //   </Button>

      // </Form.Row>
  
 
//  const showError = () => (
//    <Alert variant= "danger" style={{display: error ? "" : "none"}}>
//      {error}
//    </Alert>
//  )

//  const showSuccess = () => (
//   <Alert variant="success" style={{display: createdProduct ? "" : "none"}}>
//     <h5>{`${createdProduct} created successfully!`}</h5>
//   </Alert>
//  )
 
//  const showLoading = () => {
//    if(loading) {
//     <Alert variant="info">
//       <h2>Loading...</h2>
//     </Alert>
//    }

//  }

  return (
    <Layout
      title="Manage Products"
      description="Manage Products"
      className="container"
    >
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
                        <Badge pill variant="info">Update</Badge>
                      </Link>
                        <Badge onClick={() => destroy(product._id)} pill variant="danger">Delete</Badge>
                  </ListGroup.Item>
              ))}
            </ListGroup>
      
        </Col>
      </Row>

    </Layout>
  )
}

export default ManageProduct;