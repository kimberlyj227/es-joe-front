import React, {useContext, useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import UserContext from "./UserContext";

const FormWrapper = styled.div` 

  width: 50%;
  margin: 20px auto;
  font-family: "Roboto", sans-serif;
  
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
    
  }

`


const UserForm = () => {
  const {handleInputChange, handleFormSubmit, preferences} = useContext(UserContext);

  return (
    <FormWrapper>

      <Form>
        
        <Form.Group controlId="prefForm.Size">
          <Form.Label>Shirt Size</Form.Label>
          <Form.Control 
            as="select" 
            name="size" 
            onChange={handleInputChange}
            defaultValue={preferences ? preferences.size : "Choose Shirt Size"}
            id="size"
          >
              <option>Choose Shirt Size</option>
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
              <option>2XL</option>
              <option>3XL</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="prefForm.Color1">
          <Form.Label>Shirt Color 1</Form.Label>
          <Form.Control 
            as="select" 
            name="color1" 
            onChange={handleInputChange}
            defaultValue={preferences ? preferences.color1 : "Choose Shirt Color "}
            id="color1"
          >
              <option>Choose Shirt Color</option>
              <option>Navy</option>
              <option>Maroon</option>
              <option>Black</option>
              <option>Grey</option>
              <option>Yellow</option>
              <option>White</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="prefForm.Color2">
          <Form.Label>Shirt Color 2</Form.Label>
          <Form.Control 
            as="select" 
            name="color2" 
            onChange={handleInputChange}
            defaultValue={preferences ? preferences.color2 : "Choose Shirt Color "}
          >
              <option>Choose Shirt Color</option>
              <option>Navy</option>
              <option>Maroon</option>
              <option>Black</option>
              <option>Grey</option>
              <option>Yellow</option>
              <option>White</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="prefForm.Color3">
          <Form.Label>Shirt Color 3</Form.Label>
          <Form.Control 
            as="select" 
            name="color3" 
            onChange={handleInputChange}
            defaultValue={preferences ? preferences.color3 : "Choose Shirt Color "}
          >
              <option>Choose Shirt Color</option>
              <option>Navy</option>
              <option>Maroon</option>
              <option>Black</option>
              <option>Grey</option>
              <option>Yellow</option>
              <option>White</option>
          </Form.Control>
        </Form.Group>

        <Button 
          type="submit" 
          onClick={handleFormSubmit} 
          className="button"
          variant="light"
        >
          Save Preferences
        </Button>
      </Form>

    </FormWrapper>
  )

}

export default UserForm;