import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Icon,
	IconButton,
	Image,
	Input,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaChevronLeft, FaMoon, FaSun } from "react-icons/fa";

const SignUp = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const SignUpContainer = () => {
		return (
			<Flex ml={20} p={5} bg='transparent' h='85vh'>
				<Box mt={15}>
					<IconButton
						icon={isDark ? <FaSun /> : <FaMoon />}
						isRound='true'
						bg={isDark ? "white.100" : "white.100"}
						color='gray.100'
						onClick={toggleColorMode}
						float='right'
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
					<Link to='/' w='80px'>
						<HStack mb={5} _hover={{ textDecoration: "underline" }}>
							<Icon as={FaChevronLeft} />
							<Text fontWeight='semibold'>Back</Text>
						</HStack>
					</Link>
					<Heading mb={3}>Welcome to GenieSpeaks</Heading>
					<Text fontSize='xl' mb={10}>
						Create an account for free
					</Text>
					<FormControl>
						<FormLabel>
							Name{" "}
							<span style={{ verticalAlign: "super", color: "red" }}>*</span>
						</FormLabel>
						<Input
							required
							type='text'
							mb={5}
							_hover={{ borderColor: "blue" }}
						/>
						<FormLabel>
							Email address{" "}
							<span style={{ verticalAlign: "super", color: "red" }}>*</span>
						</FormLabel>
						<Input
							required
							type='email'
							mb={5}
							_hover={{ borderColor: "blue" }}
						/>
						<FormLabel>
							Password{" "}
							<span style={{ verticalAlign: "super", color: "red" }}>*</span>
						</FormLabel>
						<Input
							required
							type='password'
							mb={5}
							_hover={{ borderColor: "blue" }}
						/>
						<Button
							type='submit'
							bgColor='#252525'
							color='white'
							mb={2}
							w='100%'
						>
							Sign Up
						</Button>

						<Button
							width='full'
							borderWidth='1px'
							bgColor='white'
							mb={5}
							_hover={{ borderColor: "blue" }}
						>
							<Text color='black' mr={2}>
								Sign Up with{" "}
							</Text>
							{<FcGoogle />}
						</Button>
					</FormControl>
					<HStack align='center' justify='center'>
						<Text>Already Have an Account?</Text>
						<Link to='/signin'>
							<Text
								color={isDark ? "white" : "black"}
								fontWeight='semibold'
								_hover={{ textDecoration: "underline" }}
							>
								Sign In
							</Text>
						</Link>
					</HStack>
				</Box>
			</Flex>
		);
	};

	return (
		<div>
			<HStack mt={2} ml={2}>
				<Image
					src={
						isDark
							? "https://images.unsplash.com/photo-1620783770629-122b7f187703?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
							: "https://images.unsplash.com/photo-1595234235838-2fc8984bc651?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
					}
					alt='tech image'
					h='98vh'
					w='40%'
					borderRadius='xl'
					mr='120px'
				/>
				<SignUpContainer />
			</HStack>
		</div>
	);
};

export default SignUp;
