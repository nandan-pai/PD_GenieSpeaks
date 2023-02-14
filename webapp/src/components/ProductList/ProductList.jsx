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
	Tooltip,
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
import Filters from "./Filters/Filters";
import FilterMenu from "./Filters/FilterMenu";
import "./ProductList.css";
import SuggestionCard from "./SuggestionCard/SuggestionCard";
import Paginator from "./Paginator/Paginator";
import { GoInfo } from "react-icons/go";
import SearchContext from "../../context/SearchContext/SearchContext";

const ProductList = () => {
	const { searchQuery, filter, sort, setSort, limit, offset } =
		useContext(SearchContext);
	const [productList, setProductList] = useState([]);
	const [productCount, setProductCount] = useState(0);
	const [suggestionList, setSuggestionList] = useState([]);
	const [loader, showLoader] = useState(true);

	const { colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	let navigate = useNavigate();

	const getSuggestionList = useCallback(() => {
		axios.get(`${ApiBaseUrl}/user/suggestions`).then((res) => {
			setSuggestionList(res.data.randomSuggestions);
		});
	}, []);

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

	useEffect(() => {
		getProductList();
		getSuggestionList();
	}, [searchQuery, getProductList, getSuggestionList]);

	return (
		<div className='prodList' mr='10px'>
			<NavBar />
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
								: offset + productList.length}{" "}
							of {productCount} results for&nbsp;
							<span className='query'>"{searchQuery}"</span>
						</Text>
					)}
					<Spacer />
					<Show below='md'>
						<HStack>
							<FilterMenu />
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
					<Filters />
				</GridItem>
				<GridItem colSpan={{ base: 3, lg: 3, md: 3, sm: 4 }}>
					{loader ? (
						<Spinner />
					) : productList.length ? (
						<>
							<Box
								w='98%'
								mt='10px'
								p='10px'
								bgColor={isDark ? "#252525" : "#e3e6e8"}
								// mb='10px'
								// borderWidth='0.5px'
								borderRadius='md'
							>
								<HStack>
									<Text fontWeight='semibold'>Suggestions</Text>
									<Tooltip
										label='Based on your previous searches and trending products'
										fontSize='md'
										fontWeight='md'
										placement='auto'
										hasArrow
									>
										<GoInfo />
									</Tooltip>
								</HStack>
								<HStack mt={2} spacing={2} ml={1} mb={2}>
									{suggestionList.map((suggestion, index) => {
										return (
											<SuggestionCard
												key={index}
												_id={suggestion._id}
												productName={suggestion.title}
												productImage={suggestion.images[0]}
												satisfactionRating={parseFloat(
													suggestion.satisfactory_rating
												).toFixed(2)}
												price={suggestion.min_price}
											/>
										);
									})}
								</HStack>
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
											isRenewed={true}
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
