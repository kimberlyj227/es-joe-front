import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import ProductCard from "./Card";
import Checkbox from "./Checkbox";
import Radiobox from "./RadioBox";

import { Row, Col, Button } from "react-bootstrap";
import { getCategories, getFilteredProducts } from "./apiCore";
// import { prices } from "./FixedPrices";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: []
    }
  })

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const init = () => {
    getCategories().then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  }

  const handleFilters = (filters, filterBy) => {
    const newFilters = {...myFilters};
    newFilters.filters[filterBy] = filters;

    // if(filterBy === "price") {
    //    let priceValues = handlePrice(filters);
    //    newFilters.filters[filterBy] = priceValues;
    // }
    loadFilteredResults(myFilters.filters)
    setMyFilters(newFilters);

  }

  // const handlePrice = value => {
  //   const data = prices;
  //   let array = [];

  //   for (let key in data) {
  //     if(data[key]._id === parseInt(value)) {
  //       array = data[key].array
  //     }
  //   }
  //   return array;
  // };

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters)
      .then(data => {
        if(data.error) {
          setError(data.error);
        } else {
          setFilteredResults([...filteredResults, ...data.data]);
          setSize(data.size);
          setSkip(toSkip);
        }
      })
  }

  const loadMoreButton = () => {
    return(
      size > 0 && size >= limit && (
        <Button variant="warning" className = "mb-5"onClick={loadMore}>
          Load More
        </Button>
      )
    )
  }

  

  return (
    <Layout
      title="T-Shirt Gallery"
      description="Find a shirt. Buy a shirt."
      className="container-fluid mt-5"
    >
      
      <Row>
        <Col md={3}>
          <h2>Filter by Categories</h2>
          <ul>
            
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          {/* <h2>Filter by Price</h2> */}
          {/* <div>
            <Radiobox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div> */}
        </Col>
        <Col md={9}>
          <h2 className="mb-4">T-Shirts</h2>
            <Row>
                {filteredResults.map((product, i) => (
                  product._id !=="5f9f0a1e1b46df56dc63300a" && (
                    <Col md={6} key={i}>
                      <ProductCard
                        
                        product={product}
                        showAddToCart={product._id==="5f9f0a1e1b46df56dc63300a" ? true : false}
                        linkToBonfire={product._id==="5f9f0a1e1b46df56dc63300a" ? false : true}
                      />
                    </Col>
                  )
                ))}
            <hr/>
            {loadMoreButton()}
            
          </Row>
        </Col>

      </Row>
      

    </Layout>
  )
}

export default Shop;