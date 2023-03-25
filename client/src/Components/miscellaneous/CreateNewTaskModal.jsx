import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { set } from "mongoose";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/ContextProvider";

const CreateNEwTaskModal = ({ children }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState();
  const [assignee, setAssignee] = useState();
  const [status, setStatus] = useState();
  const [loading,setLoading] = useState();

  const {
    selectedSprint,
    fetchAgain,
    setFetchAgain,
    user,
    sprints,
    setSprints,
  } = useContext(AppContext);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = async () => {
    if (!title || !type || !assignee) {
      toast({
        title: "Please Fill all Fields",
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

      const data = await axios.post(
        `http://localhost:5000/tasks`,
        {
          title: title,
          description: description,
          type: type,
          assignee: assignee,
          status: status,
          sprint: selectedSprint,
        },
        config
      );
      console.log("sprint created =>", data);
      setSprints([...sprints, data.data]);
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
  };
  const handleSearch= async (query)=>{
    if (!query) {
        return;
      }
  
      try {
        setLoading(true);
  
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
  
        const { data } = await axios.get(`http://localhost:5000/user?search=${query}`, config);
        console.log("search result group model =>",data)
        setAssignee(data);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Search Results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
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
            Creat New Sprint
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir="column" alignItems={"center"}>
            <FormControl>
              <Input
                placeholder="Title"
                mb="3"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <Select placeholder="Type" >
                <option value="bug">BUG</option>
                <option value="feature">FEATURE</option>
                <option value="story">STORY</option>
              </Select>
            </FormControl>
            <FormControl>
            <Select placeholder="Status" mb={'3'}>
                <option value="todo">To-Do</option>
                <option value="in-progress">IN PROGRESS</option>
                <option value="done">DONE</option>
              </Select>
            </FormControl>
            <FormControl>
                <Input placeholder='Add Users eg: sushant etc' mb="3" onChange={(e)=>{handleSearch(e.target.value)}}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Sprint
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateNEwTaskModal;
