import {
	Box,
	HStack,
	Icon,
	LinkBox,
	Text,
	VStack,
	useColorMode,
} from "@chakra-ui/react";
import { FaRegThumbsUp } from "react-icons/fa";

const SuggestionCard = () => {
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const handleClick = () => {
		console.log("Suggestion clicked");
	};

	return (
		<LinkBox
			rounded='md'
			borderWidth='1px'
			p={2}
			w='250px'
			h='350px'
			onClick={handleClick}
			_hover={{ cursor: "pointer" }}
			bgColor={isDark ? "#252525" : "#f7fafc"}
		>
			<VStack alignItems='start'>
				<Box w='100%' h='200px' bgColor='red'></Box>
				<Text
					fontWeight='semibold'
					fontSize='18px'
					noOfLines={[1, 2]}
					maxW='200px'
				>
					dfusdhvsifjdafsdsdfd adfaa adgdsgfsgfs gsf gdgvdsgfdf dfaf afa
				</Text>
				<HStack ml='10px'>
					<Icon as={FaRegThumbsUp} color='green' />
					<Text fontWeight='semibold' color='green'>
						90%
					</Text>
				</HStack>
				<Text fontWeight='bold' fontSize='xl'>
					&#8377;8814
				</Text>
			</VStack>
		</LinkBox>
	);
};

export default SuggestionCard;
