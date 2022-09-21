import React, { useEffect, useState } from "react";
import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	Input,
	Button,
} from "@chakra-ui/react";

const SearchBar = () => {
	const [input, setInput] = useState("");

	const handleInputChange = (event) => setInput(event.target.value);

	const isError = input === "";

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
					value={input}
					onChange={handleInputChange}
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
