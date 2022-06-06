import { Badge } from "@chakra-ui/react";

export interface CompleteStatusBadgeProps {
  isComplete: boolean;
}

export const CompleteStatusBadge = ({ complete, ...other }) => {
  if (complete) {
    return (
      <Badge variant={"solid"} colorScheme={"green"} {...other}>
        Complete
      </Badge>
    );
  }

  return (
    <Badge variant={"solid"} colorScheme={"red"} {...other}>
      Incomplete
    </Badge>
  );
};
