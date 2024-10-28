import { Box, Button, Text, useDisclosure } from "@chakra-ui/react"
import React, {  useState } from "react"
import Signout from "../../components/signout/Signout"
import TableComponent from "../../components/table/TableComponent"
import FormModal from "../../components/formModal/FormModal"
import { useAuth } from "../../utils/firebase/authContext/AuthContext"

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isEdit, setIsEdit] = useState(false)
  const [employee, setEmployee] = useState(null)


  const isEditClick = (emp) => {
    setIsEdit(true)
    setEmployee(emp)
    onOpen()
  }

  return (
    <Box mt='10'>
      <Text fontSize='2xl' fontWeight='bold'>
        Employee Management Software
      </Text>
      <Box display='flex' gap='10px' mt='5'>
        <Button colorScheme='purple' onClick={onOpen}>
          Add Employee
        </Button>
        <Signout variant='outline'>Logout</Signout>
      </Box>

      {/* table from component */}
      <TableComponent isEditClick={isEditClick}/>

      <FormModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        employee={employee}
        setEmployee={setEmployee}
      />
    </Box>
  )
}

export default Dashboard
