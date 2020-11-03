import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import ProductCard from "./Card";
import Checkout from "./Checkout";
import { getCart } from "./cartHelpers";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart())
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2> Your cart has {`${items.length}`} items. </h2>
        <hr/>
        {items.map((product, i) => (
          <ProductCard 
            key={i}
            product={product}
            showAddToCart={false}
            cartUpdate={true}
            linkToBonfire={false}
            showRemoveItemBtn={true}
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
        <Link to="/shirts">Continue Shopping</Link>
      </h2>
    )
  }

  return (
    <Layout
      title="Shopping Cart"
      description="Manage Cart Items"
      className="container-fluid"
    >
      
      <Row>
        <Col md={6}>
          {items.length > 0 ? (
            showItems(items)
          ) : (
            noItems()
          )}
        </Col>

        <Col md={6}>
          <h2 className="mb-4">Cart Summary</h2>
          <hr/>
          <Checkout
            products={items}
            run={run}
            setRun={setRun}
          />
        </Col>
        
      </Row>
      
    </Layout>
  )
}

export default Cart;