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
	FaRegThumbsUp,
	FaRegThumbsDown,
} from "react-icons/fa";
import { GoVerified } from "react-icons/go";

import styles from "./ReviewCard.css";

const Card = (props) => {
	return (
		<Box
			className={styles["card-container"]}
			rounded='md'
			borderWidth='1px'
			p={2}
			mt={5}
			mr={10}
		>
			<HStack spacing={8}>
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
						{/* <Text fontSize='md' fontWeight='semibold' colorScheme='blue.300'>
							Verified
						</Text> */}
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
			</HStack>
			<Box>
				<VStack mt='15px' mb='15px'>
					<Text noOfLines={[1, 2, 3]}>{props.desc}</Text>
					<HStack>
						<Icon as={FaRegThumbsUp} mr='1' fontSize='20px' />
						<Text>{props.upVote}</Text>
						<Icon as={FaRegThumbsDown} mr='2' fontSize='20px' />
					</HStack>
				</VStack>
			</Box>
		</Box>
	);
};

export default Card;
