import { Box } from '@chakra-ui/react'
import React from 'react'
import AllSprints from '../Components/AllSprints'
import SprintTasks from '../Components/SprintTasks'

const TaskPlannerPage = () => {
  return (
    <div>
        <Box>
            <AllSprints/>
            <SprintTasks/>
        </Box>
    </div>
  )
}

export default TaskPlannerPage