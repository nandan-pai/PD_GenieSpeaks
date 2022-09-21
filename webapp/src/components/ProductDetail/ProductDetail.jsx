import styles from "./ProductDetail.css";
import LandingNavBar from "../NavBar/LandingNavBar/LandingNavBar";
import {
	VStack,
	Box,
	Stack,
	HStack,
	Container,
	Heading,
	Text,
	Icon,
	Image,
	Spacer,
	Grid,
	GridItem,
} from "@chakra-ui/react";
import ProgressBar from "../Views/ProgressBar";
import ReviewCard from "../Card/ReviewCard/ReviewCard";
import {
	// FaStarHalfAlt,
	// FaRegStar,
	// FaStar,
	FaRegThumbsUp,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { ApiBaseUrl } from "../../config";

function ProductDetail() {
	const [productInfo, setProductInfo] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	const getProductInfo = () => {
		axios.get(`${ApiBaseUrl}/prod?id=${id}`).then((res) => {
			setProductInfo(res.data.productData);
			setIsLoading(false);
		});
	};

	useEffect(getProductInfo, [id]);

	if (isLoading) {
		return <div></div>;
	} else {
		return (
			<>
				<LandingNavBar />
				<Grid templateColumns='repeat(3, 1fr)' m={10}>
					<GridItem colSpan={1}>
						<Image
							src={productInfo.images[0]}
							w='300px'
							h='300px'
							// className={styles.box3}
						/>
					</GridItem>
					<GridItem colSpan={2}>
						<Box textAlign={["left", "left"]}>
							<Box mt='130px'>
								<Heading mb='10px' fontSize='xl' textAlign={["left", "left"]}>
									{productInfo.title}
								</Heading>
								<HStack mb='50px' alignSelf={["left", "left"]}>
									<Icon as={FaRegThumbsUp} color='green' />
									<Text fontWeight='semibold' color='green'>
										95.6%
									</Text>
								</HStack>
							</Box>
							<HStack>
								<Text mr={7}>Usability</Text>
								<Container>
									<ProgressBar clr='green' val='80' />
								</Container>
								<Text ml={5} color='green'>
									4 / 5
								</Text>
							</HStack>
							<HStack>
								<Text mr={10}>Design</Text>
								<Container>
									<ProgressBar clr='red' val='30' />
								</Container>
								<Text ml={5} color='red'>
									2 / 5
								</Text>
							</HStack>
							<HStack>
								<Text>Build Quality</Text>
								<Container>
									<ProgressBar clr='orange' val='60' />
								</Container>
								<Text ml={5} color='orange'>
									3 / 5
								</Text>
							</HStack>
							<Box>
								<Heading fontSize='lg' mt='50px' textAlign={["left", "left"]}>
									Customer Reviews
								</Heading>
							</Box>
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
												upVote='18'
											/>
										);
									})
								)}
							</Container>
						</Box>
					</GridItem>
					{/* <VStack spacing={4}>
					<Box h='50px' w='50px' bg='yellow.200' className={styles.box1} />
					<Box h='50px' w='50px' bg='tomato' className={styles.box2} />
					<Box h='50px' w='50px' bg='pink.100' className={styles.box3} />
				</VStack> */}
					{/* <Stack>
						<Image
							src={productInfo.images[0]}
							w='300px'
							h='300px'
							className={styles.box3}
						/>
					</Stack> */}
				</Grid>
			</>
		);
	}
}

export default ProductDetail;
