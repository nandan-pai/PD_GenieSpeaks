import { Grid, GridItem, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import ProductCard from "../Card/ProductCard/ProductCard";
import { useState, useEffect, useCallback } from "react";
import Filters from "../Filters/Filters";
import axios from "axios";
import { ApiBaseUrl } from "../../config";
import Loader from "../Loader/Loader";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

import "./ProductList.css";
import SortMenu from "../SortMenu/SortMenu";

const ProductList = ({ searchQuery, setSearchQuery }) => {
	const [productList, setProductList] = useState([]);
	const [loader, showLoader] = useState(false);
	const location = useLocation();

	const getProductList = useCallback(() => {
		axios.get(`${ApiBaseUrl}/prod/search?query=${searchQuery}`).then((res) => {
			// console.log(res.data.productList)
			setProductList(res.data.productList);
			showLoader(!loader);
		});
	}, [searchQuery]);

	useEffect(getProductList, [searchQuery, getProductList, setProductList]);

	return (
		<div className='prodList' mr='10px'>
			<NavBar currentPath={location.pathname} />
			<HStack spacing='40%'>
				<Text ml='25%'>
					Showing 1 - 15 of over 400 results for{" "}
					<span className='query'>"{searchQuery}"</span>
				</Text>
				{/* <Spacer /> */}
				<SortMenu />
			</HStack>
			<Grid templateColumns='repeat(4, 1fr)'>
				<GridItem colSpan={1}>
					<Filters />
				</GridItem>
				<GridItem colSpan={3}>
					<SimpleGrid minChildWidth='420px' spacing='10px'>
						{productList.map((product, index) => {
							return (
								<ProductCard
									key={product._id}
									_id={product._id}
									productName={product.title}
									productImage={product.images[0]}
									price={product.price ? product.price : "1,24,561"}
									noOfReviews={
										product.review_count ? product.review_count : "22"
									}
									satisfactionRating='98.5'
								/>
							);
						})}
					</SimpleGrid>
				</GridItem>
			</Grid>
		</div>
	);
};

export default ProductList;
