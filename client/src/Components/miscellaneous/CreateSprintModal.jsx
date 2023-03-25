import {Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext } from '../../Context/ContextProvider';

const CreateSprintModal = ({children}) => {
    const [sprintName,setSprintName] = useState();
    const [sprintStartDate,setSprintStartData] = useState();
    const [sprintEndDate,setSprintEndData] = useState();

    const toast = useToast();

    const {fetchAgain,setFetchAgain,user,sprints,setSprints}=useContext(AppContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleSubmit=async (  )=>{
        if(!sprintName || !sprintStartDate || !sprintEndDate){
            toast({
                title: "Please Fill all Fields",
                status: "error",
                duration: 4000,
                isClosable: true,
                position: "top",
              });
              return 
        }

        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              };

              const  data = await axios.post(`http://localhost:5000/sprints`,{
                name:sprintName,
                startDate:sprintStartDate,
                endDate:sprintEndDate
              }, config);
              if(data.message){
                toast({
                  title: "Failed to Create new Sprint!",
                  // description: error.response.data,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom",
                });
                return
              }
              console.log("sprint created =>",data)
              setSprints([...sprints,data.data])
              onClose();
              setFetchAgain(!fetchAgain);
              toast({
                title: "New Sprint Created!",
                status: "success",
                duration: 4000,
                isClosable: true,
                position: "bottom",
              });
        } catch (error) {
            toast({
                title: "Failed to Create new Sprint!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
        }
    }
    console.log(children)
    console.log(sprintStartDate, "to", sprintEndDate)
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize={'35px'} fontFamily={'Work sans'} display={'flex'} justifyContent={'center'}>Creat New Sprint</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDir="column" alignItems={"center"} >
            <FormControl>
                <Input placeholder='Sprint Name' mb="3" onChange={(e)=>{setSprintName(e.target.value)}}/>
            </FormControl>
            <FormControl>
                <Input placeholder='Start Date' type={"date"} mb="3" onChange={(e)=>{setSprintStartData(e.target.value)}}/>
            </FormControl>
            <FormControl>
                <Input placeholder='End Date' mb="3" type={"date"} onChange={(e)=>{setSprintEndData(e.target.value)}}/>
            </FormControl>
          </ModalBody >
          
          <ModalFooter>
            <Button colorScheme='blue'  onClick={handleSubmit}>
              Create Sprint
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateSprintModal