import React from "react";
import {
	Button,
	FormControl,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	useColorMode,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

import "./NavSearchBar.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavSearchBar = (props) => {
	const [buSearchQuery, setBuSearchQuery] = useState(props.searchQuery);
	const isError = props.searchQuery === "";
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const navigate = useNavigate();
	const location = useLocation();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (location.pathname !== "/search") {
			navigate("/search");
		}

		if (buSearchQuery !== "") {
			props.setSearchQuery(buSearchQuery);
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
						<InputRightElement mr='5px' w='80px'>
							<Button
								type='submit'
								size='md'
								h='1.75rem'
								color={isDark ? "white.100" : ""}
								className="navbarbtn"
							>
								Search
							</Button>
						</InputRightElement>
					</InputGroup>
				</HStack>
			</FormControl>
		</form>
	);
};

export default NavSearchBar;
