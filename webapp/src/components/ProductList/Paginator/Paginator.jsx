import { Box, HStack, Icon, LinkBox, Show, Text } from "@chakra-ui/react";
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

	const handleToFirst = () => {
		setCurrentPage(1);
		setOffset(0);
	};

	const handleToLast = () => {
		setCurrentPage(pages);
		setOffset(pages * limit - currentPage * limit);
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
						h={{ xl: "40px", lg: "40px", md: "30px", sm: "30px", base: "30px" }}
						w={{ xl: "40px", lg: "40px", md: "30px", sm: "30px", base: "30px" }}
						borderWidth='1px'
						rounded='md'
						textAlign='center'
						padding={{ xl: 2, lg: 2, md: 1, sm: 1, base: 1 }}
						onClick={handleClick}
						_hover={{ cursor: "pointer", color: "white", bgColor: "#252525" }}
						bgColor={currentPage === index + 1 ? "#252525" : "white"}
						color={currentPage === index + 1 ? "white" : "black"}
					>
						<Text
							fontSize={{ xl: "md", lg: "md", md: "sm", sm: "sm", base: "sm" }}
						>
							{index + 1}
						</Text>
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
				<HStack spacing={2}>
					<LinkBox
						h='40px'
						borderWidth='1px'
						rounded='md'
						textAlign='center'
						p={2}
						onClick={handleToFirst}
						_hover={{ cursor: "pointer", color: "white", bgColor: "#252525" }}
					>
						<Show above='md'>
							<Text
								fontSize={{
									xl: "md",
									lg: "md",
									md: "sm",
								}}
							>
								Go To First
							</Text>
						</Show>
						<Show below='md'>
							<Text
								fontSize={{
									md: "sm",
									sm: "sm",
									base: "sm",
								}}
							>
								First
							</Text>
						</Show>
					</LinkBox>
					<LinkBox
						h={{ xl: "40px", lg: "40px", md: "30px", sm: "30px", base: "30px" }}
						w={{ xl: "40px", lg: "40px", md: "30px", sm: "30px", base: "30px" }}
						borderWidth='1px'
						rounded='md'
						textAlign='center'
						py={{ xl: 2, lg: 2, md: 1, sm: 1, base: 1 }}
						onClick={handlePrevious}
						_hover={{ cursor: "pointer", color: "white", bgColor: "#252525" }}
					>
						<Icon as={FaChevronLeft} />
					</LinkBox>
				</HStack>
			)}
			<Show above='md'>
				<Box w={2} h={2}></Box>
			</Show>
			{showPaginationNumbers(pages)}
			<Show above='md'>
				<Box w={2} h={2}></Box>
			</Show>
			{currentPage === pages ? (
				<></>
			) : (
				<HStack spacing={2}>
					<LinkBox
						h={{ xl: "40px", lg: "40px", md: "30px", sm: "30px", base: "30px" }}
						w={{ xl: "40px", lg: "40px", md: "30px", sm: "30px", base: "30px" }}
						borderWidth='1px'
						rounded='md'
						textAlign='center'
						py={{ xl: 2, lg: 2, md: 1, sm: 1, base: 1 }}
						onClick={handleNext}
						_hover={{ cursor: "pointer", color: "white", bgColor: "#252525" }}
					>
						<Icon as={FaChevronRight} />
					</LinkBox>
					<LinkBox
						h='40px'
						borderWidth='1px'
						rounded='md'
						textAlign='center'
						p={2}
						onClick={handleToLast}
						_hover={{ cursor: "pointer", color: "white", bgColor: "#252525" }}
					>
						<Show above='md'>
							<Text
								fontSize={{
									xl: "md",
									lg: "md",
									md: "sm",
								}}
							>
								Go To Last
							</Text>
						</Show>
						<Show below='md'>
							<Text
								fontSize={{
									md: "sm",
									sm: "sm",
									base: "sm",
								}}
							>
								Last
							</Text>
						</Show>
					</LinkBox>
				</HStack>
			)}
		</HStack>
	);
};

export default Paginator;
