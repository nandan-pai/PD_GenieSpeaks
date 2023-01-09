import {
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
			<Center>
				<HStack mr={5}>
					<Heading as='h3'>4.6</Heading>
					<Text fontSize='18px'> / 5.0</Text>
				</HStack>
			</Center>

			<HStack>
				<Icon as={FaStar} fontSize='18px' color='yellow' />
				<Text>5</Text>
				<Progress width='100%' value={80} />
				<Text fontSize='16px' fontWeight='semibold'>
					1.2k
				</Text>
			</HStack>
			<HStack>
				<Icon as={FaStar} fontSize='18px' color='yellow' />
				<Text>4</Text>
				<Progress width='100%' value={80} />
				<Text fontSize='16px' fontWeight='semibold'>
					710
				</Text>
			</HStack>
			<HStack>
				<Icon as={FaStar} fontSize='18px' color='yellow' />
				<Text>3</Text>
				<Progress width='100%' value={80} />
				<Text fontSize='16px' fontWeight='semibold'>
					4
				</Text>
			</HStack>
			<HStack>
				<Icon as={FaStar} fontSize='18px' color='yellow' />
				<Text>2</Text>
				<Progress width='100%' value={80} />
				<Text fontSize='16px' fontWeight='semibold'>
					10
				</Text>
			</HStack>
			<HStack>
				<Icon as={FaStar} fontSize='18px' color='yellow' />
				<Text>1</Text>
				<Progress width='100%' value={80} />
				<Text fontSize='16px' fontWeight='semibold'>
					20
				</Text>
			</HStack>
		</div>
	);
};

export default RatingCard;
