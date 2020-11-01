import React from "react";
import styled from "styled-components";



const CircleWrapper = styled.div`

#container {
  margin: 0%;
}

#circle { 
  position: relative; 
  width: 540px; 
  padding-bottom: 100%; 
  overflow: hidden; 
  
}

#circle text { 
  margin-bottom: 128px;
  font-family: "Roboto Slab", serif; 
  font-size: 20px;
}

#circle svg { 
  position: absolute;
  
   
    width: 100%; 
    height: 300px;

    -webkit-animation-name: rotate;
       -moz-animation-name: rotate;
        -ms-animation-name: rotate;
         -o-animation-name: rotate;
            animation-name: rotate;
    -webkit-animation-duration: 5s;
       -moz-animation-duration: 5s;
        -ms-animation-duration: 5s;
         -o-animation-duration: 5s;
            animation-duration: 5s;
    -webkit-animation-iteration-count: infinite;
       -moz-animation-iteration-count: infinite;
        -ms-animation-iteration-count: infinite;
         -o-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
       -moz-animation-timing-function: linear;
        -ms-animation-timing-function: linear;
         -o-animation-timing-function: linear;
            animation-timing-function: linear;
  
  }
  
  @-webkit-keyframes rotate {
      from { -webkit-transform: rotate(360deg); }
      to { -webkit-transform: rotate(0); }
  }
  @-moz-keyframes rotate {
      from { -moz-transform: rotate(360deg); }
      to { -moz-transform: rotate(0); }
  }
  @-ms-keyframes rotate {
      from { -ms-transform: rotate(360deg); }
      to { -ms-transform: rotate(0); }
  }
  @-o-keyframes rotate {
      from { -o-transform: rotate(360deg); }
      to { -o-transform: rotate(0); }
  }
  @keyframes rotate {
      from { transform: rotate(360deg); }
      to { transform: rotate(0); }
  }

 

`

const CircleText = () => {
  const txt = ("SHIRT OF THE MONTH CLUB! ").split("");
  const degree = 360 / txt.length;
  let origin = 0;

  return (

    <CircleWrapper>
      <div className="rotate" id="container"> 
        <div className="circTxt" id="circle">
          <svg 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 300 300" enableBackground="new 0 0 300 300" xmlSpace="preserve"
            width="200px" 
            height="200px" 
            
          >
            <defs>
              <path id="circlePath" d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "/>
            </defs>
                <circle cx="150" cy="100" r="75" fill="none"/>
            
              <g>
              <use xlinkHref="#circlePath" fill="none"/>
              <text fill="#fff">
                  <textPath xlinkHref="#circlePath">SHIRT OF THE MONTH CLUB!
                  </textPath>
              </text>
              </g>
            
          </svg>
        
          {/* {text.map((char, i) => (
            <p
              style={{height: "200px", transform: `rotate(${origin += degree}deg)`, transformOrigin: `0 "100%"`, position: "absolute"}}
              key = {i + 1}
            > 
              {char} 
              </p>
              ))} */}
        </div>
        
      </div>
    </CircleWrapper>
  )
}

export default CircleText;