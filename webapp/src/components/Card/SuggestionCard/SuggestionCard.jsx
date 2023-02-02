import {
	Box,
	HStack,
	Icon,
	LinkBox,
	Text,
	Tooltip,
	VStack,
} from "@chakra-ui/react";
import { FaRegThumbsUp } from "react-icons/fa";
import { GoInfo } from "react-icons/go";

const SuggestionCard = () => {
	const handleClick = () => {
		console.log("Suggestion clicked");
	};

	return (
		<LinkBox
			rounded='md'
			borderWidth='1px'
			p={2}
			maxW='750px'
			onClick={handleClick}
			_hover={{ cursor: "pointer" }}
		>
			<HStack>
				<Box w='120px' h='120px' bgColor='red' minW='100px'></Box>
				<VStack alignItems='start'>
					<HStack>
						<Text color='gray.100' fontWeight='semibold'>
							Suggestion
						</Text>
						<Tooltip
							label='Based on your previous searches and trending products'
							fontSize='md'
							fontWeight='md'
							placement='auto'
							hasArrow
						>
							<GoInfo />
						</Tooltip>
					</HStack>
					<Text
						fontWeight='semibold'
						fontSize='18px'
						noOfLines={[1, 2, 3]}
						maxW='200px'
					>
						dfusdhvsifjdafsdsdfd adfaa
					</Text>
					<HStack spacing={10}>
						<HStack>
							<Icon as={FaRegThumbsUp} color='green' />
							<Text fontWeight='semibold' color='green'>
								90%
							</Text>
						</HStack>
						<Text fontWeight='bold' fontSize='xl'>
							&#8377;8814
						</Text>
					</HStack>
				</VStack>
			</HStack>
		</LinkBox>
	);
};

export default SuggestionCard;
