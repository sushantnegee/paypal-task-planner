import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {BiHide,BiShow} from 'react-icons/bi'

const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading,setLoading] = useState(false);
    const handleClick = ()=>{
        setShow(!show);
    }
    const submitHandler = ()=>{

    }
  return (
    <VStack >
        <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter Your Email" />
    </FormControl>
    <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input type={show?'text':'password'} placeholder="Enter password" />
        <InputRightElement width={'4.5rem'}>
            <Button h='1.75rem' size='sm' onClick={handleClick} >
                {show?<BiHide/>:<BiShow/>}
            </Button>
        </InputRightElement>
        </InputGroup>
    </FormControl>
    <Button colorScheme={'blue'} width="100%" style={{marginTop:15}} isLoading={loading} onClick={submitHandler}>
        Login
    </Button>
    </VStack>
  )
}

export default Login