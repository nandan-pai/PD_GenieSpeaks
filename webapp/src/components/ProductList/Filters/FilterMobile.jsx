import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
	Badge,
	Box,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Grid,
	GridItem,
	HStack,
	Icon,
	Link,
	Spinner,
	Text,
	useColorMode,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";
import { BiError } from "react-icons/bi";
import axios from "axios";

import { ApiBaseUrl } from "../../../config";
import GenerateChecklist from "./GenerateChecklist";
import GenerateRange from "./GenerateRange";
import "./FilterMobile.css";
import SearchContext from "../../../context/SearchContext/SearchContext";
import { AiFillCloseCircle } from "react-icons/ai";

const FilterMobile = () => {
	const { searchQuery, filter, setFilter } = useContext(SearchContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

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

	const handleFilterRemove = (filter_key, filter_value) => {
		if (
			filter[filter_key]["type"] === "range" ||
			filter[filter_key]["value"].length === 1
		) {
			delete filter[filter_key];
		} else {
			filter[filter_key]["value"] = filter[filter_key]["value"].filter(
				(val) => val !== filter_value
			);
		}
		setFilter({
			...filter,
		});
	};

	const displayAppliedFilters = (filter_key) => {
		const filter_header = filter[filter_key]["name"];

		let filter_body = [];

		if (filter[filter_key]["type"] === "range") {
			filter_body = [
				`${filter[filter_key]["value"][0]} - ${filter[filter_key]["value"][1]}`,
			];
		} else {
			filter_body = filter[filter_key]["value"];
		}

		return (
			<Box key={filter_key}>
				<Grid templateColumns='repeat(2, 1fr)'>
					<GridItem colSpan={1}>
						<HStack>
							<Text>{filter_header}</Text>
							{filter_header === "Price" ? <Text>(&#8377;)</Text> : <></>}
						</HStack>
					</GridItem>
					<GridItem colSpan={1}>
						{filter_body.map((filter_value) => {
							return (
								<Badge variant='subtle' colorScheme='blue' ml='2px'>
									<HStack>
										<Text maxW='120px' overflow='hidden'>
											{filter_value}
										</Text>
										<AiFillCloseCircle
											color='gray'
											onClick={() =>
												handleFilterRemove(filter_key, filter_value)
											}
										/>
									</HStack>
								</Badge>
							);
						})}
					</GridItem>
				</Grid>
			</Box>
		);
	};

	useEffect(getCategories, [searchQuery, getCategories]);

	return (
		<div>
			<Link className='filter-button' onClick={onOpen} ref={btnRef}>
				<Box
					w='110px'
					borderWidth='1px'
					borderColor='gray.100'
					borderRadius='md'
					justifyContent='center'
					display='inline-flex'
					padding='8px'
				>
					<HStack>
						<Text>Filters</Text>
						<Icon as={FiFilter} />
					</HStack>
				</Box>
			</Link>

			<div
				style={
					isDark ? { backgroundColor: "#2d3748" } : { backgroundColor: "white" }
				}
			>
				<Drawer
					isOpen={isOpen}
					placement='left'
					onClose={onClose}
					finalFocusRef={btnRef}
				>
					<DrawerOverlay />
					<DrawerContent
						style={
							isDark ? { backgroundColor: "#2d3748" } : { backgroundColor: "#ffffff" }
						}>
						<DrawerHeader>Filters</DrawerHeader>
						<DrawerBody px={7}>
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
						</DrawerBody>
						<DrawerFooter>
							<Link onClick={onClose}>
								<Box
									w='110px'
									borderWidth='1px'
									borderColor='gray.100'
									backgroundColor={isDark ? "white.100" : "gray.100"}
									borderRadius='md'
									justifyContent='center'
									display='inline-flex'
									padding='8px'
								>
									<Text color={isDark ? "gray.100" : "white.100"}>Close</Text>
								</Box>
							</Link>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
		</div>
	);
};

export default FilterMobile;
