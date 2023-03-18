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
	obj,
	index,
	setFilter,
	filter,
	defaultFilterValue
}) {
	// console.log(`GenerateChecklist-${obj.name}`, defaultFilterValue? defaultFilterValue["value"]: defaultFilterValue)
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const handleCheckboxChange = (e) => {
		setFilter({
			...filter,
			[obj.name.toString()]: {
				identifier: obj.identifier,
				type: obj.return,
				value: e,
			},
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
			>
				<Stack mt='2' ml='2' pr={5} className='scrollable'>
					{obj.value.map((objval) => {
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
