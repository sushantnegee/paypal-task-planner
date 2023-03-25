import { Box } from '@chakra-ui/react'
import React from 'react'
import AllSprints from '../Components/AllSprints'
import Header from '../Components/Header'
import SprintTasks from '../Components/SprintTasks'

const TaskPlannerPage = () => {
  return (
    <div>
      <Header/>
        <Box display={'flex'} justifyContent="space-between" height={'90vh'}>
            <AllSprints/>
            <SprintTasks/>
        </Box>
    </div>
  )
}

export default TaskPlannerPage