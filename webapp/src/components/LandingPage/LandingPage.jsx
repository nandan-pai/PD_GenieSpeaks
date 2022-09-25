import { Button, Flex, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import LandingNavBar from "../NavBar/LandingNavBar/LandingNavBar";
import SearchBar from "../SearchBar/SearchBar";
import "./LandingPage.css";

export default function LandingPage(props) {
	// const { colorMode } = useColorMode();
	// const isDark = colorMode === "dark";
	const navigate = useNavigate();

	const handleSubmit = () => {
		navigate("/search");
	};

	return (
		<div className='container'>
			<LandingNavBar />
			<div className='content'>
				<SearchBar
					searchQuery={props.searchQuery}
					setSearchQuery={props.setSearchQuery}
				/>
				<Button mt={4} colorScheme='gray' size='lg' onClick={handleSubmit}>
					Search
				</Button>
			</div>
		</div>
	);
}
