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
  const [ sizePing, setSizePing ] = useState(resource['floor_size_in_ping'])
  const [ sizeSqft, setSizeSqft ] = useState(resource['floor_size_in_sqft'])
  
  const handleEdit = () => {
    backendAPI.put(`/properties/${resource['id']}`, {
      property: {
        ...resource,
        title: title,
        bedroom: bedroom,
        bathroom: bathroom,
        rent: rent,
        floor_size_in_ping: sizePing,
        floor_size_in_sqft: sizeSqft
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