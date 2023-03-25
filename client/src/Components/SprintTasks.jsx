import { Box, Button, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { AddIcon } from '@chakra-ui/icons';
import TaskList from './TaskComponents/TaskList';
import { AppContext } from '../Context/ContextProvider';
import axios from 'axios';
import CreateNEwTaskModal from './miscellaneous/CreateNewTaskModal';
import EditTaskModal from './miscellaneous/EditTaskModal';
import ShowAllUsers from './miscellaneous/ShowAllUsers';

const SprintTasks = () => {
  const [allTasks,settAllTasks] = useState();
  const [loading,setLoading] = useState(false);
  const [tasks,setTasks] = useState([]);
  const toast = useToast();

  const {user,selectedSprint,fetchAgain,selectedTask} = useContext(AppContext)
  const fetchTasks = async () => {
    if (!selectedSprint) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `https://paypal-task-planner-production.up.railway.app/tasks/${selectedSprint._id}`,
        config
      );
      setTasks(data);
      // console.log(data)
      // console.log("fetched Tasks =>",tasks)
      setLoading(false);

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Tasks",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleEditTask = ()=>{
    toast({
      title: "Select a Task Before Editing!",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  }
  useEffect(() => {
    fetchTasks();
  }, [selectedSprint,fetchAgain]);
  console.log('selected Task =====>',selectedTask)
  return (
    <> 
    {selectedSprint?
    <Container maxW={"100%"} centerContent>
      <Box
        display={'flex'}
        justifyContent={'space-around'}
        padding={1}
        backgroundColor={"white"}
        width={'100%'}
        margin={'15px 0px 15px 0px'}
        borderRadius={'lg'}
        borderWidth={'1px'}
        >
        <Text
          textAlign={"center"}
          fontSize={"2xl"}
          fontFamily={"Work sans"}
          // color={"black"}
          >
          {selectedSprint.name}
        </Text>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Text padding={'5px'} borderRadius={'4px'} border={tasks.length==0?"":"2px solid pink"} mr={'30px'} color={'purple.800'} fontWeight={'600'}>Total Tasks : {tasks.length}</Text>
        <CreateNEwTaskModal>
        <Button mr={'15px'} >
          Create New Task
        </Button>
        </CreateNEwTaskModal>
        {selectedTask?<EditTaskModal>
        <Button border={'2px solid #38B2AC'}>
          Edit Task
        </Button>
        </EditTaskModal>:
        <Button onClick={handleEditTask}>Edit Task</Button>}
        <ShowAllUsers>
          <Button ml={3}>show All user</Button>
          </ShowAllUsers>
        </Box>
      </Box>
      <Box
        backgroundColor={"white"}
        width={"100%"}
        padding={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
        >
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab w={"33%"}>Todo</Tab>
            <Tab w={"33%"}>In-Progress</Tab> 
            <Tab w={"33%"}>Done</Tab> 
          </TabList>
          <TabPanels>
            <TabPanel>
              < TaskList tasks={tasks} status={"todo"}/>
            </TabPanel>
            <TabPanel>
              <TaskList tasks={tasks} status={"in-progress"}/>
            </TabPanel>
            <TabPanel>
              <TaskList tasks={tasks} status={"done"}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>:<Box w={'100%'} display={'flex'} justifyContent="center" alignItems={'center'}><Text fontSize={"3xl"} pb={3} fontFamily={"Work sans"}>Click a sprint to see tasks</Text></Box>
      }
    </>
  )
}

export default SprintTasks