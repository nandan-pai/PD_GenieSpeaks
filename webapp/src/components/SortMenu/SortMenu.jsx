import React from "react";
import { HStack, Text, Select, Show } from "@chakra-ui/react";

const SortMenu = ({ sort, setSort }) => {
	return (
		<div>
			<HStack>
				<Show above='lg'>
					<Text>Sort</Text>
				</Show>
				<Select
					defaultValue={sort}
					onChange={(e) => {
						setSort(e.target.value);
					}}
					fontSize={{ base: "md", lg: "md", md: "sm", sm: "sm" }}
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
