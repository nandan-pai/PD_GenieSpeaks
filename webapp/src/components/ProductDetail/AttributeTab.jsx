import {
    Box,
    Grid,
    GridItem,
    Text,
} from "@chakra-ui/react";

export default function AttributeTab({
    attributes = {}
}) {
    return (
        <Box
            className='scrollable-content'
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
            <Grid
                templateColumns='repeat(2, 1fr)'
                w={{
                    xl: "100%",
                    lg: "100%",
                    md: "80%",
                    sm: "90vw",
                    base: "90vw",
                }}
                gap={{
                    xl: "5px",
                    lg: "3px",
                    md: "1px",
                    sm: "0px",
                    base: "0px",
                }}
            >
                {Object.keys(attributes).map(
                    (attribute) => {
                        return (
                            <>
                                <GridItem key={attribute}>
                                    <Text color='gray'>{attribute}</Text>
                                </GridItem>
                                <GridItem key={attributes[attribute]}>
                                    <Text fontWeight='semibold'>
                                        {attributes[attribute]}
                                    </Text>
                                </GridItem>
                            </>
                        );
                    }
                )}
            </Grid>
        </Box>
    )
}
