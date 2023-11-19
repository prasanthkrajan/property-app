// PropertyCard.js
import { useState } from 'react';
import { Card, Button } from 'react-bootstrap'; 
import DeletePage from '../../pages/DeletePage/DeletePage'; 
import EditPage from '../../pages/EditPage/EditPage';
import backendAPI from "../../api/backendapi"; 
import React from 'react';

function PropertyCard({ resource, showFavButton, showAdminButtons, onCardDelete, onCardEdit}) {
  const currentUserObj = JSON.parse(localStorage.getItem('currentUser'))
  const config = currentUserObj ? {headers: { Authorization: `Bearer ${currentUserObj['auth_token']}` }} : {}
  const [ showDelete, setShowDelete ] = useState(false)
  const [ showEdit, setShowEdit ] = useState(false)
 
  const handleDeleteClose = () => {
    setShowDelete(false)
  }

  const handleEditClose = () => {
    setShowEdit(false)
  }

  const handleFavSubmit = () => {
    backendAPI.post('/favourite_properties', {
      user_id: currentUserObj['id'],
      property_id: resource['id']
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
  }

  const handleApiCallFailure = (error) => {
    console.log(error.message);
  }

  return(
    <>
      <Card>  
        <Card.Img variant="top" src={resource['image_url']} />  
        <Card.Body>  
          <Card.Title>{resource['title']}</Card.Title>  
          <Card.Text>  
            {resource['rent']}/month
          </Card.Text>
          <Card.Text>  
            {resource['full_address']}
          </Card.Text> 
          <Card.Text>  
            Closest MRT: {resource['closest_mrt']}
          </Card.Text> 
          <Card.Text>  
            Floor Size (Ping): {resource['floor_size_in_ping']}
          </Card.Text> 
          <Card.Text>  
            Bedroom: {resource['bedroom']}, Bath: {resource['bathroom']}
          </Card.Text>   
          {
            showAdminButtons ? 
            <Card.Text>
              <Button variant="primary" onClick={() => setShowEdit(true)}>Edit</Button>
                  <Button variant="primary" onClick={() => setShowDelete(true)}>Delete</Button>
            </Card.Text> : null
          }
          {
            showFavButton ? 
            <Card.Text>
              <Button variant="primary" onClick={handleFavSubmit}>Favourite</Button> 
            </Card.Text> : null
          }
        </Card.Body>  
      </Card>
      <DeletePage 
        showModal={showDelete} 
        resource={resource}
        onModalClose={handleDeleteClose}
        onDeleteSubmit={onCardDelete}
      />
      <EditPage 
        showModal={showEdit} 
        resource={resource}
        onModalClose={handleEditClose}
        onEditSubmit={onCardEdit}
      />
    </>  
  )
}

export default PropertyCard;