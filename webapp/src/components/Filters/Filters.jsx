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
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ApiBaseUrl } from "../../config";

import "./Filters.css";

const Filters = ({ searchQuery }) => {
	const [initRange, setInitRange] = useState([0, 1000]);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(1000);
	const [organizationList, setOrganizationList] = useState([]);
	const [ecommerceList, setEcommerceList] = useState([]);
	const [cpuList, setCPUList] = useState([]);
	const [isCategoryLoading, setCategoryLoading] = useState(true);

	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const getCategories = useCallback(() => {
		setCategoryLoading(true);
		axios.get(`${ApiBaseUrl}/prod/search/category?query=${searchQuery}`).then((res) => {
			// console.log(res.data.category)
			setInitRange([res.data.category.min_price, res.data.category.max_price])
			setMinPrice(res.data.category.min_price)
			setMaxPrice(res.data.category.max_price)
			setOrganizationList(res.data.category.organization_list)
			setEcommerceList(res.data.category.ecommerce_list)
			setCPUList(res.data.category.cpu_type)
			setCategoryLoading(false);
		});
	}, [searchQuery]);

	useEffect(getCategories, [searchQuery, getCategories]);


	return <div>
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
			{
				isCategoryLoading ? <Spinner /> : <>
					<div className='filter-category brand'>
						<Text fontSize='md' fontWeight='semibold' mt='5'>
							Brand
						</Text>
						<Stack mt='2' ml='2' pr={5} className='scrollable'>
							{
								organizationList.map((organization, index) => {
									return <HStack key={organization._id}>
										<Checkbox>{organization.name}</Checkbox>
										<Spacer />
										<Text color={isDark ? "white.100" : "gray.500"}>{organization.count}</Text>
									</HStack>
								})
							}

						</Stack>
					</div>
					<div className='filter-category price'>
						<Text fontSize='md' fontWeight='semibold' mt='5'>
							Price
						</Text>
						<RangeSlider
							defaultValue={[minPrice, maxPrice]}
							min={initRange[0]}
							max={initRange[1]}
							step={10000}
							onChange={(val) => {
								setMinPrice(val[0]);
								setMaxPrice(val[1]);
							}}
						>
							<RangeSliderTrack bg='gray'>
								<RangeSliderFilledTrack bg='tomato' />
							</RangeSliderTrack>
							<RangeSliderMark value={minPrice} mt='1' ml='-2.5' fontSize='sm'>
								{minPrice}
							</RangeSliderMark>
							<RangeSliderMark value={maxPrice} mt='1' ml='-2.5' fontSize='sm'>
								{maxPrice}
							</RangeSliderMark>

							<RangeSliderThumb index={0} />
							<RangeSliderThumb index={1} />
						</RangeSlider>
					</div>
					<div className='filter-category cpu-type'>
						<Text fontSize='md' fontWeight='semibold' mt='5'>
							CPU Type
						</Text>
						<Stack mt='2' ml='2' pr={5} className='scrollable'>
							{
								cpuList.map((cpuType, index) => {
									return <HStack key={index}>
										<Checkbox>{cpuType.name}</Checkbox>
										<Spacer />
										<Text color={isDark ? "white.100" : "gray.500"}>{cpuType.count}</Text>
									</HStack>
								})
							}
						</Stack>
					</div>
					<div className='filter-category cpu-type'>
						<Text fontSize='md' fontWeight='semibold' mt='5'>
							Ecommerce Sites
						</Text>
						<Stack mt='2' ml='2' pr={5} className='scrollable'>
							{
								ecommerceList.map((ecommerce, index) => {
									return <HStack key={ecommerce._id}>
										<Checkbox>{ecommerce.name}</Checkbox>
										<Spacer />
										<Text color={isDark ? "white.100" : "gray.500"}>{ecommerce.count}</Text>
									</HStack>
								})
							}
						</Stack>
					</div>
				</>
			}
		</Box>
	</div>
};

export default Filters;
