export interface Neighbourhood {
	name: string;
	neighbourhood_number: number;
	descriptive_name: string;
	description?: string;
	geometry_multipolygon: {
		coordinates: [];
		type: string;
	};
}

export interface Property {
	account_number: string;
	suite?: string;
	house_number: string;
	street_name: string;
	garage: "Y" | "N";
	neighbourhood_id: number;
	neighbourhood: string;
	ward: string;
	assessed_value: number;
	latitude: string;
	longitude: string;
}
