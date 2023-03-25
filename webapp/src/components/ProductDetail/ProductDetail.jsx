import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiBaseUrl } from "../../config";
import NavBar from "../NavBar/NavBar";
import Loader from "../Loader/Loader";
import {
	Box,
	Button,
	Container,
	Grid,
	GridItem,
	Heading,
	HStack,
	Icon,
	Image,
	Show,
	SimpleGrid,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	VStack,
} from "@chakra-ui/react";
import { FaRegThumbsUp } from "react-icons/fa";
import { BsDot, BsPencilFill } from "react-icons/bs";
import ReviewCard from "./ReviewCard/ReviewCard";
import AvailableMenu from "./AvailableMenu/AvailableMenu";
import RatingCard from "./RatingCard/RatingCard";

import "./ProductDetail.css";

const ProductDetail = (props) => {
	const [productInfo, setProductInfo] = useState({});
	const [isLoading, setIsLoading] = useState(true);
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

	const handleReviewBtn = () => {
		navigate(`/product/${id}/review`);
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

				<SimpleGrid
					templateColumns={{
						xl: "repeat(5, 1fr)",
						lg: "repeat(5, 1fr)",
						md: "repeat(5, 1fr)",
						sm: "repeat(1, 1fr)",
						base: "repeat(1, 1fr)",
					}}
					minChildWidth='500px'
					spacing={{ xl: 10, lg: 10, md: 5, sm: 3, base: 3 }}
					mt={10}
					ml={{ xl: 20, lg: 20, md: 10, sm: 5, base: 5 }}
				>
					<GridItem colSpan={1}>
						<Show below='md'>
							<Heading
								mb='10px'
								fontSize={{
									md: "md",
									sm: "md",
									base: "md",
								}}
								textAlign={["left, left"]}
								w='90%'
							>
								{productInfo.title}
							</Heading>
						</Show>
						<Image
							src={productInfo.images[0]}
							w={{
								xl: "300px",
								lg: "250px",
								md: "200px",
								sm: "200px",
								base: "200px",
							}}
							h={{
								xl: "300px",
								lg: "250px",
								md: "200px",
								sm: "200px",
								base: "200px",
							}}
							ml='35px'
							justifyContent='center'
							alignItems='center'
							alignSelf='center'
							justifySelf='center'
						/>

						<Show above='md'>
							<VStack>
								<RatingCard />
								<Button
									leftIcon={<BsPencilFill />}
									bgColor='gray.100'
									color='white'
									onClick={handleReviewBtn}
								>
									Write a Review
								</Button>
							</VStack>
						</Show>
					</GridItem>

					<GridItem colSpan={{ xl: 3, lg: 3, md: 3, sm: 1, base: 1 }}>
						<Box textAlign={["left", "left"]}>
							<Show above='md'>
								<Heading
									mb='10px'
									fontSize={{
										xl: "xl",
										lg: "lg",
										md: "md",
									}}
									textAlign={["left, left"]}
								>
									{productInfo.title}
								</Heading>
							</Show>
							<HStack mb='50px' alignSelf={["left", "left"]}>
								<Icon as={FaRegThumbsUp} color='green' />
								<Text fontWeight='semibold' color='green'>
									{parseFloat(productInfo.satisfactory_rating).toFixed(2)}%
								</Text>
								<Icon as={BsDot} color='gray.100' ml='20px' mr='20px' />
								<Text>{productInfo.reviews.length} reviews</Text>
							</HStack>
						</Box>

						<Show below='xl'>
							<GridItem
								colSpan={{ xl: 1, lg: 2, md: 2, sm: 1, base: 1 }}
								mb={5}
							>
								<AvailableMenu ecommerce={productInfo.ecommerce} />
							</GridItem>
						</Show>
						<Show below='md'>
							<Button
								leftIcon={<BsPencilFill />}
								bgColor='gray.100'
								color='white'
								onClick={handleReviewBtn}
								w='90vw'
							>
								Write a Review
							</Button>
						</Show>

						<Tabs>
							<TabList>
								<Tab>About Product</Tab>
								{productInfo.reviews.length > 0 ? <Tab>Reviews</Tab> : <></>}
							</TabList>

							<TabPanels>
								<TabPanel>
									<Box
										className='scrollable-content'
										h='90vh'
										w={{
											xl: "48vw",
											lg: "48vw",
											md: "60vw",
											sm: "95vw",
											base: "95vw",
										}}
										overflow='auto'
									>
										<Grid
											templateColumns='repeat(2, 1fr)'
											w={{
												xl: "100%",
												lg: "100%",
												md: "80%",
												sm: "90vw",
												base: "90vw",
											}}
											gap={{
												xl: "5px",
												lg: "3px",
												md: "1px",
												sm: "0px",
												base: "0px",
											}}
										>
											{Object.keys(productInfo.identifiers).map(
												(identifier, index) => {
													return (
														<>
															<GridItem key={identifier}>
																<Text color='gray'>{identifier}</Text>
															</GridItem>
															<GridItem key={index}>
																<Text fontWeight='semibold'>
																	{productInfo.identifiers[identifier]}
																</Text>
															</GridItem>
														</>
													);
												}
											)}

											{Object.keys(productInfo.attributes).map(
												(attribute, index) => {
													return (
														<>
															<GridItem key={attribute}>
																<Text color='gray'>{attribute}</Text>
															</GridItem>
															<GridItem key={index * -1}>
																<Text fontWeight='semibold'>
																	{productInfo.attributes[attribute]}
																</Text>
															</GridItem>
														</>
													);
												}
											)}
										</Grid>
									</Box>
								</TabPanel>
								<TabPanel>
									<Box
										className='scrollable-reviews'
										h='90vh'
										w={{
											xl: "48vw",
											lg: "48vw",
											md: "60vw",
											sm: "95vw",
											base: "95vw",
										}}
										overflow='auto'
									>
										<Container
											size='2xl'
											maxW='800px'
											maxH='200px'
											w='fit-content'
										>
											{isLoading ? (
												<div></div>
											) : (
												productInfo.reviews.map((review, index) => {
													return (
														<ReviewCard
															key={review._id}
															name={review.user.name}
															title={review.title}
															stars={review.stars}
															remainingStars={5 - review.stars}
															reviewURL={review.url}
															desc={review.description}
															user={review.user}
															ecommerce={review.ecommerce.name}
															upVote='18'
														/>
													);
												})
											)}
										</Container>
									</Box>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</GridItem>

					<Show above='xl'>
						<GridItem
							colSpan={{ xl: 1, lg: 2, md: 2, sm: 1, base: 1 }}
							w='fit-content'
						>
							<AvailableMenu ecommerce={productInfo.ecommerce} />
						</GridItem>
					</Show>
				</SimpleGrid>
			</>
		);
	}
};

export default ProductDetail;
