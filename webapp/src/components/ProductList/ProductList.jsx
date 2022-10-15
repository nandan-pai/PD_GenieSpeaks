import {
	Grid,
	GridItem,
	HStack,
	SimpleGrid,
	Text,
	Spinner,
	Spacer,
} from "@chakra-ui/react";
import ProductCard from "../Card/ProductCard/ProductCard";
import { useState, useEffect, useCallback } from "react";
import Filters from "../Filters/Filters";
import axios from "axios";
import { ApiBaseUrl } from "../../config";
import Loader from "../Loader/Loader";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

import "./ProductList.css";
import SortMenu from "../SortMenu/SortMenu";

const ProductList = ({ searchQuery, setSearchQuery }) => {
	const [productList, setProductList] = useState([]);
	const [sort, setSort] = useState("_id");
	const [limit, setLimit] = useState(20);
	const [offset, setOffset] = useState(0);
	const [loader, showLoader] = useState(true);
	const [filter, setFilter] = useState({});

	let navigate = useNavigate();

	const getProductList = useCallback(() => {
		if (searchQuery === "") {
			return navigate("/");
		}
		showLoader(true);
		const payload = {
			query: searchQuery,
			limit,
			offset,
			sort,
			filter,
		};
		axios.post(`${ApiBaseUrl}/prod/search`, payload).then((res) => {
			// console.log(res.data.productList)
			setProductList(res.data.productList);
			showLoader(false);
		});
	}, [searchQuery, navigate, limit, offset, sort, filter]);

	useEffect(getProductList, [searchQuery, getProductList, setProductList]);

	return (
		<div className='prodList' mr='10px'>
			<NavBar />
			<HStack mr='20px'>
				<Text ml='25%'>
					Showing 1 - 15 of over 400 results for{" "}
					<span className='query'>"{searchQuery}"</span>
				</Text>
				<Spacer />
				<SortMenu sort={sort} setSort={setSort} />
			</HStack>
			<Grid templateColumns='repeat(4, 1fr)'>
				<GridItem colSpan={1}>
					<Filters searchQuery={searchQuery} setFilter={setFilter} />
				</GridItem>
				<GridItem colSpan={3}>
					{loader ? (
						<Spinner />
					) : (
						<SimpleGrid minChildWidth='420px' spacing='10px'>
							{productList.map((product, index) => {
								return (
									<ProductCard
										key={product._id}
										_id={product._id}
										productName={product.title}
										productImage={product.images[0]}
										price={product.min_price}
										noOfReviews={product.review_count}
										satisfactionRating='98.5'
									/>
								);
							})}
						</SimpleGrid>
					)}
				</GridItem>
			</Grid>
		</div>
	);
};

export default ProductList;
