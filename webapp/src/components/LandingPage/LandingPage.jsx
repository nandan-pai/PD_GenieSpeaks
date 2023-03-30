import {
	HStack,
	Heading,
	Icon,
	LinkBox,
	Text,
	useColorMode,
} from "@chakra-ui/react";

import NavBar from "../NavBar/NavBar";
import LandingSearchBar from "../SearchBar/LandingSearchBar/LandingSearchBar";
import { useContext } from "react";
import SearchContext from "../../context/SearchContext/SearchContext";
import { useNavigate } from "react-router-dom";
import { IoMdLaptop } from "react-icons/io";
import { AiOutlineMobile } from "react-icons/ai";

const LandingPage = () => {
	const navigate = useNavigate();
	const { colorMode } = useColorMode();

	const isDark = colorMode === "dark";

	const { searchQuery, setSearchQuery } = useContext(SearchContext);

	const handleClick = (query) => {
		setSearchQuery(query);
		navigate("/search");
	};

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
				<HStack spacing={5} mt='20px' justify='center'>
					<LinkBox
						w='180px'
						h='50px'
						textAlign='center'
						bgColor={isDark ? "blue.300" : "blue.100"}
						rounded='md'
						_hover={{ cursor: "pointer" }}
						onClick={() => handleClick("laptop")}
					>
						<HStack justify='center' mt='10px'>
							<Icon as={IoMdLaptop} boxSize={6} color='black' />
							<Text fontSize='lg' fontWeight='semibold' color='black'>
								Laptop
							</Text>
						</HStack>
					</LinkBox>
					<LinkBox
						w='180px'
						h='50px'
						textAlign='center'
						bgColor={isDark ? "teal.300" : "teal.100"}
						rounded='md'
						_hover={{ cursor: "pointer" }}
						onClick={() => handleClick("mobile")}
					>
						<HStack justify='center' mt='10px'>
							<Icon as={AiOutlineMobile} boxSize={6} color='black' />
							<Text fontSize='lg' fontWeight='semibold' color='black'>
								Mobile
							</Text>
						</HStack>
					</LinkBox>
				</HStack>
			</div>
		</div>
	);
};

export default LandingPage;
