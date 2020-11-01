import React, {useState} from "react";
import { Form } from "react-bootstrap"

const Checkbox = ({categories, handleFilters}) => {
  const [checked, setChecked] = useState([])

  const handleToggle = (category) => () => {
    // return first index or -1
    const currentCategoryId = checked.indexOf(category) 
    const newCheckedCategoryId = [...checked]
    // if currently checked was already in checked state, then push - else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(category)
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }
    
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  }

  return categories.map((category, i) => (
        <li key={i} className="list-unstyled">
          <Form.Check 
            onChange={handleToggle(category._id)}

            type="checkbox"
            label={category.name}
            value={checked.indexOf(category._id === -1)}
            id={category._id}
          />
        </li>
  
    ))
}

export default Checkbox;