import React from "react";
import styled from "styled-components";
import { Property } from "../utils/types";
import Map from "./Map";

type PropertyProps = {
	property: Property;
};

export default function PropertyScreen({ property }: PropertyProps) {
	const formatter = new Intl.NumberFormat("en-CA", {
		currency: "CAD",
		style: "currency",
	});

	console.log(property);
	return (
		<Container>
			<Col>
				<h2>Location</h2>
				<Map
					latitude={parseFloat(property.latitude)}
					longitude={parseFloat(property.longitude)}
				/>
			</Col>
			<Col>
				<div>
					<h2>Address</h2>
					<h1>
						{property.house_number} {property.street_name}{" "}
						{property.suite ? `Suite ${property.suite} ` : ""}
					</h1>
				</div>
				<div>
					<h2>Neighbourhood</h2>
					<span>{property.neighbourhood}</span>
				</div>
				<div>
					<h2>Assessed Value</h2>
					<span>{formatter.format(property.assessed_value)}</span>
				</div>
			</Col>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: row;
	margin: 50px;
	/* align-items: center; */
	justify-content: center;

	@media only screen and (max-width: 400px) {
		flex-direction: column;
	}
`;

const Col = styled.div`
	margin: 15px;
	/* height: 100%; */
	/* display: flex; */
	/* flex-direction: column;
	justify-content: start; */
`;
