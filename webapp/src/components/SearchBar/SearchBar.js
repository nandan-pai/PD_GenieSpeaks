import React from "react";
import {
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchBar = (props) => {

	const isError = props.searchQuery === "";

	return (
		<FormControl isInvalid={isError}>
			<InputGroup width='50%' size='lg' m='auto' mt='15rem'>
				<InputLeftElement pointerEvents='none' children={<FaSearch />} />
				<Input
					type='text'
					value={props.searchQuery}
					onChange={(e) => {
						props.setSearchQuery(e.target.value);
					}}
					placeholder='Search for products or organization'
				/>
			</InputGroup>
		</FormControl>
	);
};

export default SearchBar;
