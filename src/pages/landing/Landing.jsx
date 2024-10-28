import { Box, Button, Text } from "@chakra-ui/react"
import React from "react"
import { useAuth } from "../../utils/firebase/authContext/AuthContext"
import { useNavigate } from "react-router-dom"

const Landing = () => {
  const navigate = useNavigate()
  const { currUser } = useAuth()

  React.useEffect(() => {
    if (currUser) {
      navigate("/dashboard")
    }
  }, [])

  const handleGetStarted = () => {
     if (currUser){
       navigate("/dashboard")
     }else{
      navigate("/auth")
     }
  }
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      height='2xl'
    >
      <Text fontSize='3xl' fontWeight='semibold'>
        Welcome TO EMPLOYEES MANAGEMENT
      </Text>
      <Text fontSize='2xl' fontWeight='medium'>
        This is a website where you can manage your employees in your own hand
      </Text>
      <Button onClick={handleGetStarted} marginTop='20px' colorScheme='teal' variant='outline'>
        Lets get started
      </Button>
    </Box>
  )
}

export default Landing
