import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Card, ListGroup, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom"
import { getPurchaseHistory, read, update } from "./apiUser";
import moment from "moment";
import UpdateModal from "./UpdateModal";
import UserContext from "./UserContext";

const Dashboard = () => {
  const {user: {_id, name, email, role}} = isAuthenticated();
  const token = isAuthenticated().token;
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(false);
  const [preferences, setPreferences] = useState({
    color1: "",
    color2: "",
    color3: "",
    size: ""
  })

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const {size, color1, color2, color3} = preferences;

 

  useEffect(() => {
    init(_id, token);
    getUser(_id)
  }, []);

  const init =(userId, token) => {
    getPurchaseHistory(userId, token)
      .then(data => {
        if(data.error) {
          console.log(data.error)
        } else {
          setHistory(data)
        }
      });

  }

  const getUser = (userId) => {
    read(userId, token).then(data => {
      if (data.error) {
        setError(true)
      } else {
        setPreferences({...preferences,
          color1: data.shirtColor1,
          color2: data.shirtColor2,
          color3: data.shirtColor3,
          size: data.shirtSize
        })
      }
    });
  };

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

            <ListGroup.Item>
            {isAuthenticated() && isAuthenticated().user.role === 1 ? (
                
                  <Link 
                    
                    to="/admin/dashboard">
                      Admin Dashboard
                    </Link>
                

              ) : (
                
                  null
              )}
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
        <Card.Header><h4>Subscription Information and History</h4></Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item><strong>Shirt Size:</strong> {size}</ListGroup.Item>
            <ListGroup.Item><strong>Color Preference 1:</strong>  {color1}</ListGroup.Item>
            <ListGroup.Item><strong>Color Preference 2:</strong>  {color2}</ListGroup.Item>
            <ListGroup.Item><strong>Color Preference 3:</strong>  {color3}</ListGroup.Item>
            
            <ListGroup.Item>
              <Button 
                className="button"
                variant="light"
                onClick={() => toggle()}
              >  
                Update Preferences
              </Button>  
            </ListGroup.Item>
           </ListGroup>
          
          <hr/>
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

  const handleInputChange = e => {
    const { name, value } = e.target;
    setPreferences({...preferences, [name]: value})
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    update(_id, token, {
      shirtSize: size,
      shirtColor1: color1,
      shirtColor2: color2,
      shirtColor3: color3
    })
      .then(res => {
        console.log(res)
        setModal(false)
      })
      .catch(err => console.log(err));
    
   
  }

  

  return (
    <Layout
      title="User Dashboard"
      description={`G'day ${name}!`}
      className="container-fluid mt-5"
    >
      <Row>
        <Col md={3}>
          {userLinks()}
        </Col>
        <Col md={9}>
          {userInfo()}
          {userHistory(history)}
          <UserContext.Provider 
            value={{_id, preferences, toggle, modal, handleInputChange, handleFormSubmit}}
          >

            <UpdateModal />

          </UserContext.Provider>

        </Col>
      </Row>

      

    </Layout>
  )
}

export default Dashboard;