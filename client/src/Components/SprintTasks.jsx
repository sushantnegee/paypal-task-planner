import { Box, Button, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { AddIcon } from '@chakra-ui/icons';
import TaskList from './TaskComponents/TaskList';
import { AppContext } from '../Context/ContextProvider';
import axios from 'axios';
import CreateNEwTaskModal from './miscellaneous/CreateNewTaskModal';

const SprintTasks = () => {
  const [allTasks,settAllTasks] = useState();
  const [loading,setLoading] = useState(false);
  const [tasks,setTasks] = useState([]);
  const toast = useToast();

  const {user,selectedSprint} = useContext(AppContext)
  const fetchMessages = async () => {
    if (!selectedSprint) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/tasks/${selectedSprint._id}`,
        config
      );
      console.log("fetched Tasks =>",data)
      setTasks(data);
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

  useEffect(() => {
    fetchMessages();

  }, [selectedSprint]);
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
          Sprint Tasks
        </Text>
        <CreateNEwTaskModal>
        <Button>
          create new Task
        </Button>
        </CreateNEwTaskModal>
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
              < TaskList tasks={tasks} filter={"todo"}/>
            </TabPanel>
            <TabPanel>
              <TaskList tasks={tasks} filter={"in-progress"}/>
            </TabPanel>
            <TabPanel>
              <TaskList tasks={tasks} filter={"done"}/>
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