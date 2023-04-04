import {
	Checkbox,
	CheckboxGroup,
	HStack,
	Spacer,
	Stack,
	Text,
	useColorMode,
} from "@chakra-ui/react";

export default function GenerateChecklist({
	index = 0,
	obj = { identifier: "", name: "", return: "", type: "", value: [] },
	defaultFilterValue = [],
	filter = {},
	setFilter
}) {
	// console.log(`GenerateChecklist-${obj.name}`, defaultFilterValue? defaultFilterValue["value"]: defaultFilterValue)
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const handleCheckboxChange = (val) => {
		if (!val.length) {
			delete filter[obj.name.toString()]
		} else {
			filter[obj.name.toString()] = {
				name: obj.name,
				type: obj.type,
				identifier: obj.identifier,
                return_format: obj.return_format,
                return_type: obj.return_type,
				value: val
			}
		}
		setFilter({
			...filter
		})
	}

	return (
		<div className='filter-category' key={index}>
			<Text fontSize='md' fontWeight='semibold' mt='5'>
				{obj.name}
			</Text>
			<CheckboxGroup
				onChange={(e) =>
					handleCheckboxChange(e)
				}
				defaultValue={defaultFilterValue}
				value={defaultFilterValue}
			>
				<Stack mt='2' ml='2' pr={5} className='scrollable'>
					{obj.value.filter(objval => objval._id).map((objval) => {
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
}
