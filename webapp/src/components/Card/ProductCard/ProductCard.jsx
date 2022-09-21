import React from "react";
import {
	Box,
	Grid,
	GridItem,
	Heading,
	HStack,
	Icon,
	LinkBox,
	LinkOverlay,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import {
	// FaStarHalfAlt,
	// FaRegStar,
	// FaStar,
	FaRegThumbsUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./ProductCard.css";

const Card = ({ productName, price, noOfReviews, satisfactionRating, _id }) => {
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/product/${_id}`);
	};

	return (
		<LinkBox
			className='card-container'
			rounded='md'
			borderWidth='1px'
			p={2}
			mt={5}
			mr={10}
			bgColor={isDark ? "" : "white"}
		>
			<HStack spacing={8}>
				<Box bgColor='blue.500' w='200px' h='150px'></Box>
				<Box p={5}>
					<Grid templateColumns='repeat(3, 1fr)' gap={10}>
						<GridItem colSpan={2}>
							<LinkOverlay onClick={handleClick}>
								<Text fontSize='xl' fontWeight='semibold'>
									{productName}
								</Text>
							</LinkOverlay>
							<HStack mt='2' mb='5'>
								<Icon as={FaRegThumbsUp} color='green' />
								<Text fontWeight='semibold' color='green'>
									{satisfactionRating}%
								</Text>
							</HStack>
							<Text>{noOfReviews} reviews</Text>
						</GridItem>
						<GridItem colSpan={1} p={5}>
							<Heading fontSize='xl' ml='20'>
								&#8377;{price}
							</Heading>
							{/* <Icon as={FaStar} color='yellow' mr='2' fontSize='20px' />
							<Icon as={FaStar} color='yellow' mr='2' fontSize='20px' />
							<Icon as={FaStar} color='yellow' mr='2' fontSize='20px' />
							<Icon as={FaStar} color='yellow' mr='2' fontSize='20px' />
							<Icon
								as={FaStarHalfAlt}
								color='yellow.500'
								mr='2'
								fontSize='20px'
							/> */}
						</GridItem>
					</Grid>
				</Box>
			</HStack>
		</LinkBox>
	);
};

export default Card;
