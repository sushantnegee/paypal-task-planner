import { Box, Container } from '@chakra-ui/react'
import React from 'react'

const TaskList = ({tasks,status}) => {
  const filteredItems = tasks.filter((elem) => elem.status == status);
  
  return (
    <Container>
      {filteredItems.map((elem) =>(
        <Box p={"3"}
        cursor="pointer"
        // onClick={() => setSelectedSprint(sprint)}
        // bg={selectedSprint === sprint ? "#38B2AC" : "#E8E8E8"}
        // color={selectedSprint === sprint ? "white" : "black"}
        // key={sprint._id}
        bg={"#E8E8E8"}
        color={'black'}
        mb={3}
        borderRadius="lg">{elem.title}</Box>
      ))}
    </Container>
  )
}

export default TaskList