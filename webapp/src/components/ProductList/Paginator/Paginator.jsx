import { Box, HStack, Icon, LinkBox, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SearchContext from "../../../context/SearchContext/SearchContext";

const Paginator = ({ pages }) => {
	const { setOffset, limit, currentPage, setCurrentPage } =
		useContext(SearchContext);
	const handleClick = (e) => {
		setCurrentPage(parseInt(e.target.textContent));
		setOffset((parseInt(e.target.textContent) - 1) * limit);
	};

	const handlePrevious = () => {
		setCurrentPage(currentPage - 1);
		setOffset((currentPage - 2) * limit);
	};

	const handleNext = () => {
		setCurrentPage(currentPage + 1);
		setOffset(currentPage * limit);
	};

	const showPaginationNumbers = (pages) => {
		let paginationNumbers = [];

		if (pages) {
			let showMax = 5;
			let startPage;
			let endPage;

			if (pages <= showMax) {
				startPage = 1;
				endPage = pages;
			} else {
				startPage = currentPage;

				if (startPage !== pages && startPage + 1 !== pages) {
					endPage = currentPage + showMax - 1;
				} else {
					endPage = pages;
				}
			}

			for (let i = startPage; i <= endPage; i++) {
				paginationNumbers.push(i);
			}

			return showRenderedPageNumbers(paginationNumbers);
		}
	};

	const showRenderedPageNumbers = (paginationNumbers) => {
		if (paginationNumbers) {
			let result = paginationNumbers.map((number, index) => {
				return (
					<LinkBox
						key={index}
						h='40px'
						w='40px'
						borderWidth='1px'
						rounded='md'
						textAlign='center'
						padding={2}
						onClick={handleClick}
						_hover={{ cursor: "pointer", color: "white", bgColor: "#252525" }}
						bgColor={currentPage === index + 1 ? "#252525" : "white"}
						color={currentPage === index + 1 ? "white" : "black"}
					>
						<Text>{index + 1}</Text>
					</LinkBox>
				);
			});

			return result;
		}
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
			{showPaginationNumbers(pages)}
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
				>
					<Icon as={FaChevronRight} />
				</LinkBox>
			)}
		</HStack>
	);
};

export default Paginator;
