import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiBaseUrl } from "../../config";
import NavBar from "../NavBar/NavBar";
import Loader from "../Loader/Loader";
import {
	Box,
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
} from "@chakra-ui/react";
import { FaRegThumbsUp } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import ReviewCard from "../Card/ReviewCard/ReviewCard";
import AvailableMenu from "../AvailableMenu/AvailableMenu";

const ProductDetail = (props) => {
	const [productInfo, setProductInfo] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();

	const getProductInfo = () => {
		setIsLoading(true);
		axios.get(`${ApiBaseUrl}/prod?id=${id}`).then((res) => {
			setProductInfo(res.data.productData);
			setIsLoading(false);
		});

		// console.log(productInfo);
	};

	useEffect(getProductInfo, [id]);

	if (isLoading) {
		return (
			<div>
				<NavBar
					searchQuery={props.searchQuery}
					setSearchQuery={props.setSearchQuery}
				/>

				<Loader hidden={isLoading} />
				<Loader hidden={isLoading} />
				<Loader hidden={isLoading} />
			</div>
		);
	} else {
		return (
			<>
				<NavBar
					searchQuery={props.searchQuery}
					setSearchQuery={props.setSearchQuery}
				/>

				<SimpleGrid
					templateColumns={{
						base: "repeat(4, 1fr)",
						xl: "repeat(5, 1fr)",
						lg: "repeat(3, 1fr)",
						md: "repeat(3, 1fr)",
						sm: "repeat(1, 1fr)",
					}}
					minChildWidth='500px'
					spacing={5}
					mt={10}
					ml={20}
				>
					<GridItem colSpan={1}>
						<Image
							src={productInfo.images[0]}
							w='300px'
							h='300px'
							ml='35px'
							justifyContent='center'
							alignItems='center'
							alignSelf='center'
							justifySelf='center'
						/>
					</GridItem>

					<GridItem colSpan={{ base: 2, xl: 3, lg: 3, md: 3, sm: 1 }} ml='10px'>
						<Box textAlign={["left", "left"]}>
							<Heading
								mb='10px'
								fontSize={{
									base: "xl",
									xl: "xl",
									lg: "lg",
									md: "md",
									sm: "md",
								}}
								textAlign={["left, left"]}
							>
								{productInfo.title}
							</Heading>
							<HStack mb='50px' alignSelf={["left", "left"]}>
								<Icon as={FaRegThumbsUp} color='green' />
								<Text fontWeight='semibold' color='green'>
									{productInfo.satisfactory_rating}%
								</Text>
								<Icon as={BsDot} color='gray.100' ml='20px' mr='20px' />
								<Text>{productInfo.reviews.length} reviews</Text>
							</HStack>
						</Box>

						<Show below='xl'>
							<GridItem
								colSpan={{ base: 1, xl: 1, lg: 2, md: 2, sm: 1 }}
								mb={5}
							>
								<AvailableMenu productData={productInfo} />
							</GridItem>
						</Show>

						<Tabs>
							<TabList>
								<Tab>About Product</Tab>
								<Tab>Reviews</Tab>
							</TabList>

							<TabPanels>
								<TabPanel>
									<Grid
										templateColumns='repeat(2, 1fr)'
										w={{
											base: "700px",
											xl: "700px",
											lg: "500px",
											md: "300px",
											sm: "100px",
										}}
										minW='400px'
										gap={{
											base: "5px",
											xl: "5px",
											lg: "3px",
											md: "1px",
											sm: "0px",
										}}
									>
										{/* {productInfo.identifiers.map((iden, index) => {
											return (
												<>
													<GridItem>
														<Text>{iden[0]}</Text>
													</GridItem>
													<GridItem>
														<Text>{iden[1]}</Text>
													</GridItem>
												</>
											);
										})} */}
										<GridItem>
											<Text color='gray'>Brand</Text>
										</GridItem>
										<GridItem>
											<Text fontWeight='semibold'>
												{productInfo.identifiers["Brand"]}
											</Text>
										</GridItem>

										<GridItem>
											<Text color='gray'>Series</Text>
										</GridItem>
										<GridItem>
											<Text fontWeight='semibold' textTransform='uppercase'>
												{productInfo.identifiers["Series"]}
											</Text>
										</GridItem>

										<GridItem>
											<Text color='gray'>Item Model Number</Text>
										</GridItem>
										<GridItem>
											<Text fontWeight='semibold' textTransform='uppercase'>
												{productInfo.identifiers["Item model number"]}
											</Text>
										</GridItem>
									</Grid>
								</TabPanel>
								<TabPanel>
									<Container size='2xl' maxW='800px' maxH='200px'>
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
														reviewURL={review.url}
														desc={review.description}
														ecommerce={review.ecommerce.name}
														upVote='18'
													/>
												);
											})
										)}
									</Container>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</GridItem>

					<Show above='xl'>
						<GridItem colSpan={{ base: 1, xl: 1, lg: 2, md: 2, sm: 1 }}>
							<AvailableMenu productData={productInfo} />
						</GridItem>
					</Show>
				</SimpleGrid>
			</>
		);
	}
};

export default ProductDetail;
