
import {
    Button,
    FormControl,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useContext, useState } from "react";
  import { AppContext } from "../../Context/ContextProvider";
  


  const EditTaskModal = ({ children }) => {
      const {selectedTask }  = useContext(AppContext);
      const [status, setStatus] = useState();
      const [type, setType] = useState();

  
    const {
      fetchAgain,
      setFetchAgain,
      user
    } = useContext(AppContext);
    const toast = useToast();
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleSubmit = () => {

        onClose();
        setFetchAgain(!fetchAgain);
        
    };

  

  const handleTypeChange = async ()=>{
    if (!type) {
      toast({
        title: "Please Enter type of task",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const data = await axios.patch(
        `https://paypal-task-planner-production.up.railway.app/tasks/${selectedTask._id}/type`,
        {
          type: type,
        },
        config
      );
      toast({
        title: "Task Type Changed!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Change type!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
  const handleStatusChange = async ()=>{
    if (!status) {
      toast({
        title: "Please Enter Status of task",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const data = await axios.patch(
        `https://paypal-task-planner-production.up.railway.app/tasks/${selectedTask._id}/status`,
        {
          status: status,
        },
        config
      );
      toast({
        title: "Task Status Updated!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Update Status !",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
    return (
      <>
        <span onClick={onOpen}>{children}</span>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize={"35px"}
              fontFamily={"Work sans"}
              display={"flex"}
              justifyContent={"center"}
            >
              {selectedTask?.title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody display={"flex"} flexDir="column" alignItems={"center"}>
              
              <FormControl display={"flex"} gap={2}>
                <Select placeholder="Type" mb={'3'}  onChange={(e)=>setType(e.target.value)}>
                  <option value="bug">BUG</option>
                  <option value="feature">FEATURE</option>
                  <option value="story">STORY</option>
                </Select>
                <Button colorScheme="blue" onClick={handleTypeChange}>
                Change Type
               </Button>
              </FormControl>
              <FormControl display={"flex"} gap={2}>
              <Select placeholder="Status" mb={'3'}  onChange={(e)=>setStatus(e.target.value)}>
                  <option value="todo">To-Do</option>
                  <option value="in-progress">IN PROGRESS</option>
                  <option value="done">DONE</option>
                </Select>
                <Button colorScheme="blue" onClick={handleStatusChange}>
                Change Status
               </Button>
              </FormControl>
              
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Done
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default EditTaskModal;
  