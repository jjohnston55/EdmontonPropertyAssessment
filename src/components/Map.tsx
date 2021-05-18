import React from "react";
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

	/**
	 * Will render the default Google Maps marker on the map
	 * @param map The map
	 * @param maps To access the Google Maps API
	 */
	const renderMarker = (map: any, maps: any): void => {
		let marker = new maps.Marker({
			position: coordinate,
			map,
		});
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
				onGoogleApiLoaded={({ map, maps }) => renderMarker(map, maps)}
				yesIWantToUseGoogleMapApiInternals
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
