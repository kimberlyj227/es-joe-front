import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import ProductCard from "./Card";
import { read, listRelated } from "./apiCore";
import { Row, Col } from "react-bootstrap";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props])

  const loadSingleProduct = (productId) => {
    read(productId).then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setProduct(data);
       
         listRelated(data._id).then(data => {
          if(data.error) {
            setError(data.error)
          } else {
            setRelated(data)
          }
        })
      }
    })
  };

  

  return (
    <Layout
      title={product && product.name}
      description={product && product.description && product.description.substring(0, 100)}
      className="container-fluid"
    >
      
      <Row>
        <Col md={8}>
          <ProductCard 
            product={product}
            showViewProductButton={false}
          />

        </Col>
        <Col md={4}>
          <h4> Related Products</h4>
          {related.map((p,i) => (
            <div className="mb-3" key={i}>
              <ProductCard
                product={p}
              />
            </div>
          ))}
        </Col>
      </Row>
      

    </Layout>
  )
}

export default Product;