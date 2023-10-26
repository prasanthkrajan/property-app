// PropertyCard.js
import { useState } from 'react';
import './PropertyCard.css';
import { Card, Button } from 'react-bootstrap';  

function PropertyCard({ img, title, rent, fullAddress, closestMrt, showFavButton, showAdminButtons}) {
  return(
    <Card>  
      <Card.Img variant="top" src={img} />  
      <Card.Body>  
        <Card.Title>{title}</Card.Title>  
        <Card.Text>  
          {rent}/month
        </Card.Text>
        <Card.Text>  
          {fullAddress}
        </Card.Text> 
        <Card.Text>  
          {closestMrt}
        </Card.Text>   
        {
          showAdminButtons ? 
          <Card.Text>
            <Button variant="primary">Edit</Button> 
            <Button variant="primary">Delete</Button>
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
  )
}

export default PropertyCard;