import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import {  getBraintreeClientToken, processPayment, createOrder } from "./apiCore";
import { emptyCart, totalItems } from "./cartHelpers";
import {  Button, Alert, Form } from "react-bootstrap";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CheckoutWrapper = styled.article`
.btn {
  padding: 15px;
  background-color: #ddad49;
  color: #ffffff;
  border: none;
  font-size: 18px;
}

  .btn:hover {
    background-color: transparent;
    color: #4a494a;
    border: 2px solid #ddad49;
  }

  
  
`

const Checkout =({products, setRun = f => f, run = undefined}) => {

  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: ""
  });

  const { loading, success, clientToken, error, instance, address } = data; 

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    getToken(userId, token);
    console.log(userId)
    console.log(token)
  }, [])


  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(res => {
      if(res.error) {
        setData({...data, error: res.error})
      } else {
        setData({
          ...data,
          clientToken: res.clientToken
        })
      }
    })
  }

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0)
  };

  const showCheckout = () => {
   
    return isAuthenticated() ? (
        <div >
          {showDropIn()}
        </div>
      ) : (
        <Link to="/signin">
          <Button >
            Sign In to Checkout
          </Button>
        </Link>
      )
    
  }

  const buy = () => {
    // send nonce to server
    // nonce = data.instance.requestPaymentMethod
    setData({...data, loading: true})
    let nonce;
    let getNonce = instance
      .requestPaymentMethod()
      .then(res => {
        // console.log(res)
        nonce = res.nonce
        // once you have nonce, send as paymentMethodNonce
        // console.log("send none and total to process ", nonce, getTotal(products))
        const paymentData= {
          paymentMethodNonce: nonce,
          // amount: getTotal(products)
          amount: "20"
        }

        processPayment(userId, token, paymentData)
          .then(response => {
            setData({...data, success: response.success})
            // create order
            const createOrderData = {
              products: products, 
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: address
            }

            createOrder(userId, token, createOrderData);
            // empty cart
            emptyCart(() => {
              setRun(!run)
              console.log("payment success and empty cart")
              setData({...data, loading: false, success: true})
            });
          })
          .catch(err => {
            console.log(err) 
            setData({...data, loading: false})
          })
      })
      .catch(err => {
        // console.log("drop in error", err)
        setData({...data, error: err.message})
      });

  }

  const showError = (error) => {
    return (
      <Alert 
      variant="danger"
      style= {{ display: error ? "" : "none"}}
      >
        {error}
      </Alert>
    )
  }

  const showSuccess = (success) => {
    return (
      <Alert 
      variant="warning"
      style= {{ display: success ? "" : "none"}}
      >
        Thank you! Payment successful.
      </Alert>
    )
  }

  const showLoading = (loading) => {
    return (
      <Alert 
      variant="primary"
      style= {{ display: loading ? "" : "none"}}
      >
        Loading
      </Alert>
    )
  }

  const handleAddress = e => {
    const {name, value} = e.target;
    setData({...data, [name]: value});
  }

  const showDropIn = () => {
    return (
      <div onBlur={() => setData({...data, error: ""})}>
        {data.clientToken !== null  ? (
          <div>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted">Delivery Address</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                value={address}
                name="address"
                placeholder="Type delivery address here..."
                onChange={handleAddress}
              />
            </Form.Group>
            <DropIn options={{
              authorization: clientToken,
              paypal: {
                flow: "vault"
              }

            }} onInstance={i => (data.instance = i)}
            />
            <Button onClick={buy}  className="btn-block">
              Buy Now!
            </Button>
          </div>

        ) : null}
      </div>
    )
  }

  return (
    <CheckoutWrapper>

      <div>
        <h2> Total: ${getTotal()}</h2>
        {/* <h2> Total: $20</h2> */}
        {showLoading(loading)}
        {showSuccess(success)}
        {showError(error)}
        {showCheckout()}

      </div>
    </CheckoutWrapper>
  )
}

export default Checkout;