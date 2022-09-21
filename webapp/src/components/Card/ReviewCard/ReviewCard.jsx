import React from "react";
import {
	Box,
	HStack,
	VStack,
	Icon,
	Text,
	Image,
	Spacer,
} from "@chakra-ui/react";
import {
	FaStar,
	FaAmazon,
	// FaRegThumbsUp,
	// FaRegThumbsDown,
} from "react-icons/fa";
import { GoVerified } from "react-icons/go";

import styles from "./ReviewCard.css";

const ReviewCard = (props) => {
	return (
		<Box
			className={styles["card-container"]}
			rounded='md'
			borderWidth='1px'
			p={5}
			mt={5}
			mr={10}
		>
			<HStack spacing={8}>
				<Image
					borderRadius='full'
					boxSize='50px'
					src='https://bit.ly/dan-abramov'
					alt='Dan Abramov'
				/>
				<VStack>
					<HStack>
						<Text fontSize='lg' fontWeight='semibold'>
							{props.name}
						</Text>
						{props.verified && <GoVerified />}
					</HStack>
					<HStack mb='2'>
						{props.review_star}
						<Icon as={FaStar} color='yellow' fontSize='20px' />
						<Icon as={FaStar} color='yellow' mr='2' fontSize='20px' />
						<Icon as={FaStar} color='yellow' mr='2' fontSize='20px' />
						<Icon as={FaStar} color='yellow' mr='2' fontSize='20px' />
						<Icon as={FaStar} color='yellow' fontSize='20px' />
					</HStack>
				</VStack>
				<Spacer></Spacer>
				<VStack>
					<Text fontWeight='semibold'>Posted on</Text>
					<Icon as={FaAmazon} mr='2' fontSize='20px' />
				</VStack>
			</HStack>
			{/* <HStack spacing={8}>
				<VStack>
					<HStack p={4}>
						<Image
							borderRadius='full'
							boxSize='50px'
							src='https://bit.ly/dan-abramov'
							alt='Dan Abramov'
						/>
						<Text fontSize='lg' fontWeight='semibold'>
							{props.name}
						</Text>
						{props.verified && <GoVerified />}
					</HStack>
					<HStack mb='2'>
						<Icon as={FaStar} color='yellow' mr='2' fontSize='20px' />
						<Icon as={FaStar} color='yellow' mr='2' fontSize='20px' />
						<Icon as={FaStar} color='yellow' mr='2' fontSize='20px' />
						<Icon as={FaStar} color='yellow' mr='2' fontSize='20px' />
						<Icon as={FaStar} color='yellow' mr='2' fontSize='20px' />
					</HStack>
				</VStack>
				<Spacer />
				<VStack display='flex' alignSelf='flex-end'>
					<Text>Posted On</Text>
					<Icon as={FaAmazon} mr='2' fontSize='20px' />
				</VStack>
			</HStack> */}
			<Box alignContent='left'>
				<VStack mt='15px' mb='15px'>
					<Text fontSize='md' fontWeight='semibold'>
						{props.title}
					</Text>
					<Text textAlign='left' noOfLines={[1, 2, 3]} mt={5}>
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
