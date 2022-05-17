import { Box, Heading, Text } from "@chakra-ui/react";

export interface World {
  name: string;
  population: number;
}

/**
 * (Demo) Card component for a world
 */
export const WorldCard = ({ world }) => (
  <Box
    as="a"
    p="1rem"
    href={`/worlds/${world.name}`}
    border="1px solid"
    borderRadius="0.5rem"
    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
    _hover={{
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    }}
  >
    <Box>
      <Heading as="h3" size="md" fontWeight="normal" mb="1rem">
        {world.name}
      </Heading>
      <Text fontSize="sm" color="gray.500">
        population: {world.population}
      </Text>
    </Box>
  </Box>
);

export default WorldCard;
