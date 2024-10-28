import { Box } from '@chakra-ui/react'
import React from 'react'

const Container = ({children}) => {
  return (
    <Box display="flex" justifyContent="center">
       <Box width="80%">{children}</Box>
    </Box>
  )
}

export default Container
