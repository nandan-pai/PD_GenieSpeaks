import React from "react";
import {
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
	useColorMode,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const NavSearchBar = (props) => {
	const isError = props.searchQuery === "";
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	return (
		<FormControl isInvalid={isError}>
			<InputGroup size='md' w='100%'>
				<InputLeftElement
					pointerEvents='none'
					children={<FaSearch color={isDark ? "white" : ""} />}
				/>
				<Input
					type='text'
					value={props.searchQuery}
					onChange={(e) => {
						props.setSearchQuery(e.target.value);
					}}
					color={isDark ? "white.100" : ""}
				/>
			</InputGroup>
		</FormControl>
	);
};

export default NavSearchBar;
