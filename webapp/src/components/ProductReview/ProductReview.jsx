import axios from "axios";
import React, { useEffect, useState } from "react";
import { ApiBaseUrl } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Loader from "../Loader/Loader";
import {
	Box,
	Button,
	Divider,
	HStack,
	Heading,
	Icon,
	Image,
	Input,
	Text,
	Textarea,
	VStack,
	useColorMode,
} from "@chakra-ui/react";
import { FaChevronLeft, FaRegStar, FaStar } from "react-icons/fa";

const ProductReview = (props) => {
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const [productInfo, setProductInfo] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const initialList = [
		{
			index: 0,
			isActive: false,
		},
		{
			index: 1,
			isActive: false,
		},
		{
			index: 2,
			isActive: false,
		},
		{
			index: 3,
			isActive: false,
		},
		{
			index: 4,
			isActive: false,
		},
	];

	const [starList, setStarList] = useState(initialList);
	const [currentIndex, setCurrentIndex] = useState(0);

	const navigate = useNavigate();

	const { id } = useParams();

	const getProductInfo = () => {
		setIsLoading(true);
		axios.get(`${ApiBaseUrl}/prod?id=${id}`).then((res) => {
			setProductInfo(res.data.productData);
			setIsLoading(false);
		});
	};

	useEffect(getProductInfo, [id]);

	const handleRatingChange = (index) => {
		setCurrentIndex(index);

		const newStarList = [...starList];
		// const toggleStar = newStarList.find((star) => star.index === index);

		// ! TO FIX
		// newStarList.map((star) => {
		// 	if (!currentIndex.isActive) {
		// 		if (star.index <= currentIndex) {
		// 			star.isActive = true;
		// 		}
		// 	} else {
		// 		if (star.index <= currentIndex) {
		// 			star.isActive = true;
		// 		}
		// 	}
		// });

		// toggleStar.isActive = !toggleStar.isActive;
		setStarList(newStarList);
	};

	const handleBack = () => {
		navigate(`/product/${id}`);
	};

	if (isLoading) {
		return (
			<div>
				<NavBar
					searchQuery={props.searchQuery}
					setSearchQuery={props.setSearchQuery}
					setFilter={props.setFilter}
				/>

				<Loader hidden={!isLoading} />
				<Loader hidden={!isLoading} />
				<Loader hidden={!isLoading} />
			</div>
		);
	} else {
		return (
			<>
				<NavBar
					searchQuery={props.searchQuery}
					setSearchQuery={props.setSearchQuery}
					setFilter={props.setFilter}
				/>
				<Box mx={80} p={5}>
					<HStack
						mb={5}
						_hover={{ textDecoration: "underline", cursor: "pointer" }}
						onClick={handleBack}
						w='80px'
					>
						<Icon as={FaChevronLeft} />
						<Text fontWeight='semibold'>Back</Text>
					</HStack>
					<VStack mx={30} align='start' spacing={5}>
						<Heading size='md'>Write a Review</Heading>
						<HStack align='start' mt={5} spacing={5}>
							<Image src={productInfo.images[0]} w='150px' h='150px' />
							<Text>{productInfo.title}</Text>
						</HStack>

						<Divider orientation='horizontal' />

						<Heading size='sm'>Overall Rating</Heading>
						<HStack alignSelf='start'>
							{starList.map((star) => {
								return (
									<Icon
										as={star.isActive ? FaStar : FaRegStar}
										mr='2px'
										fontSize='30px'
										color={
											star.isActive ? "orange" : isDark ? "white" : "black"
										}
										key={star.index}
										_hover={{ cursor: "pointer", color: "orange" }}
										onClick={() => handleRatingChange(star.index)}
									/>
								);
							})}
						</HStack>

						<Divider orientation='horizontal' mb={5} mt={5} />

						<Heading size='sm'>Add a Heading</Heading>
						<Input
							type='text'
							_hover={{ borderColor: "blue" }}
							placeholder='What should everyone know?'
						/>

						<Divider orientation='horizontal' mb={5} mt={5} />

						<Heading size='sm'>Add Product Review</Heading>
						<Textarea
							type='text'
							h='150px'
							_hover={{ borderColor: "blue" }}
							resize='vertical'
							placeholder='What did you use the product for? What did you like or dislike?'
						/>

						<Divider orientation='horizontal' mb={5} mt={5} />

						<div className='postBtn'>
							<Button type='submit' size='md' bgColor='gray.100' color='white'>
								Post
							</Button>
						</div>
					</VStack>
				</Box>
			</>
		);
	}
};

export default ProductReview;
