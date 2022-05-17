import { GetServerSideProps } from "next";
import { Stack, Text } from "@chakra-ui/react";
import WorldCard, { World } from "../../components/WorldCard";

const Worlds = ({ worlds }: { worlds: World[] }) => (
  <Stack spacing="1.5rem" width="100%" maxWidth="48rem" pt="1rem" px="1rem">
    <Text fontSize="2xl">Worlds</Text>
    {worlds.map((world) => (
      <WorldCard key={world.name} world={world} />
    ))}
  </Stack>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.API_HOST}/api/v1/world/`);
  const worlds = await res.json();

  return {
    props: {
      worlds,
    },
  };
};

export default Worlds;
