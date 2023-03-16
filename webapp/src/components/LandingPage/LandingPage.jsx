import { Heading } from "@chakra-ui/react";

import NavBar from "../NavBar/NavBar";
import LandingSearchBar from "../SearchBar/LandingSearchBar/LandingSearchBar";

const LandingPage = () => {
	return (
		<div className='container'>
			<NavBar />
			<div className='content'>
				<Heading
					textAlign='center'
					mt='5rem'
					size={{ xl: "xl", lg: "xl", md: "xl", sm: "lg", base: "lg" }}
				>
					The one-stop shop for reviews
					<br />
					from all over the world
				</Heading>
				<LandingSearchBar />
			</div>
		</div>
	);
};

export default LandingPage;
