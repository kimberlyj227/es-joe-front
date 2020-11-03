import React from "react";
import {Jumbotron, Image, Row, Col} from "react-bootstrap";
import Nav from "./Nav";
import styled from "styled-components";
import CornerIcon from "./HomepageCorner";
import CircleText from "./CircleText";


const JumboWrapper = styled.div`
  .jumbotron-fluid{
    height: 100vh;
    background-image: url(${process.env.PUBLIC_URL}/images/background.png);
    background-size: cover;
    margin-bottom: 0;
  }

  #logo {
    display: flex;
    align-content: center;
    justify-content: center;
    
  }

  #headings {
    margin-top: 10%;
  }

  #joe{
    max-width: 70%;
    height: auto;
  }

  h2, h3, h4{
    font-family: "Roboto Slab", serif;
    color: rgb(255, 255, 255);
    text-align: center;
  }

  h2{
    font-size: 5rem;
    font-weight: bold;
  }

  h3 {
    font-size: 3.5rem;
  }

  h4 {
    font-size: 2.5rem;
  }

  .nav {
    margin-bottom: 30px;
  }

  @media only screen and (max-width: 600px) {
    
    #logo {
      display: flex
      margin-top: 25%;
      align-content: center;
      justify-content: center;
      
      
    }

    h2 {
      font-size: 3rem;
      font-weight: bold;
    }

    h3 {
      font-size: 2rem;
    }
  
  }
`

const Jumbo = () => {
  return (
    <>
      <JumboWrapper>
        <Jumbotron fluid>
          <Row className="nav">
            <Nav/>
          </Row>
          <Row>
            <Col sm={12} md={6} id="logo">
              <Image 
                src={`${process.env.PUBLIC_URL}/images/logoyellow.png`} 
                alt="Espresso Joe Logo" 
                fluid 
                id="joe"/>
            </Col>
            <Col sm={12} md={6} id="headings">
              <h2>ESPRESSO JOE</h2>
              <h3>cool tag line</h3>
            </Col>
          </Row>
          <Row>
            <CircleText/>
            <CornerIcon/>
          </Row>

        </Jumbotron>
      </JumboWrapper>
      
    </>
  )
}

export default Jumbo;