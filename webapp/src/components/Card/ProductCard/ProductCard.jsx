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
	Tag,
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
	isRenewed,
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
					{isRenewed ? (
						<GridItem colSpan={2} rowSpan={1}>
							<Tag size='md' variant='solid' colorScheme='green'>
								Renewed
							</Tag>
						</GridItem>
					) : (
						<></>
					)}
					<Grid templateColumns='repeat(2, 1fr)' templateRows='repeat(3, 1fr)'>
						<GridItem colSpan={2} rowSpan={2}>
							<LinkOverlay onClick={handleClick}>
								<Text fontSize='lg' fontWeight='semibold' noOfLines={[4, 3, 4]}>
									{productName}
								</Text>
							</LinkOverlay>
						</GridItem>
						<GridItem colSpan={2}>
							<HStack mb='5'>
								<Icon
									as={FaRegThumbsUp}
									color={
										satisfactionRating < 35
											? "red"
											: satisfactionRating < 70
											? "orange"
											: "green"
									}
								/>
								<Text
									fontWeight='semibold'
									color={
										satisfactionRating < 35
											? "red"
											: satisfactionRating < 70
											? "orange"
											: "green"
									}
								>
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
