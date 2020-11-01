import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Card, ListGroup, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom"

const AdminDashboard = () => {
  const {user: {_id, name, email, role}} = isAuthenticated();

  const adminLinks = () => {
    return (
      <Card className="mb-5">
        <Card.Header><h4>Admin Links</h4></Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              <Link to="/create/category">Create Category</Link>
            </ListGroup.Item>

            <ListGroup.Item>
              <Link to="/create/product">Create Product</Link>
            </ListGroup.Item>

            <ListGroup.Item>
              <Link to="/admin/products">Manage Products</Link>
            </ListGroup.Item>

            <ListGroup.Item>
              <Link to="/admin/orders"> View and Manage Orders</Link>
            </ListGroup.Item>
            
          </ListGroup>
        </Card.Body>
      </Card>
    )
  }

  const adminInfo = () => {
    return (
      <Card className="mb-5">
        <Card.Header><h4>Admin Information</h4></Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item><strong>Name:</strong> {name}</ListGroup.Item>
            <ListGroup.Item><strong>Email:</strong>  {email}</ListGroup.Item>
            <ListGroup.Item><strong>Role:</strong>  {role === 1 ? "Admin" : "Registered User"}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    )
  };



  return (
    <Layout
      title="Admin Dashboard"
      description={`G'day ${name}!`}
      className="container-fluid"
    >
      <Row>
        <Col md={3}>
          {adminLinks()}
        </Col>
        <Col md={9}>
          {adminInfo()}
        </Col>
      </Row>

      

    </Layout>
  )
}

export default AdminDashboard;