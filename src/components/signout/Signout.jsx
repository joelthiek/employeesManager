import { Box, Button, useToast } from "@chakra-ui/react"
import React from "react"
import { useAuth } from "../../utils/firebase/authContext/AuthContext"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../utils/firebase/firebase"

const Signout = ({ variant }) => {
  const { currUser } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast({
        title: "Logged out",
        description: "You have successfully logged out",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      navigate("/auth")
    } catch (error) {
      toast({
        title: "Logged out failed",
        descripton: error.message,
        status: "error",
        duration: 3000,
        isClosable: "true",
      })
    }
  }
  return (
    <Box>
      {currUser && (
        <Button onClick={handleLogout} variant={variant}>
          Logout
        </Button>
      )}
    </Box>
  )
}

export default Signout
