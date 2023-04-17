import { useContext, useState } from "react";
import {
	Button,
	FormControl,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Show,
	useColorMode,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

import "./NavSearchBar.css";
import { useLocation, useNavigate } from "react-router-dom";
import SearchContext from "../../../context/SearchContext/SearchContext";

const NavSearchBar = () => {
	const { searchQuery, setSearchQuery, resetFashion } =
		useContext(SearchContext);
	const [buSearchQuery, setBuSearchQuery] = useState(searchQuery);
	const isError = searchQuery === "";
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const navigate = useNavigate();
	const location = useLocation();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (buSearchQuery !== "") {
			resetFashion();
			setSearchQuery(buSearchQuery);
		}

		if (location.pathname !== "/search") {
			navigate("/search");
		}
	};

	return (
		<form onSubmit={handleSubmit} className='navSearch'>
			<FormControl isInvalid={isError}>
				<HStack>
					<InputGroup size='md' w='100%'>
						<InputLeftElement
							pointerEvents='none'
							children={<FaSearch color={isDark ? "white" : ""} />}
						/>
						<Input
							type='text'
							value={buSearchQuery}
							onChange={(e) => {
								setBuSearchQuery(e.target.value);
							}}
							color={isDark ? "white.100" : ""}
						/>
						<Show above='md'>
							<InputRightElement mr='5px' w='80px'>
								<Button
									type='submit'
									size='md'
									h='1.75rem'
									color={isDark ? "white.100" : ""}
									className='navbarbtn'
								>
									Search
								</Button>
							</InputRightElement>
						</Show>
					</InputGroup>
				</HStack>
			</FormControl>
		</form>
	);
};

export default NavSearchBar;
