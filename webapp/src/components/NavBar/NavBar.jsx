import {
	Box,
	Button,
	Flex,
	HStack,
	Icon,
	IconButton,
	Show,
	Stack,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import NavSearchBar from "../SearchBar/NavSearchBar/NavSearchBar";

const Logo = () => {
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	return (
		<Box>
			<Link to='/'>
				<Text
					className='logo'
					color={isDark ? "white.100" : "gray.100"}
					fontWeight='bold'
					fontSize='xl'
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
				<Icon
					as={MdClose}
					w={5}
					h={5}
					color={isDark ? "white.100" : "gray.100"}
				/>
			) : (
				<Icon
					as={MdMenu}
					w={5}
					h={5}
					color={isDark ? "white.100" : "gray.100"}
				/>
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
				direction='row'
				pt={[4, 4, 0]}
			>
				<Link to='/signin'>
					<Button
						bg={isDark ? "white.100" : "gray.100"}
						borderRadius='md'
						display='block'
						color={isDark ? "gray.100" : "white.100"}
						_hover={{ textDecoration: "underline" }}
					>
						Sign In
					</Button>
				</Link>

				<IconButton
					icon={isDark ? <FaSun /> : <FaMoon />}
					isRound='true'
					bg={isDark ? "white.100" : "white.100"}
					onClick={toggleColorMode}
					_hover={
						isDark
							? {
									bg: "gray.100",
									color: "white.100",
							  }
							: {
									bg: "gray.100",
									color: "white.100",
							  }
					}
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
			color={"gray.100"}
		>
			{children}
		</Flex>
	);
};

const NavBar = () => {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => setIsOpen(!isOpen);

	return (
		<NavBarContainer>
			<HStack
				display='inline-flex'
				w={{ base: "50%", lg: "60%", md: "50%", sm: "70%" }}
				spacing='50px'
			>
				<Show above='md'>
					<Logo />
				</Show>
				{location.pathname === "/" ? "" : <NavSearchBar />}
			</HStack>

			<MenuToggle toggle={toggleOpen} isOpen={isOpen} />
			<MenuLinks isOpen={isOpen} />
		</NavBarContainer>
	);
};

export default NavBar;
