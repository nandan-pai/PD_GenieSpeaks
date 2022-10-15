import {
	Box,
	Checkbox,
	HStack,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderMark,
	RangeSliderThumb,
	RangeSliderTrack,
	Spacer,
	Stack,
	Text,
	useColorMode,
	Spinner,
	CheckboxGroup,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ApiBaseUrl } from "../../config";

import "./Filters.css";

const Filters = ({ searchQuery, setFilter, filter }) => {
	const [categoryList, setCategoryList] = useState([]);
	const [isCategoryLoading, setCategoryLoading] = useState(true);

	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const getCategories = useCallback(() => {
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
									<Checkbox
										value={objval._id ? objval._id : "null"}
									>
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

	return (
		<div>
			<Box
				h='100vh'
				w='300px'
				ml={5}
				bg={isDark ? "" : "white"}
				p={5}
				border='1px'
				borderRadius='10px'
			>
				<Text fontSize='lg'>Filter</Text>
				{isCategoryLoading ? (
					<Spinner />
				) : (
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
				)}
			</Box>
		</div>
	);
};

export default Filters;
