import { Box, Button, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { AddIcon } from '@chakra-ui/icons';
import TaskList from './TaskComponents/TaskList';
import { AppContext } from '../Context/ContextProvider';

const SprintTasks = () => {
  const [allTasks,settAllTasks] = useState();
  const [loading,setLoading] = useState(false);

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
        `http://localhost:3000/tasks/${selectedSprint._id}`,
        config
      );
      console.log("fetched message data =>",data)
      console.log(messages)
      setMessages(data);
      setLoading(false);
      socket.emit('join chat', selectedChat._id);

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <Container maxW={"100%"} centerContent>
      <Box
        display={'flex'}
        justifyContent={'center'}
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
          color={"black"}
        >
          Sprint Tasks
        </Text>
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
            <Tab w={"33%"}>Login</Tab>
            <Tab w={"33%"}>SignUp</Tab> 
            <Tab w={"33%"}>SignUp</Tab> 
          </TabList>
          <TabPanels>
            <TabPanel>
              < TaskList/>
            </TabPanel>
            <TabPanel>
              <TaskList/>
            </TabPanel>
            <TabPanel>
              <TaskList/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default SprintTasks