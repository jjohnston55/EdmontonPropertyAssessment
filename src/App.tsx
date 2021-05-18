import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import PropertyScreen from "./components/PropertyScreen";
import { Neighbourhood, Property } from "./utils/types";
import logoSrc from "./resources/EDM.png";

function App() {
	const [error, setError] = useState("");
	const [property, setProperty] = useState<Property>();
	const [properties, setProperties] = useState<Property[]>([]);
	const [neighbourhoods, setNeighbourhoods] = useState<Neighbourhood[]>([]);
	const [selectedNeighbourhood, setSelectedNeighbourhood] = useState(0);
	const [showProperty, setShowProperty] = useState(false);

	useEffect(() => {
		// https://data.edmonton.ca/City-Administration/City-of-Edmonton-Neighbourhoods/65fr-66s6
		// https://data.edmonton.ca/resource/65fr-66s6.json = list of neighbourhoods
		fetch("https://data.edmonton.ca/resource/65fr-66s6.json")
			.then((resp) => resp.json())
			.then((data) => setNeighbourhoods(data));
	}, []);

	useEffect(() => {
		if (selectedNeighbourhood !== 0) {
			// https://data.edmonton.ca/City-Administration/Property-Assessment-Data-Current-Calendar-Year-/q7d6-ambg
			// https://data.edmonton.ca/resource/q7d6-ambg.json = property value
			fetch(
				`https://data.edmonton.ca/resource/q7d6-ambg.json?$limit=50000&neighbourhood_id=${selectedNeighbourhood}`
			)
				.then((resp) => resp.json())
				.then((data) => setProperties(data));
		}
	}, [selectedNeighbourhood]);

	const changeNeighbourhood = (event: ChangeEvent<HTMLInputElement>): void => {
		const descriptiveName = event.target.value;

		const neighbourhood = neighbourhoods.find((n) => n.descriptive_name === descriptiveName);

		if (neighbourhood) {
			setSelectedNeighbourhood(neighbourhood.neighbourhood_number);
			setError("");
		} else {
			setSelectedNeighbourhood(0);
			setError("Neighbourhood does not exist");
		}
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
			<Row>
				<Image src={logoSrc} alt="Edmonton.png" />
			</Row>
			<Row>
				<span>{error}</span>
			</Row>
			<Row>
				<Input
					list="neighbourhoods"
					placeholder="Enter Neighbourhood Name.."
					onChange={changeNeighbourhood}
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

			{selectedNeighbourhood !== 0 && (
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
					<Row>
						<button onClick={seeProperty}>See Property</button>
					</Row>
				</>
			)}
			{showProperty && property && <PropertyScreen property={property} />}
		</Container>
	);
}

const Container = styled.div`
	align-items: center;
	color: white;
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
`;

const Row = styled.div`
	margin: 10px;
`;

const Input = styled.input`
	padding: 10px;
	border: 0;
	border-radius: 10px;
	font-size: 18px;
`;

const Image = styled.img`
	max-width: 960px;
	width: 30vw;
	height: auto;
`;

export default App;
