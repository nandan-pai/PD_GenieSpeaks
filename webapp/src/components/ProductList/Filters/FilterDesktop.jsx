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

	const handleFilterRemove = (filter_key) => {
		delete filter[filter_key]
		setFilter({
			...filter
		})
	}

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
					{
						Object.keys(filter).length? <Text fontSize='md'>Applied Filter: </Text>: <></>
					}
					{
						Object.keys(filter).map((filter_key) => {
							return (
								<div style={{ border: "2px solid aqua" }} key={filter_key}>
									{filter[filter_key]['identifier']} - {
										filter[filter_key]['value'].join(",")
									}
									<svg
										style={{ color: "red" }}
										onClick={() => handleFilterRemove(filter_key)}
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 16 16">
										<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
									</svg>
								</div>)
						})
					}
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
											defaultFilterValue={
												filter[category.name.toString()] ? filter[category.name.toString()]["value"] : []
											}
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
											defaultFilterValue={
												filter[category.name.toString()] ? filter[category.name.toString()]["value"] : [category.value[0], category.value[1]]
											}
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
