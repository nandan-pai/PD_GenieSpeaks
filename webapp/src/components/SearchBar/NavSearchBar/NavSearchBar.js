import React from "react";
import {
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const NavSearchBar = (props) => {
	const isError = props.searchQuery === "";

	return (
		<FormControl isInvalid={isError}>
			<InputGroup size='md' w='100%'>
				<InputLeftElement pointerEvents='none' children={<FaSearch />} />
				<Input
					type='text'
					value={props.searchQuery}
					onChange={(e) => {
						props.setSearchQuery(e.target.value);
					}}
				/>
			</InputGroup>
		</FormControl>
	);
};

export default NavSearchBar;
