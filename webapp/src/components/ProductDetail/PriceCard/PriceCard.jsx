import {
	Box,
	Heading,
	HStack,
	Icon,
	Spacer,
	Text,
	Link,
} from "@chakra-ui/react";
import React from "react";
import { FiExternalLink } from "react-icons/fi";
import "./PriceCard.css";

const PriceCard = (props) => {
	return (
		<Box p={5}>
			<Text>{props.ecommerce.name}</Text>
			<HStack>
				<Heading size={{ xl: "xl", lg: "xl", md: "md", sm: "lg", base: "md" }}>
					&#8377;{props.ecommerce.curr_price}
				</Heading>
				<Spacer />
				<Box
					w='110px'
					borderWidth='1px'
					borderColor='green.200'
					borderRadius='md'
					bg='green.200'
					justifyContent='center'
					display='inline-flex'
					padding={{ xl: "5px", lg: "5px", md: "3px", sm: "0px", base: "0px" }}
				>
					<Link
						className='ecommerce-product'
						href={props.ecommerce.product_url}
						isExternal
					>
						<HStack>
							<Text color='gray.100'>Visit site</Text>
							<Icon as={FiExternalLink} color='gray.100' />
						</HStack>
					</Link>
				</Box>
			</HStack>
		</Box>
	);
};

export default PriceCard;
