import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import ShowImage from "./ShowImage";
import moment from "moment";
import styled from "styled-components";

const CardWrapper = styled.article`
  .shirt-card {
    padding: 10px;
    line-height: 2rem;
    font-family: "Roboto Slab", serif;
  }
  
  .shirtImg {
    height: 200px !important;
  }

  #info {
    margin-top: 5%;
  }

  h5 {
    font-size: 30px;
  }

  p {
    font-size: 18px;
  }

  .btn {
    background-color: transparent;
    border: 2px solid #ddad49;
    color: #4a494a;
    padding: 15px;
    font-size: 18px;
    margin-left: 15px;
    width: 175px;
  }

  .btn:hover {
    background-color: #ddad49;
    color: #ffffff;
    border: none;
  }
  
`

const ProductCard = ({ 
  product, 
  showViewProductButton = true, 
  showAddToCart = true, 
  linkToBonfire = true, 
  cartUpdate=false, 
  showRemoveItemBtn= false,
  setRun = f => f,
  run = undefined
}) => {

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
 

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
      
          <Link to={`/product/${product._id}`}>
            <Button variant="outline-dark" className="m-2">
                  View Product
            </Button>
          </Link>
        
      )
    )
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true)
    });
  }

  const shouldRedirect = (redirect) => {
   if(redirect) {
     return <Redirect to="/cart" />
   }
  }

  const directToBonfire = (linkToBonfire, link) => {
    return (
      linkToBonfire && (
        
          <Button  
            href={link} 
            target="_blank"
            variant="outline-warning" 
            className="mt-2 mb-2 button"

          >
                  Buy This Shirt!
          </Button>
        
      )
    )
  }

  const addToCartButton = () => {
    return (
      showAddToCart && (
        <Button onClick={addToCart} variant="outline-warning" className="mt-2 mb-2">
                Add to Cart
        </Button>

      )
    )
  }

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-secondary text-white ">In Stock</span>
      ) : (
      <span className="badge badge-danger badge-pill">Out of Stock</span>
      );
  }

  const handleChange = productId => e => {
    setRun(!run);
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if(e.target.value >= 1) {
      updateItem(productId, e.target.value);
    }
  }

  const showCartUpdateOptions = cartUpdate => {
    return cartUpdate && (
      <div> 
        <div className = "input-group mb3">
          <div className="input-group-prepend">
            <span className ="input-group-text">
              Adjust quantity
            </span>
          </div>
          <input 
            type="number" 
            className="form-control" 
            value={count} 
            onChange={handleChange(product._id)}
          />
        </div>
      </div>
    )
  }

  
  const removeItemButton = (showRemoveItemBtn) => {
    return (
      showRemoveItemBtn && (
        <Button onClick={() => {removeItem(product._id); setRun(!run)}} variant="outline-danger" className="mt-2 mb-2">
                Remove from Cart
        </Button>

      )
    )
  }

  return (
    
      // <Card >
      //   <Card.Header className="name">
      //     <h4>{product.name}</h4>
      //   </Card.Header>
      //   <Card.Body>
      //     {shouldRedirect(redirect)}
      //     <ShowImage 
      //       item={product}
      //       url="product"
      //     />
      //     <p className="lead mt-2">{product.description}</p>
      //     <p className=" mt-2"><strong>Price: </strong>${product.price}</p>
      //     <p className=" mt-2"><strong>Category: </strong>{product.category && product.category.name}</p>
      //     <p className=" mt-2"><strong>Added: </strong>{moment(product.createdAt).fromNow()}</p>
          
      //       {showStock(product.quantity)}
          
      //   </Card.Body>
      //   <Card.Footer>
      //       {showViewButton(showViewProductButton)}
      //       {addToCartButton(showAddToCart, product.link)}
      //       {removeItemButton(showRemoveItemBtn)}
      //       {showCartUpdateOptions(cartUpdate)}
      //   </Card.Footer>
      // </Card>
      <CardWrapper>
        <article className="shirt-card">
          <Row>
            <Col>
            {shouldRedirect(redirect)}
              <ShowImage 
                item={product}
                url="product"
              />
            </Col>

            <Col id="info">
            <h5>{product.name}</h5>
            <p className=" mt-2">{product.description}</p>
            <p className=" mt-2"><strong>Price: </strong>${product.price}</p>
            <p className=" mt-2"><strong>Category: </strong>{product.category && product.category.name}</p>
            <p className=" mt-2"><strong>Added: </strong>{moment(product.createdAt).fromNow()}</p>
            {showStock(product.quantity)}
            </Col>
          </Row>
          
          <Row >
         
            {showViewButton(showViewProductButton)}
            {addToCartButton(showAddToCart)}
            {directToBonfire(linkToBonfire, product.link)}
            {removeItemButton(showRemoveItemBtn)}
            {showCartUpdateOptions(cartUpdate)}
           
          </Row>
          <hr/>
        </article>
      </CardWrapper>
    
  )
}

export default ProductCard;