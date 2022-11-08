import { Box, Heading, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

const PriceCard = () => {
	return (
		<Box p={5}>
			<Text>Amazon</Text>
			<HStack>
				<Heading>&#8377;83880</Heading>
				<Spacer />
				<Box
					w='110px'
					borderWidth='1px'
					borderColor='green.200'
					borderRadius='md'
					bg='green.200'
					justifyContent='center'
					display='inline-flex'
					padding='5px'
				>
					<Link href='#' isExternal>
						<HStack>
							<Text>Visit site</Text>
							<Icon as={FiExternalLink} />
						</HStack>
					</Link>
				</Box>
			</HStack>
		</Box>
	);
};

export default PriceCard;
