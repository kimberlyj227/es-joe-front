import React from "react";
import {Jumbotron, Row, Col} from "react-bootstrap";
import Nav from "./Nav";
import styled from "styled-components";

const JumboWrapper = styled.div`
  .jumbotron-fluid{
    height: 250px;
    background-image: url(${process.env.PUBLIC_URL}/images/background.png);
    background-size: cover;
    margin-bottom: 0;
  }

  #title {
    font-family: "Roboto Slab", serif;
    color: rgb(255, 255, 255);
    text-align: center;
    margin-top: 20px;
  }
`


const Header = () => {

  return (
    <>
      <JumboWrapper>
        <Jumbotron fluid>
          <Row>
            <Nav/>
          </Row>
          <Row id="title">
            <Col>
              <h2>ESPRESSO JOE</h2>
              <h4>- cool tag line -</h4>
            </Col>
          </Row>
        </Jumbotron>
      </JumboWrapper>
    </>
  )
  
};

export default Header;