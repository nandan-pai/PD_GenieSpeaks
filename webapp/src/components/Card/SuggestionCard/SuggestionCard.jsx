import { Box, HStack, Icon, LinkBox, Text, VStack } from "@chakra-ui/react";
import { FaRegThumbsUp } from "react-icons/fa";

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
