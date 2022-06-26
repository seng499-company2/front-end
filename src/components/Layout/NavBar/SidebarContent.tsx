import {
    Box,
    BoxProps,
    CloseButton,
    Flex,
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
    { name: "Schedules", href: "/schedules", icon: FiCalendar },
    { name: "Courses", href: "/courses", icon: FiBookOpen },
    { name: "Professors", href: "/professors", icon: FiUser },
];

export interface SidebarProps extends BoxProps {
    onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            bg={useColorModeValue("background.main", "gray.700")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                alignItems="center"
                mx="8"
                justifyContent="space-between"
                mt={15}
            >
                {/* <Heading color="highlight.main" fontSize={70}>2022</Heading> */}
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
