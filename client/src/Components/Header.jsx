import { ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/ContextProvider'

const Header = () => {
    const {user} = useContext(AppContext)
    const navigate = useNavigate();
    const logoutHandler = ()=>{
        navigate("/");
    }
  return (
    <Box display={'flex'} justifyContent={'end'} gap='10' alignItems={'center'} w={'100%'} h={'10vh'} borderWidth={'1px'} >
      
        {/* <Text mr={'20'}fontSize={'3xl'}>{user.name}</Text> */}
        <Menu >
            <MenuButton as={Button} mr="10"bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
              />
            </MenuButton>
            <MenuList>
                <MenuItem>{user.name}</MenuItem>{" "}
              <MenuDivider/>
              <MenuItem onClick={logoutHandler} >Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
  )
}

export default Header