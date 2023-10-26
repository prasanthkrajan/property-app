// PropertyCard.js
import './PropertyCard.css';
import { Card, Button } from 'react-bootstrap';  

function PropertyCard({ img, title, rent, fullAddress, closestMrt}) {
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
        <Button variant="primary">Read More</Button>  
      </Card.Body>  
    </Card>  
  )
}

export default PropertyCard;