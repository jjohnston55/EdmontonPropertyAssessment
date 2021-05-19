import React from "react";
import styled from "styled-components";

type CardProps = {
	title: string;
	description: string;
};

export default function Card({ title, description }: CardProps) {
	return (
		<Container>
			<h3 className="focus-in-expand">{title}</h3>
			<h2 className="focus-in-expand">{description}</h2>
		</Container>
	);
}

const Container = styled.div`
	margin: 25px 5px 0 5px;
	background-color: rgba(255, 255, 255, 0.288);
	border-radius: 5px;
	box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
	padding: 0 25px;

	h3 {
		margin: 15px;
		font-weight: 100;
		font-size: 1.5rem;
	}

	h2 {
		margin: 15px;
		font-weight: 500;
		font-size: 1.8rem;
	}

	.focus-in-expand {
		-webkit-animation: focus-in-expand 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.7s both;
		animation: focus-in-expand 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.7s both;
	}

	@-webkit-keyframes focus-in-expand {
		0% {
			letter-spacing: -0.5em;
			-webkit-filter: blur(12px);
			filter: blur(12px);
			opacity: 0;
		}
		100% {
			-webkit-filter: blur(0px);
			filter: blur(0px);
			opacity: 1;
		}
	}

	@keyframes focus-in-expand {
		0% {
			letter-spacing: -0.5em;
			-webkit-filter: blur(12px);
			filter: blur(12px);
			opacity: 0;
		}
		100% {
			-webkit-filter: blur(0px);
			filter: blur(0px);
			opacity: 1;
		}
	}

	@media screen and (max-width: 1024px) {
		h3 {
			font-size: 1.1rem;
		}
		h2 {
			font-size: 1.2rem;
		}
	}
`;
