import {
    VStack,
    Text,
    Box,
    Divider,
    AlertDialogBody,
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";
import { useRef } from "react";

export const DeleteConfirmation = ({
    isOpen,
    onClose,
    title,
    onDelete,
    isLoading,
}) => {
    const cancelRef = useRef();

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {"Delete " + title + "?"}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You cannot undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button
                            colorScheme="red"
                            onClick={onDelete}
                            ml={3}
                            isLoading={isLoading}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default DeleteConfirmation;
