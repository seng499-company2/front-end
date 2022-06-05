import { Flex, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => (
  <Flex direction="column" justifyContent="flex-start" {...props} />
);

export default Container;
