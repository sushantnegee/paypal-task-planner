import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {BiHide,BiShow} from 'react-icons/bi'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading,setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const handleClick = ()=>{
        setShow(!show);
    }
    const submitHandler = async()=>{
        setLoading(true);
    if(!email || !password){
        toast({
            title: 'Please Fill all Fields',
            status: 'warning',
            duration: 4000,
            isClosable: true,
            position:"bottom"
          })
          setLoading(false);
          return;
    }
    try{
        const config = {
            headers:{
                "Content-type":"application/json"
            }
        };

    const {data} = await axios.post("https://paypal-task-planner-production.up.railway.app/user/login",{email,password},config);

        toast({
            title: 'Login Successfull',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position:"bottom"
          })
          localStorage.setItem('userInfo',JSON.stringify(data));
          setLoading(false);
          navigate('/taskplanner')
    }catch(error){
        toast({
            title: 'Error Occured',
            description:error.response.data.message,
            status: 'success',
            duration: 4000,
            isClosable: true,
            position:"bottom"
          })
          console.log("error:",error)
          setLoading(false); 
    }
    }
  return (
    <VStack >
        <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)}/>
    </FormControl>
    <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input type={show?'text':'password'} placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
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