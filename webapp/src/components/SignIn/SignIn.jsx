import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Icon,
	Input,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaChevronLeft } from "react-icons/fa";

const SignIn = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === "dark";

	const SignInContainer = () => {
		return (
			<Flex ml={20} p={5} bg='transparent' h='85vh'>
				<Box mt={15}>
					<Link to='/'>
						<HStack mb={5} _hover={{ textDecoration: "underline" }}>
							<Icon as={FaChevronLeft} />
							<Text fontWeight='semibold'>Back</Text>
						</HStack>
					</Link>
					<Heading mb={3}>Welcome to GenieSpeaks</Heading>
					<Text fontSize='xl' mb={10}>
						Sign In to Continue
					</Text>
					<FormControl>
						<FormLabel>Email address</FormLabel>
						<Input
							required
							type='email'
							mb={5}
							_hover={{ borderColor: "blue" }}
						/>
						<FormLabel>Password</FormLabel>
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
							Sign In
						</Button>

						<Button
							width='full'
							borderWidth='1px'
							bgColor='white'
							mb={5}
							_hover={{ borderColor: "blue" }}
						>
							<Text color='black' mr={2}>
								Sign In with{" "}
							</Text>
							{<FcGoogle />}
						</Button>
					</FormControl>
					<HStack align='center' justify='center'>
						<Text>Don't have an account?</Text>
						<Link to='/signup'>
							<Text
								color={isDark ? "white" : "black"}
								fontWeight='semibold'
								_hover={{ textDecoration: "underline" }}
							>
								Create one for free
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
				<Box h='98vh' w='40%' bgColor='red' borderRadius='xl' mr='120px'></Box>
				<SignInContainer />
			</HStack>
		</div>
	);
};

export default SignIn;
