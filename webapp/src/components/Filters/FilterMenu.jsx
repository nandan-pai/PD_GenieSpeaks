import {
	Box,
	Checkbox,
	CheckboxGroup,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	HStack,
	Icon,
	Link,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderMark,
	RangeSliderThumb,
	RangeSliderTrack,
	Spacer,
	Spinner,
	Stack,
	Text,
	useColorMode,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ApiBaseUrl } from "../../config";
import { FiFilter } from "react-icons/fi";
import "./FilterMenu.css";
import axios from "axios";
import { BiError } from "react-icons/bi";

const FilterMenu = ({ searchQuery, setFilter, filter }) => {
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

	useEffect(getCategories, [searchQuery, getCategories]);

	const generate_checklist = (obj, index) => {
		// console.log(obj.identifier)
		return (
			<div className='filter-category' key={index}>
				<Text fontSize='md' fontWeight='semibold' mt='5'>
					{obj.name}
				</Text>
				<CheckboxGroup
					onChange={(e) =>
						setFilter({
							...filter,
							[obj.name.toString()]: {
								identifier: obj.identifier,
								type: obj.return,
								value: e,
							},
						})
					}
				>
					<Stack mt='2' ml='2' pr={5} className='scrollable'>
						{obj.value.map((objval, index) => {
							return (
								<HStack key={objval._id}>
									<Checkbox value={objval._id ? objval._id : "null"}>
										{objval.name ? objval.name : "null"}
									</Checkbox>
									<Spacer />
									<Text color={isDark ? "white.100" : "gray.500"}>
										{objval.count}
									</Text>
								</HStack>
							);
						})}
					</Stack>
				</CheckboxGroup>
			</div>
		);
	};

	const generate_range = (obj, index) => {
		// console.log(obj)
		return (
			<div className='filter-category price' key={index}>
				<Text fontSize='md' fontWeight='semibold' mt='5'>
					{obj.name}
				</Text>
				<RangeSlider
					defaultValue={[obj.value[0], obj.value[1]]}
					min={obj.value[0]}
					max={obj.value[1]}
					step={10000}
					onChange={(val) =>
						setFilter({
							...filter,
							[obj.name.toString()]: {
								identifier: obj.identifier,
								type: obj.return,
								value: val,
							},
						})
					}
				>
					<RangeSliderTrack bg='gray'>
						<RangeSliderFilledTrack bg='tomato' />
					</RangeSliderTrack>
					<RangeSliderMark value={obj.value[0]} mt='1' ml='-2.5' fontSize='sm'>
						{obj.value[0]}
					</RangeSliderMark>
					<RangeSliderMark value={obj.value[1]} mt='1' ml='-35' fontSize='sm'>
						{obj.value[1]}
					</RangeSliderMark>

					<RangeSliderThumb index={0} />
					<RangeSliderThumb index={1} />
				</RangeSlider>
			</div>
		);
	};

	// const handleButtonClick = () => {};

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
					<DrawerContent>
						<DrawerHeader>Filters</DrawerHeader>
						<DrawerBody px={7}>
							{isCategoryLoading ? (
								<Spinner />
							) : categoryList.length ? (
								<>
									{categoryList.map((category, index) => {
										if (category.type === "checklist") {
											return generate_checklist(category, index);
										} else if (category.type === "range") {
											return generate_range(category, index);
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

export default FilterMenu;
