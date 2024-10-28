import { Box, Button, Text, useColorMode } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../utils/firebase/authContext/AuthContext"
import Signout from "../signout/Signout"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const { currUser } = useAuth()
  const navigate = useNavigate()

  const { colorMode, toggleColorMode } = useColorMode()

  const handleNavigateAnalytic = ()=> {
      navigate("/analytic")
  }

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      height='60px'
      padding='20px'
      alignItems='center'
      boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;'
    >
      <Text fontSize='2sm' fontWeight='bold' cursor="pointer" onClick={()=> navigate("/")}>
        Employee Management
      </Text>
      <Box display='flex' alignItems='center' gap='20px'>
        <Text cursor='pointer' size='md' onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Text>

        {currUser && <Text cursor="pointer" onClick={handleNavigateAnalytic}>Analytics</Text>}

        {currUser ? (
          <Signout variant='solid' />
        ) : (
          <Link to='/auth'>
            <Button colorScheme='blue'>Sign in</Button>
          </Link>
        )}
      </Box>
    </Box>
  )
}

export default Navbar
