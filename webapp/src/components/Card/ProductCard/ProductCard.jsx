import React from "react";
import {
	Box,
	Grid,
	GridItem,
	Heading,
	HStack,
	Icon,
	Image,
	LinkBox,
	LinkOverlay,
	SimpleGrid,
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

const ProductCard = ({
	productName,
	price,
	noOfReviews,
	productImage,
	satisfactionRating,
	_id,
}) => {
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
			maxH='300px'
			bgColor={isDark ? "" : "white"}
		>
			<HStack spacing={5}>
				<Image ml={5} src={productImage} w='150px' h='100px' />
				<Box p={5}>
					<Grid templateColumns='repeat(3, 1fr)' gap={10}>
						<GridItem colSpan={2}>
							<LinkOverlay onClick={handleClick}>
								<Text fontSize='xl' fontWeight='semibold' noOfLines={[1, 2, 3]}>
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

export default ProductCard;
