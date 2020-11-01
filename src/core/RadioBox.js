import React, {useState} from "react";
import { Form } from "react-bootstrap"

const Radiobox = ({prices, handleFilters}) => {
  const [value, setValue] = useState(0)

  const handleChange = (e) => {
    handleFilters(e.target.value);
    setValue(e.target.value);
  }

  return prices.map((price, i) => (
        <React.Fragment key={i}>
          <Form.Check 
            onChange={handleChange}
            value={`${price._id}`}
            name={price}
            type="radio"
            label={price.name}
            className="mr-2 ml-4"
          />
        </React.Fragment>
  
    ))
}

export default Radiobox;