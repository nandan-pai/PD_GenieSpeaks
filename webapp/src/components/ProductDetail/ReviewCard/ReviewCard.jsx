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
	Alert,
	AlertIcon,
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

const ReviewCard = ({
	_id,
	name = "null",
	title = "null",
	stars = "null",
	remainingStars = "null",
	reviewURL = "null",
	desc = "null",
	user = "null",
	verified = false,
	ecommerce = "null",
	upvotes = "null",
	authentic = false,
}) => {
	return (
		<Box
			rounded='md'
			borderWidth='1px'
			borderColor={authentic ? "" : "red"}
			p={5}
			mt={5}
			mr={2}
			key={_id}
		>
			{authentic === false ? (
				<Alert status='warning' mb='2'>
					<AlertIcon />
					This review is classified as unauthentic by our algorithm.
				</Alert>
			) : (
				<></>
			)}
			<HStack spacing={{ xl: 8, lg: 6, md: 4, sm: 2, base: 2 }}>
				<Show above='md'>
					<Image
						borderRadius='full'
						boxSize='50px'
						src='https://bit.ly/dan-abramov'
						// src={ApiBaseUrl+ "/static/" + props.user.profilepic}
						alt={user.name}
					/>
				</Show>
				<VStack>
					<HStack>
						<Text
							fontSize={{ xl: "lg", lg: "lg", md: "md", sm: "md", base: "md" }}
							fontWeight='semibold'
							alignSelf='start'
						>
							{name}
						</Text>
						{verified && (
							<HStack>
								<GoVerified color='blue' />
							</HStack>
						)}
						{ecommerce === "Amazon" && <Link href={reviewURL} isExternal>
							<Icon as={FiExternalLink} color='gray.100' mt='5px' />
						</Link>}
					</HStack>
					<HStack mb='2' alignSelf='start'>
						{[...Array(stars)].map((e, i) => {
							return (
								<Icon
									as={FaStar}
									color='orange'
									mr='2px'
									fontSize='20px'
									key={i}
								/>
							);
						})}
						{[...Array(remainingStars)].map((e, i) => {
							return <Icon as={FaRegStar} mr='2px' fontSize='20px' key={i} />;
						})}
					</HStack>
				</VStack>
				<Spacer />
				<VStack>
					<Text fontWeight='semibold'>Posted on</Text>
					{ecommerce === "Amazon" ? (
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
						{title}
					</Text>
					<Text alignSelf='start' noOfLines={[1, 2, 3]} mt={5}>
						{desc}
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
