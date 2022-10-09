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
} from "@chakra-ui/react";
import { useState } from "react";

import "./Filters.css";

const Filters = () => {
	const [startPrice, setStartPrice] = useState(0);
	const [endPrice, setEndPrice] = useState(100);

	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

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
				<div className='filter-category brand'>
					<Text fontSize='md' fontWeight='semibold' mt='5'>
						Brand
					</Text>
					<Stack mt='2' ml='2' pr={5} className='scrollable'>
						<HStack>
							<Checkbox>Lenovo</Checkbox>
							<Spacer />
							<Text color='gray.500'>152</Text>
						</HStack>
						<HStack>
							<Checkbox>Honor</Checkbox>
							<Spacer />
							<Text color='gray.500'>80</Text>
						</HStack>
						<HStack>
							<Checkbox>Apple</Checkbox>
							<Spacer />
							<Text color='gray.500'>70</Text>
						</HStack>
						<HStack>
							<Checkbox>HP</Checkbox>
							<Spacer />
							<Text color='gray.500'>66</Text>
						</HStack>
						<HStack>
							<Checkbox>Acer</Checkbox>
							<Spacer />
							<Text color='gray.500'>12</Text>
						</HStack>
						<HStack>
							<Checkbox>Dell</Checkbox>
							<Spacer />
							<Text color='gray.500'>15</Text>
						</HStack>
						<HStack>
							<Checkbox>Asus</Checkbox>
							<Spacer />
							<Text color='gray.500'>8</Text>
						</HStack>
					</Stack>
				</div>
				<div className='filter-category price'>
					<Text fontSize='md' fontWeight='semibold' mt='5'>
						Price
					</Text>
					<RangeSlider
						defaultValue={[0, 100]}
						onChangeStart={(values) => {
							setStartPrice(values[0]);
							console.log(startPrice);
						}}
						onChangeEnd={(values) => {
							setEndPrice(values[1]);
							console.log(endPrice);
						}}
					>
						<RangeSliderMark value={0} mt='1' ml='-2.5' fontSize='sm'>
							{startPrice}
						</RangeSliderMark>
						<RangeSliderMark value={100} mt='1' ml='-2.5' fontSize='sm'>
							{endPrice}
						</RangeSliderMark>
						<RangeSliderTrack bg='gray'>
							<RangeSliderFilledTrack bg='tomato' />
						</RangeSliderTrack>
						<RangeSliderThumb index={0} />
						<RangeSliderThumb index={1} />
					</RangeSlider>
				</div>
				<div className='filter-category cpu-type'>
					<Text fontSize='md' fontWeight='semibold' mt='5'>
						CPU Type
					</Text>
					<Stack mt='2' ml='2' pr={5} className='scrollable'>
						<HStack>
							<Checkbox>AMD A-Series</Checkbox>
							<Spacer />
							<Text color='gray.500'>152</Text>
						</HStack>
						<HStack>
							<Checkbox>AMD A4</Checkbox>
							<Spacer />
							<Text color='gray.500'>80</Text>
						</HStack>
						<HStack>
							<Checkbox>AMD 16</Checkbox>
							<Spacer />
							<Text color='gray.500'>70</Text>
						</HStack>
						<HStack>
							<Checkbox>Intel Atom</Checkbox>
							<Spacer />
							<Text color='gray.500'>66</Text>
						</HStack>
						<HStack>
							<Checkbox>Intel Celeron</Checkbox>
							<Spacer />
							<Text color='gray.500'>12</Text>
						</HStack>
						<HStack>
							<Checkbox>Intel Core i5</Checkbox>
							<Spacer />
							<Text color='gray.500'>15</Text>
						</HStack>
						<HStack>
							<Checkbox>Intel Core i7</Checkbox>
							<Spacer />
							<Text color='gray.500'>8</Text>
						</HStack>
					</Stack>
				</div>
			</Box>
		</div>
	);
};

export default Filters;
