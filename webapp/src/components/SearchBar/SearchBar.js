import React, { useState } from "react";
import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	Input,
} from "@chakra-ui/react";

const SearchBar = (props) => {
	// const [input, setInput] = useState("");

	// const handleInputChange = (event) => setInput(event.target.value);

	const isError = props.searchQuery === "";

	// const [ display, setDisplay ] = useState(false);
	// const [ options, setOptions ] = useState([]);
	// const [ search, setSearch ] = useState("");

	// useEffect(() => {
	//     const data = [];
	//     const promises = new Array(20).fill().map((value, index) => )
	// })

	return (
		<FormControl isInvalid={isError}>
			<div>
				<Input
					type='text'
					value={props.searchQuery}
					onChange={(e) => {
						props.setSearchQuery(e.target.value);
					}}
					placeholder='Search for products or organization'
					width='50%'
					mt='15rem'
				/>
				{!isError ? (
					<FormHelperText>
						Enter the product or organization name
					</FormHelperText>
				) : (
					<FormErrorMessage></FormErrorMessage>
				)}
			</div>
		</FormControl>
	);
};

export default SearchBar;
