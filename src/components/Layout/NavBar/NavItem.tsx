import { Flex, FlexProps, Icon, Link } from "@chakra-ui/react";
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
        <Link
            href={href}
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "primary.300",
                    color: "white",
                }}
                bg={pathname === href ? "primary.600" : undefined}
                color={pathname === href ? "primary.50" : undefined}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: "white",
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

export default NavItem;
