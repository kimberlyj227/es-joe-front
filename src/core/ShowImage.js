import React from "react";
import { API } from "../config";
import { Image } from "react-bootstrap"


const ShowImage= ({ item, url }) => {
  return (
    <div className="product-img">
      <Image
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className="mb-3"
        style={{maxHeight: "100%", maxWidth: "100%"}}
      />
    </div>

  )
}

export default ShowImage;