import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import ProductCard from "./Card";
import Checkout from "./Checkout";
import { getCart } from "./cartHelpers";
import { read } from "./apiCore";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const Subscription = () => {
  //shirt of the month sub id
  const subscription = "5f9f0a1e1b46df56dc63300a"
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  

  useEffect(() => {
    // setItems(getCart())
    loadSingleProduct(subscription)
  }, []);

  const loadSingleProduct = (productId) => {
    read(productId).then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        setItems([data]);
      }
    })
  };

  
  const showItems = (items) => {
    return (
      <div>
        <h2> Shirt of the Month Club </h2>
        <hr/>
        {items.map((product, i) => (
          
          <ProductCard 
            key={i}
            product={product}
            showAddToCart={true}
            linkToBonfire={false}
            // cartUpdate={true}
            // showRemoveItemBtn={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    )
  };

  const noItems = () => {
    return (
      <h2>
        Your cart is empty
        <br/>
        <Link to="/shop">Continue Shopping</Link>
      </h2>
    )
  }

  return (
    <Layout
    title="Shirt of the Month"
    description="You're one of the lucky ones"
    className="container-fluid mt-5"
    >
      
      <Row>
        <h2>SHIRT OF THE MONTH CLUB COMING SOON!</h2>
        {/* <Col md={6}>
       
            {showItems(items)}
          
        </Col>

        <Col md={6}>
          <h2 className="mb-4">Something about shirt of the month</h2>
          <hr/>
          <Checkout
            products={items}
            run={run}
            setRun={setRun}
          />
        </Col> */}
        
      </Row>
      
    </Layout>
  )
}

export default Subscription;