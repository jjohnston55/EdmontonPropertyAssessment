import React from "react";
import styled from "styled-components";
import { Neighbourhood, Property } from "../utils/types";
import Card from "./Card";
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
				<Card description={neighbourhood.descriptive_name} title="Neighbourhood" />
				<Card
					description={formatter.format(property.assessed_value)}
					title="Assessed Value"
				/>
			</Row>
			<Row>
				{neighbourhood.description ? (
					<Description>{neighbourhood.description}</Description>
				) : (
					<Description>No description available for this neighbourhood</Description>
				)}
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
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;

	.map {
		width: 100%;
		height: 450px;

		@media screen and (max-width: 768px) {
			height: 200px;
		}
	}
`;

const Description = styled.p`
	font-size: 1.4rem;
	text-align: justify;
	margin: 0.5rem 1.5rem;
	font-weight: 300;

	@media screen and (max-width: 1024px) {
		font-size: 1.2rem;
	}
`;
