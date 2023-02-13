import { Box, HStack, Icon, LinkBox, Text } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Paginator = ({ pages }) => {
	const handleClick = () => {
		console.log("Button clicked");
	};

	return (
		<HStack mb={10}>
			<LinkBox
				h='40px'
				w='40px'
				borderWidth='1px'
				rounded='md'
				textAlign='center'
				py={2}
				onClick={handleClick}
				_hover={{ cursor: "pointer", color: "white", bgColor: "#252525" }}
			>
				<Icon as={FaChevronLeft} />
			</LinkBox>
			<Box w={2} h={2}></Box>
			{Array.from(Array(pages), (e, i) => {
				return (
					<LinkBox
						h='40px'
						w='40px'
						borderWidth='1px'
						rounded='md'
						textAlign='center'
						padding={2}
						onClick={handleClick}
						_hover={{ cursor: "pointer", color: "white", bgColor: "#252525" }}
					>
						<Text>{i + 1}</Text>
					</LinkBox>
				);
			})}
			<Box w={2} h={2}></Box>
			<LinkBox
				h='40px'
				w='40px'
				borderWidth='1px'
				rounded='md'
				textAlign='center'
				py={2}
				onClick={handleClick}
				_hover={{ cursor: "pointer", color: "white", bgColor: "#252525" }}
			>
				<Icon as={FaChevronRight} />
			</LinkBox>
		</HStack>
	);
};

export default Paginator;
