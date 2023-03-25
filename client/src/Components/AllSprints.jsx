import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Stack, Text, useConst, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { AppContext } from "../Context/ContextProvider";
import SprintLoading from "./SprintLoading";
import axios from "axios";
import CreateSprintModal from "./miscellaneous/CreateSprintModal";

const AllSprints = () => {
  const {fetchAgain,setFetchAgain, user, sprints, setSprints, selectedSprint, setSelectedSprint } =
    useContext(AppContext);
  const toast = useToast();
  const [modalOpen,setModalOpen] = useState(false);


  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:5000/sprints", config);
      console.log(data);
      setSprints(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the sprints",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);
  console.log(sprints);
  return (
    <Box
      display={"flex"}
      flexDir="column"
      w={{ base: "100%", md: "30%" }}
      borderWidth="1px"
      alignItems={"center"}
      p={"3"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        Sprints
        <CreateSprintModal>
          <Button
            fontSize={{ base: "19px", md: "13px", lg: "19px" }}
            display={"flex"}
            rightIcon={<AddIcon />}
          >
            Create New Sprint
          </Button>
        </CreateSprintModal>
      </Box>
      <Box height={"100%"} width={"100%"} flexDir={"column"} overflowY="hidden">
        {sprints ? (
          <Stack overflowY="scroll">
            {sprints.map((sprint) => (
              <Box
                p={"3"}
                cursor="pointer"
                onClick={() => setSelectedSprint(sprint)}
                bg={selectedSprint === sprint ? "#38B2AC" : "#E8E8E8"}
                color={selectedSprint === sprint ? "white" : "black"}
                key={sprint._id}
                borderRadius="lg"
              >
                <Text>{sprint.name}</Text>
                <Text fontSize="xs">
                  {sprint.startDate} to {sprint.endDate}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <SprintLoading />
        )}
      </Box>
    </Box>
  );
};

export default AllSprints;
