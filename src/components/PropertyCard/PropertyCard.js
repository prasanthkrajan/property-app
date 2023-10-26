// PropertyCard.js
import { useState } from 'react';
import './PropertyCard.css';
import { Card, Button } from 'react-bootstrap'; 
import DeletePage from '../../pages/DeletePage/DeletePage'; 
import EditPage from '../../pages/EditPage/EditPage';

function PropertyCard({ resource, showFavButton, showAdminButtons, onCardDelete, onCardEdit}) {
  const [ showDelete, setShowDelete ] = useState(false)
  const [ showEdit, setShowEdit ] = useState(false)
 
  const handleDeleteClose = () => {
    setShowDelete(false)
  }

  const handleEditClose = () => {
    setShowEdit(false)
  }

  return(
    <>
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
            {resource['closest_mrt']}
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
              <Button variant="primary">Favourite</Button> 
            </Card.Text> : null
          }
        </Card.Body>  
      </Card>
    </>  
  )
}

export default PropertyCard;