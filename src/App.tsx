import React, { ChangeEvent, Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import { Neighbourhood, Property } from "./utils/types";
import logoSrc from "./resources/EDM.png";
const PropertyScreen = React.lazy(() => import("./components/PropertyScreen"));

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
				(n) => n.name === neighbourhoodText.toUpperCase()
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
	}, [neighbourhoodText, neighbourhoods]);

	const changeNeighbourhood = (event: ChangeEvent<HTMLInputElement>): void => {
		setNeighbourhoodText(event.target.value);
	};

	const changeProperty = (event: ChangeEvent<HTMLInputElement>): void => {
		const address = event.target.value;
		const options = event.target.list?.querySelectorAll("option");
		let accountNumber: string;

		if (options && address.length > 0) {
			options.forEach((option) => {
				if (option.text === address.toUpperCase()) {
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
		} else {
			setProperty(undefined);
			setShowProperty(false);
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
					<h2>See Your Assessed Property Value:</h2>
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
								placeholder="Enter Your Address.."
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
				<Col className="slide-in-right">
					<Suspense fallback={<span>loading</span>}>
						<PropertyScreen property={property} neighbourhood={selectedNeighbourhood} />
					</Suspense>
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
		width: 40vw;
		transition: width 1.2s;
		box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);

		.top {
			margin-top: 20vh;
		}
	}

	.slide-in-right {
		-webkit-animation: slide-in-right 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) 0.5 both;
		animation: slide-in-right 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) 0.5s both;
	}

	.fullscreen {
		width: 100%;
	}

	@-webkit-keyframes slide-in-right {
		0% {
			-webkit-transform: translateX(1000px);
			transform: translateX(1000px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
	}
	@keyframes slide-in-right {
		0% {
			-webkit-transform: translateX(1000px);
			transform: translateX(1000px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
	}
`;

const Col = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	width: 100%;
	transition: width 1.8s;

	.scale-in-ver-top {
		-webkit-animation: scale-in-ver-top 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
		animation: scale-in-ver-top 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
	}

	@-webkit-keyframes scale-in-ver-top {
		0% {
			-webkit-transform: scaleY(0);
			transform: scaleY(0);
			-webkit-transform-origin: 100% 0%;
			transform-origin: 100% 0%;
			opacity: 1;
		}
		100% {
			-webkit-transform: scaleY(1);
			transform: scaleY(1);
			-webkit-transform-origin: 100% 0%;
			transform-origin: 100% 0%;
			opacity: 1;
		}
	}
	@keyframes scale-in-ver-top {
		0% {
			-webkit-transform: scaleY(0);
			transform: scaleY(0);
			-webkit-transform-origin: 100% 0%;
			transform-origin: 100% 0%;
			opacity: 1;
		}
		100% {
			-webkit-transform: scaleY(1);
			transform: scaleY(1);
			-webkit-transform-origin: 100% 0%;
			transform-origin: 100% 0%;
			opacity: 1;
		}
	}
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
	border: 0;
	border-radius: 10px;
	font-size: 18px;
	height: 21px;
	max-width: 500px;
	padding: 10px;
	width: calc(80% - 20px);
`;

const Button = styled.button`
	background-color: white;
	border: 0;
	border-radius: 10px;
	cursor: pointer;
	font-size: 18px;
	height: 41px;
	padding: 10px;
	width: 10rem;
`;

const Image = styled.img`
	max-width: 960px;
	width: 25vw;
	margin-left: 5px;
	margin-right: 5px;
	height: auto;
`;
