import React, { useContext } from 'react'
import { Box, Button, Stack, Text, useConst } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons';
import { AppContext } from '../Context/ContextProvider';

const AllSprints = () => {
  const {sprints} = useContext(AppContext)
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
        <Stack overflowY="scroll">
            {sprints.map((sprint) => (
              <Box
                cursor="pointer"
                key={sprint._id}
              >
                <Text>
                  {sprint.name}
                </Text>
                  <Text fontSize="xs">
                    {sprint.startDate} to {sprint.endDate}
                  </Text>
                
              </Box>
            ))}
          </Stack>
        </Box>
    </Box>
  )
}

export default AllSprints