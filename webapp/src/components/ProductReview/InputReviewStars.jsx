import {
	HStack,
} from "@chakra-ui/react";
import Star from "./Star";

export default function InputReviewStars({reviewStar, setReviewStar}) {
    return (
        <HStack alignSelf='start'>
            <Star index={1} reviewStar={reviewStar} setReviewStar={setReviewStar} />
            <Star index={2} reviewStar={reviewStar} setReviewStar={setReviewStar} />
            <Star index={3} reviewStar={reviewStar} setReviewStar={setReviewStar} />
            <Star index={4} reviewStar={reviewStar} setReviewStar={setReviewStar} />
            <Star index={5} reviewStar={reviewStar} setReviewStar={setReviewStar} />
        </HStack>
    )
}
