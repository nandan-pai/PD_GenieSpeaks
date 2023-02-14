import {
    Checkbox,
    CheckboxGroup,
    HStack,
    Spacer,
    Stack,
    Text,
    useColorMode,
} from "@chakra-ui/react";

export default function GenerateChecklist({ obj, index, setFilter, filter }) {
    const { colorMode } = useColorMode();
    const isDark = colorMode === "dark";

    return (
        <div className='filter-category' key={index}>
            <Text fontSize='md' fontWeight='semibold' mt='5'>
                {obj.name}
            </Text>
            <CheckboxGroup
                onChange={(e) =>
                    setFilter({
                        ...filter,
                        [obj.name.toString()]: {
                            identifier: obj.identifier,
                            type: obj.return,
                            value: e,
                        },
                    })
                }
            >
                <Stack mt='2' ml='2' pr={5} className='scrollable'>
                    {obj.value.map((objval, index) => {
                        return (
                            <HStack key={objval._id}>
                                <Checkbox value={objval._id ? objval._id : "null"}>
                                    {objval.name ? objval.name : "null"}
                                </Checkbox>
                                <Spacer />
                                <Text color={isDark ? "white.100" : "gray.500"}>
                                    {objval.count}
                                </Text>
                            </HStack>
                        );
                    })}
                </Stack>
            </CheckboxGroup>
        </div>
    );
}
