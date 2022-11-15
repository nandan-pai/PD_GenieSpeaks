import { Box, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import PriceCard from "../Card/PriceCard/PriceCard";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "@chakra-ui/react";

const AvailableMenu = (props) => {
	return (
		<Box
			height='60%'
			maxH='180px'
			mr={5}
			ml={5}
			borderWidth='1px'
			borderRadius='md'
		>
			<PriceCard ecommerce={props.ecommerce[0]} />
			{
				props.ecommerce.length > 1 ?
					<>
						<Text ml={5}>Also available on</Text>
						{
							props.ecommerce.slice(1).map((ecom, index) => {
								return (
									<HStack mx={5} mt={2} key={index}>
										<Link
											className='ecommerce-product'
											href={ecom.product_url}
											isExternal
										>
											<HStack>
												<Text fontSize='18px' fontWeight='semibold'>
													{ecom.name}
												</Text>
												<Icon as={FiExternalLink} />
											</HStack>
										</Link>
										<Spacer />
										<Text fontSize='18px'>&#8377;{ecom.curr_price}</Text>
									</HStack>
								)
							})
						}
					</> : <></>
			}

		</Box>
	);
};

export default AvailableMenu;
