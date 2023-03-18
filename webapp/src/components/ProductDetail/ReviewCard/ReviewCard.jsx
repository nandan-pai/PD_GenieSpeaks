import React from "react";
import {
	Box,
	HStack,
	VStack,
	Icon,
	Text,
	Image,
	Spacer,
	Link,
	Show,
} from "@chakra-ui/react";
import {
	FaStar,
	FaAmazon,
	FaRegStar,
	// FaRegThumbsUp,
	// FaRegThumbsDown,
} from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";
import { GoVerified } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";

const ReviewCard = (props) => {
	// console.log(props.stars);

	return (
		<Box rounded='md' borderWidth='1px' p={5} mt={5} mr={2} key={props._id}>
			<HStack spacing={{ xl: 8, lg: 6, md: 4, sm: 2, base: 2 }}>
				<Show above='md'>
					<Image
						borderRadius='full'
						boxSize='50px'
						src='https://bit.ly/dan-abramov'
						// src={ApiBaseUrl+ "/static/" + props.user.profilepic}
						alt={props.user.name}
					/>
				</Show>
				<VStack>
					<HStack>
						<Text
							fontSize={{ xl: "lg", lg: "lg", md: "md", sm: "md", base: "md" }}
							fontWeight='semibold'
							alignSelf='start'
						>
							{props.name}
						</Text>
						<Link href={props.reviewURL} isExternal>
							<Icon as={FiExternalLink} color='gray.100' mt='5px' />
						</Link>
						{props.verified && (
							<HStack>
								<Text color='blue'>Verified</Text>
								<GoVerified color='blue' />
							</HStack>
						)}
					</HStack>
					<HStack mb='2' alignSelf='start'>
						{[...Array(props.stars)].map((e, i) => {
							return (
								<Icon
									as={FaStar}
									color='yellow'
									mr='2px'
									fontSize='20px'
									key={i}
								/>
							);
						})}
						{[...Array(props.remainingStars)].map((e, i) => {
							return <Icon as={FaRegStar} mr='2px' fontSize='20px' key={i} />;
						})}
					</HStack>
				</VStack>
				<Spacer />
				<VStack>
					<Text fontWeight='semibold'>Posted on</Text>
					{props.ecommerce === "Amazon" ? (
						<Link href='https://www.amazon.com' isExternal>
							<Icon as={FaAmazon} mr='2' fontSize='20px' />
						</Link>
					) : (
						<Link href='https://www.flipkart.com' isExternal>
							<Icon as={SiFlipkart} mr='2' fontSize='20px' />
						</Link>
					)}
				</VStack>
			</HStack>
			<Box>
				<VStack mt='15px' mb='15px' textAlign='left' width='100%'>
					<Text fontSize='md' fontWeight='semibold' alignSelf='start'>
						{props.title}
					</Text>
					<Text alignSelf='start' noOfLines={[1, 2, 3]} mt={5}>
						{props.desc}
					</Text>
					{/* <HStack>
						<Icon as={FaRegThumbsUp} mr='1' fontSize='20px' />
						<Text>{props.upVote}</Text>
						<Icon as={FaRegThumbsDown} mr='2' fontSize='20px' />
					</HStack> */}
				</VStack>
			</Box>
		</Box>
	);
};

export default ReviewCard;
