import React from 'react';
import { SkeletonText, SkeletonCircle, Box } from '@chakra-ui/react';

function Loader(props) {
    return (
        <>
            <Box padding='6' boxShadow='lg' bg='white' mb='4' maxH='300px' hidden={props.hidden}>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' />
            </Box>
        </>
    )
}

export default Loader