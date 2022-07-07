import { Button, HStack } from "@chakra-ui/react";

const EditButton = ({ onClick, ...other }) => (
    <Button onClick={onClick} colorScheme="blue" {...other}>
        Edit
    </Button>
);
const CancelButton = ({ onClick, ...other }) => (
    <Button onClick={onClick} colorScheme="red" {...other}>
        Cancel
    </Button>
);
const SubmitButton = ({ onClick, ...other }) => (
    <Button onClick={onClick} {...other}>
        Save
    </Button>
);

export const SidesheetFooter = ({
    isEditing,
    isLoading,
    onEdit,
    onCancel,
    onSubmit,
}) => {
    return (
        <>
            {isEditing ? (
                <HStack gap={3}>
                    <CancelButton onClick={onCancel} />
                    <SubmitButton onClick={onSubmit} isLoading={isLoading} />
                </HStack>
            ) : (
                <EditButton onClick={onEdit} />
            )}
        </>
    );
};
