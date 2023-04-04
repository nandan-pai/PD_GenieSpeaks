import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import Slider from "react-slick";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import SuggestionCard from "../SuggestionCard/SuggestionCard";

// Settings for the slider
const settings = {
	dots: false,
	arrows: false,
	fade: false,
	infinite: true,
	autoplay: false,
	speed: 500,
	autoplaySpeed: 5000,
	slidesToShow: 3,
	slidesToScroll: 1,
	lazyload: "ondemand",
};

const SuggestionCarousel = ({suggestionList=[]}) => {
	// const [suggestionList, setSuggestionList] = useState([]);
	const [slider, setSlider] = useState(null);

	const top = useBreakpointValue({
		xl: "50%",
		lg: "50%",
		md: "50%",
		sm: "50%",
		base: "50%",
	});
	const side = useBreakpointValue({
		xl: "10px",
		lg: "10px",
		md: "10px",
		sm: "10px",
		base: "10px",
	});

	// const getSuggestionList = useCallback(() => {
	// 	axios.get(`${ApiBaseUrl}/user/suggestions`).then((res) => {
	// 		setSuggestionList(res.data.suggestions);
	// 	});
	// }, []);

	// useEffect(() => {
	// 	getSuggestionList();
	// }, [getSuggestionList]);

	return (
		<Box position='relative' height='350px' width='full' overflow='hidden'>
			<link
				rel='stylesheet'
				type='text/css'
				charSet='UTF-8'
				href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
			/>
			<link
				rel='stylesheet'
				type='text/css'
				href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
			/>
			{/* Left arrow */}
			<IconButton
				aria-label='left-arrow'
				bgColor='#151515'
				borderRadius='full'
				position='absolute'
				left={side}
				top={top}
				zIndex={2}
				onClick={() => slider?.slickPrev()}
			>
				<BiLeftArrowAlt color='white' />
			</IconButton>
			{/* Right arrow */}
			<IconButton
				aria-label='right-arrow'
				bgColor='#151515'
				borderRadius='full'
				position='absolute'
				right={side}
				top={top}
				zIndex={2}
				onClick={() => slider?.slickNext()}
			>
				<BiRightArrowAlt color='white' />
			</IconButton>
			{/* Slider */}
			<Slider
				{...settings}
				ref={(slider) => setSlider(slider)}
				className='carouselSlide'
			>
				{suggestionList.map((suggestion, index) => (
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
				))}
			</Slider>
		</Box>
	);
};

export default SuggestionCarousel;
