import { useState, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter/Filter';
import PropertyCard from './components/PropertyCard/PropertyCard';
import LoginPage from './pages/LoginPage/LoginPage';
import backendAPI from "./api/backendapi";
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container , Row, Col, Nav, Navbar} from 'react-bootstrap' 

function App() {
  const [ query, setQuery ] = useState('') 
  const [ data, setData ] = useState([])
  const [ showLogin, setShowLogin ] = useState(false)
  const [ userLoggedIn, setUserLoggedIn ] = useState(localStorage.getItem('currentUser') ? true : false)

  useEffect(() => {
    console.log('currentUser', localStorage.getItem('currentUser'))
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
    setQuery(query)
  }

  const handleLoginClick = () => {
    setShowLogin(true)
  }

  const handleLogoutClick = () => {
    setUserLoggedIn(false)
    localStorage.removeItem('currentUser')
  }

  const handleLoginClose = () => {
    setShowLogin(false)
  }

  const handleLoginSubmit = () => {
  }

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Rental App</Navbar.Brand>
          <Nav className="me-auto">
            {
              userLoggedIn ? <Nav.Link href="#" onClick={handleLogoutClick}>Log Out</Nav.Link> : <Nav.Link href="#" onClick={handleLoginClick}>Log In</Nav.Link>
            }
          </Nav>
        </Container>
      </Navbar>
      <LoginPage showModal={showLogin} onModalClose={handleLoginClose} onLoginSubmit={handleLoginSubmit}/>
      <Filter onSubmitHandler={handleFilterSubmit}/>
      <Container className='p-4'>  
        <Row xs="3">
          {
            data.map((item,key) =>
            <Col>
              <PropertyCard 
                img={item['image_url']}
                title={item['title']}
                rent={item['rent']}
                fullAddress={item['full_address']}
                closestMrt={item['closest_mrt']} />
            </Col>
            )
          }
        </Row>
      </Container>
    </div>
  );
}

export default App;
