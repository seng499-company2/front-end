import {
    Flex,
    Text,
    Menu,
    MenuButton,
    HStack,
    Avatar,
    VStack,
    Box,
    MenuList,
    useColorModeValue,
    MenuItem,
    MenuDivider,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

export const User = () => (
    <Flex alignItems={"center"}>
        <Menu>
            <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
            >
                <HStack>
                    <Avatar
                        size={"sm"}
                        src={
                            "https://media1.popsugar-assets.com/files/thumbor/90Y7vxSSuPCc03r3OBAFs-N3s5Y/73x206:2432x2565/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/05/18/282/n/1922398/3aa7081b5ec372b05414c5.46937023_/i/Owen-Wilson.jpg"
                        }
                    />
                    <VStack
                        display={{ base: "none", md: "flex" }}
                        alignItems="flex-start"
                        spacing="1px"
                        ml="2"
                    >
                        <Text fontSize="sm" color={"gray.100"}>Owen Wilson</Text>
                        <Text
                            fontSize="xs"
                            color={"gray.100"}
                        >
                            Admin
                        </Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                        <FiChevronDown />
                    </Box>
                </HStack>
            </MenuButton>
            <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
            >
                <MenuItem>Profile</MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
            </MenuList>
        </Menu>
    </Flex>
);

export default User;
