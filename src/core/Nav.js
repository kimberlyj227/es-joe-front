import React, {useState} from "react";
import { Link, withRouter } from "react-router-dom";
import { FaTshirt, FaHome, FaSignInAlt } from "react-icons/fa";
import { signOut, isAuthenticated } from "../auth";
import { totalItems } from "./cartHelpers";

import styled from "styled-components";

const yellow = "#ddad49"
const NavWrapper = styled.div`
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
  margin-bottom: 30px;
  padding: 30px;
  font-size: 14px;
  font-family: "Roboto Slab";
  text-transform: uppercase;
  line-height: 1;
  text-align: center;
 
  a {
    color: ${yellow} !important;
  }

  a:hover {
    text-decoration: none;
    color: "#ffffff";
  }
`

const isActive = (history, path) => {
  if(history.location.pathname === path) {
    return {color: yellow}
  } else {
    return {color: "#fff"}
  }
}


const NavBar = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);
 
  const toggle = () => setIsOpen(!isOpen);

 

  return (
    <>
      <NavWrapper>
          <div>
          <ul className="nav nav-tabs">
            
              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  style={isActive(history, "/")} 
                  to="/">
                    <FaHome />
                      Home
                   
                  </Link>
              </li>

              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  style={isActive(history, "/shirts")} 
                  to="/shirts">
                    <FaTshirt />
                      Shirts
                    
                  </Link>
              </li>

              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  style={isActive(history, "/cart")} 
                  to="/cart">
                    Cart {" "} 
                    <sup>
                      <small className="cart-badge">
                        {totalItems()}
                      </small>
                    </sup>
                  </Link>
              </li>

              {isAuthenticated() && isAuthenticated().user.role === 0 ? (
                <li className="nav-item">
                  <Link 
                    className="nav-link" 
                    style={isActive(history, "/user/dashboard")} 
                    to="/user/dashboard">
                      Dashboard
                    </Link>
                </li>

              ) : (
                <li className="nav-item">
                  <Link 
                    className="nav-link" 
                    style={isActive(history, "/admin/dashboard")} 
                    to="/admin/dashboard">
                      Dashboard
                    </Link>
                </li>
              )}

              {!isAuthenticated() ? (
                <>
                <li className="nav-item">
                  <Link 
                    className="nav-link" 
                    style={isActive(history, "/signin")} to="/signin">
                      <FaSignInAlt />{" "}
                        {" "}Sign In
                     
                    </Link>
                </li>

                <li className="nav-item">
                  <Link 
                    className="nav-link" 
                    style={isActive(history, "/signup")} to="/signup">
                      Sign Up
                    </Link>
                </li>
                </>
              ) : (
                <li className="nav-item">
                  <span 
                    className="nav-link" 
                    style={{cursor: "pointer", color:"#fff"}} 
                    onClick={() => signOut(() => {
                      history.push("/");
                    })}>
                      Sign Out
                    </span>
                </li>
              )}

          
          </ul>
        </div>
      </NavWrapper>
      
        
    </>
  )
};

export default withRouter(NavBar);