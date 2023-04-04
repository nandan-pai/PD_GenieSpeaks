import {
	Box,
	Center,
	HStack,
	Heading,
	Icon,
	Progress,
	Text,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const RatingCard = ({ reviews = [] }) => {
	let ratings = [];

	reviews.map((review) => ratings.push(review.stars));

	return (
		<div>
			<Center>
				<Text fontWeight='bold' fontSize='18px' my={5}>
					User Ratings
				</Text>
			</Center>
			<Box
				borderWidth='1px'
				borderColor='gray'
				padding='20px'
				borderRadius='md'
			>
				<Center>
					<HStack mr={5}>
						<Heading as='h3'>
							{parseFloat(
								ratings.reduce((partialSum, a) => partialSum + a, 0) /
									ratings.length
							).toFixed(1)}
						</Heading>
						<Text fontSize='18px' color='gray'>
							{" "}
							/ 5.0
						</Text>
					</HStack>
				</Center>

				<HStack>
					<Icon as={FaStar} fontSize='18px' color='yellow' />
					<Text>5</Text>
					<Box w='150px' h='15px'>
						<Progress
							width='100%'
							height='15px'
							value={
								(ratings.filter((rating) => rating === 5).length /
									ratings.length) *
								100
							}
							borderWidth='0.5px'
							borderColor='black'
							borderRadius='10px'
						/>
					</Box>
					<Text fontSize='16px' fontWeight='semibold'>
						{ratings.filter((rating) => rating === 5).length}
					</Text>
				</HStack>
				<HStack>
					<Icon as={FaStar} fontSize='18px' color='yellow' />
					<Text>4</Text>
					<Box w='150px' h='15px'>
						<Progress
							width='100%'
							height='15px'
							value={
								(ratings.filter((rating) => rating === 4).length /
									ratings.length) *
								100
							}
							borderWidth='0.5px'
							borderColor='black'
							borderRadius='10px'
						/>
					</Box>
					<Text fontSize='16px' fontWeight='semibold'>
						{ratings.filter((rating) => rating === 4).length}
					</Text>
				</HStack>
				<HStack>
					<Icon as={FaStar} fontSize='18px' color='yellow' />
					<Text>3</Text>
					<Box w='150px' h='15px'>
						<Progress
							width='100%'
							height='15px'
							value={
								(ratings.filter((rating) => rating === 3).length /
									ratings.length) *
								100
							}
							borderWidth='0.5px'
							borderColor='black'
							borderRadius='10px'
						/>
					</Box>
					<Text fontSize='16px' fontWeight='semibold'>
						{ratings.filter((rating) => rating === 3).length}
					</Text>
				</HStack>
				<HStack>
					<Icon as={FaStar} fontSize='18px' color='yellow' />
					<Text>2</Text>
					<Box w='150px' h='15px'>
						<Progress
							width='100%'
							height='15px'
							value={
								(ratings.filter((rating) => rating === 2).length /
									ratings.length) *
								100
							}
							borderWidth='0.5px'
							borderColor='black'
							borderRadius='10px'
						/>
					</Box>
					<Text fontSize='16px' fontWeight='semibold'>
						{ratings.filter((rating) => rating === 2).length}
					</Text>
				</HStack>
				<HStack>
					<Icon as={FaStar} fontSize='18px' color='yellow' />
					<Text>1</Text>
					<Box w='150px' h='15px'>
						<Progress
							width='100%'
							height='15px'
							value={
								(ratings.filter((rating) => rating === 1).length /
									ratings.length) *
								100
							}
							borderWidth='0.5px'
							borderColor='black'
							borderRadius='10px'
						/>
					</Box>
					<Text fontSize='16px' fontWeight='semibold'>
						{ratings.filter((rating) => rating === 1).length}
					</Text>
				</HStack>
			</Box>
		</div>
	);
};

export default RatingCard;
