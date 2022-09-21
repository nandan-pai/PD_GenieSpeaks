import { Grid, GridItem, Heading, Spacer } from "@chakra-ui/react";
import ProductCard from "../Card/ProductCard/ProductCard";
import Navbar from "../NavBar/Navbar";
import Filters from "../Filters/Filters";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const ProductList = ({ searchQuery, setSearchQuery }) => {
	const [productList, setProductList] = useState([]);
	const getProductList = useCallback(() => {
		axios
			.get(`http://localhost:5000/api/prod/search?query=${searchQuery}`)
			.then((res) => {
				setProductList(res.data.productList);
			});
	}, [searchQuery]);

	useEffect(getProductList, [searchQuery, getProductList, setProductList]);

	return (
		<div className='prodList'>
			<Navbar />
			<Grid templateColumns='repeat(4, 1fr)' gap={6}>
				<GridItem colSpan={3}>
					<Heading fontSize='2xl' ml='25vw'>
						{searchQuery}
					</Heading>
				</GridItem>

				<Spacer></Spacer>

				<GridItem colSpan={1}>
					<Filters />
				</GridItem>
				<GridItem colSpan={3}>
					{productList.map((product, index) => {
						return (
							<ProductCard
								key={product._id}
								_id={product._id}
								productName={product.title}
								price='1,29,999'
								noOfReviews='52'
								satisfactionRating='98.5'
							/>
						);
					})}
				</GridItem>
			</Grid>
		</div>
	);
};

export default ProductList;
