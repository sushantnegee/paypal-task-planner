import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/ContextProvider'
import UserListItem from './UserListItem'

const ShowAllUsers = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading,setLoading] = useState(false);
    const [allUsers,setAllUsers] = useState([]);

    const toast = useToast();
    const {user} = useContext(AppContext)
    const FetchAllUser= async ()=>{
          try {
            setLoading(true);
      
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
      
            const { data } = await axios.get(`https://paypal-task-planner-production.up.railway.app/user`, config);
            setAllUsers(data);
            setLoading(false);
          } catch (error) {
            toast({
              title: "Error Occured!",
              description: "Failed to Load all Users",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          }
    }
    useEffect(()=>{
        FetchAllUser()
    },[])
  return (
    <>
        <span onClick={onOpen}>{children}</span>
        <Modal isOpen={isOpen} onClose={onClose} overflowY={'scroll'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize={'35px'} fontFamily={'Work sans'} display={'flex'} justifyContent={'center'}>List of All Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDir="column" alignItems={"center"}>
            <Box h={'50vh'} overflowY="scroll" w={'100%'} p={2}>
            {allUsers?.map((user)=>{
                return <UserListItem user ={user} handleFunction={()=>{}}/>
            })}
            </Box>
          </ModalBody >
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ShowAllUsers