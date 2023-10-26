import { useState, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter/Filter';
import backendAPI from "./api/backendapi";

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

    </div>
  );
}

export default App;
