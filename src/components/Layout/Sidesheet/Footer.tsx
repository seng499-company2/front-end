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
const SubmitButton = ({ onClick, msg, ...other }) => (
    <Button type="submit" onClick={onClick} {...other}>
        Save {msg}
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
    saveMsg,
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
                            msg={saveMsg}
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
                    msg={saveMsg}
                />
            )}
        </Flex>
    );
};
