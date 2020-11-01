import { API } from "../config";

export const isAuthenticated = () => {
  if(typeof window == "undefined") {
    return false
  }
  
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false
  }
}

// create category
export const createCategory = (userId, token, category) => {
  // console.log(name, email, password)
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
  .then(res => {
    return res.json()
  })
  .catch(err => {
    console.log(err)
  })
};

// create product
export const createProduct = (userId, token, product) => {
  // console.log(name, email, password)
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
  .then(res => {
    return res.json()
  })
  .catch(err => {
    console.log(err)
  })
};

// get all categories
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
  .then(res => {
    return res.json()
  })
  .catch(err => console.log(err))
}

// get all orders
export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  .then(res => {
    return res.json()
  })
  .catch(err => console.log(err))
}

// get all status values
export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  .then(res => {
    return res.json()
  })
  .catch(err => console.log(err))
}

// update an order status
export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({status, orderId})
  })
  .then(res => {
    return res.json()
  })
  .catch(err => console.log(err));
};

// get all products
export const getProducts = () => {
  return fetch(`${API}/products?limit=100`, {
    method: "GET"
  })
  .then(res => {
    return res.json()
  })
  .catch(err => console.log(err))
};

// get single product
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET"
  })
  .then(res => {
    return res.json()
  })
  .catch(err => console.log(err))
};

// update single product
export const updateProduct = (productId, token, userId, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
  .then(res => {
    return res.json()
  })
  .catch(err => console.log(err));
};

// delete single product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    return res.json()
  })
  .catch(err => console.log(err));
};




