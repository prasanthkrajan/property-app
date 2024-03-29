// LoginPage.js
import { useState } from 'react';
import './LoginPage.css';
import { Form, Modal, Button} from 'react-bootstrap'; 
import backendAPI from "../../api/backendapi";   

function LoginPage({ showModal, onModalClose, onLoginSubmit }) {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleLogin = () => {
    backendAPI.post('/auth/login', {
      email: email,
      password: password
    })
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
    localStorage.setItem("currentUser", JSON.stringify(response.data))
    onLoginSubmit(true)
  }

  const handleApiCallFailure = (error) => {
    console.log(error.message);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>New User? Log In Now</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="name@example.com" 
                value={email} 
                onChange={handleEmailChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter password here" 
                value={password}
                onChange={handlePasswordChange}
                />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onModalClose}>Close</Button>
          <Button variant="primary" onClick={handleLogin}>Log In</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginPage;