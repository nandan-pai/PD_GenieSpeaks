import {
	Box,
	Grid,
	GridItem,
	Heading,
	HStack,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Button,
	Spacer,
} from "@chakra-ui/react";
import ProductCard from "../Card/ProductCard/ProductCard";
import HeaderNavBar from "../NavBar/HeaderNavBar/HeaderNavBar";
import Filters from "../Filters/Filters";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ApiBaseUrl } from "../../config";
import Loader from "../Loader/Loader";
import { FaChevronDown } from "react-icons/fa";

const ProductList = ({ searchQuery, setSearchQuery }) => {
	const [productList, setProductList] = useState([]);
	const [loader, showLoader] = useState(false);

	const getProductList = useCallback(() => {
		axios.get(`${ApiBaseUrl}/prod/search?query=${searchQuery}`).then((res) => {
			// console.log(res.data.productList)
			setProductList(res.data.productList);
			showLoader(!loader);
		});
	}, [searchQuery]);

	useEffect(getProductList, [searchQuery, getProductList, setProductList]);

	return (
		<div className='prodList'>
			<HeaderNavBar />
			<Grid templateColumns='repeat(4, 1fr)' gap={6}>
				<GridItem colSpan={3}>
					<HStack>
						<Heading fontSize='2xl' ml='25vw'>
							"{searchQuery}"
						</Heading>
						<Menu>
							<MenuButton as={Button} rightIcon={<FaChevronDown />}>
								Sort
							</MenuButton>
							<MenuList>
								<MenuItem>Price: Low to High</MenuItem>
								<MenuItem>Price: High to Low</MenuItem>
							</MenuList>
						</Menu>
					</HStack>
				</GridItem>

				<Spacer></Spacer>

				<GridItem colSpan={1}>
					<Filters />
				</GridItem>
				<GridItem colSpan={3}>
					<Loader hidden={loader} />
					<Loader hidden={loader} />
					<Loader hidden={loader} />
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
