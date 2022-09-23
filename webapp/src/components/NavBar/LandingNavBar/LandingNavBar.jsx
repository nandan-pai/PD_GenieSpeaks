import React from "react";
import "./LandingNavBar.css";
import { Link } from "react-router-dom";
import {
	Button,
	IconButton,
	Stack,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const LandingNavBar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === "dark";

	return (
		<div className="header">
			<Link to='/'>
				<Text
					className='logo'
					color={isDark ? "white" : "black"}
					fontWeight='bold'
				>
					GENIESPEAKS
				</Text>
			</Link>
			<Stack direction='row' spacing={14} align='right' mt={2}>
				<div className="left_buttons" float='right'>
					<Button
						as='button'
						borderRadius='md'
						bg='transparent'
						color={isDark ? "white" : "gray.900"}
						px={4}
						h={8}
						ml='1000px'
						mr='-0.5'
					>
						Sign In
					</Button>
					<Box
						as='button'
						borderRadius='md'
						bg={isDark ? "white" : "black"}
						color={isDark ? "black" : "white"}
						px={4}
						h={8}
						ml='20px'
					>
						Create a free account
					</Box>
					<IconButton
						ml={4}
						icon={isDark ? <FaSun /> : <FaMoon />}
						isRound='true'
						onClick={toggleColorMode}
						className="left_buttons"
					/>
				</div>
			</Stack>
		</div>
	);
};

export default LandingNavBar;
