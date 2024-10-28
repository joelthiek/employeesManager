import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/firebase/authContext/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate()

  const {currUser} = useAuth()

  React.useEffect(()=>{
    if (currUser){
      navigate("/dashboard")
    }
  },[])

  const handleSignIn = async(e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth,email,password)
      toast({
        title: 'sign in successfull',
        description: "Redirecting you to dashboard",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard")
    } catch (error) {
      toast({
        title: 'Sign in failed',
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
 
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        maxW="sm"
        w="100%"
        className="signup-container"
      >
        <VStack spacing={4} align="center">
          <Heading fontSize="2xl">
            Sign In
          </Heading>
          <Text fontSize="md" color="gray.500">
            Sign in to get started!
          </Text>
        </VStack>
        <form onSubmit={handleSignIn}>
          <VStack spacing={4} mt={8}>
            <FormControl isRequired>
              <FormLabel fontWeight="semibold">Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                focusBorderColor="teal.400"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="semibold">Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                focusBorderColor="teal.400"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              size="md"
              width="full"
              mt={4}
            >
              Sign in
            </Button>

            <Text>Don't have an account? <Link to="/signup">Sign up</Link></Text>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default SignIn;
