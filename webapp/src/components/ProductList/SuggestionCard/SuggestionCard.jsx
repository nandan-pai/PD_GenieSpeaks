import {
	Box,
	HStack,
	Icon,
	Image,
	LinkBox,
	Text,
	VStack,
	useColorMode,
} from "@chakra-ui/react";
import { FaRegThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SuggestionCard = ({
	_id,
	productName,
	productImage,
	satisfactionRating,
	price,
}) => {
	const navigate = useNavigate();

	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const handleClick = () => {
		navigate(`/product/${_id}`);
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
				<Image src={productImage} h='200px' w='100%' objectFit='contain' />
				<Text
					fontWeight='semibold'
					fontSize='18px'
					noOfLines={[1, 2]}
					maxW='200px'
				>
					{productName}
				</Text>
				<HStack ml='10px'>
					<Icon as={FaRegThumbsUp} color='green' />
					<Text fontWeight='semibold' color='green'>
						{satisfactionRating}%
					</Text>
				</HStack>
				<Text fontWeight='bold' fontSize='xl'>
					&#8377;{price}
				</Text>
			</VStack>
		</LinkBox>
	);
};

export default SuggestionCard;
