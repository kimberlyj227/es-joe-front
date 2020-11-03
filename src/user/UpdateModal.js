import React, { useEffect, useContext, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter  } from "reactstrap";
import UserForm from "./UserForm";
import styled from "styled-components";

import UserContext from "./UserContext";

//Styling
const StyleModal = styled(Modal)`

    width: 100vw;

    .modal-header {
        font-family: "Roboto Slab", serif;
        text-align: center;
    }

`

const UpdateModal = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const {modal, toggle } = useContext(UserContext);

    return(
   
        <StyleModal isOpen={modal} toggle={toggle} centered onHide={handleClose} show={show}>
            <ModalHeader toggle={toggle} >Update Shirt Preferences</ModalHeader>
            <ModalBody>
                <UserForm/>
            </ModalBody>
            
        </StyleModal>
    

    )
};

export default UpdateModal;