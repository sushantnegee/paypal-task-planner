import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { AddIcon } from '@chakra-ui/icons';

const SprintTasks = () => {
  return (
    <Box display={'flex'} flexDirection="column" w={{base:"100%",md:'30%'}} borderWidth="1px" alignItems={'center'}>
        <Box  pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center">
            Sprints
            <Button fontSize={{ base: "17px", md: "10px", lg: "17px" }} display={'flex'} rightIcon={<AddIcon />}>Create New Sprint</Button>
        </Box>
        <Box height={'100%'} width={'100%'} flexDirection={'column'} overflowY="hidden">
            map sprints here
        </Box>
    </Box>
  )
}

export default SprintTasks