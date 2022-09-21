import React from 'react';
import { Progress } from '@chakra-ui/react';

function ProgressBar(props) {
  return (
    <>
        <Progress colorScheme={props.clr} value={props.val} mt='15px' borderRadius='md' />
    </>
  )
}

export default ProgressBar;