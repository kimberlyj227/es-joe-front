import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Card, ListGroup, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom"
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
  const {user: {_id, name, email, role}} = isAuthenticated();
  const token = isAuthenticated().token;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    init(_id, token);
  }, []);

  const init =(userId, token) => {
    getPurchaseHistory(userId, token)
      .then(data => {
        if(data.error) {
          console.log(data.error)
        } else {
          setHistory(data)
        }
      })
  }

  const userLinks = () => {
    return (
      <Card className="mb-5">
        <Card.Header><h4>User Links</h4></Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              <Link to="/cart">My Cart</Link>
            </ListGroup.Item>

            <ListGroup.Item>
              <Link to={`/profile/${_id}`}>Update Profile</Link>
            </ListGroup.Item>
            
          </ListGroup>
        </Card.Body>
      </Card>
    )
  }

  const userInfo = () => {
    return (
      <Card className="mb-5">
        <Card.Header><h4>User Information</h4></Card.Header>
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

  const userHistory = (history) => {
    return (
      <Card className="mb-5">
        <Card.Header><h4>Purchase History</h4></Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              {history.map((h, i) =>(
                <div key={i} className="bg-light">
                  <hr/>
                  {h.products.map((p, i2) => (
                    <div key={i2} >
                      <h6>Product Name: {p.name}</h6>
                      <h6>Product Price: ${p.price}</h6>
                      <h6>
                        Purchased Date: {" "}
                        {moment(p.createdAt).fromNow()}
                      </h6>
                      <h6>Status: {p.status}</h6>
                      <hr/>
                    </div>
                  ))}
                </div>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    )
  }

  

  return (
    <Layout
      title="User Dashboard"
      description={`G'day ${name}!`}
      className="container-fluid"
    >
      <Row>
        <Col md={3}>
          {userLinks()}
        </Col>
        <Col md={9}>
          {userInfo()}
          {userHistory(history)}
        </Col>
      </Row>

      

    </Layout>
  )
}

export default Dashboard;