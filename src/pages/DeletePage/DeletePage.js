// DeletePage.js
import { useState } from 'react';
import './DeletePage.css';
import { Form, Modal, Button} from 'react-bootstrap'; 
import backendAPI from "../../api/backendapi";   

function DeletePage({ showModal, onModalClose, onDeleteSubmit, resource }) {
  const currentUserObj = JSON.parse(localStorage.getItem('currentUser'))
  const config = currentUserObj ? {headers: { Authorization: `Bearer ${currentUserObj['auth_token']}` }} : {}
  
  const handleDelete = () => {
    backendAPI.delete(`/properties/${resource['id']}`, config)
    .then((response) => {
      handleApiCallSuccess(response)
    })
    .catch((error) => {
      handleApiCallFailure(error)
    });
  }

  const handleApiCallSuccess = (response) => {
    console.log('GET status', response.status);
    console.log('GET data', response.data)
    onDeleteSubmit(resource['id']);
    onModalClose();
  }

  const handleApiCallFailure = (error) => {
    console.log(error.message);
  }

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Are you sure you want to delete this property? {resource['title']}</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={onModalClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeletePage;