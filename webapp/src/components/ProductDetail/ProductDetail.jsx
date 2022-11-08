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

				<Grid templateColumns='repeat(4, 1fr)' mt={10} ml={20}>
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
						<HStack spacing={5} justifyContent='center' mt='10px'>
							<Box h='50px' w='50px' bg='yellow.200' />
							<Box h='50px' w='50px' bg='tomato' />
							<Box h='50px' w='50px' bg='blue.200' />
							<Box h='50px' w='50px' bg='pink.200' />
						</HStack>
					</GridItem>

					<GridItem colSpan={2} ml='10px'>
						<Box textAlign={["left", "left"]}>
							<Heading mb='10px' fontSize='xl' textAlign={["left, left"]}>
								{productInfo.title}
							</Heading>
							<HStack mb='50px' alignSelf={["left", "left"]}>
								<Icon as={FaRegThumbsUp} color='green' />
								<Text fontWeight='semibold' color='green'>
									95.6%
								</Text>
								<Icon as={BsDot} color='gray.100' ml='20px' mr='20px' />
								<Text>{productInfo.reviews.length} reviews</Text>
							</HStack>
						</Box>

						<Tabs>
							<TabList>
								<Tab>About Product</Tab>
								<Tab>Reviews</Tab>
							</TabList>

							<TabPanels>
								<TabPanel>
									<Grid templateColumns='repeat(2, 1fr)' w='500px' gap='5px'>
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

					<GridItem colSpan={1}>
						<AvailableMenu />
					</GridItem>
				</Grid>
			</>
		);
	}
};

export default ProductDetail;
