import { Button, Flex } from "@chakra-ui/react";

const EditButton = ({ onClick, ...other }) => (
    <Button onClick={onClick} colorScheme="blue" {...other}>
        Edit
    </Button>
);
const CancelButton = ({ onClick, ...other }) => (
    <Button onClick={onClick} colorScheme="red" ml="auto" {...other}>
        Cancel
    </Button>
);
const SubmitButton = ({ onClick, ...other }) => (
    <Button type="submit" onClick={onClick} {...other}>
        Save
    </Button>
);

const DeleteButton = ({ onClick, ...other }) => (
    <Button onClick={onClick} colorScheme="red" mr="auto" {...other}>
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
    isEditable,
}) => {
    return (
        <Flex direction="row" width="100%" gap={3}>
            {isEditable && !isEditing && <DeleteButton onClick={onDelete} />}
            {isEditable &&
                (isEditing ? (
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
                ))}
            {!isEditable && (
                <SubmitButton
                    onClick={onSubmit}
                    isLoading={isLoading}
                    form={formId}
                    ml="auto"
                />
            )}
        </Flex>
    );
};
