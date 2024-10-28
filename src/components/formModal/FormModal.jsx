import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from "@chakra-ui/react"
import React, { useContext, useEffect } from "react"
import { api_url } from "../../utils/firebase/firebase"
import { EmployeeContext } from "../../utils/employeesContext/EmployeeContext"


const FormModal = ({
  isOpen,
  onClose,
  isEdit,
  setIsEdit,
  employee,
  setEmployee,
}) => {
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [salary, setSalary] = React.useState(0)
  const [date, setDate] = React.useState("")
  const [department,setDepartment] = React.useState("")

  const {getEmployees } = useContext(EmployeeContext)


  const toast = useToast()

  const handleCloseModal = () => {
    setIsEdit(false);
    setEmployee(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setSalary(0);
    setDate("");
    setDepartment("");
    onClose();
  };
  

  useEffect(() => {
    if (isEdit && employee) {
      setFirstName(employee.firstname)
      setLastName(employee.lastname)
      setEmail(employee.email)
      setSalary(employee.salary)
      setDate(employee.date)
      setDepartment(employee.department)
    } else {
      setFirstName("")
      setLastName("")
      setEmail("")
      setSalary(0)
      setDate("")
      setDepartment("")
    }
  }, [isEdit, employee])

  const handleAddEmployee = async (e) => {
    e.preventDefault()

    if (!firstName || !lastName || !email || !salary || !date) {
      toast({
        title: "Every field is required",
        description: "You have to fill every field in the form",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const formData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      salary: salary,
      date: date,
      department
    }

    try {
      await fetch(`${api_url}employees.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      toast({
        title: "Form submitted",
        description: "Form submission successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      })

      handleCloseModal()
      getEmployees()
    } catch (error) {
      console.log(error)
      toast({
        title: error.message,
        description: "Form submission error",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const updateEmployee = async (e) => {
    e.preventDefault()

    if (!firstName || !lastName || !email || !salary || !date) {
      toast({
        title: "Every field is required",
        description: "You have to fill every field in the form",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const formData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      salary: salary,
      date: date,
      department
    }

    try {
      await fetch(`${api_url}employees/${employee.id}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      toast({
        title: "Updated",
        description: "Update successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      })

      handleCloseModal()
      getEmployees()
      
    } catch (error) {
      console.log(error)
      toast({
        title: error.message,
        description: "Update submission error",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Modal isOpen={isOpen}>
      <form onSubmit={isEdit ? updateEmployee : handleAddEmployee}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? "Edit" : "Add"} Employee Details:</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='First name'
                type='text'
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                value={lastName}
                type='text'
                placeholder='Last name'
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                type='text'
                placeholder='Email@gmail.com'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Salary</FormLabel>
              <Input
                value={salary}
                type='number'
                placeholder='10000'
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </FormControl>
            <FormControl mt={4}>
            <FormLabel>Department</FormLabel>

              <Select value={department} onChange={(e)=> setDepartment(e.target.value)} placeholder='Select Department'>
                <option value='Software Engineer'>Software Engineer</option>
                <option value='Financial Manager'>Financial Manager</option>
                <option value='Human Resource'>Human Resource</option>
                <option value='Manager'>Manager</option>
                <option value='Cloud Engineer'>Cloud Engineer</option>
                <option value='Product Manager'>Product Manager</option>

              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input
                value={date}
                type='date'
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type='submit'>
              {isEdit ? "Save" : "Submit"}
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default FormModal
