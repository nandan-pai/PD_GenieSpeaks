import {
	Button,
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../../context/SearchContext/SearchContext";
import "./LandingSearchBar.css";

const LandingSearchBar = () => {
	const { searchQuery, setSearchQuery, resetFashion } =
		useContext(SearchContext);
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const navigate = useNavigate();

	const handleSubmit = () => {
		resetFashion();
		if (searchQuery !== "") {
			navigate("/search");
		}
	};

	return (
		<form onSubmit={handleSubmit} className='landingSearch'>
			<FormControl isRequired>
				<Stack
					direction={{
						xl: "row",
						lg: "row",
						md: "row",
						sm: "column",
						base: "column",
					}}
					w={{ xl: "50%", lg: "50%", md: "50%", sm: "70%", base: "70%" }}
					spacing='10px'
					mt='5rem'
					mx='auto'
				>
					<InputGroup size='lg'>
						<InputLeftElement pointerEvents='none' children={<FaSearch />} />
						<Input
							type='text'
							value={searchQuery}
							onChange={(e) => {
								setSearchQuery(e.target.value);
							}}
							placeholder='Search for tech products'
						/>
					</InputGroup>
					<Button
						bg={isDark ? "white.100" : "gray.100"}
						type='submit'
						className='submitBtn'
						size='lg'
					>
						<Text color={isDark ? "gray.100" : "white.100"}>Search</Text>
					</Button>
				</Stack>
			</FormControl>
		</form>
	);
};

export default LandingSearchBar;
