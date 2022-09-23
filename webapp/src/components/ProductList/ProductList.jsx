import { Grid, GridItem, Heading, Spacer } from "@chakra-ui/react";
import ProductCard from "../Card/ProductCard/ProductCard";
import LandingNavBar from "../NavBar/LandingNavBar/LandingNavBar";
import Filters from "../Filters/Filters";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ApiBaseUrl } from "../../config";

const ProductList = ({ searchQuery, setSearchQuery }) => {
	const [productList, setProductList] = useState([]);
	const getProductList = useCallback(() => {
		console.log(`${ApiBaseUrl}/prod/search?query=${searchQuery}`)
		axios.get(`${ApiBaseUrl}/prod/search?query=${searchQuery}`).then((res) => {
			console.log(res.data.productList)
			if(res.data.productList !== undefined){
				setProductList(res.data.productList);
			}
		});
	}, [searchQuery]);

	useEffect(getProductList, [searchQuery, getProductList, setProductList]);

	return (
		<div className='prodList'>
			<LandingNavBar />
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
								productImage={product.images[0]}
								price={product.price ? product.price : "1,24,561"}
								noOfReviews={product.review_count ? product.review_count : "22"}
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
