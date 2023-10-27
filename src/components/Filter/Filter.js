// Filter.js
import { useState } from 'react';
import { districts } from "../../utils/districts";
import { Form, InputGroup, Button, Row, Col, Container } from 'react-bootstrap' 
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
      initialQuery = `${initialQuery}&bedroom=${bedroomNumber}`
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
			<Container>
				<Row className="justify-content-md-center">
					<Form.Label htmlFor="city">City</Form.Label>
					<Form.Select 
						onChange={handleCityChange}
						value={selectedCity}>
						<option value="Taipei">Taipei</option>
						<option value="New Taipei">New Taipei</option>
					</Form.Select>
				</Row>
				<Row>
					<Form.Label htmlFor="districts">Districts</Form.Label>
					<Form>
						<div className="mb-3">
							{ currentDistricts.map((name, index) => {
								return (
										<Form.Check
											inline
											label={`${name}`}
											name="group1"
											type='checkbox'
											id={`inline-checkbox-${index}`}
											onChange={() => handleDistrictsChange(index)}
										/>
									
								);
							})}
						</div>
					</Form>
				</Row>
				<Row>
					<Col>
						<Form>
							<Form.Label htmlFor="bedroomNumber">No. of Bedrooms</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter number of bedroom"
								value={bedroomNumber}
								onChange={handleBedroomNumberChange}
							/>
						</Form>
					</Col>
					<Col>
						<Form>
							<Form.Label htmlFor="closestMrt">Closest MRT</Form.Label>
							<Form.Control
								placeholder="Type in a MRT Station Name, e.g: Dongmen"
								value={closestMrt}
								onChange={handleClosestMrtChange} />
						</Form>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form>
							<InputGroup className="mb-3">
								<InputGroup.Text>Min and Max Rent</InputGroup.Text>
								<Form.Control
									placeholder="Min Rent"
									id="rentLowerBound"
									value={rentLowerBound}
									onChange={handleRentLowerBoundChange} />
								<Form.Control 
									placeholder="Max Rent"
									id="rentUpperBound"
									value={rentUpperBound}
									onChange={handleRentUpperBoundChange} />
							</InputGroup>
						</Form>
					</Col>
				</Row>
				<Button onClick={handleFilterSubmit}>Search</Button>
			</Container>
    </>
  )
}
export default Filter;


