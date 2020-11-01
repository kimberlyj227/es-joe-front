import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import ShowImage from "./ShowImage";
import moment from "moment";

const ProductCard = ({ 
  product, 
  showViewProductButton = true, 
  showAddToCart = true, 
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

  const addToCartButton = (showAddToCart, link) => {
    return (
      showAddToCart && (
        
          <Button  
            href={link} 
            target="_blank"
            variant="outline-warning" 
            className="mt-2 mb-2"

          >
                  Buy Now!
          </Button>
        
      )
    )
  }

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-warning text-white badge-pill">In Stock</span>
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
    
      <Card >
        <Card.Header className="name">
          <h4>{product.name}</h4>
        </Card.Header>
        <Card.Body>
          {shouldRedirect(redirect)}
          <ShowImage 
            item={product}
            url="product"
          />
          <p className="lead mt-2">{product.description}</p>
          <p className=" mt-2"><strong>Price: </strong>${product.price}</p>
          <p className=" mt-2"><strong>Category: </strong>{product.category && product.category.name}</p>
          <p className=" mt-2"><strong>Added: </strong>{moment(product.createdAt).fromNow()}</p>
          
            {showStock(product.quantity)}
          
        </Card.Body>
        <Card.Footer>
            {showViewButton(showViewProductButton)}
            {addToCartButton(showAddToCart, product.link)}
            {removeItemButton(showRemoveItemBtn)}
            {showCartUpdateOptions(cartUpdate)}
        </Card.Footer>
      </Card>
    
  )
}

export default ProductCard;