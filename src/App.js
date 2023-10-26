
import './App.css';
import Filter from './components/Filter/Filter';

function App() {
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
