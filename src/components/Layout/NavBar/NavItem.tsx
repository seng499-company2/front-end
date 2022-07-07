import { Flex, FlexProps, Icon, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactText } from "react";
import { IconType } from "react-icons";

export interface NavItemProps extends FlexProps {
    icon: IconType;
    href: string;
    children: ReactText;
}

export const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
    const { pathname } = useRouter();

    return (
        <Link href={href} style={{ textDecoration: "none" }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: useColorModeValue("primary.200", "primary.300"),
                    color: "gray.800",
                }}
                bg={pathname === href ? "primary.500" : undefined}
                color={pathname === href ? "white" : undefined}
                {...rest}
            >
                {icon && <Icon mr="4" fontSize="16" as={icon} />}
                {children}
            </Flex>
        </Link>
    );
};

export default NavItem;
