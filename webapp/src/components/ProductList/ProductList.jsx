import { Grid, GridItem, Heading, Spacer } from "@chakra-ui/react";
import React from "react";
import Card from "../Card/Card";
import Navbar from "../NavBar/Navbar";
import Filters from "../Filters/Filters";

function ProductList() {
	return (
		<div className='prodList'>
			<Navbar />
			{/* <div className='content'> */}
			<Grid templateColumns='repeat(4, 1fr)' gap={6}>
				<GridItem colSpan={3}>
					<Heading fontSize='2xl' ml='25vw'>
						iPhone 13 Pro
					</Heading>
				</GridItem>

				<Spacer></Spacer>

				<GridItem colSpan={1}>
					<Filters />
				</GridItem>
				<GridItem colSpan={3}>
					<Card
						productName='Apple iPhone 13 128GB'
						price='1,29,999'
						noOfReviews='52'
						satisfactionRating='98.5'
					/>
					<Card
						productName='Apple iPhone 13 256GB'
						price='1,49,999'
						noOfReviews='36'
						satisfactionRating='98.2'
					/>
					<Card
						productName='Apple iPhone 13 1TB'
						price='1,99,999'
						noOfReviews='102'
						satisfactionRating='97'
					/>
				</GridItem>
			</Grid>
			{/* </div> */}
		</div>
	);
}

export default ProductList;
