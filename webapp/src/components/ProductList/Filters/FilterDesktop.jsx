import { useState, useEffect, useCallback, useContext } from "react";
import {
	Box,
	Text,
	useColorMode,
	Spinner,
	VStack,
	Show,
} from "@chakra-ui/react";
import axios from "axios";
import { BiError } from "react-icons/bi";

import { ApiBaseUrl } from "../../../config.js";
import GenerateChecklist from "./GenerateChecklist.jsx";
import GenerateRange from "./GenerateRange.jsx";
import SearchContext from "../../../context/SearchContext/SearchContext.js";
import "./FilterDesktop.css";

const FilterDesktop = () => {
	const { searchQuery, filter, setFilter } = useContext(SearchContext);
	const [categoryList, setCategoryList] = useState([]);
	const [isCategoryLoading, setCategoryLoading] = useState(true);

	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const getCategories = useCallback(() => {
		if (searchQuery === "") {
			return;
		}
		setCategoryLoading(true);
		axios
			.get(`${ApiBaseUrl}/prod/search/category?query=${searchQuery}`)
			.then((res) => {
				setCategoryList(res.data.category);
				setCategoryLoading(false);
			});
	}, [searchQuery]);

	useEffect(getCategories, [searchQuery, getCategories]);

	return (
		<div>
			<Show above='md'>
				<Box
					maxH='100vh'
					w={{ base: "300px", lg: "280px", md: "250px" }}
					ml={5}
					bg={isDark ? "" : "white"}
					p={5}
					border='1px'
					borderRadius='10px'
				>
					<Text fontSize='lg'>Filter</Text>
					{isCategoryLoading ? (
						<Spinner />
					) : categoryList.length ? (
						<>
							{categoryList.map((category, index) => {
								if (category.type === "checklist") {
									return (
										<GenerateChecklist
											obj={category}
											key={index}
											index={index}
											filter={filter}
											setFilter={setFilter}
										/>
									);
								} else if (category.type === "range") {
									return (
										<GenerateRange
											obj={category}
											key={index}
											index={index}
											filter={filter}
											setFilter={setFilter}
										/>
									);
								} else {
									return <></>;
								}
							})}
						</>
					) : (
						<VStack mt='10%'>
							<BiError color='orange' ml='50%' size='50px' />
							<Text fontSize='2xl'>No Filters</Text>
						</VStack>
					)}
				</Box>
			</Show>
		</div>
	);
};

export default FilterDesktop;
