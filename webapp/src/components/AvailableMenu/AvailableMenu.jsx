import { Box, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import PriceCard from "../Card/PriceCard/PriceCard";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";

const AvailableMenu = ({ productData }) => {
	return (
		<Box height='60%' mr={5} ml={5} borderWidth='1px' borderRadius='md'>
			<PriceCard product={productData} />
			<Text ml={5}>Also available on</Text>
			<HStack mx={5} mt={2}>
				<Link>
					<HStack>
						<Text fontSize='18px' fontWeight='semibold'>
							Flipkart
						</Text>
						<Icon as={FiExternalLink} />
					</HStack>
				</Link>
				<Spacer />
				<Text fontSize='18px'>&#8377;85000</Text>
			</HStack>
		</Box>
	);
};

export default AvailableMenu;
