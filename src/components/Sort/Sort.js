// Sort.js
import { useState } from 'react';
import { districts } from "../../utils/districts";
import { Form, InputGroup, Button, Row, Col, Container } from 'react-bootstrap' 

function Sort({onSubmitHandler}) {
  return (
		<Container>
			<Row className="justify-content-md-center">
				<Form.Select onChange={(e) => onSubmitHandler(e.target.value)}>
					<option value="&sort_by=rent&sort_order=asc">Rent: Lowest to Highest</option>
					<option value="&sort_by=rent&sort_order=desc">Rent: Highest to Lowest</option>
					<option value="&sort_by=floor_size_in_ping&sort_order=asc">Size in Ping: Smallest to Biggest</option>
					<option value="&sort_by=floor_size_in_ping&sort_order=desc">Size in Ping: Biggest to Smallest</option>
				</Form.Select>
			</Row>
		</Container>
  );
}
export default Sort;