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

function ProductDetail() {
	const [productInfo, setProductInfo] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	const getProductInfo = () => {
		axios.get(`http://localhost:5000/api/prod?id=${id}`).then((res) => {
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
				<HStack className={styles.img}>
					{/* <VStack spacing={4}>
					<Box h='50px' w='50px' bg='yellow.200' className={styles.box1} />
					<Box h='50px' w='50px' bg='tomato' className={styles.box2} />
					<Box h='50px' w='50px' bg='pink.100' className={styles.box3} />
				</VStack> */}
					<Stack>
						<Image
							src={productInfo.images[0]}
							w='300px'
							h='300px'
							className={styles.box3}
						/>
						{/* <Box h='300px' w='300px' bg='blue.100' className={styles.box} /> */}
					</Stack>
				</HStack>
				<Box ml='500px'>
					<Box mt='130px'>
						<Heading as='h4' size='md' textAlign={["left", "center"]}>
							{productInfo.title}
						</Heading>
						<HStack ml='480px'>
							<Icon as={FaRegThumbsUp} color='green' />
							<Text fontWeight='semibold' color='green'>
								95.6%
							</Text>
						</HStack>
					</Box>
					<Container maxW='lg'>
						<ProgressBar clr='green' val='80' />
						<ProgressBar clr='red' val='30' />
						<ProgressBar clr='orange' val='60' />
					</Container>
					<Box>
						<Heading as='h5' size='s' mt='25px' textAlign={["left", "center"]}>
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
										desc={review.description}
										upVote='18'
									/>
								);
							})
						)}
						{/* <ReviewCard
						name='Customer 1'
						desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
						upVote='18'
					/>
					<ReviewCard
						name='Customer 2'
						desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
						upVote='8'
					/> */}
					</Container>
				</Box>
			</>
		);
	}
}

export default ProductDetail;
