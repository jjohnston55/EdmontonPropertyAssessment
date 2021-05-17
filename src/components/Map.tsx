import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";

type MapProps = {
	latitude: number;
	longitude: number;
};

export default function Map({ latitude, longitude }: MapProps) {
	const coordinate = {
		lat: latitude,
		lng: longitude,
	};

	return (
		<MapContainer id="map">
			<GoogleMapReact
				bootstrapURLKeys={{
					key: process.env.API_KEY ? process.env.API_KEY : "",
					language: "en",
					libraries: ["places"],
				}}
				center={coordinate}
				zoom={15}
			/>
		</MapContainer>
	);
}

const MapContainer = styled.div`
	max-height: 400px;
	max-width: 400px;
	width: 25vmax;
	height: 25vmax;
`;
