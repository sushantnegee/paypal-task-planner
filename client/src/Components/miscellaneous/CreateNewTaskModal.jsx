import {
  Box,
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
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/ContextProvider";
import UserListItem from "./UserListItem";

const CreateNEwTaskModal = ({ children }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState();
  const [assignee, setAssignee] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [status, setStatus] = useState();
  const [loading,setLoading] = useState();
  const [searchResult,setSearchResult] = useState();
  const [newTask, setNewTask] = useState([]);

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
        `https://paypal-task-planner-production.up.railway.app/tasks`,
        {
          title: title,
          description: description,
          type: type,
          assignee: assignee,
          status: status,
          sprint: selectedSprint._id,
        },
        config
      );
      console.log("sprint created =>", data);
      setNewTask([newTask, data.data]); 
      onClose();
      setFetchAgain(!fetchAgain);
      toast({
        title: "New Task Created!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create new Task!",
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
  
        const { data } = await axios.get(`https://paypal-task-planner-production.up.railway.app/user?search=${query}`, config);
        // console.log("search result group model =>",data)
        setSearchResult(data);
        setLoading(false);
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
// console.log(searchResult)
// console.log('task',newTask)
const handleTask=(userSelected)=>{
  if(assignee==userSelected){
      toast({
          title: "User already Added!",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        return 
  }
  setAssignee(userSelected);
}
// console.log(assignee)
// console.log(selectedSprint._id)
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
            Creat New Task
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
              <Select placeholder="Type" mb={'3'} onChange={(e)=>setType(e.target.value)}>
                <option value="bug">BUG</option>
                <option value="feature">FEATURE</option>
                <option value="story">STORY</option>
              </Select>
            </FormControl>
            <FormControl>
            <Select placeholder="Status" mb={'3'} onChange={(e)=>setStatus(e.target.value)}>
                <option value="todo">To-Do</option>
                <option value="in-progress">IN PROGRESS</option>
                <option value="done">DONE</option>
              </Select>
            </FormControl>
            <FormControl>
                <Input placeholder='Add Users eg: sushant etc' mb="3" onChange={(e)=>{handleSearch(e.target.value)}}/>
            </FormControl>
            {assignee?<Box mb={'2'}  paddng={"20px"} w={'100%'} display="flex" flexWrap={"wrap"}><Text backgroundColor={'skyblue'} fontSize={"m"}>{assignee.name}</Text></Box>:""}
            {loading?<Spinner/>:
          searchResult?.slice(0,4).map((elem)=>{
            return <UserListItem key={elem._id} user = {elem} handleFunction={()=>handleTask(elem)}/>
          })}
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
