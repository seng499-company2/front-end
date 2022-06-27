import {
    Box,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Text,
} from "@chakra-ui/react";
import React from "react";

const Sidesheet = (props) => {
    const {
        isOpen,
        onClose,
        title,
        subTitle,
        submitLabel,
        onSubmit,
        formId,
        ...other
    } = props;

    const drawerHeaderText = (
        <Box>
            <Text fontSize="lg">{title}</Text>
            {subTitle && <Text fontWeight="thin">{subTitle}</Text>}
        </Box>
    );

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                {...other}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">
                        {drawerHeaderText}
                    </DrawerHeader>

                    <DrawerBody>{props.children}</DrawerBody>

                    {submitLabel && (
                        <DrawerFooter borderTopWidth="1px">
                            <Button
                                onClick={onSubmit}
                                type="submit"
                                form={formId}
                            >
                                {submitLabel}
                            </Button>
                        </DrawerFooter>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Sidesheet;
