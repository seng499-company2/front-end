import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from '@chakra-ui/react'
import React from 'react'

const Sidesheet = (props) => {
  const { isOpen, onClose, title, submitLabel, onSubmit, formId, ...other } = props;

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        {...other}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            {title}
          </DrawerHeader>

          <DrawerBody>
            {props.children}
          </DrawerBody>

          {submitLabel && <DrawerFooter borderTopWidth='1px'>
            <Button onClick={onSubmit} type='submit' form={formId}>{submitLabel}</Button>
          </DrawerFooter>}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Sidesheet;
