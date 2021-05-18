import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import PropertyScreen from "./components/PropertyScreen";
import { Neighbourhood, Property } from "./utils/types";
import logoSrc from "./resources/EDM.png";

export default function App() {
	const [neighbourhoodText, setNeighbourhoodText] = useState("");
	const [property, setProperty] = useState<Property>();
	const [properties, setProperties] = useState<Property[]>([]);
	const [neighbourhoods, setNeighbourhoods] = useState<Neighbourhood[]>([]);
	const [selectedNeighbourhood, setSelectedNeighbourhood] = useState<Neighbourhood>();
	const [showProperty, setShowProperty] = useState(false);

	useEffect(() => {
		// https://data.edmonton.ca/City-Administration/City-of-Edmonton-Neighbourhoods/65fr-66s6
		// https://data.edmonton.ca/resource/65fr-66s6.json = list of neighbourhoods
		fetch("https://data.edmonton.ca/resource/65fr-66s6.json")
			.then((resp) => resp.json())
			.then((data) => setNeighbourhoods(data));
	}, []);

	useEffect(() => {
		if (selectedNeighbourhood !== undefined) {
			// https://data.edmonton.ca/City-Administration/Property-Assessment-Data-Current-Calendar-Year-/q7d6-ambg
			// https://data.edmonton.ca/resource/q7d6-ambg.json = property value
			fetch(
				`https://data.edmonton.ca/resource/q7d6-ambg.json?$limit=50000&neighbourhood_id=${selectedNeighbourhood.neighbourhood_number}`
			)
				.then((resp) => resp.json())
				.then((data) => setProperties(data));
		}
	}, [selectedNeighbourhood]);

	useEffect(() => {
		if (neighbourhoodText.length > 0) {
			const neighbourhood = neighbourhoods.find(
				(n) => n.descriptive_name === neighbourhoodText
			);

			if (neighbourhood) {
				setSelectedNeighbourhood(neighbourhood);
			} else {
				setSelectedNeighbourhood(undefined);
				setShowProperty(false);
			}
		} else {
			setSelectedNeighbourhood(undefined);
			setShowProperty(false);
		}
	}, [neighbourhoodText]);

	const changeNeighbourhood = (event: ChangeEvent<HTMLInputElement>): void => {
		setNeighbourhoodText(event.target.value);
	};

	const changeProperty = (event: ChangeEvent<HTMLInputElement>): void => {
		const address = event.target.value;
		const options = event.target.list?.querySelectorAll("option");
		let accountNumber: string;

		if (options && address.length > 0) {
			options.forEach((option) => {
				if (option.text === address) {
					accountNumber = option.id;
				}
			});
			const property = properties.find((p) => p.account_number === accountNumber);
			if (property) {
				setProperty(property);
			} else {
				setProperty(undefined);
				setShowProperty(false);
			}
		}
	};

	const seeProperty = (): void => {
		if (property) {
			setShowProperty(true);
		}
	};

	return (
		<Container>
			<Col className={!showProperty ? "fullscreen light" : "light"}>
				<Row className="top">
					<Image src={logoSrc} alt="Edmonton.png" />
				</Row>
				<Row>
					<h2>See your assessed property value</h2>
				</Row>

				<Row>
					<Input
						list="neighbourhoods"
						placeholder="Enter Neighbourhood Name.."
						onChange={changeNeighbourhood}
						value={neighbourhoodText}
					/>
					<datalist id="neighbourhoods">
						{neighbourhoods.length > 0 &&
							neighbourhoods.map((neighbourhood) => (
								<option key={neighbourhood.neighbourhood_number}>
									{neighbourhood.descriptive_name}
								</option>
							))}
					</datalist>
				</Row>

				{selectedNeighbourhood && (
					<>
						<Row>
							<Input
								list="properties"
								placeholder="Address.."
								onChange={changeProperty}
							/>
							<datalist id="properties">
								{properties.length > 0 &&
									properties.map((property) => (
										<option
											key={property.account_number}
											id={property.account_number}>
											{property.house_number} {property.street_name}{" "}
											{property.suite ? `Suite ${property.suite}` : ""}
										</option>
									))}
							</datalist>
						</Row>
						{!showProperty && (
							<Row>
								<Button onClick={seeProperty}>View Property</Button>
							</Row>
						)}
					</>
				)}
				<Row>
					<a
						href="https://data.edmonton.ca/City-Administration/Property-Assessment-Data-Current-Calendar-Year-/q7d6-ambg"
						rel="noreferrer noopenner"
						target="_blank">
						Edmonton Open Data - Property Assessment
					</a>
				</Row>
				<Row>
					<a
						href="https://data.edmonton.ca/City-Administration/City-of-Edmonton-Neighbourhoods/65fr-66s6"
						rel="noreferrer noopenner"
						target="_blank">
						Edmonton Open Data - Neighbourhood List
					</a>
				</Row>
			</Col>
			{showProperty && property && selectedNeighbourhood && (
				<Col>
					<PropertyScreen property={property} neighbourhood={selectedNeighbourhood} />
				</Col>
			)}
		</Container>
	);
}

const Container = styled.div`
	align-items: center;
	color: white;
	display: flex;
	flex-direction: row;
	height: 100vh;
	width: 100%;

	.light {
		background-color: #0081bc;
		width: 40%;

		.top {
			margin-top: 20vh;
		}
	}

	.fullscreen {
		width: 100%;
	}
`;

const Col = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	width: 100%;
`;

const Row = styled.div`
	display: flex;
	justify-content: center;
	margin: 10px;
	width: calc(100% - 20px);

	a {
		display: block;
		color: white;
	}
`;

const Input = styled.input`
	padding: 10px;
	border: 0;
	border-radius: 10px;
	font-size: 18px;
	width: calc(80% - 20px);
	max-width: 500px;
`;

const Button = styled.button`
	width: 10rem;
	background-color: white;
	border: 0;
	border-radius: 10px;
	font-size: 18px;
	cursor: pointer;
	padding: 10px;
`;

const Image = styled.img`
	max-width: 960px;
	width: 30vw;
	height: auto;
`;
