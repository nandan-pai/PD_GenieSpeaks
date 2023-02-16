import { Heading, HStack } from "@chakra-ui/react";


import NavBar from "../NavBar/NavBar";
import LandingSearchBar from "../SearchBar/LandingSearchBar/LandingSearchBar";

const LandingPage = () => {

	return (
		<div className='container'>
			<NavBar />
			<div className='content'>
				<Heading textAlign='center' mt='5rem'>
					The one-stop shop for reviews
					<br />
					from all over the world
				</Heading>
				<HStack>
					<LandingSearchBar />
				</HStack>
			</div>
		</div>
	);
};

export default LandingPage;
