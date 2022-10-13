import React from "react";
import {
	HStack,
	Text,
	useColorMode,
	Select
} from "@chakra-ui/react";

const SortMenu = ({sort, setSort}) => {
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	return (
		<div>
			<HStack>
				<Text>Sort</Text>
				<Select
					defaultValue={sort}
					onChange={(e) => {
						setSort(e.target.value)}}
					>
						<option value={"_id"}>Default</option>
						<option value={"ecommerce.curr_price"}>Price: Low to High</option>
						<option value={"-ecommerce.curr_price"}>Price: High to Low</option>
						<option value={"review_count"}>Low Review Count</option>
						<option value={"-review_count"}>High Review Count</option>
				</Select>
			</HStack>
		</div>
	);
};

export default SortMenu;
