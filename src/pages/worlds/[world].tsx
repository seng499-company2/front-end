import { GetServerSideProps } from "next";
import { Box, Text } from "@chakra-ui/react";
import { World } from "../../components/WorldCard";

const World = ({ world }: { world: World }) => {
  return (
    <Box>
      <Text fontSize="4xl" fontWeight="normal" mb="1rem">
        {world.name}
      </Text>
      <Text fontSize="xl" color="gray.500">
        population: {world.population}
      </Text>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${process.env.API_HOST}/api/v1/world/`);
  const worlds: World[] = await res.json();

  const world = worlds.find((world) => world.name === context.query.world);

  return {
    props: {
      world,
    },
  };
};

export default World;
