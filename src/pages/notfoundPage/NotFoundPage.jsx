import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
   const navigate = useNavigate()
   const [time,setTime] = React.useState(3)

   if (time === 0){
    navigate(-1)
 } 

   React.useEffect(()=>{
     const time = setInterval(() => {
        setTime((prev)=> prev - 1)
     }, 1000);
     return ()=> clearInterval(time)
   },[time])
  return (
    <Box marginTop="10">
        <Text textAlign="center" fontSize="2xl" fontWeight="bold">No route found</Text>
        <Text textAlign="center" fontSize="1xl">Rediecting you back to prev page in {time}</Text>
    </Box>
  )
}

export default NotFoundPage
