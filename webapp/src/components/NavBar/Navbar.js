import React from "react";
import styles from "./Navbar.module.css";
import { Button, Stack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

function Navbar() {
	return (
		<div className={styles.header}>
			<a href='#defult'>GENIESPEAKS</a>
			<Stack direction='row' spacing={14} align='right'>
				<div className={styles.left_buttons} float='right'>
					<Button
						as='button'
						borderRadius='md'
						bg='transparent'
						color='gray.900'
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
						bg='black'
						color='white'
						px={4}
						h={8}
						ml='20px'
					>
						Create a free account
					</Box>
				</div>
			</Stack>
		</div>
	);
}

export default Navbar;
