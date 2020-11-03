import React, {useState} from "react";
import { Link, withRouter } from "react-router-dom";
import { FaTshirt, FaHome, FaSignInAlt, FaSignOutAlt, FaShirtsinbulk, FaDog, FaShoppingCart } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
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
  text-align: right;
  z-index: 1;
 
  a {
    color: ${yellow} 
  }

  a:hover {
    text-decoration: none;
    color: "#fff";
  }

  @media only screen and (max-width: 600px) {
    padding: 0;
    
  }
`

const isActive = (history, path) => {
  if(history.location.pathname === path) {
    return {color: "#fff"}
  } else {
    return {color: yellow}
  }
}


const NavBar = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);
 
  const toggle = () => setIsOpen(!isOpen);

 

  return (
    <>
      <NavWrapper  >
        <nav className="navbar navbar-expand-lg navbar-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

        
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
            
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
                  {"  "} Shirts
                    
                  </Link>
              </li>

              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  style={isActive(history, "/subscription")} 
                  to="/subscription">
                    <FaShirtsinbulk/>
                    {"  "}Shirt of the Month
                    
                  </Link>
              </li>

              

              {isAuthenticated() && isAuthenticated().user.role === 0 ? (
                <li className="nav-item">
                  <Link 
                    className="nav-link" 
                    style={isActive(history, "/user/dashboard")} 
                    to="/user/dashboard">
                      <AiFillDashboard/> {"  "}
                      Dashboard
                    </Link>
                </li>

              ) : (
                <li className="nav-item">
                  <Link 
                    className="nav-link" 
                    style={isActive(history, "/admin/dashboard")} 
                    to="/admin/dashboard">
                      <AiFillDashboard/> {"  "}
                         Dashboard
                    </Link>
                </li>
              )}

              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  style={isActive(history, "/cart")} 
                  to="/cart">
                    <FaShoppingCart /> {"  "}
                    Cart {" "} 
                    <sup>
                      <small className="cart-badge">
                        {totalItems()}
                      </small>
                    </sup>
                  </Link>
              </li>

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
                      <FaDog/> {"  "}
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
                      <FaSignOutAlt/>
                  {"  "}Sign Out
                    </span>
                </li>
              )}

          
            </ul>
          </div>
        </nav>
      </NavWrapper>
      
        
    </>
  )
};

export default withRouter(NavBar);