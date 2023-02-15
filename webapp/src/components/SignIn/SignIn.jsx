import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Text,
	useColorMode,
	Checkbox,
	Divider,
	Stack,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { OAuthButtonGroup } from "./OAuthButtonGroup";
import { PasswordField } from './PasswordField'

import "./SignIn.css";

const SignIn = () => {
	const Logo = () => {
		const { colorMode } = useColorMode();
		const isDark = colorMode === "dark";

		return (
			<Box m={8}>
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

	const SignInContainer = () => {
		// const [isError, setIsError] = useState(false);

		// const handleError = () => {
		// 	setIsError(!isError);
		// };

		return (
			<Flex width='50%' m='auto' p={8} bg='transparent'>
				<Box>
					<Heading mb={10}>Sign In</Heading>
					<FormControl>
						<FormLabel>Email address</FormLabel>
						<Input type='email' mb={5} />
						<FormLabel>Password</FormLabel>
						<Input type='password' mb={5} />
						<Button type='submit' colorScheme='green' mb={5}>
							Sign In
						</Button>
					</FormControl>
					<HStack>
						<Divider />
						<Text fontSize="sm" whiteSpace="nowrap" color="muted">
							or continue with
						</Text>
						<Divider />															
					</HStack>
					<OAuthButtonGroup />

					<HStack>
						<Text>Don't Have an Account?</Text>
						<Link to='/signup'>
							<Text color='blue' className='signUp'>
								Sign Up
							</Text>
						</Link>
					</HStack>
				</Box>
			</Flex>
		);
	};

	return (
		<div className='container'>
			<header>
				<Logo />
			</header>
			<SignInContainer />
		</div>
	);
};

export default SignIn;
