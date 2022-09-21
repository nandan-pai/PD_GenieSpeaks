import {
	Box,
	Checkbox,
	Link,
	Stack,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import React from "react";

function Filters() {
	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	return (
		<div>
			<Box h='100vh' w='300px' ml={5} bgColor={isDark ? "" : "white"} p={5}>
				<Text fontSize='lg'>Filter Categories</Text>
				<div className='brand'>
					<Text fontSize='md' fontWeight='semibold' mt='5'>
						Brand
					</Text>
					<Stack mt='2' ml='2'>
						<Checkbox>Lenovo</Checkbox>
						<Checkbox>Apple</Checkbox>
						<Checkbox>HP</Checkbox>
						<Checkbox>Acer</Checkbox>
					</Stack>
				</div>
				<div className='price'>
					<Text fontSize='md' fontWeight='semibold' mt='5'>
						Price
					</Text>
					<Stack mt='2' ml='2'>
						<Link href='#'>Under &#8377;20,000</Link>
						<Link href='#'>&#8377;20,000 - &#8377;30,000</Link>
						<Link href='#'>&#8377;30,000 - &#8377;40,000</Link>
						<Link href='#'>&#8377;40,000 - &#8377;50,000</Link>
						<Link href='#'>Over&#8377;50,000</Link>
					</Stack>
				</div>
				<div className='cpu-manufacturer'>
					<Text fontSize='md' fontWeight='semibold' mt='5'>
						CPU Manufacturer
					</Text>
					<Stack mt='2' ml='2'>
						<Checkbox>AMD</Checkbox>
						<Checkbox>Intel</Checkbox>
						<Checkbox>NVIDIA</Checkbox>
						<Checkbox>Qualcomm</Checkbox>
					</Stack>
				</div>
			</Box>
		</div>
	);
}

export default Filters;
