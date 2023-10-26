// Filter.js
import { useState } from 'react';
import { districts } from "../../utils/districts";
import './Filter.css';

function Filter({onSubmitHandler}) {
  const [ selectedCity, setSelectedCity ] = useState('Taipei');
  const [ currentDistricts, setCurrentDistricts ] = useState(districts.find(o => o.city === selectedCity)['districts'])
  const [ checkedDistricts, setCheckedDistricts] = useState(
    new Array(districts.find(o => o.city === selectedCity)['districts'].length).fill(false)
  );
  const [ districtsList, setDistrictsList ] = useState('')
  const [ bedroomNumber, setBedroomNumber ] = useState('')
  const [ rentLowerBound, setRentLowerBound ] = useState('')
  const [ rentUpperBound, setRentUpperBound ] = useState('')
  const [ closestMrt, setClosestMrt ] = useState('')

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value)
    setCurrentDistricts(districts.find(o => o.city === event.target.value)['districts'])
    setCheckedDistricts(new Array(districts.find(o => o.city === event.target.value)['districts'].length).fill(false))
    setDistrictsList('')
  }

  const handleDistrictsChange = (position) => {
    const updatedCheckedDistricts = checkedDistricts.map((item, index) =>
      index === position ? !item : item
    );
    const districtsName = updatedCheckedDistricts.map((item, index) => 
      item ? currentDistricts[index] : null
    )
    setCheckedDistricts(updatedCheckedDistricts);
    setDistrictsList(districtsName.filter(n => n).join(','))
  }

  const handleBedroomNumberChange = (event) => {
    const result = event.target.value.replace(/\D/g, '');
    setBedroomNumber(result)
  }

  const handleRentLowerBoundChange = (event) => {
    const result = event.target.value.replace(/\D/g, '');
    setRentLowerBound(result)
  }

  const handleRentUpperBoundChange = (event) => {
    const result = event.target.value.replace(/\D/g, '');
    setRentUpperBound(result)
  }

  const handleClosestMrtChange = (event) => {
    setClosestMrt(event.target.value)
  }

  const handleFilterSubmit = () => {
    let initialQuery = '?'
    if (selectedCity) {
      initialQuery = `${initialQuery}&city=${selectedCity}`
    }
    if (districtsList) {
      initialQuery = `${initialQuery}&district=${districtsList}`
    }
    if (bedroomNumber) {
      initialQuery = `${initialQuery}&district=${districtsList}`
    }
    if (rentLowerBound) {
      initialQuery = `${initialQuery}&rent_gt=${rentLowerBound}`
    }
    if (rentUpperBound) {
      initialQuery = `${initialQuery}&rent_lt=${rentUpperBound}`
    }
    if (closestMrt) {
      initialQuery = `${initialQuery}&closest_mrt=${closestMrt}`
    }
    onSubmitHandler(initialQuery)
  }

	return (
    <>
      <div>
        <label htmlFor="city"> City: </label>
        <select
          name="city"
          id='city'
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="Taipei">Taipei</option>
          <option value="New Taipei">New Taipei</option>
        </select>
      </div>
      <div>
        <label htmlFor="districts"> Districts: </label>
        <ul className='districts-list'>
          { currentDistricts.map((name, index) => {
            return (
              <li key={index}>
                <div className="districts-list-item">
                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      checked={checkedDistricts[index]}
                      onChange={() => handleDistrictsChange(index)}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <label htmlFor="bedroomNumber"> No. of Bedrooms: </label>
        <input
          type="text"
          placeholder="Enter number of bedroom"
          value={bedroomNumber}
          onChange={handleBedroomNumberChange}
        />
      </div>
      <div className="inputContainer">
        <div>
          <label htmlFor="rentLowerBound">Min Rent</label>
          <input
            type="number"
            id="rentLowerBound"
            value={rentLowerBound}
            onChange={handleRentLowerBoundChange}
          />
        </div>
        <span>-</span>
        <div>
          <label htmlFor="rentUpperBound">Max Rent</label>
          <input
            type="number"
            id="rentUpperBound"
            value={rentUpperBound}
            onChange={handleRentUpperBoundChange}
          />
        </div>
      </div>
      <div>
        <label htmlFor="closestMrt"> Closest MRT: </label>
        <input
          type="text"
          placeholder="Type in a MRT Station Name, e.g: Dongmen"
          value={closestMrt}
          onChange={handleClosestMrtChange}
        />
      </div>
      <button onClick={handleFilterSubmit}>Search</button>
    </>
  )
}
export default Filter;


