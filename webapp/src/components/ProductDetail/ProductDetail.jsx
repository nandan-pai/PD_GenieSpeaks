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
import AvailableMenu from "./AvailableMenu/AvailableMenu";
import RatingCard from "./RatingCard/RatingCard";

import "./ProductDetail.css";
import AttributeTab from "./AttributeTab";
import ReviewTab from "./ReviewTab";

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
									<AttributeTab attributes={{...productInfo.identifiers, ...productInfo.attributes}} />
								</TabPanel>
								<TabPanel>
									<ReviewTab reviews={productInfo.reviews}/>
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
