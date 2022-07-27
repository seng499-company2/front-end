import {
    AlertDialogBody,
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";
import { useRef } from "react";

export const RegenerateConfirmation = ({ isOpen, onClose, onConfirm }) => {
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
                        {"Re-generate schedule?"}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? This will irreversibly clear the current
                        schedule.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            ml={3}
                        >
                            Re-generate
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default RegenerateConfirmation;
