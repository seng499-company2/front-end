import { Button, Flex } from "@chakra-ui/react";

const EditButton = ({ onClick, msg, ...other }) => (
    <Button onClick={onClick} colorScheme="blue" ml="auto" {...other}>
        Edit {msg}
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
            {isEditable && !isEditing && onDelete && (
                <DeleteButton onClick={onDelete} />
            )}
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
                    <EditButton onClick={onEdit} msg={saveMsg} />
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
