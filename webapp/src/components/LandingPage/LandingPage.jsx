import { Heading, HStack } from "@chakra-ui/react";
import React from "react";
import NavBar from "../NavBar/NavBar";
import LandingSearchBar from "../SearchBar/LandingSearchBar/LandingSearchBar";

const LandingPage = (props) => {
	const { searchQuery, setSearchQuery, setFilter } = props;

	return (
		<div className='container'>
			<NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}
				setFilter={setFilter} />
			<div className='content'>
				<Heading textAlign='center' mt='5rem'>
					The one-stop shop for reviews
					<br />
					from all over the world
				</Heading>
				<HStack>
					<LandingSearchBar
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						setFilter={setFilter}
					/>
				</HStack>
			</div>
		</div>
	);
};

export default LandingPage;
