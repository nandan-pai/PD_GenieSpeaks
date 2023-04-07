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
	Box,
	Flex,
	useColorMode,
} from "@chakra-ui/react";
import ProductCard from "../Card/ProductCard/ProductCard";
import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { ApiBaseUrl } from "../../config";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { BiError } from "react-icons/bi";
import SortMenu from "../SortMenu/SortMenu";
import FilterDesktop from "./Filters/FilterDesktop";
import FilterMobile from "./Filters/FilterMobile";
import Paginator from "./Paginator/Paginator";
import SearchContext from "../../context/SearchContext/SearchContext";
import SuggestionCarousel from "./SuggestionCarousel/SuggestionCarousel";

import "./ProductList.css";

const ProductList = () => {
	const { searchQuery, filter, sort, setSort, limit, offset } =
		useContext(SearchContext);
	const [productList, setProductList] = useState([]);
	const [productCount, setProductCount] = useState(0);
	const [loader, showLoader] = useState(true);
	const [suggestionList, setSuggestionList] = useState([]);

	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	let navigate = useNavigate();

	useEffect(() => {});

	const getProductList = useCallback(() => {
		if (searchQuery === "") {
			return navigate("/");
		}
		showLoader(true);
		// console.log("ProductListgetter", filter)
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
			axios.get(`${ApiBaseUrl}/user/suggestions`).then((res) => {
				setSuggestionList(res.data.suggestions);
				showLoader(false);
			});
		});
	}, [searchQuery, navigate, limit, offset, sort, filter]);

	useEffect(() => {
		getProductList();
	}, [searchQuery, getProductList]);

	return (
		<div className='prodList' mr='10px'>
			<NavBar />
			{productCount ? (
				<HStack mr={{ lg: "20px", md: "5px", sm: "5px", base: "5px" }}>
					{productCount === 1 ? (
						<>
							<Show above='md'>
								<Text
									ml={{ xl: "25%", lg: "25%", md: "25%" }}
									fontSize={{ xl: "md", lg: "md", md: "sm" }}
								>
									Showing {productCount} of {productCount} result for&nbsp;
									<span className='query'>"{searchQuery}"</span>
								</Text>
							</Show>
							<Show below='md'>
								<Text
									ml={{ md: "25%", sm: "15%", base: "10%" }}
									fontSize={{ xl: "md", lg: "md", md: "sm" }}
								>
									{productCount} of {productCount} for&nbsp;
									<span className='query'>"{searchQuery}"</span>
								</Text>
							</Show>
						</>
					) : (
						<>
							<Show above='md'>
								<Text
									ml={{ xl: "25%", lg: "25%", md: "20%" }}
									fontSize={{
										xl: "md",
										lg: "md",
										md: "sm",
									}}
								>
									Showing {offset + 1} -{" "}
									{offset + limit < productList.length
										? offset + limit
										: offset + productList.length}{" "}
									of {productCount} results for&nbsp;
									<span className='query'>"{searchQuery}"</span>
								</Text>
							</Show>
							<Show below='sm'>
								<Text
									ml={{ md: "20%", sm: "10%", base: "10%" }}
									fontSize={{
										md: "sm",
										sm: "sm",
										base: "sm",
									}}
								>
									{offset + 1} -{" "}
									{offset + limit < productList.length
										? offset + limit
										: offset + productList.length}{" "}
									of {productCount} for&nbsp;
									<span className='query'>"{searchQuery}"</span>
								</Text>
							</Show>
						</>
					)}
					<Spacer />
					<Show below='md'>
						<HStack>
							<FilterMobile />
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
				<GridItem colSpan={{ lg: 1, md: 1, base: 1 }}>
					<FilterDesktop />
				</GridItem>
				<GridItem colSpan={{ lg: 3, md: 3, sm: 4, base: 4 }}>
					{loader ? (
						<Flex justify='center' p={10}>
							<Spinner />
						</Flex>
					) : productList.length ? (
						<>
							<Box
								w='98%'
								mt='10px'
								p='10px'
								bgColor={isDark ? "#252525" : "#e3e6e8"}
								borderRadius='md'
							>
								<HStack>
									<Text fontWeight='semibold'>Suggestions</Text>
								</HStack>
								<SuggestionCarousel suggestionList={suggestionList} />
							</Box>
							<SimpleGrid minChildWidth='420px' spacing='10px' mb={10}>
								{productList.map((product, index) => {
									return (
										<ProductCard
											key={product._id}
											_id={product._id}
											productName={product.title}
											productImage={product.images[0]}
											price={product.min_price}
											noOfReviews={product.review_count}
											isRenewed={false}
											satisfactionRating={parseFloat(
												product.satisfactory_rating
											).toFixed(2)}
										/>
									);
								})}
							</SimpleGrid>
							<Flex align='center' justify='center'>
								<Paginator pages={Math.ceil(productCount / limit)} />
							</Flex>
						</>
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
