import React from "react";
import styled from "styled-components";
import { Neighbourhood, Property } from "../utils/types";
import Map from "./Map";

type PropertyProps = {
	property: Property;
	neighbourhood: Neighbourhood;
};

export default function PropertyScreen({ property, neighbourhood }: PropertyProps) {
	const formatter = new Intl.NumberFormat("en-CA", {
		currency: "CAD",
		style: "currency",
	});

	console.log(property);
	console.log(neighbourhood);
	return (
		<Container>
			<Row>
				<div className="map">
					<Map
						latitude={parseFloat(property.latitude)}
						longitude={parseFloat(property.longitude)}
					/>
				</div>
			</Row>
			<Row>
				<Col>
					<h2>Address</h2>
					<h1>
						{property.house_number} {property.street_name}{" "}
						{property.suite ? `Suite ${property.suite} ` : ""}
					</h1>
				</Col>
				<Col>
					<h2>Assessed Value</h2>
					<h3>{formatter.format(property.assessed_value)}</h3>
				</Col>
			</Row>
			<Row>
				<Col>
					<h2>{neighbourhood.descriptive_name}</h2>
					{neighbourhood.description && <span>{neighbourhood.description}</span>}
				</Col>
			</Row>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
`;

const Row = styled.div`
	/* margin: 15px; */
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;

	.map {
		width: 100%;
		height: 500px;
	}
`;

const Col = styled.div`
	width: 100%;
`;
