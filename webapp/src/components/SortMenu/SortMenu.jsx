import React from "react";
import { HStack, Text, Select } from "@chakra-ui/react";

const SortMenu = ({ sort, setSort }) => {
	return (
		<div>
			<HStack>
				<Text>Sort</Text>
				<Select
					defaultValue={sort}
					onChange={(e) => {
						setSort(e.target.value);
					}}
				>
					<option value={"_id"}>Default</option>
					<option value={"ecommerce.curr_price"}>Price: Low to High</option>
					<option value={"-ecommerce.curr_price"}>Price: High to Low</option>
					<option value={"review_count"}>Review Count: Low to High</option>
					<option value={"-review_count"}>Review Count: High to Low</option>
				</Select>
			</HStack>
		</div>
	);
};

export default SortMenu;
