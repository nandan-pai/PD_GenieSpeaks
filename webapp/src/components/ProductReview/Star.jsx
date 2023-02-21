import { FaRegStar, FaStar } from "react-icons/fa";
import {
	Icon,
	useColorMode,
} from "@chakra-ui/react";

export default function Star({index, reviewStar, setReviewStar}) {
    const { colorMode } = useColorMode();
    const isDark = colorMode === "dark";
  return (
    <Icon
        as={reviewStar ? FaStar : FaRegStar}
        mr='2px'
        fontSize='30px'
        color={
            reviewStar>=index ? "orange" : isDark ? "white" : "black"
        }
        key={index}
        _hover={{ cursor: "pointer", color: "orange" }}
        onClick={() => setReviewStar(index)}
    />
  )
}
