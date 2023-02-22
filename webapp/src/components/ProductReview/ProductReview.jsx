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
} from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import InputReviewStars from "./InputReviewStars";

const ProductReview = (props) => {
	const [productInfo, setProductInfo] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [reviewStar, setReviewStar] = useState(0);

	const [formValues, setFormValues] = useState({
		heading: "",
		review: "",
	});

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

	const handleBack = () => {
		navigate(`/product/${id}`);
	};

	const handleHeadingChange = (e) => {
		e.persist();

		setFormValues((values) => ({
			...values,
			heading: e.target.value,
		}));
	};

	const handleReviewChange = (e) => {
		e.persist();

		setFormValues((values) => ({
			...values,
			review: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (formValues.heading !== "" && formValues.review !== "") {
			console.log(formValues);
		} else {
			console.error("Form not filled completely");
		}
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
				<form onSubmit={handleSubmit}>
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
							<InputReviewStars
								reviewStar={reviewStar}
								setReviewStar={setReviewStar}
							/>

							<Divider orientation='horizontal' mb={5} mt={5} />

							<Heading size='sm'>Add a Heading</Heading>
							<Input
								type='text'
								name='heading'
								placeholder='What should everyone know?'
								value={formValues.heading}
								onChange={handleHeadingChange}
								_hover={{ borderColor: "blue" }}
							/>

							<Divider orientation='horizontal' mb={5} mt={5} />

							<Heading size='sm'>Add Product Review</Heading>
							<Textarea
								type='text'
								name='review'
								h='150px'
								resize='vertical'
								placeholder='What did you use the product for? What did you like or dislike?'
								value={formValues.review}
								onChange={handleReviewChange}
								_hover={{ borderColor: "blue" }}
							/>

							<Divider orientation='horizontal' mb={5} mt={5} />

							<div className='postBtn'>
								<Button
									type='submit'
									size='md'
									bgColor='gray.100'
									color='white'
								>
									Post
								</Button>
							</div>
						</VStack>
					</Box>
				</form>
			</>
		);
	}
};

export default ProductReview;
