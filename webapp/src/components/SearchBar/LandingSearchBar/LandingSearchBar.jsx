import {
	Button,
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./LandingSearchBar.css";

const LandingSearchBar = (props) => {
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const navigate = useNavigate();

	const handleSubmit = () => {
		if (props.searchQuery !== "") {
			navigate("/search");
		}
	};

	return (
		<form onSubmit={handleSubmit} className='landingSearch'>
			<FormControl isRequired>
				<InputGroup size='lg' width='50%' mt='5rem' mx='auto'>
					<InputLeftElement pointerEvents='none' children={<FaSearch />} />
					<Input
						type='text'
						value={props.searchQuery}
						onChange={(e) => {
							props.setSearchQuery(e.target.value);
						}}
						placeholder='Search for products or organization'
					/>
					<Button
						bg={isDark ? "white.100" : "gray.100"}
						ml='10px'
						type='submit'
						className='submitBtn'
					>
						<Text color={isDark ? "gray.100" : "white.100"}>Search</Text>
					</Button>
				</InputGroup>
			</FormControl>
		</form>
	);
};

export default LandingSearchBar;
