import { useState, useEffect, useCallback, useContext } from "react";
import {
	Box,
	Text,
	useColorMode,
	Spinner,
	VStack,
	Show,
	HStack,
	Badge,
	Grid,
	GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import { BiError } from "react-icons/bi";

import { ApiBaseUrl } from "../../../config.js";
import GenerateChecklist from "./GenerateChecklist.jsx";
import GenerateRange from "./GenerateRange.jsx";
import SearchContext from "../../../context/SearchContext/SearchContext.js";
import "./FilterDesktop.css";
import { AiFillCloseCircle } from "react-icons/ai";

const FilterDesktop = () => {
	const { searchQuery, filter, setFilter } = useContext(SearchContext);
	const [categoryList, setCategoryList] = useState([]);
	// const [filterList, setFilterList] = useState([]);
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
		delete filter[filter_key];
		setFilter({
			...filter,
		});
	};

	const displayAppliedFilters = (filter_key) => {
		const filter_header = filter[filter_key]["name"];

		let filterList = [];

		if (filter[filter_key]["type"] === "range") {
			const filter_body = `${filter[filter_key]["value"][0]} - ${filter[filter_key]["value"][1]}`;

			filterList.push(filter_body);
		} else {
			// filter_body = filter[filter_key]["value"].join(",");

			filterList.push(filter[filter_key]["value"]);
		}

		return (
			<Box key={filter_key}>
				{/* <Grid templateColumns='repeat(2, 1fr)'>
					<GridItem colSpan={1}>
						<Text>{filter_header}</Text>
					</GridItem>
					<GridItem colSpan={1}>
						{filterList.map((appliedFilter) => {
							return (
								<Badge variant='subtle' colorScheme='blue'>
									<HStack>
										<Text>{appliedFilter}</Text>
										<AiFillCloseCircle
											color='gray'
											onClick={() => handleFilterRemove(filter_key)}
										/>
									</HStack>
								</Badge>
							);
						})}
					</GridItem>
				</Grid> */}
				<Text>
					{filter_header} - {filterList}
				</Text>
				<AiFillCloseCircle
					color='gray'
					onClick={() => handleFilterRemove(filter_key)}
				/>
			</Box>
		);
	};

	useEffect(getCategories, [searchQuery, getCategories]);

	return (
		<div>
			<Show above='md'>
				<Box
					// maxH='100vh'
					w={{ base: "300px", lg: "280px", md: "250px" }}
					maxW={{ base: "300px", lg: "280px", md: "250px" }}
					ml={5}
					bg={isDark ? "" : "white"}
					p={5}
					border='1px'
					borderRadius='10px'
				>
					<Text fontSize='lg' textAlign='center'>
						Filter
					</Text>
					{Object.keys(filter).length ? (
						<Text fontSize='md'>Applied Filter: </Text>
					) : (
						<></>
					)}
					{Object.keys(filter).map((filter_key) => {
						return displayAppliedFilters(filter_key);
					})}
					{isCategoryLoading ? (
						<Spinner />
					) : categoryList.length ? (
						<>
							{categoryList.map((category, index) => {
								if (category.type === "checklist") {
									return (
										<GenerateChecklist
											key={index}
											index={index}
											obj={category}
											defaultFilterValue={
												filter[category.name.toString()]
													? filter[category.name.toString()]["value"]
													: []
											}
											filter={filter}
											setFilter={setFilter}
										/>
									);
								} else if (category.type === "range") {
									return (
										<GenerateRange
											key={index}
											index={index}
											obj={category}
											defaultFilterValue={
												filter[category.name.toString()]
													? filter[category.name.toString()]["value"]
													: [category.value[0], category.value[1]]
											}
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
