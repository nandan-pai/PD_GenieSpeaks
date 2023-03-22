import { HStack, Heading, Icon, LinkBox, Text } from "@chakra-ui/react";

import NavBar from "../NavBar/NavBar";
import LandingSearchBar from "../SearchBar/LandingSearchBar/LandingSearchBar";
import { useContext } from "react";
import SearchContext from "../../context/SearchContext/SearchContext";
import { useNavigate } from "react-router-dom";
import { IoMdLaptop } from "react-icons/io";
import { AiOutlineMobile } from "react-icons/ai";

const LandingPage = () => {
	const navigate = useNavigate();

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
						bgColor='blue.100'
						rounded='md'
						_hover={{ cursor: "pointer" }}
						onClick={() => handleClick("laptop")}
					>
						<HStack justify='center' mt='10px'>
							<Icon as={IoMdLaptop} boxSize={6} />
							<Text fontSize='lg' fontWeight='semibold'>
								Laptop
							</Text>
						</HStack>
					</LinkBox>
					<LinkBox
						w='180px'
						h='50px'
						textAlign='center'
						bgColor='teal.100'
						rounded='md'
						_hover={{ cursor: "pointer" }}
						onClick={() => handleClick("mobile")}
					>
						<HStack justify='center' mt='10px'>
							<Icon as={AiOutlineMobile} boxSize={6} />
							<Text fontSize='lg' fontWeight='semibold'>
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
