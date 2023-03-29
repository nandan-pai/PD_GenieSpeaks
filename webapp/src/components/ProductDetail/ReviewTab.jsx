import {
    Box,
    Container
} from "@chakra-ui/react";
import ReviewCard from "./ReviewCard/ReviewCard";

export default function ReviewTab({
    reviews = []
}) {
    return (
        <Box
            className='scrollable-reviews'
            h='90vh'
            w={{
                xl: "48vw",
                lg: "48vw",
                md: "60vw",
                sm: "95vw",
                base: "95vw",
            }}
            overflow='auto'
        >
            <Container
                size='2xl'
                maxW='800px'
                maxH='200px'
                w='fit-content'
            >
                {
                    reviews
                        .sort((review1, review2) => (review1.authentic === review2.authentic) ? 0 : review1.authentic ? -1 : 1)
                        .map((filteredReview) => {
                            return (
                                <ReviewCard
                                    key={filteredReview._id}
                                    name={filteredReview.user.name}
                                    title={filteredReview.title}
                                    stars={filteredReview.stars}
                                    remainingStars={5 - filteredReview.stars}
                                    reviewURL={filteredReview.url}
                                    desc={filteredReview.description}
                                    user={filteredReview.user}
                                    ecommerce={filteredReview.ecommerce.name}
                                    upVote='18'
                                    authentic={filteredReview.authentic}
                                />
                            );
                        })
                }
            </Container>

        </Box>
    )
}
