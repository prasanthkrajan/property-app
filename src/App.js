import { useState, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter/Filter';
import PropertyCard from './components/PropertyCard/PropertyCard';
import backendAPI from "./api/backendapi";
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container , Row, Col} from 'react-bootstrap'  

function App() {
  const [ query, setQuery ] = useState('') 
  const [ data, setData ] = useState([])

  useEffect(() => {
    backendAPI.get(`/properties${query}`)
    .then((response) => {
      handleApiCallSuccess(response)
    })
    .catch((error) => {
      handleApiCallFailure(error)
    });
  }, [query]);

  const handleApiCallSuccess = (response) => {
    console.log('GET status', response.status);
    console.log('GET data', response.data)
    setData(response.data)
  }

  const handleApiCallFailure = (error) => {
    console.log(error.message);
  }

  const handleFilterSubmit = (query) => {
    console.log('query', query)
  }
  return (
    <div className="App">
      <h1>Rental App</h1>
      <Filter onSubmitHandler={handleFilterSubmit}/>
      <Container className='p-4'>  
        <Row>
          <Col md="4">
            <PropertyCard 
              img='https://urhouse.s3.amazonaws.com/images/rentals/567c4bae0aa0cc886831ee6e8aff6646-watermarked.jpg'
              title='Test'
              rent='10000'
              fullAddress='Some Address'
              closestMrt='Dongmen' />
          </Col>
          <Col md="4">
            <PropertyCard 
              img='https://urhouse.s3.amazonaws.com/images/rentals/567c4bae0aa0cc886831ee6e8aff6646-watermarked.jpg'
              title='Test'
              rent='10000'
              fullAddress='Some Address'
              closestMrt='Dongmen' />
          </Col>
          <Col md="4">
            <PropertyCard 
              img='https://urhouse.s3.amazonaws.com/images/rentals/567c4bae0aa0cc886831ee6e8aff6646-watermarked.jpg'
              title='Test'
              rent='10000'
              fullAddress='Some Address'
              closestMrt='Dongmen' />
          </Col>
          <Col md="4">
            <PropertyCard 
              img='https://urhouse.s3.amazonaws.com/images/rentals/567c4bae0aa0cc886831ee6e8aff6646-watermarked.jpg'
              title='Test'
              rent='10000'
              fullAddress='Some Address'
              closestMrt='Dongmen' />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
