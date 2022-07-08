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
import { useRouter } from "next/router";
import { FiChevronDown } from "react-icons/fi";

import useAuth from "src/hooks/useAuth";

export const User = ({ hasProfile = true, textColor }) => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const menuListBg = useColorModeValue("white", "gray.900");
    const menuListBorder = useColorModeValue("gray.200", "gray.700");

    const tColor = textColor || "gray.100";

    const displayName = `${user.firstName} ${user.lastName}`;
    const displayRole = user.isAdmin ? "Admin" : "Professor";

    return (
        <Flex alignItems={"center"}>
            <Menu>
                <MenuButton
                    py={2}
                    transition="all 0.3s"
                    _focus={{ boxShadow: "none" }}
                >
                    <HStack>
                        <Avatar size={"sm"} />
                        <VStack
                            display={{ base: "none", md: "flex" }}
                            alignItems="flex-start"
                            spacing="1px"
                            ml="2"
                        >
                            <Text fontSize="sm" color={tColor}>
                                {displayName}
                            </Text>
                            <Text fontSize="xs" color={tColor}>
                                {displayRole}
                            </Text>
                        </VStack>
                        <Box display={{ base: "none", md: "flex" }}>
                            <FiChevronDown />
                        </Box>
                    </HStack>
                </MenuButton>
                <MenuList bg={menuListBg} borderColor={menuListBorder}>
                    {hasProfile && (
                        <>
                            <MenuItem onClick={() => router.push("/profile")}>
                                Profile
                            </MenuItem>
                            <MenuDivider />
                        </>
                    )}
                    <MenuItem onClick={() => logout()}>Sign out</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default User;
