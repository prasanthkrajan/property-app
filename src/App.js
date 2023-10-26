import { useState, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter/Filter';
import PropertyCard from './components/PropertyCard/PropertyCard';
import LoginPage from './pages/LoginPage/LoginPage';
import backendAPI from "./api/backendapi";
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container , Row, Col, Nav, Navbar} from 'react-bootstrap' 

function App() {
  const currentUserObj = JSON.parse(localStorage.getItem('currentUser'))
  const config = currentUserObj ? {headers: { Authorization: `Bearer ${currentUserObj['auth_token']}` }} : {}
  
  const [ query, setQuery ] = useState('') 
  const [ data, setData ] = useState([])
  const [ showLogin, setShowLogin ] = useState(false)
  const [ userLoggedIn, setUserLoggedIn ] = useState(currentUserObj ? true : false)

  useEffect(() => {
    retrieveAll();
  }, [query]);

  const retrieveAll = () => {
    backendAPI.get(`/properties${query}`)
    .then((response) => {
      setData(response.data)
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  const retrieveFavourites = () => {
    backendAPI.get(`/favourite_properties`, config)
    .then((response) => {
      //handleApiCallSuccess(response)
      console.log('GET status', response.status);
      console.log('GET data', response.data)
      const propertyIds = response.data.map(x => x['property_id'])
      const dataClone = data.filter(x => {
        return propertyIds.includes(x['id'])
      })
      setData(dataClone)
    })
    .catch((error) => {
      //handleApiCallFailure(error)
      console.log(error.message);
    });
  }

  const handleFilterSubmit = (query) => {
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
    setShowLogin(false)
    setUserLoggedIn(true)
  }

  const handleCardDelete = (cardId) => {
    const dataClone = data.filter(x => {
      return x['id'] !== cardId;
    })
    setData(dataClone)
  }

  const handleCardEdit = (card) => {
    const dataClone = data.map(x => {
      return x['id'] === card['id'] ? card : x
    })
    setData(dataClone)
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
      {
        userLoggedIn ? 
        <Nav variant="pills" defaultActiveKey="all">
          <Nav.Item>
            <Nav.Link eventKey="all" onClick={() => retrieveAll()}>All</Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link eventKey="favourites" onClick={() => retrieveFavourites()}>Favourites</Nav.Link>
          </Nav.Item>
        </Nav> : null
      }
      <Container className='p-4'>  
        <Row xs="3">
          {
            data.map((item,key) =>
            <Col>
              <PropertyCard 
                resource={item}
                showFavButton={userLoggedIn}
                showAdminButtons={currentUserObj ? currentUserObj['admin'] : false}
                onCardDelete={handleCardDelete}
                onCardEdit={handleCardEdit}/>
            </Col>
            )
          }
        </Row>
      </Container>
    </div>
  );
}

export default App;
