import React from "react";
import {
	HStack,
	Menu,
	MenuButton,
	Text,
	Button,
	MenuList,
	MenuItem,
	useColorMode,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

const SortMenu = () => {
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	return (
		<div>
			<HStack>
				<Text>Sort</Text>
				<Menu>
					<MenuButton as={Button} rightIcon={<FaChevronDown />}>
						Default
					</MenuButton>
					<MenuList>
						<MenuItem>Price: Low to High</MenuItem>
						<MenuItem>Price: High to Low</MenuItem>
						<MenuItem>Review Count</MenuItem>
					</MenuList>
				</Menu>
			</HStack>
		</div>
	);
};

export default SortMenu;
