import {
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderMark,
	RangeSliderThumb,
	RangeSliderTrack,
	Text,
	// useColorMode,
} from "@chakra-ui/react";
import { BiRupee } from "react-icons/bi";
// import { useState } from "react";

export default function GenerateRange({
	index = 0,
	obj = { identifier: "", name: "", return: "", type: "", value: [0, 100000] },
	defaultFilterValue = [0, 100000],
	filter = {},
	setFilter,
}) {
	// const [currRange, setCurrRange] = useState(obj.value);
	// const { colorMode } = useColorMode();
	// const isDark = colorMode === "dark";

	const handleRangeChange = (val) => {
		// setCurrRange(val)
		if (!val.length) {
			delete filter[obj.name.toString()];
		} else {
			filter[obj.name.toString()] = {
				name: obj.name,
				type: obj.type,
				identifier: obj.identifier,
				return_format: obj.return_format,
				return_type: obj.return_type,
				value: val,
			};
		}
		setFilter({
			...filter,
		});
	};

	return (
		<div className='filter-category price' key={index}>
			<Text fontSize='md' fontWeight='semibold' mt='5' mb='2'>
				{obj.name}
			</Text>
			<RangeSlider
				defaultValue={defaultFilterValue}
				value={defaultFilterValue}
				min={obj.value[0]}
				max={obj.value[1]}
				step={10000}
				onChange={(e) => {
					handleRangeChange(e);
				}}
			>
				<RangeSliderTrack bg='gray'>
					<RangeSliderFilledTrack bg='tomato' />
				</RangeSliderTrack>
				<RangeSliderMark
					value={defaultFilterValue[0]}
					mt='1'
					ml='-2.5'
					fontSize='sm'
				>
					{defaultFilterValue[0]}
				</RangeSliderMark>
				<RangeSliderMark
					value={defaultFilterValue[1]}
					mt='-6'
					ml='-35'
					fontSize='sm'
				>
					{defaultFilterValue[1]}
				</RangeSliderMark>

				<RangeSliderThumb index={0} as={BiRupee} />
				<RangeSliderThumb index={1} as={BiRupee} />
			</RangeSlider>
		</div>
	);
}
