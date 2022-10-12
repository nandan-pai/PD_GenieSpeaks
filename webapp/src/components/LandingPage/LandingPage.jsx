// import { Button, Flex, useColorMode } from "@chakra-ui/react";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// import LandingNavBar from "../NavBar/LandingNavBar/LandingNavBar";
// import SearchBar from "../SearchBar/SearchBar";
// import "./LandingPage.css";

// export default function LandingPage(props) {
// 	// const { colorMode } = useColorMode();
// 	// const isDark = colorMode === "dark";
// 	const navigate = useNavigate();

// 	const handleSubmit = () => {
// 		if (props.searchQuery !== "") {
// 			navigate("/search");
// 		}
// 	};

// 	return (
// 		<div className='container'>
// 			<LandingNavBar />
// 			<div className='content'>
// 				<SearchBar
// 					searchQuery={props.searchQuery}
// 					setSearchQuery={props.setSearchQuery}
// 				/>
// 				<Button mt={4} colorScheme='gray' size='lg' onClick={handleSubmit}>
// 					Search
// 				</Button>
// 			</div>
// 		</div>
// 	);
// }

// -------------- Overhaul --------------
import { Heading, HStack } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import LandingNav from "../NavBar/NavBar";
import LandingSearchBar from "../SearchBar/LandingSearchBar/LandingSearchBar";

const LandingPage = (props) => {
	const location = useLocation();

	return (
		<div className='container'>
			<LandingNav currentPath={location.pathname} />
			<div className='content'>
				<Heading textAlign='center' mt='5rem'>
					The one-stop shop for reviews
					<br />
					from all over the world
				</Heading>
				<HStack>
					<LandingSearchBar
						searchQuery={props.searchQuery}
						setSearchQuery={props.setSearchQuery}
					/>
				</HStack>
			</div>
		</div>
	);
};

export default LandingPage;
