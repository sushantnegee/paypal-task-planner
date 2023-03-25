import { Box, Button, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AppContext } from '../Context/ContextProvider'

const Header = () => {
    const {user} = useContext(AppContext)
  return (
    <Box display={'flex'} justifyContent={'end'} gap='10' alignItems={'center'} w={'100%'} h={'10vh'} borderWidth={'1px'} >
      
        <Text mr={'20'}fontSize={'3xl'}>{user.name}</Text>
        </Box>
  )
}

export default Header