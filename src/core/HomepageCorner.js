import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiCoffeeTogo } from "react-icons/bi";
import {Modal, Button} from "react-bootstrap";
import styled from "styled-components";
import { isAuthenticated } from "../auth";


const CornerWrapper = styled.div`
  background: linear-gradient(45deg, hsla(41, 69%, 58%, 1) 0%, hsla(41, 100%, 83%, 1) 100%);
  border-radius: 50%;
  height: 100px;
  width: 100px;
  box-shadow: 5px 10px 18px #000;
  transition: all 0.1s ease-in-out;

  position: fixed;
  bottom: 50px;
  right: 50px;

  color: white;
  font-size: 50px;
  text-align: center;
  line-height: 100px;

  :hover{
    box-shadow: 5px 10px 18px #000;
    cursor: pointer;
    background: radial-gradient(hsla(41, 69%, 58%, 1) 0%, hsla(41, 100%, 83%, 1) 100%);
    transition: all 0.2s ease-in-out;
}

  :active {
      background-color: #6eb9f7;
      background-size: 100%;
      transition: background 2s;
    }   
  }
`
const StyleModal = styled(Modal)`

    width: 100vw;

    .modal-header {
        font-family: "Roboto Slab", serif;
        text-align: center;

    }

    .button {
      background-color: #ddad49;
      color: #ffffff;
      border: none;
      padding: 15px;
      font-size: 18px;
      margin-bottom: 20px;
    }
  
    .button:hover {
      background-color: transparent;
      border: 2px solid #ddad49;
      color: #4a494a; 

`

const ShirtModal = props => {
  return (
    <StyleModal
      {...props} 
      size="lg" 
      centered 
      aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            ESPRESSO JOE SHIRT OF THE MONTH CLUB
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Who doesn't want a shirt every month??</h4>
          <p>
            Hardtack sloop squiffy trysail barque Chain Shot to go on account transom crow's nest sutler. Gun spike topgallant piracy hornswaggle starboard salmagundi take a caulk scuppers deadlights. Buccaneer spanker transom gaff ho sloop rum flogging Gold Road Blimey.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="light" className="button">Close</Button>
          <Button onClick={props.onHide} variant="primary" className="button">Subscribe</Button>
          {!isAuthenticated() && (
            <Link to="/signin">
              <Button  variant="dark" className="button">Login</Button>
            </Link>

          )}
        </Modal.Footer>
          
      </StyleModal>
  )
}

const CornerIcon = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  return (
    
      <CornerWrapper>
        <div onClick={handleShow}>
          <BiCoffeeTogo />
        </div>
        <ShirtModal 
          show={show}
          onHide={handleClose}
        />
      </CornerWrapper>
 
  )
}

export default CornerIcon;