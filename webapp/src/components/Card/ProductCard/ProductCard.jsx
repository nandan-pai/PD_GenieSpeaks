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
			// borderWidth='1px'
			p={5}
			mt={5}
			mr={5}
			ml={{ sm: 5 }}
			maxH='300px'
			bgColor={isDark ? "" : "white"}
		>
			<HStack spacing={5}>
				<Box w='500px' maxH='200px'>
					<Image src={productImage} maxH='200px' />
				</Box>
				<Box>
					<Grid templateColumns='repeat(2, 1fr)' templateRows='repeat(3, 1fr)'>
						<GridItem colSpan={2} rowSpan={2}>
							<LinkOverlay onClick={handleClick}>
								<Text fontSize='lg' fontWeight='semibold' noOfLines={[1, 2, 3]}>
									{productName}
								</Text>
							</LinkOverlay>
						</GridItem>
						<GridItem colSpan={2}>
							<HStack mb='5'>
								<Icon as={FaRegThumbsUp} color='green' />
								<Text fontWeight='semibold' color='green'>
									{satisfactionRating}%
								</Text>
							</HStack>
						</GridItem>

						<GridItem colSpan={1}>
							<Text>{noOfReviews} reviews</Text>
						</GridItem>
						<GridItem colSpan={1}>
							<Heading fontSize='xl'>
								{price ? <>&#8377;{price}</> : "Unavailable"}
							</Heading>
						</GridItem>
					</Grid>
				</Box>
			</HStack>
		</LinkBox>
	);
};

export default ProductCard;
