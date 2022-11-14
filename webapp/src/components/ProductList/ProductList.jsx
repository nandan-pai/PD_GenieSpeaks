import {
	Grid,
	GridItem,
	HStack,
	SimpleGrid,
	Text,
	Spinner,
	Spacer,
	VStack,
	Show,
} from "@chakra-ui/react";
import ProductCard from "../Card/ProductCard/ProductCard";
import { useState, useEffect, useCallback } from "react";
import Filters from "../Filters/Filters";
import axios from "axios";
import { ApiBaseUrl } from "../../config";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { BiError } from "react-icons/bi";
import "./ProductList.css";
import SortMenu from "../SortMenu/SortMenu";
import FilterMenu from "../Filters/FilterMenu";

const ProductList = ({ searchQuery, setSearchQuery, filter, setFilter }) => {
	const [productList, setProductList] = useState([]);
	const [productCount, setProductCount] = useState(0);
	const [sort, setSort] = useState("_id");
	const [limit, setLimit] = useState(20);
	const [offset, setOffset] = useState(0);
	const [loader, showLoader] = useState(true);

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
			setProductList(res.data.product_list);
			setProductCount(res.data.product_count);
			showLoader(false);
		});
	}, [searchQuery, navigate, limit, offset, sort, filter]);

	useEffect(getProductList, [searchQuery, getProductList]);

	return (
		<div className='prodList' mr='10px'>
			<NavBar
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				setFilter={setFilter}
			/>
			{productCount ? (
				<HStack mr={{ base: "20px", lg: "20px", md: "5px", sm: "5px" }}>
					{productCount === 1 ? (
						<Text
							ml='25%'
							fontSize={{ base: "md", lg: "md", md: "sm", sm: "sm" }}
						>
							Showing {productCount} of {productCount} result for&nbsp;
							<span className='query'>"{searchQuery}"</span>
						</Text>
					) : (
						<Text
							ml={{ base: "25%", lg: "25%", md: "20%", sm: "10%" }}
							fontSize={{ base: "md", lg: "md", md: "sm", sm: "sm" }}
						>
							Showing {offset + 1} -{" "}
							{offset + limit < productList.length
								? offset + limit
								: productList.length}{" "}
							of {productCount} results for&nbsp;
							<span className='query'>"{searchQuery}"</span>
						</Text>
					)}
					<Spacer />
					<Show below='md'>
						<HStack>
							<FilterMenu
								searchQuery={searchQuery}
								setFilter={setFilter}
								filter={filter}
							/>
							<SortMenu sort={sort} setSort={setSort} />
						</HStack>
					</Show>
					<Show above='md'>
						<SortMenu sort={sort} setSort={setSort} />
					</Show>
				</HStack>
			) : (
				<></>
			)}
			<Grid templateColumns='repeat(4, 1fr)'>
				<GridItem colSpan={{ base: 1, lg: 1, md: 1 }}>
					<Filters
						searchQuery={searchQuery}
						setFilter={setFilter}
						filter={filter}
					/>
				</GridItem>
				<GridItem colSpan={{ base: 3, lg: 3, md: 3, sm: 4 }}>
					{loader ? (
						<Spinner />
					) : productList.length ? (
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
										satisfactionRating={product.satisfactory_rating}
									/>
								);
							})}
						</SimpleGrid>
					) : (
						<VStack mt='10%'>
							<BiError color='orange' ml='50%' size='50px' />
							<Text fontSize='2xl'>
								No products available for{" "}
								<span className='warning'>"{searchQuery}"</span>
							</Text>
						</VStack>
					)}
				</GridItem>
			</Grid>
		</div>
	);
};

export default ProductList;
