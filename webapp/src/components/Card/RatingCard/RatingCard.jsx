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

const RatingCard = () => {
	return (
		<div>
			<Center>
				<Text fontWeight='bold' fontSize='18px' my={5}>
					User Reviews & Ratings
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
						<Heading as='h3'>4.6</Heading>
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
							value={80}
							borderWidth='0.5px'
							borderColor='black'
							borderRadius='10px'
						/>
					</Box>
					<Text fontSize='16px' fontWeight='semibold'>
						1020
					</Text>
				</HStack>
				<HStack>
					<Icon as={FaStar} fontSize='18px' color='yellow' />
					<Text>4</Text>
					<Box w='150px' h='15px'>
						<Progress
							width='100%'
							height='15px'
							value={75}
							borderWidth='0.5px'
							borderColor='black'
							borderRadius='10px'
						/>
					</Box>
					<Text fontSize='16px' fontWeight='semibold'>
						710
					</Text>
				</HStack>
				<HStack>
					<Icon as={FaStar} fontSize='18px' color='yellow' />
					<Text>3</Text>
					<Box w='150px' h='15px'>
						<Progress
							width='100%'
							height='15px'
							value={5}
							borderWidth='0.5px'
							borderColor='black'
							borderRadius='10px'
						/>
					</Box>
					<Text fontSize='16px' fontWeight='semibold'>
						4
					</Text>
				</HStack>
				<HStack>
					<Icon as={FaStar} fontSize='18px' color='yellow' />
					<Text>2</Text>
					<Box w='150px' h='15px'>
						<Progress
							width='100%'
							height='15px'
							value={10}
							borderWidth='0.5px'
							borderColor='black'
							borderRadius='10px'
						/>
					</Box>
					<Text fontSize='16px' fontWeight='semibold'>
						10
					</Text>
				</HStack>
				<HStack>
					<Icon as={FaStar} fontSize='18px' color='yellow' />
					<Text>1</Text>
					<Box w='150px' h='15px'>
						<Progress
							width='100%'
							height='15px'
							value={13}
							borderWidth='0.5px'
							borderColor='black'
							borderRadius='10px'
						/>
					</Box>
					<Text fontSize='16px' fontWeight='semibold'>
						20
					</Text>
				</HStack>
			</Box>
		</div>
	);
};

export default RatingCard;
