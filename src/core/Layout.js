import React from "react";
import { Jumbotron, Row, Col, Image } from "react-bootstrap";
import Nav from "./Nav";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const JumboWrapper = styled.div`
  .jumbotron{
    height: 250px;
    background-image: url(${process.env.PUBLIC_URL}/images/background.png);
    background-size: cover;
    margin-bottom: 0;
    border-radius: 0;
  }

  #title {
    font-family: "Roboto Slab", serif;
    color: rgb(255, 255, 255);
    
    margin-top: 20px;
  }

  #joe {
    max-height: 150px;
  }
`


const Layout = ({ title = "Title", description ="Description", className, children }) => {
  return (
    <>
      <JumboWrapper>
        <Jumbotron >
          <Row>
            <Nav />
          </Row>
          <Row id="title">
            {/* <Col md={3}>
            <Image 
                src={`${process.env.PUBLIC_URL}/images/logoyellow.png`} 
                alt="Espresso Joe Logo" 
                fluid 
                id="joe"/>
            </Col> */}
            <Col >
              <h1>ESPRESSO JOE</h1>
              <h2>{title}</h2>
              <h5>{description}</h5>
            </Col>
          </Row>
        </Jumbotron>
      </JumboWrapper>
        <div className={className}>
          {children}
        </div>
        <Footer />
    </>
  )
}

export default Layout;