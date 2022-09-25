import React from "react";
import "./LandingNavBar.css";
import { Link } from "react-router-dom";
import {
	Button,
	Flex,
	Icon,
	IconButton,
	Stack,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import { useState } from "react";

const Logo = () => {
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	return (
		<Box>
			<Link to='/'>
				<Text
					className='logo'
					color={isDark ? "white" : "black"}
					fontWeight='bold'
				>
					GENIESPEAKS
				</Text>
			</Link>
		</Box>
	);
};

const MenuToggle = ({ toggle, isOpen }) => {
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	return (
		<Box display={{ base: "block", md: "none" }} onClick={toggle}>
			{isOpen ? (
				<Icon as={MdClose} w={5} h={5} color={isDark ? "white" : "black"} />
			) : (
				<Icon as={MdMenu} w={5} h={5} color={isDark ? "white" : "black"} />
			)}
		</Box>
	);
};

const MenuLinks = ({ isOpen }) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === "dark";

	return (
		<Box
			display={{ base: isOpen ? "block" : "none", md: "block" }}
			flexBasis={{ base: "100%", md: "auto" }}
		>
			<Stack
				spacing={8}
				align='center'
				justify={["center", "space-between", "flex-end"]}
				direction={["column", "row"]}
				pt={[4, 4, 0]}
			>
				<Button
					borderRadius='md'
					bg='transparent'
					display='block'
					color={isDark ? "white" : "gray.900"}
					px={4}
					h={8}
				>
					Sign In
				</Button>
				<Box
					borderRadius='md'
					bg={isDark ? "white" : "black"}
					display='block'
					color={isDark ? "black" : "white"}
					px={4}
					h={8}
				>
					Create a free account
				</Box>
				<IconButton
					icon={isDark ? <FaSun color='white' /> : <FaMoon />}
					isRound='true'
					// display='block'
					onClick={toggleColorMode}
				/>
			</Stack>
		</Box>
	);
};

const NavBarContainer = ({ children }) => {
	return (
		<Flex
			as='nav'
			align='center'
			justify='space-between'
			wrap='wrap'
			width='100%'
			padding={8}
			bg={"transparent"}
			color={"gray.600"}
		>
			{children}
		</Flex>
	);
};

const LandingNavBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => setIsOpen(!isOpen);

	return (
		<NavBarContainer>
			<Logo />
			<MenuToggle toggle={toggleOpen} isOpen={isOpen} />
			<MenuLinks isOpen={isOpen} />
		</NavBarContainer>
	);

	// return (
	// 	<Flex className='header' w='100%'>
	// 		<Link to='/'>
	// 			<Text
	// 				className='logo'
	// 				color={isDark ? "white" : "black"}
	// 				fontWeight='bold'
	// 			>
	// 				GENIESPEAKS
	// 			</Text>
	// 		</Link>
	// 		<Stack direction='row' spacing={14} align='right' mt={2}>
	// 			<div className='left_buttons' float='right'>
	// 				<Button
	// 					as='button'
	// 					borderRadius='md'
	// 					bg='transparent'
	// 					color={isDark ? "white" : "gray.900"}
	// 					p={[0, 2, 4]}
	// 					h={8}
	// 					ml={{ md: "1000px" }}
	// 				>
	// 					Sign In
	// 				</Button>
	// 				<Box
	// 					as='button'
	// 					borderRadius='md'
	// 					bg={isDark ? "white" : "black"}
	// 					color={isDark ? "black" : "white"}
	// 					px={4}
	// 					h={8}
	// 					ml='20px'
	// 				>
	// 					Create a free account
	// 				</Box>
	// 				<IconButton
	// 					ml={4}
	// 					icon={isDark ? <FaSun /> : <FaMoon />}
	// 					isRound='true'
	// 					onClick={toggleColorMode}
	// 					className='left_buttons'
	// 				/>
	// 			</div>
	// 		</Stack>
	// 	</Flex>
	// );
};

export default LandingNavBar;
