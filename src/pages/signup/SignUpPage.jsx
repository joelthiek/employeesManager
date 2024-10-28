import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: error.message,
        status: "error",  // Fixed typo here
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH='100vh' display='flex' alignItems='center' justifyContent='center'>
      <Box
        p={8}
        borderRadius='md'
        boxShadow="2xl"
        maxW='sm'
        w='100%'
        className='signup-container'
      >
        <VStack spacing={4} align='center'>
          <Heading fontSize='2xl'>Sign Up</Heading>
          <Text fontSize='md' color='gray.500'>Create an account to get started!</Text>
        </VStack>
        <form onSubmit={handleSignup}>
          <VStack spacing={4} mt={8}>
            <FormControl isRequired>
              <FormLabel fontWeight='semibold'>Email</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                focusBorderColor='teal.400'
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight='semibold'>Password</FormLabel>
              <Input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                focusBorderColor='teal.400'
              />
            </FormControl>
            <Button type='submit' colorScheme='teal' size='md' width='full' mt={4}>
              Sign Up
            </Button>
            <Text>
              Already have an account? <Link to='/auth'>Sign in</Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default SignUpPage;
