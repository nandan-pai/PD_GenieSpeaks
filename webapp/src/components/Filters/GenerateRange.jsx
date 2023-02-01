import {
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderMark,
	RangeSliderThumb,
	RangeSliderTrack,
	Text,
	// useColorMode,
} from "@chakra-ui/react";

export default function GenerateRange({ obj, index, setFilter, filter }) {
	// const { colorMode } = useColorMode();
	// const isDark = colorMode === "dark";

    return (
        <div className='filter-category price' key={index}>
            <Text fontSize='md' fontWeight='semibold' mt='5'>
                {obj.name}
            </Text>
            <RangeSlider
                defaultValue={[obj.value[0], obj.value[1]]}
                min={obj.value[0]}
                max={obj.value[1]}
                step={10000}
                onChange={(val) =>
                    setFilter({
                        ...filter,
                        [obj.name.toString()]: {
                            identifier: obj.identifier,
                            type: obj.return,
                            value: val,
                        },
                    })
                }
            >
                <RangeSliderTrack bg='gray'>
                    <RangeSliderFilledTrack bg='tomato' />
                </RangeSliderTrack>
                <RangeSliderMark value={obj.value[0]} mt='1' ml='-2.5' fontSize='sm'>
                    {obj.value[0]}
                </RangeSliderMark>
                <RangeSliderMark value={obj.value[1]} mt='1' ml='-35' fontSize='sm'>
                    {obj.value[1]}
                </RangeSliderMark>

                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
            </RangeSlider>
        </div>
    );
}
