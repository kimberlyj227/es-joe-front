import React from "react";
import {Jumbotron, Image, Row, Col} from "react-bootstrap";
import styled from "styled-components";

const FooterWrapper = styled.div`
  .jumbotron-fluid{
    height: 250px;
    background-image: url(${process.env.PUBLIC_URL}/images/background.png);
    background-size: cover;
    margin-top: 30px;
    
  }


  #title {
    font-family: "Roboto Slab", serif;
    color: rgb(255, 255, 255);
    text-align: center;
    margin-top: 20px;
  }

  #joe {
    height: 150px;
    width: auto:
  }

  p {
    color: "#ffffff";
  }
`


const Footer = () => {

  return (
    <>
      <FooterWrapper>
        <Jumbotron fluid className="mb-0">
          <Row id="title">
            <Col>
              <div></div>
            </Col>
            <Col>
              <Image 
                  src={`${process.env.PUBLIC_URL}/images/logoyellow.png`} 
                  alt="Espresso Joe Logo" 
                  fluid 
                  id="joe"
              />
            </Col>
            <Col id="info">
              {/* <p>email: joe@espressojoe.com | phone: 123.456.7890</p> */}
              <p>All shirts designed by Espresso Joe Tees</p>
            </Col>
            <Col>
              <div></div>
            </Col>
          </Row>
        </Jumbotron>
      </FooterWrapper>
    </>
  )
  
};

export default Footer;