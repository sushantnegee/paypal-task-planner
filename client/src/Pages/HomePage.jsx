import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Box,
  Container,
} from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        display={'flex'}
        justifyContent={'center'}
        padding={3}
        backgroundColor={"white"}
        width={'100%'}
        margin={'40px 0px 15px 0px'}
        borderRadius={'lg'}
        borderWidth={'1px'}
      >
        <Text
          textAlign={"center"}
          fontSize={"4xl"}
          fontFamily={"Work sans"}
          color={"black"}
        >
          Task Planner
        </Text>
      </Box>
      <Box
        backgroundColor={"white"}
        width={"100%"}
        padding={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Tabs variant="soft-rounded" colorScheme={'purple'}>
          <TabList mb={"1em"}>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
                hjfhdkkjfd
              {/* <Login /> */}
            </TabPanel>
            <TabPanel>
                hfjdfdfk
              {/* <Signup /> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
