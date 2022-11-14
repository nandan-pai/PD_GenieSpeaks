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
	VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import "./SignUp.css";

const SignUp = () => {
	// const isError = () => {
	// 	console.log("Error");
	// };

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

	const SignUpContainer = () => {
		return (
			<Flex width='50%' m='auto' p={8} bg='transparent'>
				<Box>
					<Heading mb={10}>Create an account</Heading>
					<FormControl>
						<HStack mb={5}>
							<VStack align='start' mr={2}>
								<FormLabel>First Name</FormLabel>
								<Input type='text' required />
							</VStack>
							<VStack align='start'>
								<FormLabel>Last Name</FormLabel>
								<Input type='text' />
							</VStack>
						</HStack>
						<FormLabel>Email address</FormLabel>
						<Input type='email' mb={5} required />
						<FormLabel>Password</FormLabel>
						<Input type='password' mb={5} required />
						<Button type='submit' colorScheme='green' mb={5}>
							Sign Up
						</Button>
					</FormControl>
					<HStack>
						<Text>Already Have an Account?</Text>
						<Link to='/signin'>
							<Text color='blue' className='singIn'>
								Sign In
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
			<SignUpContainer />
		</div>
	);
};

export default SignUp;
