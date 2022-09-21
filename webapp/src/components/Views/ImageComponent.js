import React from 'react';
import { Image } from '@chakra-ui/react';


export default function ImageComponent(props) {
  return (
    <div>
        <Image boxSize={200} src={props.src} alt='Dan Abramov' />
    </div>
  )
}
