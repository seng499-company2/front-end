import {
    Box,
    BoxProps,
    CloseButton,
    Flex,
    Select,
    useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
    FiHome,
    FiCalendar,
    FiUser,
    FiSettings,
    FiBookOpen,
} from "react-icons/fi";

import NavItem from "./NavItem";

interface LinkItemProps {
    name: string;
    href: string;
    icon: IconType;
}

// add links here
const LinkItems: Array<LinkItemProps> = [
    { name: "Home", href: "/", icon: FiHome },
    { name: "Schedules", href: "/schedules", icon: FiCalendar },
    { name: "Courses", href: "/courses", icon: FiBookOpen },
    { name: "Professors", href: "/professors", icon: FiUser },
    { name: "Constraints", href: "/constraints", icon: FiSettings },
];

export interface SidebarProps extends BoxProps {
    onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            bg={useColorModeValue("secondary.main", "primary.800")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Select>
                    <option>2022</option>
                    <option>2023</option>
                </Select>
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            <Flex direction="column" gap="1">
                {LinkItems.map((link) => (
                    <NavItem key={link.name} icon={link.icon} href={link.href}>
                        {link.name}
                    </NavItem>
                ))}
            </Flex>
        </Box>
    );
};

export default SidebarContent;
