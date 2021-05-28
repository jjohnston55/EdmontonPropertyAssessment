import React from "react";
import styled from "styled-components";
import { Neighbourhood, Property } from "../utils/types";
import Card from "./Card";
import Map from "./Map";

type PropertyProps = {
	/** the property object being displayed */
	property: Property;
	/** the neighbourhood object of the corresponding property being displayed */
	neighbourhood: Neighbourhood;
	/** the average property value for the neighbourhood */
	avg: number;
};

export default function PropertyScreen({ property, neighbourhood, avg }: PropertyProps) {
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
			<CardRow>
				<Card description={neighbourhood.descriptive_name} title="Neighbourhood" />
				<Card
					description={formatter.format(property.assessed_value)}
					title="Assessed Value"
				/>
				<Card description={formatter.format(avg)} title="Neighbourhood Average" />
			</CardRow>
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

const CardRow = styled(Row)`
	flex-wrap: wrap;
	padding: 0.5rem 0;
`;

const Description = styled.p`
	font-size: 1.4rem;
	text-align: justify;
	margin: 0 1.5rem;
	font-weight: 300;

	@media screen and (max-width: 1024px) {
		font-size: 1.2rem;
	}
`;
