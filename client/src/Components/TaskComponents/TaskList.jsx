import { Box, Container, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AppContext } from '../../Context/ContextProvider';

const TaskList = ({tasks,status}) => {
  const {selectedTask,setSelectedTask} = useContext(AppContext)
  const filteredItems = tasks.filter((elem) => elem.status == status);
  
  return (
    <Container>
      {filteredItems.map((elem) =>(
        <Box p={"3"}
        cursor="pointer"
        onClick={() => setSelectedTask(elem)}
        bg={selectedTask === elem ? "#38B2AC" : "#E8E8E8"}
        color={selectedTask === elem ? "white" : "black"}
        // key={sprint._id}
        // bg={"#E8E8E8"}
        // color={'black'}
        mb={3}
        borderRadius="lg">
          <Text>{elem.title}</Text>
          <Box>
          </Box>
        </Box>
      ))}
    </Container>
  )
}

export default TaskList