import { Box, HStack, Icon, LinkBox, Text } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Paginator = ({
	setOffset,
	limit,
	pages,
	currentPage,
	setCurrentPage,
}) => {
	const handleClick = (e) => {
		setCurrentPage(parseInt(e.target.textContent));

		setOffset((parseInt(e.target.textContent) - 1) * limit);
	};

	// ! Fix previous button
	const handlePrevious = () => {
		setCurrentPage(currentPage - 1);

		setOffset(currentPage * limit);
	};

	const handleNext = () => {
		setCurrentPage(currentPage + 1);

		setOffset(currentPage * limit);
	};

	return (
		<HStack mb={10}>
			{currentPage === 1 ? (
				<></>
			) : (
				<LinkBox
					h='40px'
					w='40px'
					borderWidth='1px'
					rounded='md'
					textAlign='center'
					py={2}
					onClick={handlePrevious}
					_hover={{ cursor: "pointer", color: "white", bgColor: "#252525" }}
				>
					<Icon as={FaChevronLeft} />
				</LinkBox>
			)}
			<Box w={2} h={2}></Box>
			{Array.from(Array(pages), (e, i) => {
				return (
					<LinkBox
						key={i}
						h='40px'
						w='40px'
						borderWidth='1px'
						rounded='md'
						textAlign='center'
						padding={2}
						onClick={handleClick}
						_hover={{ cursor: "pointer", color: "white", bgColor: "#252525" }}
						bgColor={currentPage === i + 1 ? "#252525" : "white"}
						color={currentPage === i + 1 ? "white" : "black"}
					>
						<Text>{i + 1}</Text>
					</LinkBox>
				);
			})}
			<Box w={2} h={2}></Box>
			{currentPage === pages ? (
				<></>
			) : (
				<LinkBox
					h='40px'
					w='40px'
					borderWidth='1px'
					rounded='md'
					textAlign='center'
					py={2}
					onClick={handleNext}
					_hover={{ cursor: "pointer", color: "white", bgColor: "#252525" }}
					isDisabled={currentPage < pages ? "false" : "true"}
				>
					<Icon as={FaChevronRight} />
				</LinkBox>
			)}
		</HStack>
	);
};

export default Paginator;
