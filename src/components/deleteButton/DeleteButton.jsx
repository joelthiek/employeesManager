import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import React from "react"
import { api_url } from "../../utils/firebase/firebase"
import { employeesActions } from "../../redux/slices/employeesSlice"
import { useDispatch } from "react-redux"

export default function DeleteButton({ emp_id }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const dispatch = useDispatch()

  const toast = useToast()

  const handleDelete = async (emp_id) => {
    try {
      await fetch(`${api_url}employees/${emp_id}.json`, {
        method: "DELETE",
      })
      toast({
        title: "Delete successfull",
        description: "employee successfully deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      onClose()
      dispatch(employeesActions())
    } catch (error) {
      console.log(error)
      toast({
        title: "Delete Failed",
        description: "employee delete failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      onClose()
    }
  }

  return (
    <>
      <Button colorScheme='red' variant='solid' size='sm' onClick={onOpen}>
        Delete
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Employee</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete it ?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme='red'
              ml={3}
              onClick={() => handleDelete(emp_id)}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
