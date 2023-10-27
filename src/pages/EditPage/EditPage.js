// EditPage.js
import { useState } from 'react';
import { Form, Modal, Button} from 'react-bootstrap'; 
import backendAPI from "../../api/backendapi";   

function EditPage({ 
    showModal, 
    onModalClose, 
    onEditSubmit, 
    resource
}) {
  const currentUserObj = JSON.parse(localStorage.getItem('currentUser'))
  const config = currentUserObj ? {headers: { Authorization: `Bearer ${currentUserObj['auth_token']}` }} : {}

  const [ title, setTitle ] = useState(resource['title'])
  const [ bedroom, setBedroom ] = useState(resource['bedroom'])
  const [ bathroom, setBathroom ] = useState(resource['bathroom'])
  const [ rent, setRent ] = useState(resource['rent'])
  
  const handleEdit = () => {
    backendAPI.put(`/properties/${resource['id']}`, {
      property: {
        ...resource,
        title: title,
        bedroom: bedroom,
        bathroom: bathroom,
        rent: rent
      }
    }, config)
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
    onEditSubmit(response.data);
    onModalClose();
  }

  const handleApiCallFailure = (error) => {
    console.log(error.message);
  }

  const handleBedroomChange = (event) => {
    const result = event.target.value.replace(/\D/g, '');
    setBedroom(result)
  }

  const handleBathroomChange = (event) => {
    const result = event.target.value.replace(/\D/g, '');
    setBathroom(result)
  }

  const handleRentChange = (event) => {
    const result = event.target.value.replace(/\D/g, '');
    setRent(result)
  }

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
    <Modal show={showModal}>
      <Modal.Header>
        <Modal.Title>Edit Property</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Edit Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Bedroom</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Edit Bedroom" 
              value={bedroom} 
              onChange={handleBedroomChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Bathroom</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Edit Bathroom" 
              value={bathroom} 
              onChange={handleBathroomChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Rent</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Edit Rent" 
              value={rent} 
              onChange={handleRentChange}/>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onModalClose}>Close</Button>
        <Button variant="primary" onClick={handleEdit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  </div>
  );
}

export default EditPage;