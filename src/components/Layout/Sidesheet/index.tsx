import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import React from "react";

import { SidesheetFooter } from "./Footer";
import { SidesheetHeader } from "./Header";

const Sidesheet = (props) => {
    const {
        isOpen,
        onClose,
        title,
        subTitle,
        onSubmit,
        onEdit,
        onCancel,
        isEditable,
        isEditing,
        isLoading,
        formId,
        onDelete,
        saveMsg = "",
        ...other
    } = props;

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
                        <SidesheetHeader title={title} subTitle={subTitle} />
                    </DrawerHeader>

                    <DrawerBody>{props.children}</DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <SidesheetFooter
                            isEditing={isEditing}
                            isLoading={isLoading}
                            onCancel={() => {
                                onCancel();
                                onClose();
                            }}
                            onEdit={onEdit}
                            onSubmit={onSubmit}
                            formId={formId}
                            onDelete={onDelete}
                            isEditable={isEditable}
                            saveMsg={saveMsg}
                        />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Sidesheet;
