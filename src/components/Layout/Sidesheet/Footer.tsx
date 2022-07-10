import { Button, Flex } from "@chakra-ui/react";

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
    <Button type="submit" onClick={onClick} {...other}>
        Save
    </Button>
);

const DeleteButton = ({ onClick, ...other }) => (
    <Button onClick={onClick} colorScheme="red" {...other} mr="auto">
        Delete
    </Button>
);

export const SidesheetFooter = ({
    isEditing,
    isLoading,
    onEdit,
    onCancel,
    onSubmit,
    formId,
    onDelete,
}) => {
    return (
        <Flex direction="row" width="100%">
            <DeleteButton onClick={onDelete} />
            {isEditing ? (
                <>
                    <CancelButton onClick={onCancel} />
                    <SubmitButton
                        onClick={onSubmit}
                        isLoading={isLoading}
                        form={formId}
                    />
                </>
            ) : (
                <EditButton onClick={onEdit} />
            )}
        </Flex>
    );
};
