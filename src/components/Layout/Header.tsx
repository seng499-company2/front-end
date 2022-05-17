import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

import { DarkModeSwitch } from "./DarkModeSwitch";

const navLinks = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Worlds",
    route: "/worlds",
  },
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigationItems = (
    <>
      {navLinks.map((link) => (
        <Link key={link.name} href={link.route}>
          <Button variant="link" p={2} rounded={"md"}>
            {link.name}
          </Button>
        </Link>
      ))}
    </>
  );

  return (
    <>
      <Box py={1}>
        <Container maxW="container.lg">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: !isOpen ? "none" : "inherit" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {!isOpen && navigationItems}
              </HStack>
            </HStack>
            <DarkModeSwitch />
          </Flex>
          {isOpen && (
            <Box pb={4} mt={3}>
              <Stack as={"nav"} spacing={4}>
                {navigationItems}
              </Stack>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Header;
