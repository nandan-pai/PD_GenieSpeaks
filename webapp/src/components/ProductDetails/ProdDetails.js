import React from "react";
import styles from "./ProdDetails.module.css";
import Navbar from "../NavBar/Navbar";
import {
  VStack,
  Box,
  Stack,
  HStack,
  Container,
  Heading,
  Text,
  Icon,
} from "@chakra-ui/react";
import ProgressBar from "../Views/ProgressBar";
import Card from "../Card/Card";
import {
  // FaStarHalfAlt,
  // FaRegStar,
  // FaStar,
  FaRegThumbsUp,
} from "react-icons/fa";

function ProdDetails() {
  // const src =
  return (
    <>
      <Navbar />
      <HStack className={styles.img}>
        <VStack spacing={4}>
          <Box h="50px" w="50px" bg="yellow.200" className={styles.box1} />
          <Box h="50px" w="50px" bg="tomato" className={styles.box2} />
          <Box h="50px" w="50px" bg="pink.100" className={styles.box3} />
        </VStack>
        <Stack>
          <Box h="300px" w="300px" bg="blue.100" className={styles.box} />
        </Stack>
      </HStack>
      <Box ml='500px'>
      <Box mt='130px'>
        <Heading as="h4" size="md">
          Product Name
        </Heading>
        <HStack ml='480px'>
        <Icon as={FaRegThumbsUp} color="green" />
        <Text fontWeight="semibold" color="green">
          95.6%
        </Text>
        </HStack>
      </Box>
        <Container maxW="lg">
            <ProgressBar clr="green" val="80" />
            <ProgressBar clr="red" val="30" />
            <ProgressBar clr="orange" val="60" />
        </Container>
        <Box>
            <Heading as="h5" size="s" mt='25px'>
                Customer Reviews
            </Heading>
        </Box>
      <Container size='2xl' maxW='800px' maxH='200px' >
        <Card 
            name="Customer 1" 
            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            upVote='18'
        />
        <Card 
            name="Customer 2" 
            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            upVote='8'
        />
      </Container>
      </Box>
    </>
  );
}

export default ProdDetails;
