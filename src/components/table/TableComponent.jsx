import React, {useEffect, useState } from "react"
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Text,
  Select,
  Input,
} from "@chakra-ui/react"
import DeleteButton from "../deleteButton/DeleteButton"

import { employeesActions } from "../../redux/slices/employeesSlice"
import { useDispatch,useSelector } from "react-redux"

const TableComponent = ({ isEditClick }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [department, setDepartment] = useState("")
  const [salaryOrder, setSalaryOrder] = useState("asc")
  const [searchQuery, setSearchQuery] = useState("")
  const employeesPerPage = 5

  const dispatch = useDispatch()

  const {employees,loading,error} = useSelector((state)=> state.employeesReducer)

  useEffect(()=>{
    dispatch(employeesActions())
  },[])



  const filteredEmployees = employees
    .filter(
      (emp) =>
        (department === "" || emp.department === department) &&
        emp.firstname.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (salaryOrder === "asc") return a.salary - b.salary
      return b.salary - a.salary
    })

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage)

  const paginatedEmployees = filteredEmployees.slice(
    currentPage * employeesPerPage,
    currentPage * employeesPerPage + employeesPerPage
  )


  return (
    <>
         {loading && <p>Loading...</p>}
         {error && <p>{error}</p>}
               <Flex gap='4' mb='4' mt={4} align='center'>
        <Select
          placeholder='Filter By Department'
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value='Software Engineer'>Software Engineer</option>
          <option value='Financial Manager'>Financial Manager</option>
          <option value='Human Resource'>Human Resource</option>
          <option value='Manager'>Manager</option>
        </Select>

        <Select
          placeholder='Sort by Salary'
          value={salaryOrder}
          onChange={(e) => setSalaryOrder(e.target.value)}
        >
          <option value='asc'>Salary: Low to High</option>
          <option value='desc'>Salary: High to Low</option>
        </Select>

        <Input
          placeholder='Search by First Name'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Flex>

      <TableContainer mt='10'>
        <Table variant='striped' colorScheme='gray'>
          <Thead>
            <Tr>
              <Th fontSize='sm'>
                No.
              </Th>
              <Th fontSize='sm'>
                First Name
              </Th>
              <Th fontSize='sm'>
                Last Name
              </Th>
              <Th fontSize='sm'>
                Email
              </Th>
              <Th fontSize='sm'>
                Department
              </Th>
              <Th fontSize='sm'>
                Salary
              </Th>
              <Th fontSize='sm'>
                Date
              </Th>
              <Th fontSize='sm'>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedEmployees.map((emp, index) => (
              <Tr key={emp.id}>
                <Td>{index + 1 + currentPage * employeesPerPage}</Td>
                <Td>{emp.firstname}</Td>
                <Td>{emp.lastname}</Td>
                <Td>{emp.email}</Td>
                <Td>{emp.department}</Td>
                <Td>{emp.salary}</Td>
                <Td>{emp.date}</Td>
                <Td display='flex' gap='3'>
                  <Button
                    onClick={() => isEditClick(emp)}
                    size='sm'
                    colorScheme='blue'
                    variant='outline'
                  >
                    Edit
                  </Button>
                  <DeleteButton emp_id={emp.id} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justify='space-between' mt='4'>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          isDisabled={currentPage === 0}
        >
          Previous
        </Button>
        <Text alignSelf='center'>
          Page {currentPage + 1} of {totalPages}
        </Text>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          isDisabled={currentPage >= totalPages - 1}
        >
          Next
        </Button>
      </Flex>
    </>
  )
}

export default TableComponent
